from flask.cli import AppGroup
from datetime import datetime
from app.models import db, User, environment, SCHEMA, Category
from sqlalchemy.sql import text

def seed_user_categories():
    streetware = Category.query.get(1)
    formal_ware = Category.query.get(2)
    dark = Category.query.get(3)
    boho = Category.query.get(4)
    old_money = Category.query.get(5)
    athleisure = Category.query.get(6)

    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    user4 = User.query.get(4)

    user1.categories.append(streetware)
    user1.categories.append(formal_ware)
    user2.categories.append(streetware)
    user2.categories.append(athleisure)
    user2.categories.append(boho)
    user3.categories.append(streetware)
    user4.categories.append(dark)
    user4.categories.append(old_money)

    db.session.commit()



def undo_user_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_categories"))

    db.session.commit()