from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from ..forms.edit_user_form import EditUserForm
from app.models import User, db

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


def authorization_required(modify_user_route_method):
    def modify_user_route_method_wrapper(id):
        # id = args
        if id == current_user.id:
            return modify_user_route_method(id)
        else:
            return {
                "message": "Forbidden",
                "statusCode": 403
            }, 403

    modify_user_route_method_wrapper.__name__ = modify_user_route_method.__name__
    return modify_user_route_method_wrapper


def user_exists(user_route_method):
    def user_route_method_wrapper(id):
        # id = args
        user = User.query.get(id)

        if user:
            return user_route_method(id)
        else:
            return {
                "message": "User couldn't be found",
                "statusCode": 404
            }, 404
    
    user_route_method_wrapper.__name__ = user_route_method.__name__
    return user_route_method_wrapper


# def user_authorized(user):
#   if user.id == current_user.id:
#     return True
#   return {
#         "message": "Forbidden",
#         "statusCode": 403
#     }, 403


# def user_exists(user):
#     print('HERE!!!', user)
#     if not user:
#         return {
#             "message": "User couldn't be found",
#             "statusCode": 404
#         }, 404
#     return True


# @user_routes.route('/')
# @login_required
# def users():
#     """
#     Query for all users and returns them in a list of user dictionaries
#     """
#     users = User.query.all()
#     return {'users': [user.to_dict() for user in users]}


# Get user by id 
@user_routes.route('/<int:id>')
@user_exists
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)

    return user.user_dict()


#Edit User
@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
@user_exists
@authorization_required
def edit_user(id):

    user = User.query.get(id)
   
    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        user.first_name = form.data['first_name']
        user.last_name = form.data['last_name']
        user.profile_name = form.data['first_name'] + ' ' + form.data['last_name'][0].upper() + '.'
        user.biography = form.data['biography']
        user.location = form.data['location']
        user.profile_image = form.data['profile_image']

        db.session.commit()
        return user.user_dict()

    return {
        'message': 'validation Error',
        'statusCode': 401,
        'errors': validation_errors_to_error_messages(form.errors)
    }, 401


# Delete a User
@user_routes.route('/<int:id>', methods=["DELETE"])
@login_required
@user_exists
@authorization_required
def delete_post(id):

    user = User.query.get(id)

    db.session.delete(user)
    db.session.commit()

    return {
        "message": "Successfully deleted",
        "statusCode": 200
    }