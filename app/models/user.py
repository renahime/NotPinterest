from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

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
        "followed",
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
        primaryjoin=follows.c.followed == id,
        secondaryjoin=follows.c.follower == id,
        backref="followed"
    )

    following = db.relationship('User', secondary="follows", backref='follower')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'about': self.about,
            'pronouns': self.pronouns,
            'website': self.website,
            'profile_image': self.profile_image,
            'followers': [follower.to_dict() for follower in self.followers],
            'following': [follow.to_dict() for follow in self.following],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
