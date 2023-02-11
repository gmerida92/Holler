from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, DecimalField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class BusinessForm(FlaskForm):
    name = StringField('Business Name', validators=[DataRequired()])
    address = StringField('Address', validators=[DataRequired()])
    address_2 = StringField('Apt, suite, etc. (optional)', validators=[])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    postal_code = IntegerField('Zip code', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    phone = StringField('Phone Number', validators=[DataRequired()])
    web_address = StringField('Website', validators=[])
    is_open = BooleanField('Currently Open', default=True, validators=[])
    latitude = DecimalField('Latitude', validators=[DataRequired()])
    longitude = DecimalField('Longitude', validators=[DataRequired()])
    description = StringField('Description', validators=[])
