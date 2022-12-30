from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func


class User(db.Model, UserMixin):
    
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(256), nullable=False)
    last_name = db.Column(db.String(256), nullable=False)
    profile_name = db.Column(db.String(40), nullable=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    biography = db.Column(db.String(256), nullable=True)
    location = db.Column(db.String(256), nullable=True)
    review_count = db.Column(db.Integer, default=0, nullable=False)
    profile_image = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    reviews = db.relationship('Review', back_populates='users', cascade='all, delete-orphan')
    images = db.relationship('Image', back_populates='users', cascade='all, delete-orphan')
    businesses = db.relationship('Business', back_populates='users', cascade='all, delete-orphan')


    @property
    def password(self):
        return self.hashed_password
    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)


    @property
    def current_profile_name(self):
        return f'{self.first_name} {self.last_name[0].upper()}.'
    @current_profile_name.setter
    def profile_name (self, current_profile_name):
        self.profile_name = current_profile_name


    @property
    def update_review_count(self):
        return len(self.reviews)
    @update_review_count.setter
    def review_count(self, update_review_count):
        self.review_count = update_review_count



    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_name': self.profile_name,
            'email': self.email,
            'hashed_password': self.hashed_password,
            'biography': self.biography,
            'location': self.location,
            'review_count': self.review_count,
            'profile_image': self.profile_image,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    def session_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_name': self.profile_name,
            'email': self.email,
            'password': self.password,
            'profile_image': self.profile_image
        }

    def user_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_name': self.profile_name,
            'biography': self.biography,
            'location': self.location,
            'review_count': self.review_count,
            'profile_image': self.profile_image,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

