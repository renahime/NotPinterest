from app.models import db, User, environment, SCHEMA
from datetime import datetime, timedelta
from sqlalchemy.sql import text

def seed_followers():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    user4 = User.query.get(4)
    
    user4.followers.append(user1)
    user4.followers.append(user2)
    user4.following.append(user3)
    user2.followers.append(user1)
    user1.followers.append(user2)

    db.session.commit()

def undo_followers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()
