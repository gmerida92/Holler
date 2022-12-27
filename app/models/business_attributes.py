from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class BusinessAttribute(db.Model):

    __tablename__ = 'business_attributes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    health_score = db.Column(db.String(256), nullable=True)
    parking_lot = db.Column(db.Boolean, default=True, nullable=True)
    valet_parking = db.Column(db.Boolean, default=True, nullable=True)
    street_parking = db.Column(db.Boolean, default=True, nullable=True)
    garage_parking = db.Column(db.Boolean, default=True, nullable=True)
    bike_parking = db.Column(db.Boolean, default=True, nullable=True)
    business_accepts_cryptocurrency = db.Column(db.Boolean, default=True, nullable=True)
    business_accepts_credit_card = db.Column(db.Boolean, default=True, nullable=True)
    dogs_allowed = db.Column(db.Boolean, default=True, nullable=True)
    price_range = db.Column(db.Integer, nullable=True)
    wheelchair_accessible = db.Column(db.Boolean, default=True, nullable=True)
    outdoor_seating = db.Column(db.Boolean, default=True, nullable=True)
    takes_reservation = db.Column(db.Boolean, default=True, nullable=True)
    offers_takeout = db.Column(db.Boolean, default=True, nullable=True)
    offers_delivery = db.Column(db.Boolean, default=True, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    businesses = db.relationship('Business', back_populates='business_attributes')

    def to_dict(self):
        return {
            'id': self.id,
            'business_id': self.business_id,
            'health_score': self.health_score,
            'parking_lot': self.parking_lot,
            'valet_parking': self.valet_parking,
            'street_parking': self.street_parking,
            'garage_parking': self.garage_parking,
            'bike_parking': self.bike_parking,
            'business_accepts_cryptocurrency': self.business_accepts_cryptocurrency,
            'business_accepts_credit_card': self.business_accepts_credit_card,
            'dogs_allowed': self.dogs_allowed,
            'price_range': self.price_range,
            'wheelchair_accessible': self.wheelchair_accessible,
            'outdoor_seating': self.outdoor_seating,
            'takes_reservation': self.takes_reservation,
            'offers_takeout': self.offers_takeout,
            'offers_delivery': self.offers_delivery,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
