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
        image_url="https://example.com/pin1.jpg",
        description="This is a stylish summer outfit for men",
        user=user1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin1)

    pin2 = Pin(
        title="Tailored Suit",
        image_url="https://example.com/pin2.jpg",
        description="A classic and sophisticated tailored suit",
        user=user1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin2)

    pin3 = Pin(
        title="Summer Outfit 2",
        image_url="https://example.com/pin3.jpg",
        description="A trendy summer outfit for women",
        user=user2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin3)

    pin4 = Pin(
        title="Cozy Winter Outfit",
        image_url="https://example.com/pin4.jpg",
        description="Stay warm and stylish with this winter outfit",
        user=user2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin4)

    pin5 = Pin(
        title="Pin 5",
        image_url="https://example.com/pin5.jpg",
        description="This is the description for Pin 5",
        user=user3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin5)

    pin6 = Pin(
        title="Casual Outfit",
        image_url="https://example.com/pin6.jpg",
        description="A comfortable and stylish casual outfit",
        board=board6,
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
