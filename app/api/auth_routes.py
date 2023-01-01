from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/unauthorized', methods=['GET', 'POST', 'PUT', 'DELETE'])
def unauthenticated():
    """
    Authenticates a user.
    If a user login or @login_required fails, leads to this route.

    """
    # if current_user.is_authenticated:
    #     return current_user.to_dict()
    
    if not current_user.is_authenticated:
        return {
            'message': 'Authentication Required',
            'statusCode': 401
        }, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Forbidden']}, 401


#Login User
@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['credential']).first()
        login_user(user)
        return user.session_dict()
    return {
        'message': 'validation Error',
        'statusCode': 401,
        'errors': validation_errors_to_error_messages(form.errors)
        }, 401


#Logout User
@auth_routes.route('/logout')
@login_required
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


#Sign up and create a new user
@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User(
            first_name = form.data['first_name'],
            last_name = form.data['last_name'],
            profile_name = form.data['first_name'] + ' ' + form.data['last_name'][0].upper() + '.',
            email = form.data['email'],
            password = form.data['password']
        )

        db.session.add(user)
        db.session.commit()

        login_user(user)
        
        return user.session_dict()
    return {
        'message': 'validation Error',
        'statusCode': 401,
        'errors': validation_errors_to_error_messages(form.errors)
        }, 401


# Get Current Session User
@auth_routes.route('/mysession', methods=["GET"])
@login_required
def session():
    user = current_user
    return user.session_dict()
