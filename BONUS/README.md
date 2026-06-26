# Bonus Projects

## More to Build If You Want It

---

These are extra projects for if you finish ahead of schedule, want a challenge, or just want to keep going.

None of these are required. They're here because learning is better when you're curious.

---

## Bonus 1: Python Inventory Report Script

**File:** `BONUS/python_scripts/inventory_report.py`

A Python script (runs on your laptop, not the micro:bit) that reads from a CSV export of your Google Sheets inventory and generates a text report.

**What you'll learn:** Reading CSV files, Python data processing, generating reports.

---

## Bonus 2: Advanced Website Features (Ideas)

Pick one and build it:

- **Product search** — A text input that filters the product cards as you type
- **Shopping cart** — Track multiple items before submitting the order
- **Inventory badge** — Show "Only 3 left!" on products with low stock
- **Dark mode** — Add a dark/light toggle using CSS variables
- **Animations** — Animate the product cards appearing when the page loads

---

## Bonus 3: micro:bit Radio Chat

The micro:bit has a built-in radio. If you have two micro:bits, you can make them talk to each other.

Build a simple "walkie talkie" — type a message in Mu's REPL and it shows on the other micro:bit's display.

```python
from microbit import *
import radio

radio.on()
radio.config(channel=7)  # Both micro:bits need same channel

while True:
    message = radio.receive()
    if message:
        display.scroll(message)
    
    if button_a.was_pressed():
        radio.send("HI")
```

---

## Bonus 4: Automate Your Sales Report Email

Using Python and Gmail's API (or a service like `smtplib`), write a script that sends a weekly summary email to Dad with your sales numbers.

This is advanced. Look up "python send email smtplib" to start. AI can help you set it up.

---

## Bonus 5: Improve the Game

Turn Candy Catcher into something more polished:

- Add sound (look up Web Audio API)
- Add a high score board saved to `localStorage`
- Add a second difficulty button before the game starts
- Add special power-ups that fall occasionally
- Create a different visual theme (night mode, underwater, space)

---

## Bonus 6: Hardware — Servo Motor

Your kit includes a servo motor. A servo can rotate to a specific angle, which means you can build:

- A "OPEN / CLOSED" sign that physically turns
- A candy dispenser that rotates when a button is pressed
- A pointer gauge that shows how many items are in stock (like a dashboard gauge)

Look up "micro:bit Python servo" for the code to control it.

---

## Bonus 7: Learn One New Language

You've spent the summer with Python and JavaScript.

As a bonus stretch, spend a week doing something in a completely different language.

Options:
- **SQL** — Learn the basics of database queries. Free at `sqlbolt.com`
- **TypeScript** — JavaScript with types. Makes big JavaScript projects much easier.
- **Bash/Shell scripting** — Automate tasks on your laptop

Even 5 hours in a new language expands how you think about programming.

---

*Bonus Projects — Ricardo's Summer Builder Program v1.0*
