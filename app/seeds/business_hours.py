import datetime
from app.models import db, BusinessHour, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_business_attributes():
    objects = [
        BusinessHour(business_id=1, day="Monday", open_time=datetime.time(11, 0), close_time=datetime.time(20, 30)),
        BusinessHour(business_id=1, day="Tuesday", open_time=datetime.time(11, 0), close_time=datetime.time(20, 30)),
        BusinessHour(business_id=1, day="Wednesday", open_time=datetime.time(11, 0), close_time=datetime.time(20, 30)),
        BusinessHour(business_id=1, day="Thursday", open_time=datetime.time(11, 0), close_time=datetime.time(20, 30)),
        BusinessHour(business_id=1, day="Friday", open_time=datetime.time(11, 0), close_time=datetime.time(21, 0)),
        BusinessHour(business_id=1, day="Saturday", open_time=datetime.time(11, 0), close_time=datetime.time(21, 0)),
        BusinessHour(business_id=1, day="Sunday", open_time=datetime.time(11, 0), close_time=datetime.time(20, 30)),
        BusinessHour(business_id=2, day="Monday", open_time=datetime.time(11, 0), close_time=datetime.time(21, 0)),
        BusinessHour(business_id=2, day="Tuesday", open_time=datetime.time(11, 0), close_time=datetime.time(21, 0)),
        BusinessHour(business_id=2, day="Wednesday", open_time=datetime.time(11, 0), close_time=datetime.time(21, 0)),
        BusinessHour(business_id=2, day="Thursday", open_time=datetime.time(11, 0), close_time=datetime.time(21, 0)),
        BusinessHour(business_id=2, day="Friday", open_time=datetime.time(11, 0), close_time=datetime.time(22, 0)),
        BusinessHour(business_id=2, day="Saturday", open_time=datetime.time(10, 0), close_time=datetime.time(22, 0)),
        BusinessHour(business_id=2, day="Sunday", open_time=datetime.time(10, 0), close_time=datetime.time(21, 0)),
        BusinessHour(business_id=3, day="Monday", open_time=datetime.time(11, 0), close_time=datetime.time(22, 0)),
        BusinessHour(business_id=3, day="Tuesday", open_time=datetime.time(11, 0), close_time=datetime.time(22, 0)),
        BusinessHour(business_id=3, day="Wednesday", open_time=datetime.time(11, 0), close_time=datetime.time(22, 0)),
        BusinessHour(business_id=3, day="Thursday", open_time=datetime.time(11, 0), close_time=datetime.time(22, 0)),
        BusinessHour(business_id=3, day="Friday", open_time=datetime.time(11, 0), close_time=datetime.time(22, 0)),
        BusinessHour(business_id=3, day="Saturday", open_time=datetime.time(11, 0), close_time=datetime.time(22, 0)),
        BusinessHour(business_id=3, day="Sunday", open_time=datetime.time(11, 0), close_time=datetime.time(22, 0)),
        BusinessHour(business_id=4, day="Monday", open_time=datetime.time(8, 0), close_time=datetime.time(2, 0)),
        BusinessHour(business_id=4, day="Tuesday", open_time=datetime.time(8, 0), close_time=datetime.time(2, 0)),
        BusinessHour(business_id=4, day="Wednesday", open_time=datetime.time(8, 0), close_time=datetime.time(2, 0)),
        BusinessHour(business_id=4, day="Thursday", open_time=datetime.time(8, 0), close_time=datetime.time(3, 0)),
        BusinessHour(business_id=4, day="Friday", open_time=datetime.time(8, 0), close_time=datetime.time(3, 0)),
        BusinessHour(business_id=4, day="Saturday", open_time=datetime.time(8, 0), close_time=datetime.time(3, 0)),
        BusinessHour(business_id=4, day="Sunday", open_time=datetime.time(8, 0), close_time=datetime.time(2, 0)),
        BusinessHour(business_id=5, day="Monday", open_time=datetime.time(9, 0), close_time=datetime.time(14, 30)),
        BusinessHour(business_id=5, day="Monday", open_time=datetime.time(17, 0), close_time=datetime.time(21, 0)),
        BusinessHour(business_id=5, day="Tuesday", open_time=datetime.time(9, 0), close_time=datetime.time(14, 30)),
        BusinessHour(business_id=5, day="Tuesday", open_time=datetime.time(17, 0), close_time=datetime.time(21, 0)),
        BusinessHour(business_id=5, day="Wednesday", open_time=datetime.time(9, 0), close_time=datetime.time(14, 30)),
        BusinessHour(business_id=5, day="Wednesday", open_time=datetime.time(17, 0), close_time=datetime.time(21, 0)),
        BusinessHour(business_id=5, day="Thursday", open_time=datetime.time(9, 0), close_time=datetime.time(14, 30)),
        BusinessHour(business_id=5, day="Thursday", open_time=datetime.time(17, 0), close_time=datetime.time(21, 0)),
        BusinessHour(business_id=5, day="Friday", open_time=datetime.time(9, 0), close_time=datetime.time(14, 30)),
        BusinessHour(business_id=5, day="Friday", open_time=datetime.time(17, 0), close_time=datetime.time(21, 0)),
        BusinessHour(business_id=5, day="Saturday", open_time=datetime.time(9, 0), close_time=datetime.time(14, 30)),
        BusinessHour(business_id=5, day="Saturday", open_time=datetime.time(17, 0), close_time=datetime.time(21, 0)),
        BusinessHour(business_id=5, day="Sunday", open_time=datetime.time(9, 0), close_time=datetime.time(14, 30)),
        BusinessHour(business_id=5, day="Sunday", open_time=datetime.time(17, 0), close_time=datetime.time(21, 0)),
        BusinessHour(business_id=6, day="Monday", open_time=datetime.time(8, 0), close_time=datetime.time(14, 0)),
        BusinessHour(business_id=6, day="Tuesday", open_time=datetime.time(8, 0), close_time=datetime.time(14, 0)),
        BusinessHour(business_id=6, day="Wednesday", open_time=datetime.time(8, 0), close_time=datetime.time(14, 0)),
        BusinessHour(business_id=6, day="Thursday", open_time=datetime.time(8, 0), close_time=datetime.time(14, 0)),
        BusinessHour(business_id=6, day="Friday", open_time=datetime.time(7, 0), close_time=datetime.time(15, 0)),
        BusinessHour(business_id=6, day="Saturday", open_time=datetime.time(7, 0), close_time=datetime.time(15, 0)),
        BusinessHour(business_id=6, day="Sunday", open_time=datetime.time(7, 0), close_time=datetime.time(15, 0))
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