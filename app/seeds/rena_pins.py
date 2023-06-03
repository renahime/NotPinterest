from flask.cli import AppGroup
from datetime import datetime
from app.models import db, User, Category, Pin, Board, environment, SCHEMA
from sqlalchemy.sql import text

def seed_rena_pins():
    user = User.query.get(4)
    board1 = Board.query.filter_by(name="Dark Aesthetic").first()
    board2 = Board.query.filter_by(name="Old Money Vibes").first()
    category1 = Category.query.filter_by(name='Dark').first()
    category2 = Category.query.filter_by(name='Old Money').first()
    pin1 = Pin(
        image="https://i.pinimg.com/564x/82/93/37/829337883fa641474b02e4a5034e6b7e.jpg",
        owner=user,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        board_tagged=board1,
        categories=category1
    )
    db.session.add(pin1)

    pin2 = Pin(
        image="https://i.pinimg.com/564x/40/13/b0/4013b030d96267b3c04c7408c40bb1f2.jpg",
        owner=user,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        board_tagged=board1,
        categories=category1
    )
    db.session.add(pin2)

    pin3 = Pin(
        image="https://i.pinimg.com/564x/73/a7/80/73a78076b2ea9db8916451f2eaeab268.jpg",
        owner=user,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        board_tagged=board1,
        categories=category1
    )
    db.session.add(pin3)

    pin4 = Pin(
        image="https://example.com/pin1.jpg",
        owner=user,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        board_tagged=board1,
        categories=category1
    )
    db.session.add(pin4)

    pin5 = Pin(
        image="https://i.pinimg.com/564x/86/a3/d8/86a3d8a694f488d4482f9526f4e41bb6.jpg",
        owner=user,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        board_tagged=board1,
        categories=category1
    )
    db.session.add(pin5)

    pin6 = Pin(
        image="https://i.pinimg.com/564x/82/82/57/82825729d9ef43f52a4170dd82cb0831.jpg",
        owner=user,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        board_tagged=board2,
        categories=category2
    )
    db.session.add(pin6)

    pin7 = Pin(
        image="https://i.pinimg.com/564x/ea/ac/db/eaacdb0d593bb86fcdc853ba954e4e60.jpg",
        owner=user,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        board_tagged=board2,
        categories=category2
    )
    db.session.add(pin7)

    pin8 = Pin(
        image="https://i.pinimg.com/564x/42/c9/34/42c9349c4e989c94026b6fb0e6995785.jpg",
        owner=user,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        board_tagged=board2,
        categories=category2
    )
    db.session.add(pin8)

    pin9 = Pin(
        image="https://i.pinimg.com/564x/78/02/8f/78028f107768d89bfcb832723835a05d.jpg",
        owner=user,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        board_tagged=board2,
        categories=category2
    )
    db.session.add(pin9)

    pin10 = Pin(
        image="https://i.pinimg.com/564x/51/a4/69/51a4690766a0936a16470181d163973c.jpg",
        owner=user,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        board_tagged=board2,
        categories=category2
    )
    db.session.add(pin10)



    db.session.commit()


def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
