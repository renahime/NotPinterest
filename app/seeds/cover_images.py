from flask.cli import AppGroup
from datetime import datetime
from app.models import db, Board, User, environment, SCHEMA, Category, Pin
from sqlalchemy.sql import text

def seed_cover_images():
    board1 = Board.query.get(1)
    board2 = Board.query.get(2)
    board4 = Board.query.get(4)
    board5 = Board.query.get(5)
    board7 = Board.query.get(7)


    print(board1.cover_image)
    print(board1.pins_tagged[0])
    board1.cover_image = [board1.pins_tagged[0]]
    print(board1.cover_image)
    # board1.cover_image.append(board1.pins_tagged[0])
    # board2.cover_image.append(board2.pins_tagged[0])
    # board4.cover_image.append(board4.pins_tagged[0])
    # board5.cover_image.append(board5.pins_tagged[0])
    # board7.cover_image.append(board7.pins_tagged[0])

    db.session.commit()



def undo_cover_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.board_cover_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM board_cover_images"))

    db.session.commit()