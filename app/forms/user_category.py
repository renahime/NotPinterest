from flask_wtf import FlaskForm
from wtforms import BooleanField


class UserCategoryForm(FlaskForm):
    streetware = BooleanField("Streetware")
    formalwear = BooleanField("Formal Ware")
    dark = BooleanField("Dark")
    boho = BooleanField("Boho")
    old_money = BooleanField("Old Money")
    athleisure = BooleanField("Athleisure")