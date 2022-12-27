from app.models import db, Image, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_images():
    objects = [
        Image(user_id=1, business_id=1, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/16RzyuixxTLu79ZnzFQ4fw/o.jpg", caption="caption 1", label="Food", tag="Business"),
        Image(user_id=1, business_id=1, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/ZpYeoIqFeUbZxqvMdHBNpA/o.jpg", caption="caption 2", label="Menu", tag="Business"),
        Image(user_id=1, business_id=1, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/u9ivtm0XnyPk_E95GmgHvQ/o.jpg", caption="caption 1", label="Drink", tag="Business"),
        Image(user_id=1, business_id=2, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/clB1Q09zroDCsVpBsVWAOw/o.jpg", caption="caption 1", label="Food", tag="Business"),
        Image(user_id=1, business_id=2, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/S6tE_ZdPIdw_RIj4upmriw/o.jpg", caption="caption 1", label="Menu", tag="Business"),
        Image(user_id=1, business_id=2, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/r2Gb02Zz-GOOe4iSMxxczQ/o.jpg", caption="caption 1", label="Drink", tag="Business"),
        Image(user_id=2, business_id=3, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/OhP7fqcjEhTZR-QHff_wtw/o.jpg", caption="caption 2", label="Food", tag="Business"),
        Image(user_id=2, business_id=3, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/sMUvqKHYcwri-rq8buKoIg/o.jpg", caption="caption 2", label="Menu", tag="Business"),
        Image(user_id=2, business_id=3, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/mON0jEmqYUPVMCkuK989pg/o.jpg", caption="caption 2", label="Drink", tag="Business"),
        Image(user_id=2, business_id=4, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/pu9doqMplB5x5SEs8ikW6w/o.jpg", caption="caption 2", label="Food", tag="Business"),
        Image(user_id=2, business_id=4, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/iIKU4AdXIcjDBX7WOTtMGA/o.jpg", caption="caption 2", label="Menu", tag="Business"),
        Image(user_id=2, business_id=4, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/QX2c5Adp1Vm7-CbAo8VsPw/o.jpg", caption="caption 2", label="Drink", tag="Business"),
        Image(user_id=3, business_id=5, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/YflekuUVx-_WfNiKHHlC0A/o.jpg", caption="caption 3", label="Food", tag="Business"),
        Image(user_id=3, business_id=5, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/Y8yisG_Xv1Au-7WW1F75KA/o.jpg", caption="caption 3", label="Menu", tag="Business"),
        Image(user_id=3, business_id=5, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/-0R07pVrGX4EWQXkA36fGg/o.jpg", caption="caption 3", label="Drink", tag="Business"),
        Image(user_id=3, business_id=6, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/r-4WNtqemQCNfX4hK1ZqbQ/o.jpg", caption="caption 3", label="Food", tag="Business"),
        Image(user_id=3, business_id=6, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/dziNwP_2ClWCqQOA1Jt8YA/o.jpg", caption="caption 3", label="Menu", tag="Business"),
        Image(user_id=3, business_id=6, review_id=None, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/Z1TLSr_FS2bO_l8f4ZFtsQ/o.jpg", caption="caption 3", label="Drink", tag="Business"),
        Image(user_id=2, business_id=1, review_id=1, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/t2EXVW8vYuPjAN42-UFkHQ/o.jpg", caption="caption 2", label="Food", tag="Review"),
        Image(user_id=3, business_id=1, review_id=2, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/9v9F9xUbepf8uf9LnPGzAg/o.jpg", caption="caption 3", label="Menu", tag="Review"),
        Image(user_id=4, business_id=1, review_id=3, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/HTRGC3fol8j9lPxPCowHFA/o.jpg", caption="caption 4", label="Drink", tag="Review"),
        Image(user_id=5, business_id=1, review_id=4, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/hyO3wz-W4E_oAWU_sTYijA/o.jpg", caption="caption 5", label="Food", tag="Review"),
        Image(user_id=6, business_id=1, review_id=5, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/Fc-93RRF4HqqbbAsd0vR2A/o.jpg", caption="caption 6", label="Menu", tag="Review"),
        Image(user_id=7, business_id=2, review_id=6, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/9FCE_bvAUz7McAOrQbd5Cg/o.jpg", caption="caption 7", label="Drink", tag="Review"),
        Image(user_id=8, business_id=2, review_id=7, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/3oSK3kviVbFtjKY7TAqTfA/o.jpg", caption="caption 8", label="Food", tag="Review"),
        Image(user_id=9, business_id=2, review_id=8, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/uOhMpv-8ZgnBd-zF4w3e2Q/o.jpg", caption="caption 9", label="Menu", tag="Review"),
        Image(user_id=10, business_id=2, review_id=9, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/qScgyULzVrYmDxCg5tK0Ew/o.jpg", caption="caption 10", label="Drink", tag="Review"),
        Image(user_id=2, business_id=2, review_id=10, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/vENwGiNjEj_9eDnIvQCuxw/o.jpg", caption="caption 2", label="Food", tag="Review"),
        Image(user_id=3, business_id=3, review_id=11, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/VyM8tgaTsNnK_Hz9gT0oMQ/o.jpg", caption="caption 3", label="Menu", tag="Review"),
        Image(user_id=4, business_id=3, review_id=12, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/OXkevQoW41QGXG9-1H4N9Q/o.jpg", caption="caption 4", label="Drink", tag="Review"),
        Image(user_id=5, business_id=3, review_id=13, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/WyrbYzKDrf5VHSFzXYHPRg/o.jpg", caption="caption 5", label="Food", tag="Review"),
        Image(user_id=6, business_id=3, review_id=14, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/9qz4gjRDKls7h0GOvxRVYg/o.jpg", caption="caption 6", label="Menu", tag="Review"),
        Image(user_id=7, business_id=3, review_id=15, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/ekxzsU7ehNAeC5OCkqSqUw/o.jpg", caption="caption 7", label="Drink", tag="Review"),
        Image(user_id=8, business_id=4, review_id=16, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/TLurgelsdPzyJdiupIdy8g/o.jpg", caption="caption 8", label="Food", tag="Review"),
        Image(user_id=9, business_id=4, review_id=17, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/kfhXcdZ1MDHTZF_nW7dbFw/o.jpg", caption="caption 9", label="Menu", tag="Review"),
        Image(user_id=10, business_id=4, review_id=18, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/zVAwG9oCkyYG8Z1RI6DtcA/o.jpg", caption="caption 10", label="Drink", tag="Review"),
        Image(user_id=1, business_id=4, review_id=19, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/A45sudg0pMpJi7fFuFql-g/o.jpg", caption="caption 1", label="Food", tag="Review"),
        Image(user_id=3, business_id=4, review_id=20, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/r9JE-p3FylBK6RPj0PhyDQ/o.jpg", caption="caption 3", label="Menu", tag="Review"),
        Image(user_id=4, business_id=5, review_id=21, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/P5RefogD-AYBKcKDeP3W9A/o.jpg", caption="caption 4", label="Drink", tag="Review"),
        Image(user_id=5, business_id=5, review_id=22, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/Nvlwa2M4gOfSidgwHUTgMg/o.jpg", caption="caption 5", label="Food", tag="Review"),
        Image(user_id=6, business_id=5, review_id=23, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/2jP5nzbu9Sef_j5H89vatw/o.jpg", caption="caption 6", label="Menu", tag="Review"),
        Image(user_id=7, business_id=5, review_id=24, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/pWgAbYq2M7FahHkEXDylaQ/o.jpg", caption="caption 7", label="Drink", tag="Review"),
        Image(user_id=8, business_id=5, review_id=25, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/cQA6O6DKqU_jeheZjYeLzg/o.jpg", caption="caption 8", label="Food", tag="Review"),
        Image(user_id=9, business_id=6, review_id=26, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/U-PSgtAnyXqKtrY_zMj_NA/o.jpg", caption="caption 9", label="Menu", tag="Review"),
        Image(user_id=10, business_id=6, review_id=27, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/RKby9wew-cjfUQ3dFHG9NQ/o.jpg", caption="caption 10", label="Drink", tag="Review"),
        Image(user_id=1, business_id=6, review_id=28, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/4WElSu-Nf63nOfeqSCL_0w/o.jpg", caption="caption 1", label="Food", tag="Review"),
        Image(user_id=2, business_id=6, review_id=29, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/CaWX7zjs7rb-ZE055C5xLw/o.jpg", caption="caption 2", label="Menu", tag="Review"),
        Image(user_id=4, business_id=6, review_id=30, image_url="https://s3-media0.fl.yelpcdn.com/bphoto/5P6B6fLl1PcApcW7MwcZYQ/o.jpg", caption="caption 4", label="Drink", tag="Review"),
    ]

    db.session.add_all(objects)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()