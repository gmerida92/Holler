from app.models import db, Review, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_reviews():
    objects = [
        Review(business_id=1, user_id=2, stars=1, review="Awful Food and service."),
        Review(business_id=1, user_id=3, stars=2, review="I've had better at cheaper place."),
        Review(business_id=1, user_id=4, stars=5, review="Amazing food!"),
        Review(business_id=1, user_id=5, stars=5, review="Great restaurant!"),
        Review(business_id=1, user_id=6, stars=4, review="Awesome place."),
        Review(business_id=2, user_id=7, stars=4, review="Will definitely be returning."),
        Review(business_id=2, user_id=8, stars=4, review="I would recommend this to my friends!"),
        Review(business_id=2, user_id=9, stars=5, review="Amazing service and great drinks."),
        Review(business_id=2, user_id=10, stars=3, review="I've been to places that are better."),
        Review(business_id=2, user_id=2, stars=3, review="If you think this is good food, then you are mistaken."),
        Review(business_id=3, user_id=3, stars=3, review="Service could have been better."),
        Review(business_id=3, user_id=4, stars=4, review="Going to be coming back here for the food."),
        Review(business_id=3, user_id=5, stars=5, review="All around amazing place with great atmosphere."),
        Review(business_id=3, user_id=6, stars=5, review="Would give 6 stars if I could."),
        Review(business_id=3, user_id=7, stars=5, review="Totally amazing restaurant."),
        Review(business_id=4, user_id=8, stars=5, review="I give this a perfect score for service, food, and drinks."),
        Review(business_id=4, user_id=9, stars=5, review="Get the Nachos"),
        Review(business_id=4, user_id=10, stars=5, review="Wish I could go back, but I am from out of state."),
        Review(business_id=4, user_id=1, stars=4, review="I can't wait to come back."),
        Review(business_id=4, user_id=3, stars=3, review="Falls short in food quality."),
        Review(business_id=5, user_id=4, stars=5, review="Exceeded my expectations."),
        Review(business_id=5, user_id=5, stars=4, review="I give this 4 out of 5."),
        Review(business_id=5, user_id=6, stars=3, review="Maybe it'll be better next time I visit."),
        Review(business_id=5, user_id=7, stars=5, review="The only place I can eat."),
        Review(business_id=5, user_id=8, stars=5, review="This place is out of this world."),
        Review(business_id=6, user_id=9, stars=4, review="Wish I could give it a 5, but was disappointed with service. "),
        Review(business_id=6, user_id=10, stars=5, review="Service, food, drinks, and atmosphere were on point."),
        Review(business_id=6, user_id=1, stars=5, review="Can't complain about anything."),
        Review(business_id=6, user_id=2, stars=5, review="Food is the best I have ever had."),
        Review(business_id=6, user_id=4, stars=3, review="Atmosphere was dull.")
    ]

    db.session.add_all(objects)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")
        
    db.session.commit()