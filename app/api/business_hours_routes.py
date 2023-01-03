from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Business, BusinessAttribute, BusinessCategory, BusinessHour, Image, Review, db

from .user_routes import user_exists, validation_errors_to_error_messages
from .business_routes import business_exists, authorization_required
from .review_routes import review_exists
from .image_routes import image_exists

from ..forms.business_hour_form import BusinessHourForm

import datetime

business_hours_routes = Blueprint('businesshours', __name__)

def business_hours_exists(business_hours_route_method):
    def business_hours_route_method_wrapper(bus_hour_id, id):
        # bus_hour_id, id = args
        business_hours = BusinessHour.query.filter(BusinessHour.id == bus_hour_id).filter(BusinessHour.business_id == id).one_or_none()

        if business_hours:
            return business_hours_route_method(bus_hour_id, id)
        else:
            return {
                "message": "Business couldn't be found",
                "statusCode": 404
            }, 404
    
    business_hours_route_method_wrapper.__name__ = business_hours_route_method.__name__
    return business_hours_route_method_wrapper

def business_authorization_required(modify_business_hours_route_method):
    def modify_business_hours_route_method_wrapper(bus_hour_id, id):
        # bus_hour_id, id = args
        business = Business.query.get(id)

        if business.user_id == current_user.id:
            return modify_business_hours_route_method(bus_hour_id, id)
        else:
            return {
                "message": "Forbidden",
                "statusCode": 403
            }, 403

    modify_business_hours_route_method_wrapper.__name__ = modify_business_hours_route_method.__name__
    return modify_business_hours_route_method_wrapper



# Get Business Hours based on Business Id
@business_hours_routes.route('/businesses/<int:id>', methods=['GET'])
@business_exists
def get_business_hours(id):
    all_business_hours = BusinessHour.query.filter(BusinessHour.business_id == id).all()
    return {'Business Hours': [business_hours.to_dict() for business_hours in all_business_hours]}


# Create Business Hours based on Business Id
@business_hours_routes.route('/businesses/<int:id>', methods=['POST'])
@login_required
@business_exists
@authorization_required
def create_business_hours(id):
    form = BusinessHourForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        business_hour = BusinessHour(
            business_id = id,
            day = form.data['day'],
            # open_time = datetime.datetime.strptime(form.data['open_time'], '%H:%M').time(),
            open_time = form.data['open_time'],
            # close_time = datetime.datetime.strptime(form.data['open_time'], '%H:%M').time()
            close_time = form.data['close_time']
        )

        db.session.add(business_hour)
        db.session.commit()

        return business_hour.to_dict()

    return {
        'message': 'validation Error',
        'statusCode': 401,
        'errors': validation_errors_to_error_messages(form.errors)
        }, 401


# Edit Business Hours based on Business Id
@business_hours_routes.route('/<int:bus_hour_id>/businesses/<int:id>', methods=['PUT'])
@login_required
@business_hours_exists
@business_authorization_required
def edit_business_hours(bus_hour_id, id):
    business_hours = BusinessHour.query.filter(BusinessHour.id == bus_hour_id).filter(BusinessHour.business_id == id).one_or_none()

    form = BusinessHourForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        business_hours.day = form.data['day']
        business_hours.open_time = form.data['open_time']
        business_hours.close_time = form.data['close_time']

        db.session.commit()
        return business_hours.to_dict()

    return {
        'message': 'validation Error',
        'statusCode': 401,
        'errors': validation_errors_to_error_messages(form.errors)
        }, 401