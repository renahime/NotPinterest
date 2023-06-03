from flask import Blueprint
from flask_login import login_required, current_user
from ..models import Pin, db, User
from .auth_routes import validation_errors_to_error_messages

pin_routes = Blueprint('pins', __name__)

@pin_routes.route("/")
def get_all_pins():
    pins = Pin.query.all()
    all_pins = {}
    for pin in pins:
        all_pins[pin.id] = pin.to_dict()
    return all_pins


@pin_routes.route("/<int:id>")
def get_pin_by_id(id):
    pin = Pin.query.get(id)

    if not pin:
        return {"errors": "Pin couldn't be found"}, 404

    return pin.to_dict()

@pin_routes.route("/", methods=["POST"])
# @login_required
def create_pin():
    form = PinForm()

    form['csrf_token'].data = request.cookies['csrf_token']
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
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@pin_routes.route("/<int:id>", methods=["PUT"])
# @login_required
def edit_pin(id):
    form = EditPinForm()
    pin = Pin.query.get(id)

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        pin.title = data["title"]
        pin.image = data["image"]
        pin.description = data["description"]
        db.session.commit()
        return pin.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# @pin_routes.route("/<int:id>", methods=["DELETE"])
# changed to get request for the purpose of testing without making fetch, the above will be how this route should actually be hit
@pin_routes.route("/<int:id>/delete")
# @login_required
def delete_pin(id):
    print(current_user)
    pin = Pin.query.get(id)

    if not pin:
        return {"errors": "Pin couldn't be found"}, 404

    db.session.delete(pin)
    db.session.commit()
    return {"message": "Pin successfully deleted"}


@pin_routes.route("/<username>")
def get_users_pins_by_username(username):
    pins = db.session.query(Pin).join(User).filter(User.username == username)
    all_pins = {}
    for pin in pins:
        all_pins[pin.id] = pin.to_dict()
    return all_pins