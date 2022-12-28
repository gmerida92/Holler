from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Review(db.Model):

    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('businesses.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    users = db.relationship('User', back_populates='reviews')
    images = db.relationship('Image', back_populates='reviews', cascade='all, delete-orphan')
    businesses = db.relationship('Business', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'business_id': self.business_id,
            'user_id': self.user_id,
            'stars': self.stars,
            'review': self.review,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }