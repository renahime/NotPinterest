from datetime import datetime
from app.models import Pin, User, Category, Board


user1 = User.query.get(1)
user2 = User.query.get(2)
user3 = User.query.get(3)
formalwear = Category.query.filter(Category.name == "Formal Ware").one()
board = Board.query.get(2)

pin1 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/tan-suit.jpeg",
    user=user1,
    boards_tagged=[board],
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin2 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/white-blazer.jpeg",
    user=user1,
    boards_tagged=[board],
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin3 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/tan-shirt.jpeg",
    user=user2,
    boards_tagged=[board],
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin4 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/tan-suede.jpeg",
    boards_tagged=[board],
    user=user2,
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin5 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/Tailored+Suit.jpeg",
    user=user3,
    boards_tagged=[board],
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin6 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/sleevless-white.jpeg",
    user=user3,
    boards_tagged=[board],
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin7 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/Red-suit.jpeg",
    user=user3,
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin8 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/pink-suit.jpeg",
    user=user3,
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin9 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/One+Fit+Suit.jpeg",
    user=user3,
    boards_tagged=[board],
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin10 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/men-tailored.jpeg",
    user=user2,
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin11 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/men-tailored.jpeg",
    user=user2,
    boards_tagged=[board],
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin12 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/light-blue-blazer.jpeg",
    user=user2,
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin13 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/light-blue-suit.jpeg",
    user=user2,
    boards_tagged=[board],
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin14 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/green-suit.jpeg",
    user=user2,
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin15 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/light-blue.jpeg",
    user=user2,
    boards_tagged=[board],
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin16 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/Brown-suit.jpeg",
    user=user2,
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin17 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/classy-green.jpeg",
    user=user2,
    boards_tagged=[board],
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin18 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/green-blazer.jpeg",
    user=user1,
    boards_tagged=[board],
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin19 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/Blue+Suit.jpeg",
    boards_tagged=[board],
    user=user1,
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin21 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/blazer.jpeg",
    user=user1,
    boards_tagged=[board],
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin22 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/brownish-suit.jpeg",
    user=user1,
    boards_tagged=[board],
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin23 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/black-suit-tailored.jpeg",
    user=user3,
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin24 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/black-suit.jpeg",
    user=user3,
    boards_tagged=[board],
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin25 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/Black+Suit.jpeg",
    user=user3,
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)

pin26 = Pin(
    image="https://threadterest.s3.us-east-2.amazonaws.com/black+tie.jpeg",
    boards_tagged=[board],
    user=user3,
    categories=[formalwear],
    created_at=datetime.now(),
    updated_at=datetime.now()
)


formalwear_pins = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10, pin11, pin12, pin13, pin14, pin15, pin16, pin17, pin18, pin19, pin20, pin21, pin22, pin23, pin24, pin25, pin26]