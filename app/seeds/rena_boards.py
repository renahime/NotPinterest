from flask.cli import AppGroup
from datetime import datetime
from app.models import db, Board, User, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_rena_boards():
    user = User.query.get(4)
    category1 = Category.query.filter_by(name='Dark').first()
    category2 = Category.query.filter_by(name='Old Money').first()

    board1 = Board(
        name="Dark Aesthetic",
        private=False,
        cover_image="https://www.lolitahistory.com/wp-content/uploads/2016/05/historybanner.jpg",
        description="kawaii of darkest looks",
        user=user,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        categories=category1
    )
    db.session.add(board1)

    board2 = Board(
        name="Old Money Vibes",
        private=False,
        cover_image="https://www.joyfullyso.com/wp-content/uploads/2019/09/lilly-pulitzer-banner-710x242.jpg",
        description="chicest of looks for your biggest buck",
        user=user,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        categories=category2
    )
    db.session.add(board2)

    db.session.commit()

def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
