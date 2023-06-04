from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired, SubmitField

class FollowForm(FlaskForm):
    submit = SubmitField('Submit')
