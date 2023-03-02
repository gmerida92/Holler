from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class ImageForm(FlaskForm):
    # image_url = StringField('Image', validators=[DataRequired()])
    caption = StringField('Caption')
    label = StringField('Label')