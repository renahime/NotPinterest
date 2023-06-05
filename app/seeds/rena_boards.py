from flask.cli import AppGroup
from datetime import datetime
from app.models import db, Board, User, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_rena_boards():
    user = User.query.get(4)

    board1 = Board(
        name="Dark Aesthetic",
        private=False,
        cover_image="https://www.lolitahistory.com/wp-content/uploads/2016/05/historybanner.jpg",
        description="kawaii of darkest looks",
        user=user,
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    board1.categories.append(Category.query.get(3))
    db.session.add(board1)

    board2 = Board(
        name="Old Money Vibes",
        private=False,
        cover_image="https://www.joyfullyso.com/wp-content/uploads/2019/09/lilly-pulitzer-banner-710x242.jpg",
        description="chicest of looks for your biggest buck",
        user=user,
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    board2.categories.append(Category.query.get(5))
    db.session.add(board2)

    db.session.commit()

def undo_rena_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))
        db.session.execute(text('DELETE FROM board_categories'))

    db.session.commit()
