from flask.cli import AppGroup
from .users import seed_users, undo_users
from .boards import seed_boards, undo_boards
from .pins import seed_pins, undo_pins
from .categories import seed_categories, undo_categories
from .rena_users import seed_rena_users, undo_rena_users
from .rena_pins import seed_rena_pins, undo_rena_pins
from .rena_boards import seed_rena_boards, undo_rena_boards


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
        undo_boards()
        undo_pins()
        undo_categories()
        # undo_rena_users()
        # undo_rena_pins()
        # undo_rena_boards()
    seed_users()
    seed_categories()
    seed_boards()
    seed_pins()
    # seed_rena_users()
    # seed_rena_boards()
    # seed_rena_pins()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_users()
    undo_boards()
    undo_pins()
    undo_categories()
    # undo_rena_users()
    # undo_rena_pins()
    # undo_rena_boards()

    # Add other undo functions here
