from app.models import db, BusinessAttribute, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_business_attributes():
    objects = [
        BusinessAttribute(Business_id=, health_score="", parking_lot=, valet_parking=, street_parking=, garage_parking=, bike_parking=, business_accepts_cryptocurrency=, business_accepts_credit_card=, dogs_allowed=, price_range=, wheelchair_accessible=, outdoor_seating=, takes_reservations=, offers_takeout=, offers_delivery=,),
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