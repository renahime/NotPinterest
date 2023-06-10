from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import Pin, db, User, Board, Category, user_categories
from ..forms import PinForm, UserCategoryForm
from ..models import Pin, db, User, Board, Category
from ..forms import PinForm, EditPinForm
from ..routes.AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime, date
import random


pin_routes = Blueprint('pins', __name__)



# route to get all pins
@pin_routes.route("/")
def get_all_pins():
    # querires Pin database for all pins
    pins = Pin.query.all()
    all_pins = {}
    # standardizes the output that is returned to user
    for pin in pins:
        all_pins[pin.id] = pin.to_dict()
    # return all_pins
    return all_pins


# gets all of the pins of a user
@pin_routes.route("/users/<username>")
def get_users_pins_by_username(username):
    pins = db.session.query(Pin).join(User).filter(User.username == username)
    all_pins = {}
    # standardizes the format of the pins returned to the user
    for pin in pins:
        all_pins[pin.id] = pin.to_dict()
    return all_pins

#Route to get a pins by category
@pin_routes.route('/categories')
def get_all_user_selected_categories():
    user = User.query.get(current_user.id)
    pins = {}
    if not user or len(user.categories) == 0:
        all_pins = Pin.query.all()
        for n in range(29):
            random_pin = random.choice(all_pins)
        return {pin.id: pin.to_dict() for pin in all_pins}
    for category in user.categories:
        for pin in category.pins:
            pins[pin.id] = pin.to_dict()
    if not len(pins):
        return {"errors": "No pins could be found of that category"}
    return pins


    # pins = Pin.query.all()
    # all_pins = {}

    # for pin in pins:
    #     for category in pin.categories:
    #         if category.name == category_name:
    #             all_pins[pin.id] = pin.to_dict()

    # return all_pins
    # return {"errors": validation_errors_to_error_messages(form.errors)}, 401

#Route to get a pins by category
@pin_routes.route('/<category_name>')
def get_pin_by_category(category_name):
    pins = Pin.query.all()
    all_pins = {}

    for pin in pins:
        for category in pin.categories:
            if category.name == category_name:
                all_pins[pin.id] = pin.to_dict()

    return all_pins

# gets all of the pins of the current user
@pin_routes.route("/current_user")
def get_users_pins_by_current_user():
    pins = db.session.query(Pin).filter(Pin.owner_id == current_user.id)
    all_pins = {}
    # standardizes the format of the pins returned to the user
    for pin in pins:
        all_pins[pin.id] = pin.to_dict()
    return all_pins

# route to get a pin by id
@pin_routes.route("/<int:id>")
def get_pin_by_id(id):
    # querires Pin database for the pin with the id that the user requested
    pin = Pin.query.get(id)
    # sends back an error message if the pin id isn't valid

    owner_info = {}
    owner = pin.user.to_dict()
    print("owner", owner)
    owner_info["first_name"] = owner["first_name"]
    owner_info["last_name"] = owner["last_name"]
    owner_info["followers"] = owner["followers"]
    owner_info["username"] = owner["username"]

    if not pin:
        return {"errors": "Pin couldn't be found"}, 404

    found_pin = pin.to_dict()
    found_pin["owner_info"] = owner_info
    return found_pin

