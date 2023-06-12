from flask.cli import AppGroup
from datetime import datetime
from ...models import Pin, User, Category, Board, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_formal_pins():

    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    formalwear = Category.query.filter(Category.name == "Formal Ware").one()
    board = Board.query.get(2)

    pin1 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/tan-suit.jpeg",
        user=user1,
        board_tagged=[board],
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin2 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/white-blazer.jpeg",
        user=user1,
        board_tagged=[board],
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin3 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/tan-shirt.jpeg",
        user=user2,
        board_tagged=[board],
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin4 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/tan-suede.jpeg",
        board_tagged=[board],
        user=user2,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin5 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/Tailored+Suit.jpeg",
        user=user3,
        board_tagged=[board],
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin6 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/sleevless-white.jpeg",
        user=user3,
        board_tagged=[board],
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin7 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/Red-suit.jpeg",
        user=user3,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin8 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/pink-suit.jpeg",
        user=user3,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin9 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/One+Fit+Suit.jpeg",
        user=user3,
        board_tagged=[board],
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin10 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/men-tailored.jpeg",
        user=user2,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin11 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/men-tailored.jpeg",
        user=user2,
        board_tagged=[board],
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin12 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/light-blue-blazer.jpeg",
        user=user2,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin13 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/light-blue-suit.jpeg",
        user=user2,
        board_tagged=[board],
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin14 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/green-suit.jpeg",
        user=user2,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin15 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/light-blue.jpeg",
        user=user2,
        board_tagged=[board],
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )




    formalwear_pins = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10, pin11, pin12, pin13, pin14, pin15 ]

    formal = [db.session.add(pin) for pin in formalwear_pins]

    db.session.commit()


def undo_formal_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.pin_categories RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards_pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))
        db.session.execute(text("DELETE FROM pin_categories"))
        db.session.execute(text("DELETE FROM boards_pins"))

    db.session.commit()
