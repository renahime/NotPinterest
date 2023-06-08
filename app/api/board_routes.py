from flask import Blueprint, redirect,request
from app.models import db,Board, User, Pin
from flask_login import current_user, login_user, logout_user, login_required
from ..forms import BoardForm, EditBoardForm
from .auth_routes import validation_errors_to_error_messages

board_routes = Blueprint('boards', __name__)


#Route to get a specific board of a user
@board_routes.route("/users/<username>/<board_name>", methods= ["GET"])
def get_one_user_board(username, board_name):
    name = board_name.split("_")
    print("name", name)
    user_board = Board.query.join(User).filter(User.username == username, Board.name.ilike(board_name)).one_or_none()


    pin_info = {}
    pins = user_board.pins_tagged

    for pin in pins:
        owner_info = {
            "username" : pin.user.username,
            "profile_image" : pin.user.profile_image
        }
        pinned = pin.to_dict()
        pinned["owner_info"] = owner_info
        pin_info[pin.id] = pinned

    if user_board:
        board = user_board.to_dict()
        board["pin info"] = pin_info
        return {"User Boards" : board}

    else:
        return {"errors": "No Boards found"}, 404

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




#Route to get a single board by id
@board_routes.route('/<int:id>', methods = ["GET"])
def get_board_by_id(id):
    board = Board.query.get(id)

    if board:
        return board.to_dict()
    else:
        return {"errors": "Board not found"},404

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



#Route to get a specific user's boards
@board_routes.route("/users/<username>", methods= ["GET"])
def get_user_boards(username):
    user_boards = Board.query.join(User).filter(User.username == username).all()

    if user_boards:
        return {"User Boards" : [board.to_dict() for board in user_boards]}

    else:
        return {"errors": "No Boards found"}



# Route to create a board
@board_routes.route('/', methods=['GET','POST'])
@login_required
def create_board():
    user = User.query.get(current_user.id)

    form = BoardForm() #confirm name of form

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Create a new board
        new_board = Board(
            name=form.data["name"],
            private=form.data["private"],
            description=form.data["description"],
            user=user
        )
        db.session.add(new_board)
        db.session.commit()

        return new_board.to_dict()

    elif form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Route to edit a board
@board_routes.route('/<int:id>', methods=['GET','PUT'])
@login_required
def edit_board(id):
    print("WE ARE In edit board route")
    board_to_edit = Board.query.get(id)

    print("WE ARE In edit board route 2")

    if current_user.id != board_to_edit.owner_id:
        return {"errors":"you do not own this board"}

    form = EditBoardForm() #confirm name of form

    choices = []

    # for pinId in board_to_edit.pins_tagged:
    #     pin = Pin.query.get(pinId)
    #     choices.append(pin.name)

    form.cover_image.choices = choices


    form['csrf_token'].data = request.cookies['csrf_token']



    if form.validate_on_submit():
        if form.data["name"]:
            board_to_edit.name = form.data["name"]
        if form.data["private"]:
            board_to_edit.private = form.data["private"]
        if form.data["cover_image"]:
            image_found = False
            for pin in board_to_edit.pins_tagged:
                if pin.image == form.data["cover_image"]:
                    board_to_edit.pin_cover_image.pop()
                    board_to_edit.pin_cover_image.append(pin)
                    image_found = True
            if not image_found:
                return {"error":"pin was not found inside board"}
        if form.data["description"]:
            board_to_edit.description = form.data["description"]
        db.session.commit()
        return board_to_edit.to_dict()

    elif form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Route to delete a single board
@board_routes.route('/<int:id>/delete', methods = ["DELETE"])
@login_required
def delete_board(id):
    board = Board.query.get(id)

    if not board:
        return {"errors": "Board not found"},404

    if current_user.id != board.owner_id:
        return {"errors":"you do not own this board"}

    db.session.delete(board)
    db.session.commit()

    return {"message": "Board deleted"}

# board_routes = BluePrint('boards', __name__)

@board_routes.route('/<category_name>')
def get_board_by_category(category_name):
    boards = Board.query.all()
    board_list = []

    for board in boards:
        for category in board.categories:
            if category.name == category_name:
                board_list.append(board.to_dict())

    return board_list

#Route to pin a pin to a board
@board_routes.route('/<int:boardId>/pin/<int:pinId>', methods = ["POST"])
@login_required
def pin(boardId,pinId):
    board = Board.query.get(boardId)
    print("BOARD IN PIN ROUTE", board)
    if current_user.id != board.owner_id:
        return {"errors":"you do not own this board"}
    _pin = Pin.query.get(pinId)
    if not board:
        return {"errors": "Board not found"},404
    if not _pin:
        return {"errors": "Pin not found"}, 404
    for pin in board.pins_tagged:
        if pin.id == pinId:
            return {"errors": "You already have {} pinned!".format(_pin.title)}
    board.pins_tagged.append(_pin)
    db.session.commit()
    return {"message":"You have now pinned {}!".format(_pin.title)}

#Route to unpin a pin to a board
@board_routes.route('/<int:boardId>/unpin/<int:pinId>', methods = ["DELETE"])
@login_required
def unpin(boardId,pinId):
    board = Board.query.get(boardId)
    _pin = Pin.query.get(pinId)
    if not board:
        return {"errors": "Board not found"},404
    if not _pin:
        return {"errors": "Pin not found"}, 404
    if current_user.id != board.owner_id:
        return {"errors":"you do not own this board"}
    for pin in board.pins_tagged:
        if pin.id == pinId:
            if len(board.pin_cover_image) and pin.id == board.pin_cover_image[0].id:
                board.pin_cover_image.pop()
            board.pins_tagged.remove(_pin)
            db.session.commit()
            return {"message": "You are no longer pinning {}!".format(_pin.title)}
    return {"error": "You do not have {} pinned!".format(_pin.title)}

#Reoute to edit the pin the board is on
@board_routes.route('/<int:current_board_id>/<int:pin_id>/pin_to/<int:new_board_id>', methods = ["POST"])
@login_required
def change_board_to_pin(current_board_id, pin_id, new_board_id):
    current_board = Board.query.get(current_board_id)
    if not current_board:
        return {"errors": "Couldn't find board"}
    if current_user.id != current_board.owner_id:
        return {"errors":"you do not own this board"}
    new_board = Board.query.get(new_board_id)
    if not new_board:
        return {"errors":"Couldn't find new board"}
    if current_user.id != new_board.owner_id:
        return {"errors":"You do not own this board"}
    pin_new_board = Pin.query.get(pin_id)
    if not pin_new_board:
        return {"errors": "Couldn't find pin"}
    for board in pin_new_board.board_tagged:
        if board.id == current_board.id:
            for pin in new_board.pins_tagged:
                if pin_new_board.id == pin.id:
                    return {"errors": "Pin is already in this board"}
            pin_new_board.board_tagged.remove(current_board)
            db.session.commit()
            pin_new_board.board_tagged.append(new_board)
            db.session.commit()
            return {"message":"Pin is now attached to {}".format(new_board.name)}
    return {"errors": "Could not find pin inside of {}!".format(current_board.name)}
