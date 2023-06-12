from flask.cli import AppGroup
from datetime import datetime
from ...models import Pin, User, Category, Board, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_athleisure_pins():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    athleisure = Category.query.filter(Category.name == "Athleisure").one()
    board1 = Board.query.get(1)
    board3 = Board.query.get(3)
    board6 = Board.query.get(6)


    pin1 = Pin(
        title="ASRV Sportswear Gym Outfit",
        image="https://threadterest.s3.us-east-2.amazonaws.com/ASRV+Sportswear+Gym+Outfit.jpeg",
        user=user1,
        board_tagged=[board1],
        categories=[athleisure],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin2 = Pin(
        title="Bodybuilding & Fitness Men's Cotton Printed Tank Top",
        image="https://threadterest.s3.us-east-2.amazonaws.com/Bodybuilding+_+Fitness+Men_s+Cotton+Printed+Tank+Top.jpeg",
        destination="https://vivinch.com/bodybuilding-fitness-mens-cotton-printed-tank-top?attribute_pa_cb5feb1b7314637725a2e7=white-red-letter&attribute_pa_6f6cb72d544962fa333e2e=xl",
        user=user1,
        board_tagged=[board3],
        categories=[athleisure],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin3 = Pin(
        image="https://threadterest.s3.us-east-2.amazonaws.com/bradley.jpeg",
        user=user2,
        categories=[athleisure],
        board_tagged=[board6],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin4 = Pin(
        title="Curved Hem Patchwork Stringer",
        image="https://threadterest.s3.us-east-2.amazonaws.com/Curved+Hem+Patchwork+Stringer.jpeg",
        user=user2,
        board_tagged=[board1, board3],
        categories=[athleisure],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin5 = Pin(
        title="Gym Workout Sleeveless Tank Top",
        image="https://threadterest.s3.us-east-2.amazonaws.com/Gym+Workout+Sleeveless+Tank+Top.jpeg",
        description="Sleeveless tank top. Made out of cotton.",
        user=user3,
        categories=[athleisure],
        board_tagged=[board1, board3],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin6 = Pin(
        title="Men's Casual Light Green Sports Suit",
        image="https://threadterest.s3.us-east-2.amazonaws.com/Men_s+Casual+Light+Green+Sports+Suit.jpeg",
        description="Sport suit ready to be worn in the gym.",
        user=user3,
        categories=[athleisure],
        board_tagged=[board1, board3],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin7 = Pin(
        title="Men's Training Gear",
        image="https://threadterest.s3.us-east-2.amazonaws.com/Men_s+Training+Gear.jpeg",
        description="Great gear to train in. Check out the site!",
        user=user3,
        categories=[athleisure],
        board_tagged=[board1, board3],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin8 = Pin(
        title="Men's White T-Shirt",
        image="https://threadterest.s3.us-east-2.amazonaws.com/Men_s+White+T-Shirt.jpeg",
        user=user3,
        categories=[athleisure],
        board_tagged=[board1, board3],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin9 = Pin(
        title="Muscular Men's Gym & Fitness Tank Top",
        image="https://threadterest.s3.us-east-2.amazonaws.com/Muscular+Men_s+Gym+_+Fitness+Tank+Top.jpeg",
        user=user3,
        categories=[athleisure],
        board_tagged=[board1, board3],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin10 = Pin(
        title="New Men's Casual Solid Color Short Sleeve",
        image="https://threadterest.s3.us-east-2.amazonaws.com/New+Men_s+Casual+Solid+Color+Short+Sleeve.jpeg",
        user=user2,
        categories=[athleisure],
        board_tagged=[board1, board3],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin11 = Pin(
        title="No Pain No Gain Mens Hooded Tank Top",
        image="https://threadterest.s3.us-east-2.amazonaws.com/No+Pain+No+Gain+Mens+Hooded+Tank+Top.jpeg",
        description="Material: cotton, Fabric: Broadcloth, Collar: O-Neck",
        destination="https://vivinch.com/no-pain-no-gain-mens-hooded-gym-fitness-tank-top",
        user=user2,
        categories=[athleisure],
        board_tagged=[board6, board3],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin12 = Pin(
        title="Oakland Fleece Sweatpants",
        image="https://threadterest.s3.us-east-2.amazonaws.com/Oakland+Fleece+Sweatpants+.webp",
        description="Your global online store that delivers latest fashion apparel for you! We have dresses, tops, blouses and shoes for girls and ladies. Thousands of products in different styles are waiting for you!",
        user=user2,
        categories=[athleisure],
        board_tagged=[board6, board3],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin13 = Pin(
        title="Swoltastic Gym Rashguard Shirt",
        image="https://threadterest.s3.us-east-2.amazonaws.com/Swoltastic+Gym+Rashguard+Shirt.jpeg",
        description="Awesome spandex shirt. Great for your evening workout.",
        user=user2,
        categories=[athleisure],
        board_tagged=[board6, board3],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin14 = Pin(
        title="Back Poses | Motivate",
        image="https://threadterest.s3.us-east-2.amazonaws.com/Back+Poses+_+Motivate.jpeg",
        description="Killer back workout!",
        user=user2,
        categories=[athleisure],
        board_tagged=[board6, board3],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    pin15 = Pin(
        title="Gym | Focus | Motivation",
        image="https://threadterest.s3.us-east-2.amazonaws.com/Gym+_+Focus+_+Motivation.jpeg",
        description="Hope you all have a good day! Get motivated!",
        user=user2,
        categories=[athleisure],
        board_tagged=[board6, board3],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )



    athleisure_pin_instances = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10, pin11, pin12, pin13, pin14, pin15]

    athleisure_pins = [db.session.add(pin) for pin in athleisure_pin_instances]

    db.session.commit()



def undo_athleisure_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.pin_categories RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards_pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))
        db.session.execute(text("DELETE FROM pin_categories"))
        db.session.execute(text("DELETE FROM boards_pins"))

    db.session.commit()
