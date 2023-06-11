from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import ValidationError, URL, Length
from app.models import User
from ..routes.AWS_helpers import ALLOWED_EXTENSIONS


PRONOUNS = ["ey/em", "he/him","ne/nem","she/her","ve/ver","xe/xem","xie/xem", "they/them","ze/zir"]


class ProfileForm(FlaskForm):
    profile_picture = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    first_name = StringField('First Name', validators=[Length(max=255, message="Name must be less than 255 chars!")])
    last_name = StringField('Last Name', validators=[Length(max=255, message="Name must be less than 255 chars!")])
    about = StringField('About', validators=[Length(max=255, message="About must be less than 255 chars!")])
    pronouns = StringField('Pronouns', validators=[Length(max=255, message="Pronouns must be less than 255 chars!")])
    website = StringField('Website', validators=[Length(max=255, message="Website must be less than 255 chars!")])
    username = StringField('Username', validators=[Length(max=40, message="Name must be less than 40 chars!")])
