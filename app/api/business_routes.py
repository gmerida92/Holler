from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Business, BusinessAttribute, BusinessCategory, BusinessHour, Image, Review, db
from .user_routes import authorization_required, user_exists, validation_errors_to_error_messages
from ..forms.edit_business_form import EditBusinessForm
from ..forms.create_business_form import CreateBusinessForm


business_routes = Blueprint('businesses', __name__)

def business_exists(business_route_method):
    def business_route_method_wrapper(id):
        # id = args
        business = Business.query.get(id)

        if business:
            return business_route_method(id)
        else:
            return {
                "message": "Business couldn't be found",
                "statusCode": 404
            }, 404
    
    business_route_method_wrapper.__name__ = business_route_method.__name__
    return business_route_method_wrapper

# Get all Businesses
@business_routes.route('/', methods=['GET'])
def get_all_businesses():
    businesses = Business.query.all()
    return {'Businesses': [business.all_to_dict() for business in businesses]}

# Get all Businesses owned by the Current Session User
@business_routes.route('/mysession', methods=['GET'])
@login_required
def get_business_owned():
    current_user_id = current_user.get_id()
    businesses = Business.query.filter(Business.user_id == current_user_id).all()
    return {'Businesses': [business.all_to_dict() for business in businesses]}

# Get all Businesses by User Id
@business_routes.route('/users/<int:id>', methods=['GET'])
@user_exists
def get_business_by_user_id(id):
    businesses = Business.query.filter(Business.user_id == id).all()
    return {'Businesses': [business.detail_to_dict() for business in businesses]}

# Get details of a Business from an Id
@business_routes.route('/<int:id>', methods=['GET'])
@business_exists
def get_business_details(id):
    business= Business.query.get(id)
    return business.detail_to_dict()

# Create a Business Based on the businesses Id
@business_routes.route('/', methods=['POST'])
@login_required
def create_business():
    form = CreateBusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        business = Business(
        )

        db.session.add(business)
        db.session.commit()
        
        return business.to_dict()
    return {
        'message': 'validation Error',
        'statusCode': 401,
        'errors': validation_errors_to_error_messages(form.errors)
        }, 401

# Add an Image to a Business based on the Businesses Id
# Edit a Business
# Delete a Business