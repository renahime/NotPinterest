from flask.cli import AppGroup
from datetime import datetime
from app.models import db, Board, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_boards():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)

    board1 = Board(
        name="Summer Men Outfits",
        private=False,
        cover_image="https://i.pinimg.com/474x/b9/84/37/b98437e194afa74c6c2c0580791b69c0.jpg",
        description="My favorite outfits for summer",
        user=user1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(board1)

    board2 = Board(
        name="Tailored Men Suits",
        private=True,
        cover_image="https://i.pinimg.com/564x/cd/2f/f6/cd2ff6dcd00008c329ef96e4319659fd.jpg",
        description="Tailored outfits",
        user=user1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(board2)

    board3 = Board(
        name="Summer outfits",
        private=False,
        cover_image="https://i.pinimg.com/564x/bd/09/e4/bd09e4335d79bac8e3221d4d69b59d1b.jpg",
        description="Summer outfits for woman",
        user=user2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(board3)

    board4 = Board(
        name="Winter Outfits",
        private=True,
        cover_image="https://i.pinimg.com/564x/16/bf/ea/16bfeab14651fe5c500d5476bff720d5.jpg",
        description="Winter outfits to snuggle in",
        user=user2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(board4)

    board5 = Board(
        name="Streetwear",
        private=False,
        cover_image="https://i.pinimg.com/564x/17/8e/5e/178e5eb9ee4d28e7219a1e43e14b603a.jpg",
        description="Collection of some of the hottest streetwear",
        user=user1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(board5)

    board6 = Board(
        name="Casual Outfits",
        private=True,
        cover_image="https://i.pinimg.com/564x/7d/b4/87/7db4878a5818dc4f07ae8af7a832e15c.jpg",
        description="Causal outfits for normal wear",
        user=user3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(board6)

    db.session.commit()

def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
