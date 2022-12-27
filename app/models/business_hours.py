from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class BusinessHour(db.Model):

    __tablename__ = 'business_hours'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    day = db.Column(db.String(256), nullable=False)
    open_time = db.Column(db.Time, nullable=False)
    close_time = db.Column(db.Time, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    businesses = db.relationship('business_hours', back_populates='business_hours')

    def to_dict(self):
        return {
            'id': self.id,
            'business_id': self.business_id,
            'day': self.day,
            'open_time': self.open_time,
            'close_time': self.close_time,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }