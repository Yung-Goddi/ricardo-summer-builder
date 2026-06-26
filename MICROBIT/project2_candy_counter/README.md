# Project 2 — Candy Counter

## Count Your Sales in Real Time

**Time:** 60–90 minutes
**Difficulty:** Beginner
**Requires:** micro:bit, USB cable (no extra wiring needed)

---

## What You're Building

A handheld candy sales counter.

When you make a sale, press Button A. The counter goes up by 1. The micro:bit shows the current count.

Press Button B to see your total at the end of the day.

Hold both buttons to reset the counter to zero.

This is actually useful. You could use this at a real candy sale.

---

## The Idea

This project teaches you the most important concept in programming: **state**.

State is just "what's the current value of a variable?"

Your counter has state: it starts at 0, goes up when you press A, and gets stored until you reset it.

Almost every useful program manages state. Your inventory, your order count, your dashboard — all state.

---

## No Wiring Needed

Just your micro:bit and USB cable.

---

## The Code

```python
from microbit import *

# ============================================================
# Project 2: Candy Counter
# Press A to count a sale
# Press B to see total
# Hold A+B to reset
# ============================================================

sales_count = 0       # How many sales today
sales_total = 0.00    # Placeholder for later

# Show startup message
display.scroll("CANDY COUNTER", delay=80)
display.show("0")

while True:

    # Button A: record a sale
    if button_a.was_pressed():
        sales_count += 1
        display.show(str(sales_count))
        sleep(100)

    # Button B: show total count with scroll
    elif button_b.was_pressed():
        message = "SALES: " + str(sales_count)
        display.scroll(message, delay=80)
        display.show(str(sales_count))

    # Both buttons: reset counter
    elif button_a.is_pressed() and button_b.is_pressed():
        display.scroll("RESET", delay=80)
        sales_count = 0
        display.show("0")
        sleep(1000)

    # If count is over 9, show a compact display
    if sales_count >= 10:
        display.scroll(str(sales_count), delay=80, wait=False)
```

Flash this to your micro:bit and start counting candy sales.

---

## Understand What You Built

### Variables
```python
sales_count = 0
```
A variable stores a value. `sales_count` starts at 0 and changes every time you press Button A.

### `sales_count += 1`
This is shorthand for `sales_count = sales_count + 1`. Take the current value, add 1, save it back. This is how you keep a running count.

### `str(sales_count)`
The `display.show()` function needs text (a string), not a number. `str()` converts a number to text.

### State Between Loops
Notice that `sales_count` keeps its value between each time the `while True` loop runs. That's state. The variable remembers.

---

## Level Up: Add Price Tracking

Once the basic counter works, try adding a price per candy:

```python
from microbit import *

sales_count = 0
price_per_candy = 0.50   # Change this to your actual price

display.scroll("CANDY COUNTER", delay=80)
display.show("0")

while True:
    if button_a.was_pressed():
        sales_count += 1
        display.show(str(sales_count))
        sleep(100)

    elif button_b.was_pressed():
        total_money = sales_count * price_per_candy
        # Show sales count then estimated earnings
        display.scroll("SALES:" + str(sales_count), delay=80)
        # Can't show decimals easily — show cents instead
        cents = int(total_money * 100)
        display.scroll("CENTS:" + str(cents), delay=80)

    elif button_a.is_pressed() and button_b.is_pressed():
        display.scroll("RESET", delay=80)
        sales_count = 0
        display.show("0")
        sleep(1000)
```

---

## Experiments

**Experiment 1:** Change `price_per_candy` to what you actually charge. Does the math work out correctly?

**Experiment 2:** Add a "goal" — if you hit 20 sales, show a trophy image. The `Image.HAPPY` or a custom dollar-sign image work well.

**Experiment 3:** What happens if you press Button A 15 times? The micro:bit's LED grid is only 5x5 — it can only show one digit at a time without scrolling. How would you fix this?

---

## Can You Explain It?

1. What is a variable? Give an example from this code.
2. What does `sales_count += 1` mean? Write it the long way.
3. Why do we need `str()` when showing a number?
4. What's the difference between `button_a.was_pressed()` and `button_a.is_pressed()`?

---

## Real World Connection

You could actually use this. Next time you're selling candy, put the micro:bit in your pocket. Every sale, tap Button A. At the end, press Button B to see your count.

Later in this program, you'll build a Google Sheets system where you log that count at the end of each day.

This is how technology connects — a little counter feeds into a bigger system.

---

## Before Moving On

- [ ] Counter is working on micro:bit
- [ ] You tested: pressing A increments, B shows total, both resets
- [ ] Tried at least one experiment
- [ ] Code saved and pushed to GitHub under `microbit/project2_candy_counter/`
- [ ] Journal entry written

---

## Next Project

→ `MICROBIT/project3_temp_sensor/README.md`

---

*Project 2 — Ricardo's Summer Builder Program v1.0*
