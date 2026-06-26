# Project 4 — Motion Alarm

## Candy Storage Security System

**Time:** 90–120 minutes
**Difficulty:** Intermediate
**Requires:** micro:bit, breadboard, PIR motion sensor (from kit), wires

---

## What You're Building

A motion-detecting security alarm for your candy storage.

When someone approaches your candy stash, the PIR sensor detects them. The micro:bit shows a warning, flashes the LED display, and (if you have a buzzer) makes noise.

This project is the first one with external wiring. Take it slow. Check every connection before powering on.

---

## Understanding the PIR Sensor

PIR = Passive Infrared.

This sensor detects the infrared radiation (heat) that comes from moving bodies. When you walk in front of it, you're warmer than the background — the sensor detects that difference and sends a signal.

Your kit contains a PIR sensor that outputs:
- **HIGH (1)** when motion is detected
- **LOW (0)** when no motion

---

## Wiring Diagram

```
PIR Sensor Pinout (look at the back of your sensor):
  [VCC]  [GND]  [OUT]
    |      |      |
    |      |      └──── micro:bit Pin 0
    |      └─────────── micro:bit GND
    └────────────────── micro:bit 3V
```

**Step-by-step wiring:**

1. Place the PIR sensor on the breadboard
2. Connect PIR **VCC** → micro:bit **3V** (red wire)
3. Connect PIR **GND** → micro:bit **GND** (black wire)
4. Connect PIR **OUT** → micro:bit **Pin 0** (any colored wire)

**Before you power on:** Double-check all three connections. Wrong wiring won't break anything, but it won't work either.

---

## The Code

```python
from microbit import *

# ============================================================
# Project 4: Motion Alarm (Candy Security System)
# PIR sensor → Pin 0
# ============================================================

ALARM_ON = False       # Track alarm state
motion_count = 0       # How many times motion detected

# Custom alert image
ALERT = Image(
    "90009:"
    "09090:"
    "00900:"
    "09090:"
    "90009"
)

def trigger_alarm():
    """What happens when motion is detected"""
    global motion_count
    motion_count += 1

    # Flash the display 3 times
    for _ in range(3):
        display.show(ALERT)
        sleep(300)
        display.clear()
        sleep(200)

    # Show warning message
    display.scroll("INTRUDER! #" + str(motion_count), delay=70)
    display.show(Image.ANGRY)

def show_status():
    """Show current status"""
    display.scroll("SECURE | ALERTS:" + str(motion_count), delay=80)
    display.show(Image.YES)

# Startup
display.scroll("SECURITY ON", delay=80)
display.show(Image.HAPPY)

while True:
    # Read the PIR sensor on Pin 0
    # pin0.read_digital() returns 1 when motion detected, 0 when clear
    motion_detected = pin0.read_digital()

    if motion_detected:
        trigger_alarm()
        # Keep showing angry face for 3 seconds after detection
        sleep(3000)
        display.show(Image.YES)

    # Button A: show how many alerts happened
    if button_a.was_pressed():
        show_status()

    # Button B: reset alert count
    if button_b.was_pressed():
        motion_count = 0
        display.scroll("RESET", delay=80)
        display.show(Image.YES)

    sleep(100)   # Small pause to avoid reading too fast
```

---

## Understanding the New Concepts

### `pin0.read_digital()`
Reads Pin 0 on the micro:bit. Returns `1` (HIGH) or `0` (LOW).

When the PIR sensor detects motion, it sends 1. When it doesn't, it sends 0.

This is how you talk to the outside world through the micro:bit pins.

### `global motion_count`
When you use a variable inside a function, Python sometimes gets confused about which variable you mean. The `global` keyword says "use the variable from outside this function, not a local copy."

This is a slightly advanced concept. The important part: if you change a variable inside a function and nothing seems to change outside, `global` is probably the fix.

### `sleep(100)` in the Main Loop
This small pause prevents the loop from running thousands of times per second. Without it, you might detect the same motion event multiple times in a row. 100ms is fast enough to catch real events but slow enough to avoid duplicates.

---

## PIR Sensor Calibration

PIR sensors usually have adjustment knobs:
- **Sensitivity** — How far away it detects (turn clockwise = more sensitive)
- **Time** — How long the output stays HIGH after detection

For this project, maximum sensitivity and minimum time works best.

---

## The Warm-Up Period

PIR sensors need 30–60 seconds to "warm up" after you power them on. During that time, they might send false positives (detecting motion when there's none).

After you flash the code and power the micro:bit, wait a minute before expecting accurate readings.

---

## Experiments

**Experiment 1:** Walk past the sensor at different distances. How far away can it detect you?

**Experiment 2:** Add a counter that tracks "safe period" — if no motion for 5 minutes, show a "ALL CLEAR" message.

**Experiment 3:** Can you add different alert levels? 1 detection = warning, 3+ detections = full alarm.

**Experiment 4:** If you have a buzzer in your kit, try connecting it to Pin 1 and making noise during the alarm.

---

## Troubleshooting

**Sensor not detecting anything:**
- Check wiring (VCC, GND, OUT in right places)
- Wait the 60-second warm-up period
- Try waving your hand slowly in front of it

**Sensor detecting constantly:**
- PIR is warming up — wait 60 seconds
- Check that OUT is on Pin 0 (not Pin 1 or Pin 2)
- The PIR might have high sensitivity — turn the sensitivity knob counterclockwise slightly

**Nothing happens at all:**
- Check that micro:bit is powered (USB connected)
- Make sure you flashed the code after wiring

---

## Before Moving On

- [ ] Motion detection is triggering correctly
- [ ] Alert count is tracking properly
- [ ] Reset button works
- [ ] You understand `pin0.read_digital()`
- [ ] Photo taken of your wiring setup
- [ ] Code pushed to GitHub
- [ ] Journal entry written

---

## Next Project

→ `MICROBIT/project5_game/README.md`

---

*Project 4 — Ricardo's Summer Builder Program v1.0*
