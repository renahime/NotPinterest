from flask import Blueprint
from flask_login import login_required, current_user
from ..models import Pin, db, User
from .auth_routes import validation_errors_to_error_messages

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
    return all_pins


# route to get a pin by id
@pin_routes.route("/<int:id>")
def get_pin_by_id(id):
    # querires Pin database for the pin with the id that the user requested
    pin = Pin.query.get(id)
    # sends back an error message if the pin id isn't valid
    if not pin:
        return {"errors": "Pin couldn't be found"}, 404

    return pin.to_dict()

# route to create a new pin
@pin_routes.route("/", methods=["POST"])
# @login_required
def create_pin():
    form = PinForm()
    # sets the CSRF token on the form to the CSRF token that came in on the request
    form['csrf_token'].data = request.cookies['csrf_token']
    # if the form doesn't have any issues make a new pin in the database and send that back to the user
    if form.validate_on_submit():
        data = form.data
        new_pin = Pin(
            title = data["title"],
            image = data["image"],
            description = data["description"],
            owner_id = current_user.id
        )

        db.session.add(new_pin)
        db.session.commit()
        return new_Pin.to_dict()
    
    # if the form has issues send the error messages back to the user
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# route to edit the details of a form
@pin_routes.route("/<int:id>", methods=["PUT"])
# @login_required
def edit_pin(id):
    form = EditPinForm()
    # gets the pin that the user wants to edit from the database by searching for the pin with it's id
    pin = Pin.query.get(id)

    # sends back an error message if the pin id isn't valid
    if not pin:
        return {"errors": "Pin couldn't be found"}, 404
    
    # sets the CSRF token on the form to the CSRF token that came in on the request
    form['csrf_token'].data = request.cookies['csrf_token']
    # if the form doesn't have any issues make change the pins details in the database to the details in the form
    if form.validate_on_submit():
        data = form.data
        pin.title = data["title"]
        pin.image = data["image"]
        pin.description = data["description"]
        db.session.commit()
        return pin.to_dict()
    # if the form has issues send the error messages back to the user
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# deletes a pin by it's id
# @pin_routes.route("/<int:id>", methods=["DELETE"])
# changed to get request for the purpose of testing without making fetch, the above will be how this route should actually be hit
@pin_routes.route("/<int:id>/delete")
# @login_required
def delete_pin(id):
    print(current_user)
    # finds the pin that the user indicated that they wanted to delete
    pin = Pin.query.get(id)

    # sends back an error message if the pin id isn't valid
    if not pin:
        return {"errors": "Pin couldn't be found"}, 404

    # deletes the pin and sends back confirmation message
    db.session.delete(pin)
    db.session.commit()
    return {"message": "Pin successfully deleted"}

# gets all of the pins of a user
@pin_routes.route("/<username>")
def get_users_pins_by_username(username):
    pins = db.session.query(Pin).join(User).filter(User.username == username)
    all_pins = {}
    # standardizes the format of the pins returned to the user
    for pin in pins:
        all_pins[pin.id] = pin.to_dict()
    return all_pins


# gets all of the pins of the current user
@pin_routes.route("/current_user")
def get_users_pins_by_username():
    pins = db.session.query(Pin).filter(Pin.owner_id == current_user.id)
    all_pins = {}
    # standardizes the format of the pins returned to the user
    for pin in pins:
        all_pins[pin.id] = pin.to_dict()
    return all_pins