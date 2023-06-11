from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import User, db, user_categories, Category
from app.forms import ProfileForm, UserCategoryForm
from app.routes.AWS_helpers import get_unique_filename, upload_file_to_s3
from .auth_routes import validation_errors_to_error_messages
from wtforms.validators import ValidationError, URL, Length


user_routes = Blueprint('users', __name__)


@user_routes.route('/categories', methods=['POST'])
@login_required
def set_categories():
    form = UserCategoryForm()
    print(form.data)

    user = User.query.get(current_user.id)
    
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        if data["streetware"] == "yes":
            streetwear = Category.query.filter(Category.name == "Streetware").one()
            user.categories.append(streetwear)
        if data["formalwear"] == "yes":
            formalwear = Category.query.filter(Category.name == "Formal Ware").one()
            user.categories.append(formalwear)
        if data["dark"] == "yes":
            dark = Category.query.filter(Category.name == "Dark").one()
            user.categories.append(dark)
        if data["boho"] == "yes":
            boho = Category.query.filter(Category.name == "Boho").one()
            user.categories.append(boho)
        if data["old_money"] == "yes":
            old_money = Category.query.filter(Category.name == "Old Money").one()
            user.categories.append(old_money)
        if form.data["athleisure"] == "yes":
            athleisure = Category.query.filter(Category.name == "Athleisure").one()
            user.categories.append(athleisure)
        db.session.commit()
        return [category.name for category in user.categories]
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

# gets user data by username
@user_routes.route('/users/<username>')
def user_profile(username):

    user = User.query.filter(User.username == username).one_or_none()

    if not user:
         return {"errors": "User couldn't be found"}, 404

    return user.for_profile_display_dict()


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
    if form.validate_on_submit():
        if form.data['profile_picture']:
            profile_picture = form.data['profile_picture']
            profile_picture.filename=get_unique_filename(profile_picture.filename)
            upload = upload_file_to_s3(profile_picture)
            if 'url' not in upload:
                print("UPLOADDDDDD", upload)
                return {"errors": validation_errors_to_error_messages(upload)}
            aws_url = upload['url']
            print("AWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWS", aws_url)
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
            if(current_user.username != form.data["username"]):
                user = User.query.filter(User.username == form.data["username"]).first()
                if user:
                    raise ValidationError('Username is already in use.')
            user.username = form.data['username']
        db.session.commit()
        print("USERRRRRRRRRRRRRRRRRRRR", user.to_dict())
        return user.to_dict()
    elif form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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

@user_routes.route('/<username>/followers_and_following')
@login_required
def getFollowing(username):
    user = User.query.filter_by(username=username).one_or_none()

    if not user:
         return {'errors': 'User was not found'}, 404

    # return "hello"
    print("user.following", user.following)
    followingDict = {following.username:  following.id for following in user.following}
    followersDict = {follower.username : follower.id for follower in user.followers}
#     return followersDict
    users_dict = {}
    users_dict["following"] = followingDict
    users_dict["followers"] = followersDict

    return users_dict

# @user_routes.route('/<username>/followers')
# @login_required
# def getFollowers(username):
#     user = User.query.filter_by(username=username).one_or_none()

#     if not user:
#          return {'errors': 'User was not found'}, 404

#     # return "hello"
#     followersDict = {follower.id: follower.name for follower in user.followers}
#     return followersDict
    # for follower in user.followers:



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
