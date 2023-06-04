from flask.cli import AppGroup
from datetime import datetime
from app.models import db, Pin, environment, SCHEMA, User, Category
from sqlalchemy.sql import text


def seed_pins():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    formalwear = Category.query.filter(Category.name == "Formal Ware").one()

    pin1 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/tan-suit.jpeg",
        user=user1,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin1)

    pin2 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/white-blazer.jpeg",
        user=user1,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin2)

    pin3 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/tan-shirt.jpeg",
        user=user2,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin3)

    pin4 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/tan-suede.jpeg",
        user=user2,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin4)

    pin5 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/Tailored+Suit.jpeg",
        user=user3,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin5)

    pin6 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/sleevless-white.jpeg",
        user=user3,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin6)

    pin7 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/Red-suit.jpeg",
        user=user3,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin7)

    pin8 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/pink-suit.jpeg",
        user=user3,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin8)


    pin9 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/One+Fit+Suit.jpeg",
        user=user3,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin9)

    pin10 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/men-tailored.jpeg",
        user=user2,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin10)

    pin11 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/men-tailored.jpeg",
        user=user2,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin11)

    pin12 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/light-blue-blazer.jpeg",
        user=user2,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin12)

    pin13 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/light-blue-suit.jpeg",
        user=user2,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin13)

    pin14 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/green-suit.jpeg",
        user=user2,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin14)

    pin15 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/light-blue.jpeg",
        user=user2,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin15)

    pin16 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/Brown-suit.jpeg",
        user=user2,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin16)

    pin17 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/classy-green.jpeg",
        user=user2,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin17)

    pin18 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/green-blazer.jpeg",
        user=user1,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin18)

    pin19 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/Blue+Suit.jpeg",
        user=user1,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin19)

    pin21 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/blazer.jpeg",
        user=user1,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin21)

    pin22 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/brownish-suit.jpeg",
        user=user1,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin22)

    pin23 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/black-suit-tailored.jpeg",
        user=user3,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin23)

    pin24 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/black-suit.jpeg",
        user=user3,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin24)

    pin25 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/Black+Suit.jpeg",
        user=user3,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin25)

    pin26 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/black+tie.jpeg",
        user=user3,
        categories=[formalwear],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin26)

    db.session.commit()


def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()