import re
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
# from wtforms.validators import DataRequired, Email, ValidationError
# from email_validator import validate_email, EmailNotValidError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('User with that email already exists')


def checkEmail(form, field):
    pat = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    email = field.data
    if not re.match(pat, email):
        raise ValidationError('Invalid Email')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')

# def only_white_space_exists(form, field):
#     # first_Name = form.data['first_name']
#     inputData = field.data
#     if inputData.isspace():
#         inputLabel = inputData.split('_')
#         inputLableString = ' '.join(inputLabel)
#         raise ValidationError(f'{inputLableString} Needs Characters')

class SignUpForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    email = StringField('Email', validators=[
                        DataRequired(), checkEmail, user_exists])
    password = StringField('Password', validators=[DataRequired()])
