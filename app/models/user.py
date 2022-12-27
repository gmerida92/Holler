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
    profile_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    biography = db.Column(db.String(256), nullable=True)
    location = db.Column(db.String(256), nullable=True)
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

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_name': self.profile_name,
            'email': self.email,
            'password': self.hashed_password,
            'biography': self.biography,
            'location': self.location,
            'profile_image': self.profile_image,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    # def to_dict_detail(self):
    #     return {
    #         'id': self.id,
    #         'first_name': self.first_name,
    #         'last_name': self.last_name,
    #         'profile_name': self.profile_image,
    #         'biography': self.biography,
    #         'location': self.location,
    #         # 'review_count': len(self.reviews) if len(self.review) else 0,
    #         'profile_image': self.profile_image,
    #     }
