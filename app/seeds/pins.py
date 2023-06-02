from flask.cli import AppGroup
from datetime import datetime
from app.models import db, Pin, environment, SCHEMA
from sqlalchemy.sql import text

def seed_pins():
    pin1 = Pin(
        title="Summer Outfit 1",
        image="https://example.com/pin1.jpg",
        description="This is a stylish summer outfit for men",
        owner_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin1)

    pin2 = Pin(
        title="Tailored Suit",
        image="https://example.com/pin2.jpg",
        description="A classic and sophisticated tailored suit",
        owner_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin2)

    pin3 = Pin(
        title="Summer Outfit 2",
        image="https://example.com/pin3.jpg",
        description="A trendy summer outfit for women",
        owner_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin3)

    pin4 = Pin(
        title="Cozy Winter Outfit",
        image="https://example.com/pin4.jpg",
        description="Stay warm and stylish with this winter outfit",
        owner_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin4)

    pin5 = Pin(
        title="Pin 5",
        image="https://example.com/pin5.jpg",
        description="This is the description for Pin 5",
        owner_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin5)

    pin6 = Pin(
        title="Casual Outfit",
        image="https://example.com/pin6.jpg",
        description="A comfortable and stylish casual outfit",
        owner_id=3,
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
