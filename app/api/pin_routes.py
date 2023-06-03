from flask import Blueprint
from ..models import Pin

pin_routes = Blueprint('pins', __name__)

@pin_routes.route("/")
def getAllPins():
    pins = Pin.query.all()
    all_pins = {}
    for pin in pins:
        all_pins[pin.id] = pin.to_dict()
    return all_pins