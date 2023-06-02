from app.models import db, User, environment, SCHEMA
from datetime import datetime, timedelta
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        first_name="John",
        last_name="Doe",
        created_at=datetime.now(),
        updated_at=datetime.now()
        )
    jane = User(
        username='jane',
        email='jane@aa.io',
        password='password',
        first_name="Jane",
        last_name="Smith",
        created_at=datetime.now(),
        updated_at=datetime.now()
        )
    mike = User(
        username='mike',
        email='mike@aa.io',
        password='password',
        first_name="Mike",
        last_name="Johnson",
        about="I'm user 3",
        pronouns="they/them",
        website="https://example.com/user3",
        profile_image="https://example.com/user3.jpg",
        created_at=datetime.now(),
        updated_at=datetime.now()
        )

    db.session.add(demo)
    db.session.add(jane)
    db.session.add(mike)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
