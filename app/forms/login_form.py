import re
from flask_wtf import FlaskForm
from wtforms import StringField
# from wtforms.validators import DataRequired, ValidationError
from wtforms.validators import DataRequired, Email, ValidationError
# from email_validator import validate_email, EmailNotValidError
from app.models import User


# Define a function for
# for validating an Email


def checkEmail(form, field):
    pat = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    email = field.data
    if not re.match(pat, email):
        raise ValidationError('Invalid Email')


def user_exists(form, field):
    # Checking if user exists
    credential = field.data
    user = User.query.filter(User.email == credential).first()
    if not user:
        raise ValidationError('Invalid Email')


def password_matches(form, field):
    # Checking if password matches
    # password = field.data
    password = form.data['password']
    credential = form.data['credential']
    # credential = field.data
    user = User.query.filter(User.email == credential).first()
    if not user:
        raise ValidationError('Invalid Password')
        # None
    if not user.check_password(password):
        raise ValidationError('Password Invalid')


# def only_white_space_exists(form, field):
#     # first_Name = form.data['first_name']
#     inputData = field.data
#     if inputData.isspace():
#         raise ValidationError('Field Needs Characters')


class LoginForm(FlaskForm):
    credential = StringField('Email', validators=[
                             DataRequired(), Email(), user_exists])
    password = StringField('Password', validators=[
                           DataRequired(), Email(), password_matches])
