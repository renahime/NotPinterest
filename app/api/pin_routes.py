from flask import Blueprint
from ..models import Pin

pin_routes = Blueprint('pins', __name__)

@pin_routes.route("/")
def getAllPins():
    pins = Pin.query.all()
    all_pins = {}
    for pin in pins:
        print(pin.to_dict())
    # all_pins = {pin_id: pin_info for (id, info) in pins.items()}
    # print(all_pins)
    return "<h1>Hello</h1>"