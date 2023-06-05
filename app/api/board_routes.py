from flask import Blueprint, redirect,request
from app.models import db,Board, User, Pin
from flask_login import current_user, login_user, logout_user, login_required
from ..forms import BoardForm #need to see BoardForm
from .auth_routes import validation_errors_to_error_messages



board_routes = Blueprint('boards', __name__)



#Route to get all board
@board_routes.route('/', methods = ["GET"])
# @login_required
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
@board_routes.route('/<int:id>/delete', methods = ["DELETE"])
@login_required
def delete_board(id):
    board = Board.query.get(id)

    if not board:
        return {"errors": "Board not found"},404


    db.session.delete(board)
    db.session.commit()

    return {"message": "Board successfully deleted "}


@board_routes.route('/<int:boardId>/pin/<int:pinId>', methods = ["POST"])
@login_required
def pin(boardId,pinId):
    board = Board.query.get(boardId)
    _pin = Pin.query.get(pinId)
    if not board:
        return {"errors": "Board not found"},404
    if not _pin:
        return {"errors": "Pin not found"}, 404
    for pin in board.pins_tagged:
        if pin.id == pinId:
            return {"errors": "You already have this pinned"}
    board.pins_tagged.append(_pin)
    db.session.commit()
    return {"Success":"You have now pinned {}!".format(_pin.name)}


@board_routes.route('/<int:id>/unpin/<int:id>', methods = ["DELETE"])
@login_required
def unpin(boardId,pinId):
    board = Board.query.get(boardId)
    _pin = Pin.query.get(pinId)
    if not board:
        return {"errors": "Board not found"},404
    if not _pin:
        return {"errors": "Pin not found"}, 404
    for pin in board.pins_tagged:
        if pin.id == pinId:
            board.pins_tagged.remove(_pin)
            db.session.commit()
            return {"Success": "You are no longer pinning {}!".format(_pin.name)}
    return {"Success": "You do not have {} pinned!".format(_pin.name)}


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
@board_routes.route("/users/<username>", methods= ["GET"])
def get_boards_pins_by_username(username):
    boards = db.session.query(Board).join(User).filter(User.username == username)
    all_boards = {}

    if boards:
        for board in boards:
            all_boards[board.id] = board.to_dict()
        return all_boards
    else:
        return {"errors": "No Boards found"}



#Route to get a current user's boards
@board_routes.route("/current_user")
def get_current_user_boards():
    user_boards = Board.query.filter_by(owner_id=current_user.id).all()

    if not user_boards:
        return {"errors": "No Boards were found"}

    all_boards = {}

    for board in user_boards:
        all_boards[board.id] = board.to_dict()
    return all_boards

# board_routes = BluePrint('boards', __name__)

@board_routes.route('/<category_name>')
def get_board_by_category(category_name):
    boards = Board.query.all()
    all_boards = {}

    for board in boards:
        for category in board.categories:
            if category.name == category_name:
                all_boards[board.id] = board.to_dict()

    return all_boards
