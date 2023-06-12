from flask.cli import AppGroup
from datetime import datetime
from ...models import Pin, User, Category, Board, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_dark_pins():
    user = User.query.get(4)
    dark = Category.query.filter(Category.name == "Dark").one()
    board = Board.query.get(7)


    pin3 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/1f6251d4e9ab99d8bd84a4548a6f902e.jpg",
        user=user,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin6 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/42c9349c4e989c94026b6fb0e6995785.jpg",
        user=user,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin7 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/23d0bfd5f83034e8e0caeee02e1fca28.jpg",
        user=user,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin11 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/949cd271574dda324fc480e21766f768.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin12 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/4685e75d0d31aa5e38db90e56475e072.jpg",
        user=user,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin13 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/1020a4db72d1050bd44223f3915a28bd.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin14 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/9727b21e747ddefe54d9f62cc54a0704.jpg",
        user=user,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin15 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/9158c1d56216c6f8c507dab984a19959.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin16 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/82825729d9ef43f52a4170dd82cb0831.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin17 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/1683221333539625.jpg",
        user=user,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin18 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/1683242786633862.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin19 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/1683242713411230.jpg",
        user=user,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin21 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/1683302616768897.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin22 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/f4119cb2414203b21697d2c5bb7ee98c.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )


    dark_pins = [pin3, pin6, pin7, pin11, pin12, pin13, pin14, pin15, pin16, pin17, pin18, pin19, pin21, pin22]

    dark_pins_list = [db.session.add(pin) for pin in dark_pins]

    db.session.commit()

def undo_dark_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.pin_categories RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards_pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))
        db.session.execute(text("DELETE FROM pin_categories"))
        db.session.execute(text("DELETE FROM boards_pins"))

    db.session.commit()
