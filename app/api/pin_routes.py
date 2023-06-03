from flask import Blueprint
from flask_login import login_required, current_user
from ..models import Pin, db, User

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
@login_required
def create_pin():
    pass


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