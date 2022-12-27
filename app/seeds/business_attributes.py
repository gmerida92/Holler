from app.models import db, BusinessAttribute, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_business_attributes():
    objects = [
        BusinessAttribute(Business_id=1, health_score="A", price_range=2, free_wifi=False, parking_lot=True, valet_parking=None, street_parking=True, garage_parking=None, bike_parking=True, business_accepts_cryptocurrency=None, business_accepts_credit_card=True, dogs_allowed=False, wheelchair_accessible=None, outdoor_seating=None, takes_reservations=False, offers_catering=True, offers_takeout=True, offers_delivery=True, good_for_kids=True, moderate_noise=True),
        BusinessAttribute(Business_id=2, health_score="A", price_range=3, free_wifi=True, parking_lot=None, valet_parking=True, street_parking=None, garage_parking=True, bike_parking=True, business_accepts_cryptocurrency=False, business_accepts_credit_card=True, dogs_allowed=True, wheelchair_accessible=True, outdoor_seating=True, takes_reservations=True, offers_catering=True, offers_takeout=True, offers_delivery=True, good_for_kids=True, moderate_noise=True),
        BusinessAttribute(Business_id=3, health_score="A", price_range=2, free_wifi=True, parking_lot=True, valet_parking=None, street_parking=None, garage_parking=None, bike_parking=False, business_accepts_cryptocurrency=None, business_accepts_credit_card=True, dogs_allowed=False, wheelchair_accessible=True, outdoor_seating=False, takes_reservations=False, offers_catering=False, offers_takeout=True, offers_delivery=None, good_for_kids=True, moderate_noise=True),
        BusinessAttribute(Business_id=4, health_score="A", price_range=2, free_wifi=True, parking_lot=None, valet_parking=True, street_parking=None, garage_parking=True, bike_parking=False, business_accepts_cryptocurrency=False, business_accepts_credit_card=True, dogs_allowed=False, wheelchair_accessible=True, outdoor_seating=True, takes_reservations=True, offers_catering=True, offers_takeout=True, offers_delivery=True, good_for_kids=None, moderate_noise=True),
        BusinessAttribute(Business_id=5, health_score=None, price_range=2, free_wifi=False, parking_lot=None, valet_parking=None, street_parking=True, garage_parking=None, bike_parking=False, business_accepts_cryptocurrency=None, business_accepts_credit_card=True, dogs_allowed=True, wheelchair_accessible=True, outdoor_seating=True, takes_reservations=True, offers_catering=False, offers_takeout=True, offers_delivery=True, good_for_kids=True, moderate_noise=True),
        BusinessAttribute(Business_id=6, health_score="A", price_range=2, free_wifi=True, parking_lot=None, valet_parking=None, street_parking=True, garage_parking=None, bike_parking=False, business_accepts_cryptocurrency=False, business_accepts_credit_card=True, dogs_allowed=True, wheelchair_accessible=True, outdoor_seating=True, takes_reservations=False, offers_catering=True, offers_takeout=True, offers_delivery=True, good_for_kids=None, moderate_noise=True)
    ]

    db.session.add_all(objects)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_business_attributes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()