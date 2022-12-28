from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class BusinessCategory(db.Model):
    
    __tablename__ = 'business_categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('businesses.id')), nullable=False)
    category_name = db.Column(db.String(256), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    businesses = db.relationship('Business', back_populates='business_categories')

    def to_dict(self):
        return {
            'id': self.id,
            'business_id': self.business_id,
            'category_name': self.category_name,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }