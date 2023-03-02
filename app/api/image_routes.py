from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Business, BusinessAttribute, BusinessCategory, BusinessHour, Image, Review, db

from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

from .user_routes import user_exists, validation_errors_to_error_messages
from .business_routes import business_exists
from .review_routes import review_exists
from ..forms.image_form import ImageForm

image_routes = Blueprint('images', __name__)


def image_exists(image_route_method):
    def image_route_method_wrapper(id):
        # id = args
        image = Image.query.get(id)

        if image:
            return image_route_method(id)
        else:
            return {
                "message": "Image couldn't be found",
                "statusCode": 404
            }, 404

    image_route_method_wrapper.__name__ = image_route_method.__name__
    return image_route_method_wrapper


def authorization_required(modify_image_route_method):
    def modify_image_route_method_wrapper(id):
        # id = args
        image = Image.query.get(id)

        if image.user_id == current_user.id:
            return modify_image_route_method(id)
        else:
            return {
                "message": "Forbidden",
                "statusCode": 403
            }, 403

    modify_image_route_method_wrapper.__name__ = modify_image_route_method.__name__
    return modify_image_route_method_wrapper


# Create Image to a Business based on the Businesses Id
@image_routes.route('/businesses/<int:id>', methods=['POST'])
@login_required
@business_exists
def create_image_business(id):

    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]

    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        image = Image(
            user_id=current_user.get_id(),
            business_id=id,
            # image_url=form.data['image_url'],
            image_url=url,
            caption=form.data['caption'],
            # label=form.data['label'],
            label="Food",
            tag='Business'
        )

        db.session.add(image)
        db.session.commit()

        return image.to_dict()

    return {
        'message': 'validation Error',
        'statusCode': 401,
        'errors': validation_errors_to_error_messages(form.errors)
    }, 401


# Create Image to Review based on Review Id
@image_routes.route('/reviews/<int:id>', methods=['POST'])
@login_required
@review_exists
def create_image_review(id):
    review = Review.query.get(id)

    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image = Image(
            user_id=current_user.get_id(),
            business_id=review.business_id,
            review_id=id,
            image_url=form.data['image_url'],
            caption=form.data['caption'],
            label=form.data['label'],
            tag='Review'
        )

        db.session.add(image)
        db.session.commit()

        return image.to_dict()

    return {
        'message': 'validation Error',
        'statusCode': 401,
        'errors': validation_errors_to_error_messages(form.errors)
    }, 401


# Delete Image
@image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
@image_exists
@authorization_required
def delete_image(id):
    image = Image.query.get(id)

    db.session.delete(image)
    db.session.commit()

    return {
        "message": "Successfully deleted",
        "statusCode": 200
    }, 200
