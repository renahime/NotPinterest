from flask_wtf import FlaskForm
from wtforms import StringField


class UserCategoryForm(FlaskForm):
    streetware = StringField("Streetware")
    formalwear = StringField("Formal Ware")
    dark = StringField("Dark")
    boho = StringField("Boho")
    old_money = StringField("Old Money")
    athleisure = StringField("Athleisure")