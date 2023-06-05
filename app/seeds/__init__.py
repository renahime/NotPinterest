from flask.cli import AppGroup
from .users import seed_users, undo_users
from .boards import seed_boards, undo_boards
from .pins import seed_all_pins, undo_all_pins
from .categories import seed_categories, undo_categories
from .followers import seed_followers, undo_followers

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
        undo_followers()
        undo_boards()
        undo_all_pins()
        undo_categories()
    seed_users()
    seed_followers()
    seed_categories()
    seed_boards()
    seed_all_pins()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_followers()
    undo_boards()
    undo_all_pins()
    undo_categories()

    # Add other undo functions here
