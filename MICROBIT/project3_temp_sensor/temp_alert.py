from microbit import *

# ============================================================
# Project 3: Temperature Alert
# Ricardo's Candy Storage Monitor
# ============================================================
# Monitors temperature using micro:bit's built-in sensor.
# Alerts if it gets too hot for candy storage.
# No external wiring required!
# ============================================================

HOT_THRESHOLD = 29    # Celsius (~84°F) — candy danger zone
WARM_THRESHOLD = 25   # Celsius (~77°F) — getting warm
CALIBRATION = -3      # Offset to correct for chip heat (adjust to match real thermometer)

THERM_LOW = Image(
    "00900:"
    "09990:"
    "09090:"
    "09090:"
    "09990"
)

THERM_HIGH = Image(
    "00900:"
    "09990:"
    "09990:"
    "09990:"
    "09990"
)


def celsius_to_f(temp_c):
    return round((temp_c * 9 / 5) + 32, 1)


def show_reading(temp_c):
    temp_f = celsius_to_f(temp_c)

    if temp_c >= HOT_THRESHOLD:
        display.show(Image.SKULL)
        sleep(600)
        display.scroll("HOT! " + str(temp_f) + "F", delay=80)
        for _ in range(3):
            display.show(Image.ARROW_N)
            sleep(250)
            display.clear()
            sleep(250)

    elif temp_c >= WARM_THRESHOLD:
        display.show(THERM_HIGH)
        sleep(600)
        display.scroll("WARM " + str(temp_f) + "F", delay=80)

    else:
        display.show(THERM_LOW)
        sleep(400)
        display.scroll("OK " + str(temp_f) + "F", delay=80)


# Startup message
display.scroll("TEMP MONITOR", delay=80)
sleep(500)

while True:
    # Read sensor with calibration offset
    temp_c = temperature() + CALIBRATION

    show_reading(temp_c)

    # Show temperature as a number between readings
    temp_f_int = int(celsius_to_f(temp_c))
    display.scroll(str(temp_f_int) + "F", delay=80, wait=False)
    sleep(5000)
