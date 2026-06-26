# Project 1 — First Blink

## The Hello World of Hardware

**Time:** 45–60 minutes
**Difficulty:** Beginner
**Requires:** micro:bit, USB cable

---

## What You're Building

A program that:
1. Displays your name scrolling across the LED grid
2. Blinks a heart
3. Shows a countdown from 5 to 0
4. Displays "CANDY BIZ" when button A is pressed

Simple? Yes. But by the end you'll understand loops, variables, functions, and conditionals — the four most important ideas in programming.

---

## No External Wiring Needed

This project uses ONLY the micro:bit itself. No breadboard. No wires. Just the micro:bit and USB.

Connect your micro:bit to your laptop and open Mu Editor. Select "BBC micro:bit" mode.

---

## The Code

Open `blink.py` in Mu Editor (or type it from scratch — typing is better for learning).

```python
from microbit import *

# Your name scrolls across the display when it starts
display.scroll("RICARDO", delay=100)

# Show a heart
display.show(Image.HEART)
sleep(1000)

# Main loop - runs forever
while True:
    # Check if Button A is pressed
    if button_a.was_pressed():
        display.scroll("CANDY BIZ", delay=80)
    
    # Check if Button B is pressed
    elif button_b.was_pressed():
        # Countdown from 5
        for i in range(5, 0, -1):
            display.show(str(i))
            sleep(500)
        display.show(Image.YES)
        sleep(500)
    
    # If no button, pulse the heart
    else:
        display.show(Image.HEART)
        sleep(600)
        display.show(Image.HEART_SMALL)
        sleep(600)
```

Click **Flash** to upload it to your micro:bit.

---

## Watch What Happens

After flashing:
1. Your name scrolls across the LEDs
2. A heart appears and pulses
3. Press Button A → "CANDY BIZ" scrolls
4. Press Button B → Counts down 5, 4, 3, 2, 1, then shows a checkmark

---

## Understand What You Just Built

**Don't skip this part. This is the learning.**

### `from microbit import *`
This imports the micro:bit library — all the functions that let you control the hardware. You need this in every micro:bit program.

### `display.scroll("text")`
Scrolls text across the 5x5 LED grid. `delay` controls speed — lower number = faster scroll.

### `display.show(Image.HEART)`
Shows a built-in image. Other images: `Image.HAPPY`, `Image.SAD`, `Image.ARROW_N`, `Image.SKULL`, and many more.

### `sleep(1000)`
Pauses for 1000 milliseconds = 1 second. `sleep(500)` = half a second.

### `while True:`
An infinite loop. Everything inside runs forever — until you unplug the micro:bit or flash new code.

### `if button_a.was_pressed():`
Checks if Button A was pressed since the last time you checked. This is a **conditional** — code that only runs sometimes.

### `for i in range(5, 0, -1):`
A **for loop** that counts down. `range(5, 0, -1)` means: start at 5, go down to 1, step by -1.

---

## Experiments (Try These)

After the base project works, try these changes:

**Experiment 1:** Change the scroll speed. Make your name scroll really fast, then really slow.

**Experiment 2:** Add your own custom image. Look up `microbit Image` to see all the built-in ones, or create your own:
```python
# Custom image: a dollar sign-ish shape
money = Image("09090:"
              "09990:"
              "09090:"
              "09990:"
              "09090")
display.show(money)
```

**Experiment 3:** Add Button A+B pressed at the same time:
```python
if button_a.is_pressed() and button_b.is_pressed():
    display.scroll("BOTH!")
```

**Experiment 4:** Make the display show different things when you tilt the micro:bit.

---

## Can You Explain It?

Before you move on, make sure you can answer these out loud:

1. What does `while True` do, and why do we need it?
2. What's the difference between `display.scroll()` and `display.show()`?
3. What does `sleep(1000)` do? What about `sleep(250)`?
4. When does the code inside `if button_a.was_pressed():` run?

If you can answer all four — you've got it.

---

## Before Moving On

- [ ] Code is working on micro:bit
- [ ] You tried at least one experiment
- [ ] Code saved as `blink.py` in your GitHub repository under `microbit/project1_blink/`
- [ ] Pushed to GitHub: `git add . && git commit -m "Add Project 1 blink" && git push`
- [ ] Quick journal entry written

---

## Next Project

→ `MICROBIT/project2_candy_counter/README.md`

---

*Project 1 — Ricardo's Summer Builder Program v1.0*
