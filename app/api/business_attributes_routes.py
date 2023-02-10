from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Business, BusinessAttribute, BusinessCategory, BusinessHour, Image, Review, db

from .user_routes import user_exists, validation_errors_to_error_messages
from .business_routes import business_exists, authorization_required
from .review_routes import review_exists
from .image_routes import image_exists

from ..forms.business_attribute_form import BusinessAttributeForm

business_attribute_routes = Blueprint('businessattributes', __name__)
#potentially need to make an error handler to check that business attribute already exists and you can't create a new attribute

def business_attribute_exists(business_attribute_route_method):
    def business_attribute_route_method_wrapper(bus_att_id, id):
        # bus_hour_id, id = args
        business_attribute = BusinessAttribute.query.filter(BusinessAttribute.id == bus_att_id).filter(BusinessAttribute.business_id == id).one_or_none()

        if business_attribute:
            return business_attribute_route_method(bus_att_id, id)
        else:
            return {
                "message": "Business Category couldn't be found",
                "statusCode": 404
            }, 404
    
    business_attribute_route_method_wrapper.__name__ = business_attribute_route_method.__name__
    return business_attribute_route_method_wrapper

def business_authorization_required(modify_business_attribute_route_method):
    def modify_business_attribute_route_method_wrapper(bus_att_id, id):
        # bus_hour_id, id = args
        business = Business.query.get(id)

        if business.user_id == current_user.id:
            return modify_business_attribute_route_method(bus_att_id, id)
        else:
            return {
                "message": "Forbidden",
                "statusCode": 403
            }, 403

    modify_business_attribute_route_method_wrapper.__name__ = modify_business_attribute_route_method.__name__
    return modify_business_attribute_route_method_wrapper



# Get Business Attributes based on Business Id
@business_attribute_routes.route('/businesses/<int:id>', methods=['GET'])
@business_exists
def get_business_attribute(id):
    all_business_attribute = BusinessAttribute.query.filter(BusinessAttribute.business_id == id).one_or_none()
    return all_business_attribute.to_dict()


# Create Business Attribute based on Business Id
@business_attribute_routes.route('/businesses/<int:id>', methods=['POST'])
@login_required
@business_exists
@authorization_required
def create_business_attribute(id):
    form = BusinessAttributeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        business_attribute = BusinessAttribute(
            business_id = id,
            health_score = form.data['health_score'],
            price_range = form.data['price_range'],
            free_wifi = form.data['free_wifi'],
            parking_lot = form.data['parking_lot'],
            valet_parking = form.data['valet_parking'],
            street_parking = form.data['street_parking'],
            garage_parking = form.data['garage_parking'],
            bike_parking = form.data['bike_parking'],
            business_accepts_cryptocurrency = form.data['business_accepts_cryptocurrency'],
            business_accepts_credit_card = form.data['business_accepts_credit_card'],
            dogs_allowed = form.data['dogs_allowed'],
            wheelchair_accessible = form.data['wheelchair_accessible'],
            outdoor_seating = form.data['outdoor_seating'],
            takes_reservation = form.data['takes_reservation'],
            offers_catering = form.data['offers_catering'],
            offers_takeout = form.data['offers_takeout'],
            offers_delivery = form.data['offers_delivery'],
            good_for_kids = form.data['good_for_kids'],
            moderate_noise = form.data['moderate_noise']
        )

        db.session.add(business_attribute)
        db.session.commit()

        return business_attribute.to_dict()

    return {
        'message': 'validation Error',
        'statusCode': 401,
        'errors': validation_errors_to_error_messages(form.errors)
        }, 401


# Edit Business Attribute based on Business Id
@business_attribute_routes.route('/<int:bus_att_id>/businesses/<int:id>', methods=['PUT'])
@login_required
@business_attribute_exists
@business_authorization_required
def edit_business_attribute(bus_att_id, id):
    business_attribute = BusinessAttribute.query.filter(BusinessAttribute.id == bus_att_id).filter(BusinessAttribute.business_id == id).one_or_none()

    form = BusinessAttributeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        business_attribute.health_score = form.data['health_score']
        business_attribute.price_range = form.data['price_range']
        business_attribute.free_wifi = form.data['free_wifi']
        business_attribute.parking_lot = form.data['parking_lot']
        business_attribute.valet_parking = form.data['valet_parking']
        business_attribute.street_parking = form.data['street_parking']
        business_attribute.garage_parking = form.data['garage_parking']
        business_attribute.bike_parking = form.data['bike_parking']
        business_attribute.business_accepts_cryptocurrency = form.data['business_accepts_cryptocurrency']
        business_attribute.business_accepts_credit_card = form.data['business_accepts_credit_card']
        business_attribute.dogs_allowed = form.data['dogs_allowed']
        business_attribute.wheelchair_accessible = form.data['wheelchair_accessible']
        business_attribute.outdoor_seating = form.data['outdoor_seating']
        business_attribute.takes_reservation = form.data['takes_reservation']
        business_attribute.offers_catering = form.data['offers_catering']
        business_attribute.offers_takeout = form.data['offers_takeout']
        business_attribute.offers_delivery = form.data['offers_delivery']
        business_attribute.good_for_kids = form.data['good_for_kids']
        business_attribute.moderate_noise = form.data['moderate_noise']

        db.session.commit()
        return business_attribute.to_dict()

    return {
        'message': 'validation Error',
        'statusCode': 401,
        'errors': validation_errors_to_error_messages(form.errors)
        }, 401