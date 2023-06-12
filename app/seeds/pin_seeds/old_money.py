from flask.cli import AppGroup
from datetime import datetime
from ...models import Pin, User, Category, Board, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_old_money_pins():
    user = User.query.get(4)
    old_money = Category.query.filter(Category.name == "Old Money").one()
    board4 = Board.query.get(4)
    board8 = Board.query.get(8)

    pin1 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/01f798d673675dbb5cf8311c6527fc96.jpg",
        user=user,
        board_tagged=[board4],
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin2 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/6f5f44745df926e0f2611047dd444ccb.jpg",
        user=user,
        board_tagged=[board8],
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin3 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/5cd43fa5af8c971cd2bfef9d6a7ee95a.jpg",
        user=user,
        board_tagged=[board4],
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin4 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/8eb701eb969d2dcb7c44c6d6cadaaeb7.jpg",
        user=user,
        board_tagged=[board4],
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin5 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/07b221233f3da81af9cbf224d5861c41.jpg",
        user=user,
        categories=[old_money],
        board_tagged=[board4],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin6 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/036f54bf7c96d0361c628a584dedc3b2.jpg",
        user=user,
        board_tagged=[board4],
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin7 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/86a3d8a694f488d4482f9526f4e41bb6.jpg",
        user=user,
        board_tagged=[board4],
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin8 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/68d7574ff3a1ab9fa225b5c6d7f180b6.jpg",
        user=user,
        board_tagged=[board4],
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin9 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/93c77342a898b69cfd7bdcdd1731692f.jpg",
        user=user,
        board_tagged=[board8],
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin10 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/427ccd36b4c992272c9f9fc740f36276.jpg",
        user=user,
        board_tagged=[board8],
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin11 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/572a6982f79b65c482d8ba6385ad2985.jpg",
        user=user,
        board_tagged=[board8],
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin12 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/467ebb23ed51320acb455eb314216a0a.jpg",
        user=user,
        board_tagged=[board8],
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin13 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/461fdd53aeaed1e2410cf51ed593eaf0.jpg",
        user=user,
        board_tagged=[board8],
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin14 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/4013b030d96267b3c04c7408c40bb1f2.jpg",
        user=user,
        board_tagged=[board8],
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin15 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/3838acd56f8f4efd80405cb4ef531d2f.jpg",
        user=user,
        board_tagged=[board8],
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin16 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/a5e98fa415c368900f9c740f0bc4a860.jpg",
        user=user,
        board_tagged=[board8],
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )


    old_money_pin_instances = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10, pin11, pin12, pin13, pin14, pin15, pin16 ]

    old_money_pins = [db.session.add(pin) for pin in old_money_pin_instances]

    db.session.commit()

def undo_old_money_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.pin_categories RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards_pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))
        db.session.execute(text("DELETE FROM pin_categories"))
        db.session.execute(text("DELETE FROM boards_pins"))

    db.session.commit()
