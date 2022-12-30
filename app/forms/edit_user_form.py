from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class EditUserForm(FlaskForm):
    first_name = StringField('First Name',validators=[DataRequired()])
    last_name = StringField('Last Name',validators=[DataRequired()])
    biography = StringField('Biography',validators=[DataRequired()])
    location = StringField('Location',validators=[DataRequired()])
    profile_image = StringField('Profile Image',validators=[DataRequired()])