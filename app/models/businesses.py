from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Business(db.Model):

    __tablename__ = 'businesses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForiegnKey('users.id'), nullable=False) 
    name = db.Column(db.String(256), nullable=False)
    address = db.Column(db.String(256), nullable=False)
    address_2 = db.Column(db.String(256), nullable=True)
    city = db.Column(db.String(256), nullable=False)
    state = db.Column(db.String(256), nullable=False)
    postal_code = db.Column(db.Integer, nullable=False)
    country = db.Column(db.String(256), nullable=False)
    phone = db.Column(db.String(256), nullable=False)
    web_address = db.Column(db.Text, nullable=True)
    is_open = db.Column(db.Boolean, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(256), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    users = db.relationship('User', back_populates='business')
    reviews = db.relationship('Review', back_populates='business', cascade='all, delete-orphan')
    images = db.relationship('Image', back_populates='business', cascade='all, delete-orphan')
