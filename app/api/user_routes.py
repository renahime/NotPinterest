from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from models import User, db
from forms import FollowForm

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

@user_routes.route('/<int:id>/followers')
@login_required
def get_followers_by_id(id):
    user = User.query.get(id)
    return user.get_followers()

@user_routes.route('/<int:id>/following')
@login_required
def get_following_by_id(id):
    user = User.query.get(id)
    return user.get_following()

@user_routes.route('/follow/<username>')
@login_required
def follow(username):
    form = FollowForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=username).first()
        if user is None:
            return {'errors': 'User was not found'}
        if user == current_user:
            return {'errors': 'You can not follow youself'}
        current_user.follow(user)
        db.session.commit()
        return {"Success":"You are now following {}!".format(username)}
    else:
        return {"Error": "An error occured trying to follow someone"}

@user_routes.route('/unfollow/<username>', methods=['POST'])
@login_required
def unfollow(username):
    form = FollowForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=username).first()
        if user is None:
            return {'errors': 'User was not found'}
        if user == current_user:
            return {'errors': 'You can not unfollow youself'}
        current_user.unfollow(user)
        db.session.commit()
        return {"Success": "You are no longer following {}!".format(username)}
    else:
        return {"Error": "An error occured trying to unfollow someone"}
