from flask_wtf import FlaskForm
from wtforms import IntegerField


class UserCategoryForm(FlaskForm):
    streetware = IntegerField("Streetware")
    formalwear = IntegerField("Formal Ware")
    dark = IntegerField("Dark")
    boho = IntegerField("Boho")
    old_money = IntegerField("Old Money")
    athleisure = IntegerField("Athleisure")