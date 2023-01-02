from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Business, BusinessAttribute, BusinessCategory, BusinessHour, Image, Review, db
from .user_routes import user_exists, validation_errors_to_error_messages
from .business_routes import business_exists

review_routes = Blueprint('reviews', __name__)

def review_exists(review_route_method):
    def review_route_method_wrapper(id):
        # id = args
        review = Review.query.get(id)

        if review:
            return review_route_method(id)
        else:
            return {
                "message": "Review couldn't be found",
                "statusCode": 404
            }, 404
    
    review_route_method_wrapper.__name__ = review_route_method.__name__
    return review_route_method_wrapper

def authorization_required(modify_review_route_method):
    def modify_review_route_method_wrapper(id):
        # id = args
        review = Review.query.get(id)

        if review.user_id == current_user.id:
            return modify_review_route_method(id)
        else:
            return {
                "message": "Forbidden",
                "statusCode": 403
            }, 403

    modify_review_route_method_wrapper.__name__ = modify_review_route_method.__name__
    return modify_review_route_method_wrapper

# Get all Reviews by Current Session User
@review_routes
# Get all Reviews by User Id
# Get all Reviews by Business Id
# Get all Review by Review Id
# Create Review based on the Business Id
# Add Image to Review based on Review Id
# Edit Review
# Delete Review

