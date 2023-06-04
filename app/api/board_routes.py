from flask import Blueprint, redirect,request
from app.models import db,Board
from flask_login import current_user, login_user, logout_user, login_required
from ..forms import BoardForm #need to see BoardForm
from .auth_routes import validation_errors_to_error_messages



board_routes = Blueprint('boards', __name__)



#Route to get a board
@board_routes.route('/', methods = ["GET"])
def get_boards():
    #query database
    boards = Board.query.all()
    all_boards = {}

    #normalize output
    for board in boards:
        all_boards[board.id] = board.to_dict()

    #return all boards
    return all_boards




#Route to get a single board
@board_routes.route('/<int:id>', methods = ["GET"])

def get_board_by_id(id):
    board = Board.query.get(id)

    if board:
        return board.to_dict()
    else:
        return {"errors": "Board not found"},404





# Route to create a board
@board_routes.route('/', methods=['POST'])
@login_required
def create_board():

    form = BoardForm() #confirm name of form

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        # Create a new board
        new_board = Board(
            name=form.data["name"],
            private=form.data["private"],
            cover_image=form.data["cover_image"],
            description=form.data["description"]
        )
        db.session.add(new_board)
        db.session.commit()

        return new_board.to_dict()

    elif form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401





#Route to delete a single board
@board_routes.route('/<int:id>', methods = ["DELETE"])
@login_required
def delete_board(id):
    board = Board.query.get(id)

    if not board:
        return {"errors": "Board not found"},404


    db.session.delete(board)
    db.session.commit()

    return {"message": "Board successfully deleted "}






# Route to edit a board
@board_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_board(id):
    board_to_edit = Board.query.get(id)

    form = BoardForm() #confirm name of form

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        board_to_edit.name = form.data["name"]
        board_to_edit.private = form.data["private"]
        board_to_edit.cover_image = form.data["cover_image"]
        board_to_edit.description = form.data["description"]

        db.session.commit()
        return board_to_edit.to_dict()

    elif form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401






#Route to get a specific user's boards
@board_routes.route("/<int:user_id>", methods= ["GET"])


def get_user_boards(user_id):
    user_boards = Board.query.filter_by(owner_id=user_id).all()

    if user_boards:
        return {"User Boards" : [board.to_dict() for board in user_boards]}

    else:
        return {"errors": "No Boards found"}



#Route to get a current user's boards
@board_routes.route("/user", methods= ["GET"])


def get_current_user_boards():
    user_boards = Board.query.filter_by(owner_id=current_user.id).all()

    if not user_boards:
        return {"errors": "No Boards were found"}

    all_boards = {}

    for board in user_boards:
        all_boards[board.id] = board.to_dict()

    return all_boards
