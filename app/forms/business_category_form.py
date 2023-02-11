from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, DecimalField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError

class BusinessCategoryForm(FlaskForm):
    category_name = StringField('Category', validators=[DataRequired()])
