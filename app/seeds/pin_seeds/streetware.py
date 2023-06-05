
from datetime import datetime
from app.models import Pin, User, Category, Board



user1 = User.query.get(1)
user2 = User.query.get(2)
user3 = User.query.get(3)
streetwear = Category.query.filter(Category.name == "Streetware").one()
board1 = Board.query.get(1)
board3 = Board.query.get(3)
board4 = Board.query.get(4)
board5 = Board.query.get(5)


pin1 = Pin(
    title="Summer Outfit",
    image="https://threadterest.s3.us-east-2.amazonaws.com/00156328256bcb053cf414d8b8d7add6.jpg",
    user=user1,
    board_tagged=[board1, board3, board4, board5],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin2 = Pin(
    title="Men's Streetware Fall Outfit",
    image="https://threadterest.s3.us-east-2.amazonaws.com/103ea6196ee9d291926c9826e82106f7.jpg",
    user=user1,
    board_tagged=[board1, board3, board4, board5],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin3 = Pin(
    title="Summer Outfit 2",
    image="https://threadterest.s3.us-east-2.amazonaws.com/11069f93e90725955d8f468f885e4367.jpg",
    description="The classis shorts and a sweatshirt combo is the best for a night outside in the summer.",
    user=user2,
    board_tagged=[board1, board3, board4, board5],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin4 = Pin(
    title="Winter Streetwear Vibes",
    image="https://threadterest.s3.us-east-2.amazonaws.com/1577429f3830da4bcdae21121b7ec6f9.jpg",
    description="I love this vest!!",
    user=user2,
    board_tagged=[board1, board3, board4, board5],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin5 = Pin(
    title="Stylish Sneaks",
    image="https://threadterest.s3.us-east-2.amazonaws.com/23e15e3f0c85c417812bd32a25a47c09.jpg",
    description="Sneakers are a must for the streetwear vibes",
    user=user3,
    board_tagged=[board1, board3, board4],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin6 = Pin(
    title="Orange, Black, and Green Fit",
    image="https://threadterest.s3.us-east-2.amazonaws.com/25e04167987fe3c081c11d124ac2baed.jpg",
    description="Name a better color combo than orange, black, and green.",
    user=user3,
    categories=[streetwear],
    board_tagged=[board1, board3, board4, board5],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin7 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/29f2d475ce8d77378c2578f6f48e4e83.jpg",
    user=user3,
    categories=[streetwear],
    board_tagged=[board1, board3, board4, board5],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin8 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/3f93de5972d2eca99713b2529a0f0d4c.jpg",
    user=user3,
    board_tagged=[board1, board3, board4, board5],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin9 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/55e68f7a3063e53a25b5ebcbaf595845.jpg",
    user=user3,
    board_tagged=[board1, board3, board4, board5],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin10 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/5628c814344875a80fcce2272d4621ff.jpg",
    user=user2,
    board_tagged=[board1, board3, board4],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin11 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/5e4bcefcd6a66841e8af111b956416e0.jpg",
    user=user2,
    board_tagged=[board1, board3, board4],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin12 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/616d152877f92a4f970db71e59d17e8d.jpg",
    user=user2,
    board_tagged=[board1, board3, board4],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin13 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/69d784bab787d1a9bc1206b742b580af.jpg",
    user=user2,
    board_tagged=[board1, board3, board4],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin14 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/78e4f59601005f29ff130e11b0f2e3f0.jpg",
    user=user2,
    board_tagged=[board1, board3, board4],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin15 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/8ff8e6aba0898bc89325472acd052c50.jpg",
    user=user2,
    board_tagged=[board1, board3, board4],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin16 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/9ff063975bc2d670f503bbcda4be7347.jpg",
    user=user2,
    board_tagged=[board1, board3, board4],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin17 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/c58c1d32a76f9f3ceb28211ce93d7ac6.jpg",
    user=user2,
    board_tagged=[board1, board3],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin18 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/ccd0714179361b906c0d3ec1a344e8af.jpg",
    user=user1,
    board_tagged=[board1, board3],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin19 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/d3d5c1d00e09d04b4b05bbae41bf0037.jpg",
    user=user1,
    board_tagged=[board1, board3],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin20 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/ed02268d007c54b17bedf7737560eebb.jpg",
    user=user1,
    board_tagged=[board1, board3],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin21 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/f0561fd7d63c1ad450580628515b108b.jpg",
    user=user1,
    board_tagged=[board1],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin22 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/images.jpg",
    user=user1,
    board_tagged=[board3],
    categories=[streetwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin23 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/rhea-bue-outfit-1-1607039441.jpg",
    user=user3,
    categories=[streetwear],
    board_tagged=[board4],
    created_at=datetime.now(),
    updated_at=datetime.now()
)


streetware_pins = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10, pin11, pin12, pin13, pin14, pin15, pin16, pin17, pin18, pin19, pin20, pin21, pin22, pin23]