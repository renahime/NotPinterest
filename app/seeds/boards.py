from flask.cli import AppGroup
from datetime import datetime
from app.models import db, Board, User, environment, SCHEMA, Category
from sqlalchemy.sql import text

def seed_boards():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    user4 = User.query.get(4)

    category1 = Category.query.filter_by(name='Dark').first()
    category2 = Category.query.filter_by(name='Old Money').first()
    category3 = Category.query.filter_by(name='Streetware').first()
    category4 = Category.query.filter_by(name='Boho').first()
    category5 = Category.query.filter_by(name='Formal Ware').first()
    category6 = Category.query.filter_by(name='Athleisure').first()


    board1 = Board(
        name="Summer Men Outfits",
        private=False,
        owner_id=user1.id,
        description="My favorite outfits for summer",
        user=user1,
        categories=[category3, category6],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(board1)

    board2 = Board(
        name="Tailored Men Suits",
        private=True,
        owner_id=user1.id,
        description="Tailored outfits",
        user=user1,
        categories=[category5],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(board2)

    board3 = Board(
        name="Summer outfits",
        private=False,
        owner_id=user2.id,
        description="Summer outfits for woman",
        user=user2,
        categories=[category3, category4, category6],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(board3)

    board4 = Board(
        name="Winter Outfits",
        private=True,
        owner_id=user2.id,
        description="Winter outfits to snuggle in",
        user=user2,
        categories=[category2, category3],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(board4)

    board5 = Board(
        name="Streetwear",
        owner_id=user3.id,
        private=False,
        description="Collection of some of the hottest streetwear",
        user=user3,
        categories=[category3],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(board5)

    board6 = Board(
        name="Casual Outfits",
        owner_id=user3.id,
        private=True,
        description="Causal outfits for normal wear",
        user=user3,
        categories=[category6],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.session.add(board6)

    board7 = Board(
        name="Dark Aesthetic",
        private=False,
        description="kawaii of darkest looks",
        owner_id=user4.id,
        user=user4,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        categories=[category1]
    )

    db.session.add(board7)

    board8 = Board(
        name="Old Money Vibes",
        private=False,
        description="chicest of looks for your biggest buck",
        user=user4,
        owner_id=user4.id,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        categories=[category2]
    )
    db.session.add(board8)

    db.session.commit()

def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.board_categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))
        db.session.execute(text("DELETE FROM board_categories"))

    db.session.commit()
