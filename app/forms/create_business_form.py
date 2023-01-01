from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError

class CreateBusinessForm(FlaskForm):
    name = StringField()
    address = StringField()
    address_2 = StringField()
    city = StringField()
    state = StringField()
    postal_code = StringField()
    country = StringField()
    phone = StringField()
    web_address = StringField()
    is_open = StringField()
    latitude = StringField()
    longitude = StringField()
    description = StringField()
