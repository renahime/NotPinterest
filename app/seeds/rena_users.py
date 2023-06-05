from app.models import db, User, environment, SCHEMA
from datetime import datetime, timedelta
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_rena_users():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    rena = User(
        username='rena',
        email='rena@rena.me',
        password='password',
        first_name="rena",
        last_name="rena",
        about="rena loves the old money/dark vibes and aesthetic uwu",
        pronouns="they/them",
        website="https://example.com/user4",
        profile_image="https://64.media.tumblr.com/006b763e76b5ffd599a53ebebbbd18ea/c76e5bf7e155e26c-17/s1280x1920/900fb5a0d28ea37e1e4b068a2243785d717ec79c.jpg",
        created_at=datetime.now(),
        updated_at=datetime.now()
        )
    rena.followers.append(user1)
    rena.followers.append(user2)
    rena.following.append(user3)

    db.session.add(rena)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_rena_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
