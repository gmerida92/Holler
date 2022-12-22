from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class BusinessAttribute(db.Model):

    __tablename__ = 'business_attributes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    health_score = db.Column(db.String(256), nullable=False)
    parking_lot = db.Column(db.Boolean, default=True, nullable=False)
    valet_parking = db.Column(db.Boolean, default=True, nullable=False)
    street_parking = db.Column(db.Boolean, default=True, nullable=False)
    garage_parking = db.Column(db.Boolean, default=True, nullable=False)
    bike_parking = db.Column(db.Boolean, default=True, nullable=False)
    business_accepts_cryptocurrency = db.Column(db.Boolean, default=True, nullable=False)
    business_accepts_credit_card = db.Column(db.Boolean, default=True, nullable=False)
    dogs_allowed = db.Column(db.Boolean, default=True, nullable=False)
    price_range = db.Column(db.Boolean, default=True, nullable=False)
    price_range = db.Column(db.Integer, nullable=False)
    wheelchair_accessible = db.Column(db.Boolean, default=True, nullable=False)
    outdoor_seating = db.Column(db.Boolean, default=True, nullable=False)
    takes_reservation = db.Column(db.Boolean, default=True, nullable=False)
    offers_takeout = db.Column(db.Boolean, default=True, nullable=False)
    offers_delivery = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    businesses = db.relationship('Business', back_populates='business_attributes')
