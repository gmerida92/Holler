from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    credential = field.data
    user = User.query.filter(User.email == credential).first()
    if not user:
        raise ValidationError('Invalid Credential')


def password_matches(form, field):
    # Checking if password matches
    # password = field.data
    password = form.data['password']
    credential = form.data['credential']
    # credential = field.data
    user = User.query.filter(User.email == credential).first()
    if not user:
        raise ValidationError('Invalid Credential')
    if not user.check_password(password):
        raise ValidationError('Password Invalid')


class LoginForm(FlaskForm):
    credential = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])