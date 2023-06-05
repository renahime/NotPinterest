from flask.cli import AppGroup
from .pin_seeds import all_pin_seeds
from sqlalchemy.sql import text


def seed_pins():
    for pin in all_pin_seeds:
        db.session.add(pin)
    db.session.commit()



def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
