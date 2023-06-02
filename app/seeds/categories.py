from flask.cli import AppGroup
from datetime import datetime
from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_categories():
    category1 = Category(name="Modern")
    db.session.add(category1)
    category2 = Category(name="Cute")
    db.session.add(category2)
    category3 = Category(name="Dark")
    db.session.add(category3)
    category4 = Category(name="Vintage")
    db.session.add(category4)
    category5 = Category(name="Classic")
    db.session.add(category5)
    db.session.commit()

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
