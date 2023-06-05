from flask.cli import AppGroup
from datetime import datetime
from ...models import Pin, User, Category, Board, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_dark_pins():
    user = User.query.get(4)
    dark = Category.query.filter(Category.name == "Dark").one()
    board = Board.query.get(7)

    pin1 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/1d376ba447fbc72ec935f8b0016a2246.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin2 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/2b10a0a3a46efb9bee324cc5866f2db0.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin3 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/1f6251d4e9ab99d8bd84a4548a6f902e.jpg",
        user=user,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )


    pin4 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/9c1fa4a68ee4b27099da9aaccbca82eb.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )


    pin5 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/13d10c0696436a5e9e74c8178abed2c7.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
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

    pin8 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/912fc79bd6c2e7378d948ff367a12ef3.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin9 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/76d851c566e91d427f08b88393e3d643.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin10 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/51a4690766a0936a16470181d163973c.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
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

    pin23 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/dab4f0eef76dfa36181d16ce68ccd8e7.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin24 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/dcf089171d27aa66d9977e6371023e52.jpg",
        user=user,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin25 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/ded1be311b7f75b24f570bf7c646ff18.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin26 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/ca6eb06c64bfb39e9090198294c44a16.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin27 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/cb4b240cebd1f5ec4c44cfa0d194109e.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin28 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/a30d5641ff84aee5a8af247d80f671bd.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin29 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/a780fa7bcd04c2121cc2091ae8adeba6.jpg",
        user=user,
        categories=[dark],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin30 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/c24aa035e26933dc00d9caadca2b36fa.jpg",
        user=user,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin31 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/1683302555837802.jpg",
        user=user,
        categories=[dark],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    dark_pins = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10, pin11, pin12, pin13, pin14, pin15, pin16, pin17, pin18, pin19, pin21, pin22, pin23, pin24, pin25, pin26, pin27, pin28, pin29, pin30, pin31]

    dark_pins_list = [db.session.add(pin) for pin in dark_pins]

    db.session.commit()

def undo_dark_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))
        db.session.execute(text("DELETE FROM pin_categories"))
        db.session.execute(text("DELETE FROM boards_pins"))

    db.session.commit()
