from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Business, BusinessAttribute, BusinessCategory, BusinessHour, Image, Review, db
from .user_routes import user_exists, validation_errors_to_error_messages
from .business_routes import business_exists
from ..forms.review_form import ReviewForm

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
@review_routes.route('/mysession', methods=['GET'])
@login_required
def get_reviews_owned():
    current_user_id = current_user.get_id()
    reviews = Review.query.filter(Review.user_id == current_user_id).all()
    return {'Reviews': [review.detail_to_dict() for review in reviews]}


# Get all Reviews by User Id
@review_routes.route('/users/<int:id>', methods=['GET'])
@user_exists
def get_reviews_by_user(id):
    reviews = Review.query.filter(Review.user_id == id).all()
    return {'Reviews': [review.detail_to_dict() for review in reviews]}


# Get all Reviews by Business Id
@review_routes.route('/businesses/<int:id>', methods=['GET'])
@business_exists
def get_reviews_for_business(id):
    reviews = Review.query.filter(Review.business_id == id).all()
    return {'Reviews': [review.detail_to_dict() for review in reviews]}


# Get Review based on Id
@review_routes.route('/<int:id>', methods=['GET'])
@review_exists
def get_review_detail(id):
    print("HERE1", id)
    review = Review.query.get(id)

    print('HERE2', review.detail_to_dict())
    return review.detail_to_dict()


# Create Review based on the Business Id
@review_routes.route('/businesses/<int:id>', methods=['POST'])
@login_required
@business_exists
def create_review(id):
    current_user_id = current_user.get_id()

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        review = Review(
            business_id = id,
            user_id = current_user_id,
            stars = form.data['stars'],
            review = form.data['review']
        )

        db.session.add(review)
        db.session.commit()

        return review.to_dict()

    return {
        'message': 'validation Error',
        'statusCode': 401,
        'errors': validation_errors_to_error_messages(form.errors)
        }, 401


# Edit Review
@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
@review_exists
@authorization_required
def edit_review(id):
    review = Review.query.get(id)

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.stars = form.data['stars']
        review.review = form.data['review']

        db.session.commit()
        return review.to_dict()

    return {
        'message': 'validation Error',
        'statusCode': 401,
        'errors': validation_errors_to_error_messages(form.errors)
        }, 401
        

# Delete Review
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
@review_exists
@authorization_required
def delete_review(id):
    review = Review.query.get(id)

    db.session.delete(review)
    db.session.commit()

    return {
        "message": "Successfully deleted",
        "statusCode": 200
    }, 200