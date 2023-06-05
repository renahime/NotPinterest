from flask.cli import AppGroup
from datetime import datetime
from app.models import db, User, Category, Pin, Board, environment, SCHEMA
from sqlalchemy.sql import text

def seed_rena_pins():
    user = User.query.get(4)
    pin1 = Pin(
        image="https://i.pinimg.com/564x/82/93/37/829337883fa641474b02e4a5034e6b7e.jpg",
        user=user,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin1.board_tagged.append(Board.query.filter_by(name="Dark Aesthetic").first())
    pin1.categories.append(Category.query.get(3))
    db.session.add(pin1)

    pin2 = Pin(
        image="https://i.pinimg.com/564x/40/13/b0/4013b030d96267b3c04c7408c40bb1f2.jpg",
        user=user,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    pin2.board_tagged.append(Board.query.filter_by(name="Dark Aesthetic").first())
    pin2.categories.append(Category.query.get(3))
    db.session.add(pin2)

    pin3 = Pin(
        image="https://i.pinimg.com/564x/73/a7/80/73a78076b2ea9db8916451f2eaeab268.jpg",
        user=user,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    pin3.board_tagged.append(Board.query.filter_by(name="Dark Aesthetic").first())
    pin3.categories.append(Category.query.get(3))
    db.session.add(pin3)

    pin4 = Pin(
        image="https://example.com/pin1.jpg",
        user=user,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    pin4.board_tagged.append(Board.query.filter_by(name="Dark Aesthetic").first())
    pin4.categories.append(Category.query.get(3))
    db.session.add(pin4)

    pin5 = Pin(
        image="https://i.pinimg.com/564x/86/a3/d8/86a3d8a694f488d4482f9526f4e41bb6.jpg",
        user=user,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    pin5.board_tagged.append(Board.query.filter_by(name="Dark Aesthetic").first())
    pin5.categories.append(Category.query.get(3))
    db.session.add(pin5)

    pin6 = Pin(
        image="https://i.pinimg.com/564x/82/82/57/82825729d9ef43f52a4170dd82cb0831.jpg",
        user=user,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    pin6.board_tagged.append(Board.query.filter_by(name="Old Money Vibes").first())
    pin6.categories.append(Category.query.get(5))
    db.session.add(pin6)

    pin7 = Pin(
        image="https://i.pinimg.com/564x/ea/ac/db/eaacdb0d593bb86fcdc853ba954e4e60.jpg",
        user=user,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    pin7.board_tagged.append(Board.query.filter_by(name="Old Money Vibes").first())
    pin7.categories.append(Category.query.get(5))
    db.session.add(pin7)

    pin8 = Pin(
        image="https://i.pinimg.com/564x/42/c9/34/42c9349c4e989c94026b6fb0e6995785.jpg",
        user=user,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    pin8.board_tagged.append(Board.query.filter_by(name="Old Money Vibes").first())
    pin8.categories.append(Category.query.get(5))
    db.session.add(pin8)

    pin9 = Pin(
        image="https://i.pinimg.com/564x/78/02/8f/78028f107768d89bfcb832723835a05d.jpg",
        user=user,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    pin9.board_tagged.append(Board.query.filter_by(name="Old Money Vibes").first())
    pin9.categories.append(Category.query.get(5))
    db.session.add(pin9)

    pin10 = Pin(
        image="https://i.pinimg.com/564x/51/a4/69/51a4690766a0936a16470181d163973c.jpg",
        user=user,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    pin10.board_tagged.append(Board.query.filter_by(name="Old Money Vibes").first())
    pin10.categories.append(Category.query.get(5))
    db.session.add(pin10)



    db.session.commit()


def undo_rena_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))
        db.session.execute(text('DELETE FROM pin_categories'))
        db.session.execute(text('DELETE FROM boards_pins'))

    db.session.commit()
