from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


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

def only_white_space_exists(form, field):
    # first_Name = form.data['first_name']
    inputData = field.data
    if inputData.isspace():
        raise ValidationError('Field Needs Characters')

class LoginForm(FlaskForm):
    credential = StringField('Email', validators=[DataRequired(), Email(), user_exists])
    password = StringField('Password', validators=[DataRequired(), only_white_space_exists, password_matches])