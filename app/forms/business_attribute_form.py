from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, DecimalField, SelectField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class BusinessAttributeForm(FlaskForm):
    health_score=StringField("Health Score", validators=[DataRequired()])
    price_range=IntegerField("Price Range",validators=[DataRequired()])
    free_wifi=BooleanField("Free Wi-Fi", false_values=(False, 'false', ''))
    parking_lot=BooleanField("Parking Lot", false_values=(False, 'false', ''))
    valet_parking=BooleanField("Valet Parking", false_values=(False, 'false', ''))
    street_parking=BooleanField("Street Valet", false_values=(False, 'false', ''))
    garage_parking=BooleanField("Garage Parking", false_values=(False, 'false', ''))
    bike_parking=BooleanField("Bike Parking", false_values=(False, 'false', ''))
    business_accepts_cryptocurrency=BooleanField("Accepts Cryptocurrency", false_values=(False, 'false', ''))
    business_accepts_credit_card=BooleanField("Accepts Credit Card", false_values=(False, 'false', ''))
    dogs_allowed=BooleanField("Dogs Allowed", false_values=(False, 'false', ''))
    wheelchair_accessible=BooleanField("Wheelchair Accessible", false_values=(False, 'false', ''))
    outdoor_seating=BooleanField("Outdoor Seating", false_values=(False, 'false', ''))
    takes_reservation=BooleanField("Takes Reservation", false_values=(False, 'false', ''))
    offers_catering=BooleanField("Offers Catering", false_values=(False, 'false', ''))
    offers_takeout=BooleanField("Offers Takeout", false_values=(False, 'false', ''))
    offers_delivery=BooleanField("Offers Delivery", false_values=(False, 'false', ''))
    good_for_kids=BooleanField("Good for Kids", false_values=(False, 'false', ''))
    moderate_noise=BooleanField("Moderate Noise", false_values=(False, 'false', ''))
