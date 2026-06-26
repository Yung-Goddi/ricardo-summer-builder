# Project 3 — Temperature Alert

## Monitor Your Candy Storage

**Time:** 60–90 minutes
**Difficulty:** Beginner-Intermediate
**Requires:** micro:bit, USB cable (built-in temp sensor — no wiring needed!)

---

## What You're Building

A temperature monitor that:
- Reads the temperature every 5 seconds
- Shows the temperature on the LED display
- Flashes a warning if it gets too hot (candy melts!)
- Shows a thermometer icon for the current heat level

This is a real use case. Chocolate and some candy gets ruined in heat. If you're storing or transporting candy, knowing the temperature matters.

---

## Good News: No Wiring Needed

The micro:bit has a built-in temperature sensor on the processor chip. It's not the most precise thermometer in the world, but it's accurate enough for this project and means zero wiring.

---

## The Code

```python
from microbit import *

# ============================================================
# Project 3: Temperature Alert
# Ricardo's Candy Storage Monitor
# ============================================================

# Temperature threshold — change this to match your needs
# 75°F = about 24°C (comfortable room temp)
# 85°F = about 29°C (getting warm, candy at risk)
HOT_THRESHOLD = 29    # in Celsius
WARM_THRESHOLD = 25   # in Celsius

# Thermometer images (low to high)
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

def get_temp_f(temp_c):
    """Convert Celsius to Fahrenheit"""
    return (temp_c * 9/5) + 32

def show_temp_reading(temp_c):
    """Display temperature and appropriate warning"""
    temp_f = get_temp_f(temp_c)

    if temp_c >= HOT_THRESHOLD:
        # DANGER — candy melting range
        display.show(Image.SKULL)
        sleep(500)
        display.scroll("HOT! " + str(temp_f) + "F", delay=80)
        # Flash warning
        for _ in range(3):
            display.show(Image.ARROW_N)
            sleep(300)
            display.clear()
            sleep(300)
    elif temp_c >= WARM_THRESHOLD:
        # WARNING — getting warm
        display.show(THERM_HIGH)
        sleep(500)
        display.scroll("WARM " + str(temp_f) + "F", delay=80)
    else:
        # GOOD — temperature is fine
        display.show(THERM_LOW)
        sleep(500)
        display.scroll("OK " + str(temp_f) + "F", delay=80)

# Startup
display.scroll("TEMP MONITOR", delay=80)
sleep(500)

while True:
    # Read the built-in temperature sensor
    temp_c = temperature()

    # Show current reading
    show_temp_reading(temp_c)

    # Wait 5 seconds before next reading
    # During wait, show the temp on display
    temp_f = int(get_temp_f(temp_c))
    display.scroll(str(temp_f) + "F", delay=80, wait=False)
    sleep(5000)
```

---

## Understand What You Built

### `temperature()`
A built-in micro:bit function. Returns the temperature in Celsius as a number. Call it anytime you want the current temperature.

### Functions (the `def` keyword)
You defined two functions:
- `get_temp_f(temp_c)` — Converts Celsius to Fahrenheit
- `show_temp_reading(temp_c)` — Shows the right message based on temperature

**Why use functions?**
Instead of writing the conversion math and display logic everywhere, you write it once in a function, then call the function wherever you need it. This is called **DRY** — Don't Repeat Yourself. It's one of the most important rules in programming.

### Custom Images
```python
THERM_LOW = Image(
    "00900:"
    "09990:"
    ...
)
```
Each row is 5 characters. `0` = off, `9` = max brightness. You can draw any 5x5 shape this way.

### `for _ in range(3):`
The underscore `_` is used when you need a loop variable but don't actually need to use the variable inside the loop. It's a convention that says "I'm looping 3 times, I don't need to track which number I'm on."

---

## Calibrate Your Sensor

The micro:bit's built-in temperature sensor reads the chip temperature, which is usually a few degrees higher than the air temperature.

**Calibration experiment:**
1. Run the program
2. Note what temperature it shows
3. Compare with a real thermometer (or look up current room temperature)
4. Adjust the readings:

```python
# Add this calibration offset to get closer to real air temperature
CALIBRATION_OFFSET = -3   # Subtract 3 degrees to correct for chip heat
temp_c = temperature() + CALIBRATION_OFFSET
```

---

## Experiments

**Experiment 1:** Breathe on the micro:bit for 30 seconds. Does the temperature go up?

**Experiment 2:** Put the micro:bit in a warm spot (near a lamp, in the sun). Does it trigger the warning?

**Experiment 3:** Add a third threshold for "freezing" (below 15°C / 59°F) — maybe your candy is stored somewhere too cold.

**Experiment 4:** Instead of scrolling text, can you show JUST the temperature as a scrolling number to save time?

---

## The Bigger Picture

In this project you learned about **functions** — reusable blocks of code. This is one of the most important concepts in programming.

Every large program is thousands of functions. Some do math, some read data, some update displays, some handle errors. They all work together.

You'll write functions all summer. They start to feel very natural quickly.

---

## Before Moving On

- [ ] Temperature is reading correctly
- [ ] Hot warning triggers when you warm up the sensor (breathe on it)
- [ ] You understand what a function does
- [ ] Code pushed to GitHub
- [ ] Journal entry written

---

## Next Project

→ `MICROBIT/project4_motion_alarm/README.md`

---

*Project 3 — Ricardo's Summer Builder Program v1.0*
