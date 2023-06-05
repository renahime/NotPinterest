from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import ProfileForm
from app.routes.AWS_helpers import get_unique_filename, upload_file_to_s3

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_profile(id):
    """
        Edit user profile
    """
    user = User.query.get(id)
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validated_on_submit():
        if form.data['profile_picture']:
            profile_picture = form.data['profile_picture']
            profile_picture.filename=get_unique_filename(profile_picture.filename)
            upload = upload_file_to_s3(profile_picture)
            if 'url' not in upload:
                return upload['errors']
            aws_url = upload['url']
            user.profile_image = aws_url
        if form.data['first_name']:
            user.first_name = form.data['first_name']
        if form.data['last_name']:
            user.last_name = form.data['last_name']
        if form.data['about']:
            user.about = form.data['about']
        if form.data['pronouns']:
            user.pronouns = form.data['pronouns']
        if form.data['website']:
            user.website = form.data['website']
        if form.data['username']:
            user.username = form.data['username']
        db.session.commit()
        return user.to_dict()
    else:
        return jsonify({"message":"Error editing profile, please try again"})

@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_account(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message":"Sad to see you go :()"})


@user_routes.route('/follow/<username>', methods=['POST'])
@login_required
def follow(username):
    user = User.query.filter_by(username=username).first()

    if user is None:
            return {'errors': 'User was not found'}

    if user == current_user:
            return {'errors': 'You can not follow youself'}

    for follower in current_user.following:
         if follower.username == user.username:
              return {"errors": "You are already following this user"}
    current_user.follow(user)
    db.session.commit()
    return {"message":"You are now following {}!".format(username)}

@user_routes.route('/unfollow/<username>', methods=['DELETE'])
@login_required
def unfollow(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
         return {'errors': 'User was not found'}
    if user == current_user:
        return {'errors': 'You can not unfollow youself'}

    for follow in current_user.following:
         if follow.username == user.username:
            current_user.unfollow(user)
            db.session.commit()
            return {"message": "You are no longer following {}!".format(username)}
    return {"message": "You are not following {}!".format(username)}
