from flask.cli import AppGroup
from datetime import datetime
from ...models import Pin, User, Category, Board, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_boho_pins():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    board = Board.query.get(3)
    boho = Category.query.filter(Category.name == "Boho").one()

    pin1 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/5a8a5a22f7d11b935ce89a82eb23c319.jpg",
        user=user1,
        categories=[boho],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin2 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/05e5405da6b2bdc6a8e9fdd9f855d6d0.jpg",
        user=user1,
        categories=[boho],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin3 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/82ea717af4a789e2afe663401ebef770.jpg",
        user=user2,
        categories=[boho],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin4 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/46ca097eaa32c524c983495b7841af57.jpg",
        user=user2,
        categories=[boho],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin5 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/0676c385c83c48a6913dcc0055951df9.jpg",
        user=user3,
        categories=[boho],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin6 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/945725b9fe7d403c115a2e28fb79b460.jpg",
        user=user3,
        categories=[boho],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin7 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/11059bc1bc4f88a328213fe0aa189111.jpg",
        user=user3,
        categories=[boho],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin8 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/0304343e6ec6c5420de10ccd8432d71e.jpg",
        user=user3,
        categories=[boho],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin9 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/a79f86920e602ad655536880de889680.jpg",
        user=user3,
        categories=[boho],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin10 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/2178105ec74e7b0b6d4afff106453b79.jpg",
        user=user2,
        categories=[boho],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin11 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/bfba451391f982f7f4eaa2366acf51b7.jpg",
        user=user2,
        categories=[boho],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin12 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/b3b8c04f80201462a46baa11cf7e826c.jpg",
        user=user2,
        categories=[boho],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin13 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/ab8e1280361fb356f94de2244b48edfe.jpg",
        user=user2,
        categories=[boho],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin14 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/d2811aef5e9af5caea8b7b30c1ea9532.jpg",
        user=user2,
        categories=[boho],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin15 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/d26304efe4a27ad9d4adab337a1e7cc1.jpg",
        user=user2,
        categories=[boho],
        board_tagged=[board],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )


    boho_pins = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10, pin11, pin12, pin13, pin14, pin15]

    boho_pins_list = [db.session.add(pin) for pin in boho_pins]

    db.session.commit()

def undo_boho_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.pin_categories RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards_pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))
        db.session.execute(text("DELETE FROM pin_categories"))
        db.session.execute(text("DELETE FROM boards_pins"))

    db.session.commit()
