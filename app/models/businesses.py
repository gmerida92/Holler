from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Business(db.Model):

    __tablename__ = 'businesses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False) 
    name = db.Column(db.String(256), nullable=False)
    address = db.Column(db.String(256), nullable=False)
    address_2 = db.Column(db.String(256), nullable=True)
    city = db.Column(db.String(256), nullable=False)
    state = db.Column(db.String(256), nullable=False)
    postal_code = db.Column(db.Integer, nullable=False)
    country = db.Column(db.String(256), nullable=False)
    phone = db.Column(db.String(256), nullable=False)
    web_address = db.Column(db.Text, nullable=True)
    is_open = db.Column(db.Boolean, default=True, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(256), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    users = db.relationship('User', back_populates='businesses')
    reviews = db.relationship('Review', back_populates='businesses', cascade='all, delete-orphan')
    images = db.relationship('Image', back_populates='businesses', cascade='all, delete-orphan')
    business_hours = db.relationship('BusinessHour', back_populates='businesses', cascade='all, delete-orphan')
    business_categories = db.relationship('BusinessCategory', back_populates='businesses', cascade='all, delete-orphan')
    business_attributes = db.relationship('BusinessAttribute', back_populates='businesses', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.users.id,
            'name': self.name,
            'address': self.address,
            'address_2': self.address_2,
            'city': self.city,
            'state': self.state,
            'postal_code': self.postal_code,
            'country': self.country,
            'phone': self.phone,
            'web_address': self.web_address,
            'is_open': self.is_open,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
