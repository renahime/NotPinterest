from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField,SubmitField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired

class FollowForm(FlaskForm):
    submit = SubmitField('Submit')
