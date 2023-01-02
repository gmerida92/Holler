from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

def rating_in_bounds(form, field):
    stars = field.data
    if stars < 1 or stars > 5:
        raise ValidationError("Stars must be an integer between 1 and 5")

class ReviewForm(FlaskForm):
    stars = IntegerField('Rating', validators=[DataRequired(), rating_in_bounds])
    review = StringField('Review', validators=[DataRequired()])