from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.models import User, Board
from ..routes.AWS_helpers import ALLOWED_EXTENSIONS

def get_board_names(userId):
    boards = Board.query.filter(Board.owner_id == userId).order_by(Board.name)
    board_names = [board.name for board in boards]

    return board_names



class PinForm(FlaskForm):
  title = StringField('Pin Name', validators=[Length(max=255, message="Name must be less than 255 chars!")])
  image = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS)), FileRequired()])
  description = StringField('Description Text', validators=[Length(max=255, message="Name must be less than 255 chars!")])
  alt_text = StringField('Alternative Text', validators=[Length(max=255, message="Name must be less than 255 chars!")])
  destination = StringField('Destination Link', validators=[Length(max=255, message="Name must be less than 255 chars!"), URL()])
  board = Selectfield('Board Name', choices=[])
