from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Business, BusinessAttribute, BusinessCategory, BusinessHour, Image, Review, db
# from .user_routes import authorization_required

business_routes = Blueprint('businesses', __name__)

# Get all Businesses
@business_routes.route('/', methods=['GET'])
def get_all_businesses():

    businesses = Business.query.all()

    return {'Businesses': [business.all_to_dict() for business in businesses]}


# Get all Businesses owned by the Current Session User
# Get all Businesses by User Id
# Get details of a Business from an Id
# Create a Business Based on the businesses Id
# Add an Image to a Business based on the Businesses Id
# Edit a Business
#Delete a Business