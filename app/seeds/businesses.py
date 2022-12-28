from app.models import db, Business, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_businesses():
    objects = [
        Business(user_id=1, name="Stonefire Grill", address="25352 Crenshaw Blvd", address_2=None, city="Torrance", state="California", postal_code=90505, country="United States of America", phone="(424) 203-8800", web_address="http://Stonefiregrill.com", is_open=True, latitude=33.793204, longitude=-118.329906, description="We Are Stonefire. Whether you'll be enjoying Stonefire here or at home, just know that your smile makes ours even wider.", stars=3.5, review_count=5),
        Business(user_id=1, name="Yardbird", address="8500 Beverly Blvd", address_2="Ste 112", city="Los Angeles", state="California", postal_code=90048, country="United States of America", phone="(323) 250-8034", web_address="https://www.runchickenrun.com/los-angeles/", is_open=True, latitude=34.074762, longitude=-118.377225, description="A modern take on Southern comfort means shared plates, craft cocktails, critically acclaimed fried chicken, and an ideal place for brunch or dinner.", stars=4.0, review_count=5),
        Business(user_id=2, name="Shang Artisan Noodle", address="4983 W Flamingo Rd", address_2="Ste B", city="Las Vegas", state="Nevada", postal_code=89103, country="United States of America", phone="(702) 888-3292", web_address="http://shangartisannoodle.com", is_open=True, latitude=36.114734, longitude=-115.209175, description="Shang Artisan Noodle aims to both honor and elevate the Chinese culinary tradition of handmade noodles.", stars=4.5, review_count=5),
        Business(user_id=2, name="Nacho Daddy", address="3663 Las Vegas Blvd", address_2="Ste 595", city="Las Vegas", state="Nevada", postal_code=89109, country="United States of America", phone="(702) 462-5000", web_address="https://nachodaddy.com", is_open=True, latitude=36.109129, longitude=-115.171624, description="Don't let our name fool you, we don't serve nachos...we serve the most insane gourmet nachos smothered in queso and salsa made fresh daily, and we guarantee you'll never find a dry chip!", stars=4.5, review_count=5),
        Business(user_id=3, name="Screen Door Eastside", address="2337 E Burnside St", address_2=None, city="Portland", state="Oregon", postal_code=97214, country="United States of America", phone="(503) 406-4665", web_address="https://screendoorrestaurant.com", is_open=True, latitude=45.523024, longitude=-122.641936, description="Screen Door presents a revival of regional American cuisine, a survey of the south, from South Carolina Lowcountry cuisine to soul food and Cajun one-pot cookery to the refined Creole and French preparations found in New Orleans.", stars=4.5, review_count=5),
        Business(user_id=3, name="Pine State Biscuits", address="2204 NE Alberta St", address_2=None, city="Portland", state="Oregon", postal_code=97211, country="United States of America", phone="(503) 477-6605", web_address="http://www.pinestatebiscuits.com", is_open=True, latitude=45.558846, longitude=-122.642811, description="Made from scratch buttermilk biscuits and fixins inspried by our southern roots.", stars=4.5, review_count=5),
    ]

    db.session.add_all(objects)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM businesses")
        
    db.session.commit()