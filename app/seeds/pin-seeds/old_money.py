from flask.cli import AppGroup
from datetime import datetime
from app.models import db, Pin, environment, SCHEMA, User, Category
from sqlalchemy.sql import text


def seed_pins():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    old_money = Category.query.filter(Category.name == "Old Money").one()

    pin1 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/01f798d673675dbb5cf8311c6527fc96.jpg",
        user=user1,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin1)

    pin2 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/6f5f44745df926e0f2611047dd444ccb.jpg",
        user=user1,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin2)

    pin3 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/5cd43fa5af8c971cd2bfef9d6a7ee95a.jpg",
        user=user2,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin3)

    pin4 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/8eb701eb969d2dcb7c44c6d6cadaaeb7.jpg",
        user=user2,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin4)

    pin5 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/07b221233f3da81af9cbf224d5861c41.jpg",
        user=user3,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin5)

    pin6 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/036f54bf7c96d0361c628a584dedc3b2.jpg",
        user=user3,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin6)

    pin7 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/86a3d8a694f488d4482f9526f4e41bb6.jpg",
        user=user3,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin7)

    pin8 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/68d7574ff3a1ab9fa225b5c6d7f180b6.jpg",
        user=user3,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin8)


    pin9 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/93c77342a898b69cfd7bdcdd1731692f.jpg",
        user=user3,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin9)

    pin10 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/427ccd36b4c992272c9f9fc740f36276.jpg",
        user=user2,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin10)

    pin11 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/572a6982f79b65c482d8ba6385ad2985.jpg",
        user=user2,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin11)

    pin12 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/467ebb23ed51320acb455eb314216a0a.jpg",
        user=user2,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin12)

    pin13 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/461fdd53aeaed1e2410cf51ed593eaf0.jpg",
        user=user2,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin13)

    pin14 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/4013b030d96267b3c04c7408c40bb1f2.jpg",
        user=user2,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin14)

    pin15 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/3838acd56f8f4efd80405cb4ef531d2f.jpg",
        user=user2,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin15)

    pin16 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/a5e98fa415c368900f9c740f0bc4a860.jpg",
        user=user2,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin16)

    pin17 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/62152175e1740df24c89f5a4ca478de2.jpg",
        user=user2,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin17)

    pin18 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/5109b62dcc6a59fad6a97229ad45a0c4.jpg",
        user=user1,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin18)

    pin19 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/b57a07ed28ab9aef13b768873cb90704.jpg",
        user=user1,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin19)

    pin21 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/aa23ae9d9a2051aa9f25ea5a8672da86.jpg",
        user=user1,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin21)

    pin22 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/a4236e61b57dcdeae5a3b7cf05a5a9a8.jpg",
        user=user1,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin22)

    pin23 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/c22cd088781618f4065197d80220c75b.jpg",
        user=user3,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin23)

    pin24 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/bbb52d7a96398f2e35c4ee9045c35fdb.jpg",
        user=user3,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin24)

    pin25 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/daa973baa71c81283b1b9f0c0a801e9e.jpg",
        user=user3,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin25)

    pin26 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/d86171ec0e6dc1667144d4b8acdc9a32.jpg",
        user=user3,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin26)

    pin27 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/d5aa1477e0b4b02d95b9bdb0f843b6e0.jpg",
        user=user3,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin27)

    pin28 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/f39a0dabfd053941292fd65685d7c8c6.jpg",
        user=user3,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin28)

    pin29 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/f28eb0e1c985a1991cd2b54cb4f55b23.jpg",
        user=user3,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin29)

    pin30 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/f0a5b3e97cfb1af3bdb1e3a7b6d22d84.jpg",
        user=user3,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin30)

    pin31 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/ff4a3a5af14f6cd20330b47e10b85e42.jpg",
        user=user3,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin31)

    pin32 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/f86431e329d776c95c10080725bbe37a.jpg",
        user=user3,
        categories=[old_money],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(pin32)

    db.session.commit()


def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()