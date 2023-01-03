from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, DecimalField, SelectField
from wtforms.fields.html5 import TimeField
from wtforms.validators import DataRequired, Email, ValidationError

class BusinessHourForm(FlaskForm):
    day = SelectField("Day", choices=[("Sunday"), ("Monday"), ("Tuesday"), ("Wednesday"),("Thursday"), ("Friday"), ("Saturday")])
    open_time = TimeField("Open Time", validators=[DataRequired()])
    close_time = TimeField("Close Time", validators=[DataRequired()])
