from flask.cli import AppGroup
from datetime import datetime
from app.models import db, Pin, environment, SCHEMA, User, Category
from sqlalchemy.sql import text


def seed_pins():

    db.session.commit()



def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
