from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Image(db.Model):

    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.Foreignkey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.Foreignkey('businesses.id'), nullable=False)
    review_id = db.Column(db.Integer, db.Foreignkey('users.id'), nullable=True)
    image_url = db.Column(db.Text, nullable=False)
    caption = db.Column(db.String(256), nullable=True)
    label = db.Column(db.String(256), nullable=False)
    tag = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
