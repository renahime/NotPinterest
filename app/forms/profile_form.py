from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import ValidationError, URL, Length
from app.models import User
from ..routes.AWS_helpers import ALLOWED_EXTENSIONS


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

PRONOUNS = ["ey/em", "he/him","ne/nem","she/her","ve/ver","xe/xem","xie/xem","ze/zir"]


class ProfileForm(FlaskForm):
    profile_picture = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    first_name = StringField('First Name', validators=[Length(max=255, message="Name must be less than 255 chars!")])
    last_name = StringField('Last Name', validators=[Length(max=255, message="Name must be less than 255 chars!")])
    about = StringField('About', validators=[Length(max=255, message="Name must be less than 255 chars!")])
    pronouns = SelectField('Pronouns', choices=PRONOUNS, validators=[Length(max=255, message="Name must be less than 255 chars!")])
    website = StringField('Website', validators=[URL(),Length(max=255, message="Name must be less than 255 chars!")])
    username = StringField('Username', validators=[Length(max=40, message="Name must be less than 40 chars!"), username_exists])
