from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Image(db.Model):

    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey('reviews.id'), nullable=True)
    image_url = db.Column(db.Text, nullable=False)
    caption = db.Column(db.String(256), nullable=True)
    label = db.Column(db.String(256), nullable=False)
    tag = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    users = db.relationship('User', back_populates='images')
    reviews = db.relationship('Review', back_populates='images')
    businesses = db.relationship('Business', back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'business_id': self.business_id,
            'review_id': self.review_id,
            'image_url': self.image_url,
            'caption': self.caption,
            'label': self.label,
            'tag': self.tag,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }