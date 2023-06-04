from flask.cli import AppGroup
from datetime import datetime
from app.models import db, Pin, environment, SCHEMA, User, Category
from sqlalchemy.sql import text


def seed_pins():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    dark = Category.query.filter(Category.name == "Dark").one()

    pin1 = Pin(
        image="",
        user=user1,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin1)

    pin2 = Pin(
        image="",
        user=user1,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin2)

    pin3 = Pin(
        image="",
        user=user2,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin3)

    pin4 = Pin(
        image="",
        user=user2,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin4)

    pin5 = Pin(
        image="",
        user=user3,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin5)

    pin6 = Pin(
        image="",
        user=user3,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin6)

    pin7 = Pin(
        image="",
        user=user3,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin7)

    pin8 = Pin(
        image="",
        user=user3,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin8)


    pin9 = Pin(
        image="",
        user=user3,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin9)

    pin10 = Pin(
        image="",
        user=user2,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin10)

    pin11 = Pin(
        image="",
        user=user2,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin11)

    pin12 = Pin(
        image="",
        user=user2,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin12)

    pin13 = Pin(
        image="",
        user=user2,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin13)

    pin14 = Pin(
        image="",
        user=user2,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin14)

    pin15 = Pin(
        image="",
        user=user2,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin15)

    pin16 = Pin(
        image="",
        user=user2,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin16)

    pin17 = Pin(
        image="",
        user=user2,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin17)

    pin18 = Pin(
        image="",
        user=user1,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin18)

    pin19 = Pin(
        image="",
        user=user1,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin19)

    pin21 = Pin(
        image="",
        user=user1,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin21)

    pin22 = Pin(
        image="",
        user=user1,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin22)

    pin23 = Pin(
        image="",
        user=user3,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin23)

    pin24 = Pin(
        image="",
        user=user3,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin24)

    pin25 = Pin(
        image="",
        user=user3,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin25)

    pin26 = Pin(
        image="",
        user=user3,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin26)

    pin27 = Pin(
        image="",
        user=user3,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin27)

    pin28 = Pin(
        image="",
        user=user3,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin28)

    pin29 = Pin(
        image="",
        user=user3,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin29)

    pin30 = Pin(
        image="",
        user=user3,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin30)

    db.session.commit()


def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()