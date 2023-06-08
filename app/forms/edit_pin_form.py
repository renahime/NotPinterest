from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.models import User, Board



class EditPinForm(FlaskForm):
  title = StringField('Pin Name', validators=[Length(max=255, message="Name must be less than 255 chars!")])
  description = StringField('Description Text', validators=[Length(max=255, message="Name must be less than 255 chars!")])
  alt_text = StringField('Alternative Text', validators=[Length(max=255, message="Name must be less than 255 chars!")])
  destination = StringField('Destination Link', validators=[Length(max=255, message="Name must be less than 255 chars!")])
  board = StringField('Board Name')
