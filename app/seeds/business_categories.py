from app.models import db, BusinessCategory, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_business_categories():
    objects = [
        BusinessCategory(business_id=1, category_name="American (Traditional)"),
        BusinessCategory(business_id=1, category_name="Barbeque"),
        BusinessCategory(business_id=1, category_name="Salad"),
        BusinessCategory(business_id=2, category_name="Southern"),
        BusinessCategory(business_id=2, category_name="American (New)"),
        BusinessCategory(business_id=2, category_name="Cocktail Bars"),
        BusinessCategory(business_id=3, category_name="Noodles"),
        BusinessCategory(business_id=3, category_name="Chinese"),
        BusinessCategory(business_id=4, category_name="American(New)"),
        BusinessCategory(business_id=4, category_name="Mexican"),
        BusinessCategory(business_id=4, category_name="Breakfast & Brunch"),
        BusinessCategory(business_id=5, category_name="Southern"),
        BusinessCategory(business_id=5, category_name="Cajun/Creole"),
        BusinessCategory(business_id=5, category_name="Breakfast & Brunch"),
        BusinessCategory(business_id=6, category_name="Breakfast & Brunch"),
        BusinessCategory(business_id=6, category_name="Southern"),
        BusinessCategory(business_id=6, category_name="Sandwiches")
    ]

    db.session.add_all(objects)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_business_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()