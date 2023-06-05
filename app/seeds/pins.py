from flask.cli import AppGroup
from datetime import datetime
from .pin_seeds import seed_athleisure_pins, undo_athleisure_pins, seed_boho_pins, undo_boho_pins, seed_dark_pins, undo_dark_pins, seed_formal_pins, undo_formal_pins, seed_old_money_pins, undo_old_money_pins, seed_streetwear_pins, undo_streetwear_pins
from ..models import db, environment, SCHEMA, User, Category, Board, Pin
from sqlalchemy.sql import text

def seed_all_pins():
    seed_athleisure_pins()
    seed_boho_pins()
    seed_dark_pins()
    seed_formal_pins()
    seed_old_money_pins()
    seed_streetwear_pins()



def undo_all_pins():
    undo_athleisure_pins()
    undo_boho_pins()
    undo_dark_pins()
    undo_formal_pins()
    undo_old_money_pins()
    undo_streetwear_pins()
