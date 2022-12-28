from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class BusinessAttribute(db.Model):

    __tablename__ = 'business_attributes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('businesses.id')), nullable=False)
    health_score = db.Column(db.String(256), default=None, nullable=True)
    price_range = db.Column(db.Integer, default=None, nullable=True)
    free_wifi = db.Column(db.Boolean, default=None, nullable=True)
    parking_lot = db.Column(db.Boolean, default=None, nullable=True)
    valet_parking = db.Column(db.Boolean, default=None, nullable=True)
    street_parking = db.Column(db.Boolean, default=None, nullable=True)
    garage_parking = db.Column(db.Boolean, default=None, nullable=True)
    bike_parking = db.Column(db.Boolean, default=None, nullable=True)
    business_accepts_cryptocurrency = db.Column(db.Boolean, default=None, nullable=True)
    business_accepts_credit_card = db.Column(db.Boolean, default=None, nullable=True)
    dogs_allowed = db.Column(db.Boolean, default=None, nullable=True)
    wheelchair_accessible = db.Column(db.Boolean, default=None, nullable=True)
    outdoor_seating = db.Column(db.Boolean, default=None, nullable=True)
    takes_reservation = db.Column(db.Boolean, default=None, nullable=True)
    offers_catering = db.Column(db.Boolean, default=None, nullable=True)
    offers_takeout = db.Column(db.Boolean, default=None, nullable=True)
    offers_delivery = db.Column(db.Boolean, default=None, nullable=True)
    good_for_kids = db.Column(db.Boolean, default=None, nullable=True)
    moderate_noise = db.Column(db.Boolean, default=None, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    businesses = db.relationship('Business', back_populates='business_attributes')

    def to_dict(self):
        return {
            'id': self.id,
            'business_id': self.business_id,
            'health_score': self.health_score,
            'price_range': self.price_range,
            'free_wifi': self.free_wifi,
            'parking_lot': self.parking_lot,
            'valet_parking': self.valet_parking,
            'street_parking': self.street_parking,
            'garage_parking': self.garage_parking,
            'bike_parking': self.bike_parking,
            'business_accepts_cryptocurrency': self.business_accepts_cryptocurrency,
            'business_accepts_credit_card': self.business_accepts_credit_card,
            'dogs_allowed': self.dogs_allowed,
            'wheelchair_accessible': self.wheelchair_accessible,
            'outdoor_seating': self.outdoor_seating,
            'takes_reservation': self.takes_reservation,
            'offers_catering': self.offers_catering,
            'offers_takeout': self.offers_takeout,
            'offers_delivery': self.offers_delivery,
            'good_for_kids': self.good_for_kids,
            'moderate_noise': self.moderate_noise,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
