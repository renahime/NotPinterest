from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.models import Board, User
from ..routes.AWS_helpers import ALLOWED_EXTENSIONS


class BoardForm(FlaskForm):
    name = StringField('Board Name', validators=[Length(max=255, message="Name must be less than 255 chars!"), DataRequired()])
    private = BooleanField('Private Board')
    description = StringField('Board Name', validators=[Length(max=255, message="Name must be less than 255 chars!")])
