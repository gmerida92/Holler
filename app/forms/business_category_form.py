from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, DecimalField, SelectField
from wtforms.fields.html5 import TimeField
from wtforms.validators import DataRequired, Email, ValidationError

class BusinessCategoryForm(FlaskForm):
    category_name = StringField("Category")
