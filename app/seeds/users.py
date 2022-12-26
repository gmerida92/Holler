from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    objects = [
        User(first_name = "Demo", last_name = "User", profile_name = "Demo U.", email = "demouser@gmail.com", password = "password1234", biography = "I am pretty cool", location ="Miami, FL", review_count =50 , profile_image= "https://www.meme-arsenal.com/memes/4780e9dca641c9eb02521a54d8995c61.jpg"),
        User(first_name = "George", last_name = "Merida", profile_name = "George M.", email = "gmerida@gmail.com", password = "password1234", biography = "I like to eat", location ="Los Angeles, CA", review_count =100 , profile_image= "https://dickjamesjones.files.wordpress.com/2015/01/curiousgeorgepretender.jpg"),
        User(first_name = "Ashli", last_name = "Santos", profile_name = "Ashli S.", email = "asantos@gmail.com", password = "password1234", biography = "I like to eat too", location ="Buena Park, CA", review_count =25 , profile_image= "https://ichef.bbci.co.uk/news/976/cpsprodpb/F382/production/_123883326_852a3a31-69d7-4849-81c7-8087bf630251.jpg"),
        User(first_name = "Hans", last_name = "Meckler", profile_name = "Hans M.", email = "hmeckler@gmail.com", password = "password1234", biography = "I only eat at reasonable priced places", location ="Los Angeles, CA", review_count =15 , profile_image= "https://cdn.vox-cdn.com/thumbor/xBIBkXiGLcP-kph3pCX61U7RMPY=/0x0:1400x788/1200x800/filters:focal(588x282:812x506)/cdn.vox-cdn.com/uploads/chorus_image/image/70412073/0377c76083423a1414e4001161e0cdffb0b36e1f_760x400.0.png"),
        User(first_name = "Tony", last_name = "Stark", profile_name = "Tony S.", email = "tstark@gmail.com", password = "password1234", biography = "I only eat at expensive places", location ="Malibu, CA", review_count =63 , profile_image= "https://s3-ap-northeast-1.amazonaws.com/psh-ex-ftnikkei-3937bb4/images/5/3/5/8/28668535-1-eng-GB/%E3%82%BD%E3%83%8B%E3%83%BC%E4%B8%8A%EF%BC%89%E8%BF%BD%E5%8A%A0%E3%80%80%E9%AC%BC%E6%BB%85%E3%81%AE%E5%88%8320200805183428557_Data.jpg"),
        User(first_name = "Akito", last_name = "Sohma", profile_name = "Akito S.", email = "asohma@gmail.com", password = "password1234", biography = "I only eat with certain people", location ="New York, NY", review_count =78 , profile_image= "https://i.pinimg.com/736x/d5/9b/0c/d59b0c5839396c768023c6b5900af8f3.jpg"),
        User(first_name = "Violet", last_name = "Evergarden", profile_name = "Violet E.", email = "vevergarden@gmail.com", password = "password1234", biography = "I travel the world eating", location ="Portland, OR", review_count =115 , profile_image= "https://media.timeout.com/images/105908216/750/422/image.jpg"),
        User(first_name = "Liam", last_name = "Neeson", profile_name = "Liam N.", email = "lneeson@gmail.com", password = "password1234", biography = "I eat where I am needed", location ="Seattle, WA", review_count =11 , profile_image= "https://static.fandomspot.com/images/04/14000/00-featured-dark-smiling-blindfolded-satoru-anime-character.jpg"),
        User(first_name = "Noah", last_name = "Trevor", profile_name = "Noah T.", email = "ntrevor@gmail.com", password = "password1234", biography = "I like to eat at random things", location ="Austin, TX", review_count =7 , profile_image= "https://images.wondershare.com/filmora/article-images/2-kakashi-hatake.jpg"),
        User(first_name = "Olivia", last_name = "Wilde", profile_name = "Olivia W.", email = "owilde@gmail.com", password = "password1234", biography = "I eat with my favorite person", location ="Las Vegas, NV", review_count =223 , profile_image= "https://replicate.delivery/mgxm/64bfb221-6b36-4e5d-8f81-77d7b2adecf9/out..jpg"),
    ]

    db.session.bulk_save_objects(objects)
    db.session.commit()

    # demo = User(
    #     username='Demo', email='demo@aa.io', password='password')
    # marnie = User(
    #     username='marnie', email='marnie@aa.io', password='password')
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')

    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()