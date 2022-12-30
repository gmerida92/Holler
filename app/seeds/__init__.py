from flask.cli import AppGroup
from .users import seed_users, undo_users
from .reviews import seed_reviews, undo_reviews
from .images import seed_images, undo_images
from .businesses import seed_businesses, undo_businesses
from .business_hours import seed_business_hours, undo_business_hours
from .business_categories import seed_business_categories, undo_business_categories
from .business_attributes import seed_business_attributes, undo_business_attributes


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_reviews()
        undo_images()
        undo_businesses()
        undo_business_hours()
        undo_business_categories()
        undo_business_attributes()

    seed_users()
    # Add other seed functions here
    seed_reviews()
    seed_images()
    seed_businesses()
    seed_business_hours()
    seed_business_categories()
    seed_business_attributes()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_reviews()
    undo_images()
    undo_reviews()
    undo_businesses()
    undo_business_hours()
    undo_business_categories()
    undo_business_attributes()