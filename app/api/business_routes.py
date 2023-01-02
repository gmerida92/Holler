from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Business, BusinessAttribute, BusinessCategory, BusinessHour, Image, Review, db
from .user_routes import user_exists, validation_errors_to_error_messages
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



def authorization_required(modify_business_route_method):
    def modify_business_route_method_wrapper(id):
        # id = args
        business = Business.query.get(id)

        if business.user_id == current_user.id:
            return modify_business_route_method(id)
        else:
            return {
                "message": "Forbidden",
                "statusCode": 403
            }, 403

    modify_business_route_method_wrapper.__name__ = modify_business_route_method.__name__
    return modify_business_route_method_wrapper



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
    current_user_id = current_user.get_id()

    form = CreateBusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        business = Business(
            user_id = current_user_id,
            name = form.data['name'],
            address = form.data['address'],
            address_2 = form.data['address_2'],
            city = form.data['city'],
            state = form.data['state'],
            postal_code = form.data['postal_code'],
            country = form.data['country'],
            phone = form.data['phone'],
            web_address = form.data['web_address'],
            is_open = form.data['is_open'],
            latitude = form.data['latitude'],
            longitude = form.data['longitude'],
            description = form.data['description']
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
@business_routes.route('/<int:id>/images', methods=['POST'])
@login_required
@business_exists
@authorization_required
def create_image(id):
    pass

# Edit a Business
@business_routes.route('/<int:id>', methods=['PUT'])
@login_required
@business_exists
@authorization_required
def edit_business(id):

    business = Business.query.get(id)

    form = EditBusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        business.name= form.data['name']
        business.address= form.data['address']
        business.address_2= form.data['address_2']
        business.city= form.data['city']
        business.state= form.data['state']
        business.postal_code= form.data['postal_code']
        business.country= form.data['country']
        business.phone= form.data['phone']
        business.web_address= form.data['web_address']
        business.is_open= form.data['is_open']
        business.latitude= form.data['latitude']
        business.longitude= form.data['longitude']
        business.description= form.data['description']
        
        db.session.commit()
        return business.to_dict()

    return {
        'message': 'validation Error',
        'statusCode': 401,
        'errors': validation_errors_to_error_messages(form.errors)
    }, 401 

# Delete a Business
@business_routes.route('/<int:id>', methods=['DELETE'])
@login_required
@business_exists
@authorization_required
def delete_business(id):

    business = Business.query.get(id)

    db.session.delete(business)
    db.session.commit()

    return {
        "message": "Successfully deleted",
        "statusCode": 200
    }, 200