from .athleisure import athleisure_pins
from .boho import athleisure_pins
from .dark import dark_pins
from .formalwear import formalwear_pins
from .old_money import old_money_pins
from .streetware import streetware_pins

all_pin_seeds = []

for pin in athleisure_pins:
    all_pin_seeds.append(pin)

for pin in boho_pins:
    all_pin_seeds.append(pin)

for pin in dark_pins:
    all_pin_seeds.append(pin)

for pin in formalwear_pins:
    all_pin_seeds.append(pin)

for pin in old_money_pins:
    all_pin_seeds.append(pin)

for pin in streetware_pins:
    all_pin_seeds.append(pin)