# route to create a new pin
@pin_routes.route("/new", methods=["GET", "POST"])
# @login_required
def create_pin():
    form = PinForm()
    print("made it")
    # Sets the boards that a user has and can save thier pin to
    user_boards = Board.query.filter(Board.owner_id == current_user.id).all()
    if user_boards:
        form.board.choices = [board.id for board in user_boards]

    if not user_boards:
        form.board.choices = []

    user = User.query.get(current_user.id)
    if not user:
        return {"errors": "Couldn't find user"}
    # sets the CSRF token on the form to the CSRF token that came in on the request
    form['csrf_token'].data = request.cookies['csrf_token']

    # if the form doesn't have any issues make a new pin in the database and send that back to the user
    if form.validate_on_submit():
        print("pin route errors part3")

        data = form.data


        pin_image = data["image"]
        pin_image.filename = get_unique_filename(pin_image.filename)
        s3_upload = upload_file_to_s3(pin_image)

        if "url" not in s3_upload:
            return {"errors": validation_errors_to_error_messages(s3_upload)}

        new_pin = Pin(
            title = data["title"],
            image = s3_upload["url"],
            description = data["description"],
            user=user
        )

        board_to_save_pin_to = Board.query.get(data["board"])
        new_pin.board_tagged.append(board_to_save_pin_to)

        db.session.add(new_pin)
        db.session.commit()
        return new_pin.to_dict()

    # if the form has issues send the error messages back to the user
    print("pin route errors part4")
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# route to edit the details of a form
@pin_routes.route("/<int:id>", methods=["GET","PUT"])
@login_required
def edit_pin(id):
    form = EditPinForm()
    # gets the pin that the user wants to edit from the database by searching for the pin with it's id
    pin = Pin.query.get(id)
    # sends back an error message if the pin id isn't valid
    if not pin:
        return {"errors": "Pin couldn't be found"}, 404
    if current_user.id != pin.owner_id:
        return {"errors":"you do not own this pin"}

    user = User.query.get(current_user.id)

    oldBoard = None
    for board in user.boards:
        for pin_in_board in board.pins_tagged:
            if pin.id == pin_in_board.id:
                oldBoard = board

    print("*********************************************************************************************************************",oldBoard.name)

    # sets the CSRF token on the form to the CSRF token that came in on the request
    form['csrf_token'].data = request.cookies['csrf_token']
    # if the form doesn't have any issues make change the pins details in the database to the details in the form
    if form.validate_on_submit():
        data = form.data
        if data["title"]:
            pin.title = data["title"]
        if data["description"]:
            pin.description = data["description"]
        if data["alt_text"]:
            pin.alt_text = data["alt_text"]
        if data["destination"]:
            pin.destination = data["destination"]
        if data["boardName"]:
            print("************************************************************************************* check 1")
            for board in user.boards:
                if board.name == data["boardName"]:
                    print("************************************************************************************* check 2")
                    pin.board_tagged.remove(oldBoard)
                    new_board = board
                    pin.board_tagged.append(new_board)
        db.session.commit()
        return pin.to_dict()
    # if the form has issues send the error messages back to the user
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# deletes a pin by it's id
# @pin_routes.route("/<int:id>", methods=["DELETE"])
# changed to get request for the purpose of testing without making fetch, the above will be how this route should actually be hit
@pin_routes.route("/<int:id>/delete",methods = ["DELETE"])
@login_required
def delete_pin(id):
    # finds the pin that the user indicated that they wanted to delete
    pin = Pin.query.get(id)

    # sends back an error message if the pin id isn't valid
    if not pin:
        return {"errors": "Pin couldn't be found"}, 404

    if current_user.id != pin.owner_id:
        return {"errors":"you do not own this pin"}

    pin_image_delete = remove_file_from_s3(pin.image)

    # deletes the pin and sends back confirmation message
    if pin_image_delete:
        db.session.delete(pin)
        db.session.commit()
        return {"message": "Pin successfully deleted"}

    return {"errors": "Pin couldn't be deleted"}, 500

#Route to get a pins created for today
@pin_routes.route('/today')
def get_latest_pins():
    today = datetime.now()
    pins = Pin.query.all()
    all_pins = {}
    input_str = '01/01/01'

    latest_date = datetime.strptime(
    input_str, '%d/%m/%y').date()

    for pin in pins:
        print(latest_date)
        if pin.created_at.date() > latest_date:
            latest_date = pin.created_at.date()
        if pin.created_at.date() == today.date():
                all_pins[pin.id] = pin.to_dict()
    if not bool(all_pins):
        for pin in pins:
            if pin.created_at.date() == latest_date:
                all_pins[pin.id] = pin.to_dict()
    return all_pins



# route to get all pins
@pin_routes.route("/")
def get_all_pins():
    # querires Pin database for all pins
    pins = Pin.query.all()
    all_pins = {}
    # standardizes the output that is returned to user
    for pin in pins:
        all_pins[pin.id] = pin.to_dict()
    # return all_pins
    return all_pins
