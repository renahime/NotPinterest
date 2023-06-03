from flask.cli import AppGroup
from datetime import datetime
from app.models import db, Pin, environment, SCHEMA, User
from sqlalchemy.sql import text


def seed_pins():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)

    pin1 = Pin(
        title="Summer Outfit 1",
        image="https://threadterest.s3.us-east-2.amazonaws.com/00156328256bcb053cf414d8b8d7add6.jpg",
        user=user1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin1)

    pin2 = Pin(
        title="Tailored Suit",
        image="https://threadterest.s3.us-east-2.amazonaws.com/103ea6196ee9d291926c9826e82106f7.jpg",
        user=user1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin2)

    pin3 = Pin(
        title="Summer Outfit 2",
        image="https://threadterest.s3.us-east-2.amazonaws.com/11069f93e90725955d8f468f885e4367.jpg",
        description="The classis shorts and a sweatshirt combo is the best for a night outside in the summer.",
        user=user2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin3)

    pin4 = Pin(
        title="Cozy Winter Outfit",
        image="https://example.com/pin4.jpg",
        description="Stay warm and stylish with this winter outfit",
        user=user2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin4)

    pin5 = Pin(
        title="Winter Streetwear Vibes",
        image="https://threadterest.s3.us-east-2.amazonaws.com/1577429f3830da4bcdae21121b7ec6f9.jpg",
        description="I love this vest!!",
        user=user3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin5)

    pin6 = Pin(
        title="Stylish Sneaks",
        image="https://threadterest.s3.us-east-2.amazonaws.com/23e15e3f0c85c417812bd32a25a47c09.jpg",
        description="Sneakers are a must for the streetwear vibes",
        user=user3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin6)

    db.session.commit()


def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
