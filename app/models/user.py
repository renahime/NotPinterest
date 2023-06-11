from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .boards_pins_categories import user_categories


#Make Table
follows = db.Table(
    "follows",
    db.Column(
        "follower",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True
    ),
    db.Column(
        "following",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True
    )
)

if environment == "production":
    follows.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    about = db.Column(db.String(255))
    pronouns = db.Column(db.String(255))
    website = db.Column(db.String(255))
    profile_image = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    # Relationships
    boards = db.relationship('Board', back_populates='user', cascade="delete-orphan,all")  #added cascade delete
    pins = db.relationship('Pin', back_populates='user', cascade="delete-orphan,all")  #added cascade delete
    followers = db.relationship(
        "User",
        secondary="follows",
        primaryjoin=follows.c.following == id,
        secondaryjoin=follows.c.follower == id,
        backref='following',
        lazy='dynamic'
    )
    categories = db.relationship('Category', secondary=user_categories, back_populates='users', passive_deletes=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def follow(self, user):
            self.following.append(user)

    def unfollow(self, user):
            self.following.remove(user)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def boards_pinned_to_dict(self):
        returnList = []
        for board in self.boards:
            returnList.append({"id":board.id,"name": board.name, "additional_images":board.findOtherImages(), "cover_image":  [image.image for image in board.pin_cover_image], "pin_count":len([pin.id for pin in board.pins_tagged]), "pins":[pin.id for pin in board.pins_tagged]})
        return returnList

    def get_ten_pints(self):
         count = 0
         pin_arr = []
         while count < 7:
              sorted_pins = sorted(self.pins, key=lambda x: x.created_at, reverse=True)
              pin_arr.append({"id":sorted_pins[count].id, "image":sorted_pins[count].image})
              count = count + 1
         return pin_arr

    def for_profile_display_dict(self):
         return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'categories': [category.name for category in self.categories],
            'about': self.about,
            'pronouns': self.pronouns,
            'website': self.website,
            'profile_image': self.profile_image,
            'follower_count': len([follower.username for follower in self.followers]),
            'following_count': len([[follow.username for follow in self.following]]),
            'followers': [follower.username for follower in self.followers],
            'following': [follow.username for follow in self.following],
            'pins': self.pins,
            # 'pins': self.get_ten_pints(),
            'boards': self.boards_pinned_to_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
         }


    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'categories': [category.name for category in self.categories],
            'about': self.about,
            'pronouns': self.pronouns,
            'website': self.website,
            'profile_image': self.profile_image,
            'follower_count': len([follower.username for follower in self.followers]),
            'following_count': len([[follow.username for follow in self.following]]),
            'followers': [follower.username for follower in self.followers],
            'following': [follow.username for follow in self.following],
            'boards': self.boards_pinned_to_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
