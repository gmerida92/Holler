from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Business, BusinessAttribute, BusinessCategory, BusinessHour, Image, Review, db

from .user_routes import user_exists, validation_errors_to_error_messages
from .business_routes import business_exists, authorization_required
from .review_routes import review_exists
from .image_routes import image_exists

from ..forms.business_category_form import BusinessCategoryForm

business_category_routes = Blueprint('businesscatagories', __name__)

def business_category_exists(business_category_route_method):
    def business_category_route_method_wrapper(bus_cat_id, id):
        # bus_hour_id, id = args
        business_category = BusinessCategory.query.filter(BusinessCategory.id == bus_cat_id).filter(BusinessCategory.business_id == id).one_or_none()

        if business_category:
            return business_category_route_method(bus_cat_id, id)
        else:
            return {
                "message": "Business Category couldn't be found",
                "statusCode": 404
            }, 404
    
    business_category_route_method_wrapper.__name__ = business_category_route_method.__name__
    return business_category_route_method_wrapper

def business_authorization_required(modify_business_category_route_method):
    def modify_business_category_route_method_wrapper(bus_cat_id, id):
        # bus_hour_id, id = args
        business = Business.query.get(id)

        if business.user_id == current_user.id:
            return modify_business_category_route_method(bus_cat_id, id)
        else:
            return {
                "message": "Forbidden",
                "statusCode": 403
            }, 403

    modify_business_category_route_method_wrapper.__name__ = modify_business_category_route_method.__name__
    return modify_business_category_route_method_wrapper



# Get Business Category based on Business Id
@business_category_routes.route('/businesses/<int:id>', methods=['GET'])
@business_exists
def get_business_category(id):
    all_business_category = BusinessCategory.query.filter(BusinessCategory.business_id == id).all()
    return {'Business Categories': [business_category.to_dict() for business_category in all_business_category]}


# Create Business Category based on Business Id
@business_category_routes.route('/businesses/<int:id>', methods=['POST'])
@login_required
@business_exists
@authorization_required
def create_business_category(id):
    form = BusinessCategoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    print("HERE5", form.data)

    if form.validate_on_submit():
        business_category = BusinessCategory(
            business_id = id,
            category_name = form.data['category_name']
        )
        print("HERE6", form)

        db.session.add(business_category)
        print("HERE7", business_category)
        print("HERE8", business_category.to_dict())
        db.session.commit()

        return business_category.to_dict()

    return {
        'message': 'validation Error',
        'statusCode': 401,
        'errors': validation_errors_to_error_messages(form.errors)
        }, 401


# Edit Business Category based on Business Id
@business_category_routes.route('/<int:bus_cat_id>/businesses/<int:id>', methods=['PUT'])
@login_required
@business_category_exists
@business_authorization_required
def edit_business_category(bus_cat_id, id):
    business_category = BusinessCategory.query.filter(BusinessCategory.id == bus_cat_id).filter(BusinessCategory.business_id == id).one_or_none()

    form = BusinessCategoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        business_category.category_name = form.data['category_name']

        db.session.commit()
        return business_category.to_dict()

    return {
        'message': 'validation Error',
        'statusCode': 401,
        'errors': validation_errors_to_error_messages(form.errors)
        }, 401