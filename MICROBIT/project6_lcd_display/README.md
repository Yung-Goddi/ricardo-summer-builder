# Project 6 — LCD Business Display

## Show Your Business Stats on a Real Screen

**Time:** 90–120 minutes
**Difficulty:** Intermediate
**Requires:** micro:bit, breadboard, LCD (16x2 I2C), wires

---

## What You're Building

A 16-character x 2-line LCD display that shows your candy business stats:

```
CANDY BIZ v1.0  
Sales:12 $6.00  
```

Press Button A to cycle through different screens:
- Screen 1: Today's sales count + revenue
- Screen 2: Temperature (is candy storage ok?)
- Screen 3: "OPEN FOR BUSINESS" or "CLOSED"

This is your first project that combines what you've already built (the counter and temperature sensor) into one bigger system.

---

## The LCD in Your Kit

Your kit includes a 16x2 LCD with an I2C module attached. The I2C module is the small board on the back of the LCD with 4 pins:

```
[VCC]  [GND]  [SDA]  [SCL]
```

**I2C** is a communication protocol — a standard way for the micro:bit to send commands to the LCD using just 2 wires (SDA and SCL). This is much better than the 6+ wires a non-I2C LCD would need.

---

## Wiring

```
LCD Module    →    micro:bit
─────────────────────────────
VCC           →    3.3V (or 5V if your kit has a 5V source)
GND           →    GND
SDA           →    Pin 20 (SDA)
SCL           →    Pin 19 (SCL)
```

**Important:** The I2C pins on micro:bit are Pin 19 (SCL) and Pin 20 (SDA). These are fixed — you can't use other pins for I2C.

---

## The I2C Address

Every I2C device has an address so the micro:bit knows which device it's talking to.

Your LCD's I2C address is almost certainly `0x27` or `0x3F`. Try `0x27` first.

---

## The Code

The micro:bit doesn't have a built-in LCD library, so we write our own. This is actually a great learning experience — you'll see how hardware communication works under the hood.

```python
from microbit import *

# ============================================================
# Project 6: LCD Business Display
# Ricardo's Summer Builder Program
# ============================================================
# LCD wiring:
#   VCC → 3V (or external 5V)
#   GND → GND
#   SDA → Pin 20
#   SCL → Pin 19
# ============================================================

LCD_ADDR = 0x27    # Try 0x3F if this doesn't work

# LCD command constants
LCD_CMD = 0
LCD_DATA = 1
ENABLE_BIT = 0b00000100
BACKLIGHT = 0b00001000

# ---- Low-level LCD functions ---- #

def lcd_strobe(data):
    """Send enable pulse to LCD"""
    i2c.write(LCD_ADDR, bytes([data | ENABLE_BIT | BACKLIGHT]))
    sleep(1)
    i2c.write(LCD_ADDR, bytes([(data & ~ENABLE_BIT) | BACKLIGHT]))
    sleep(1)

def lcd_write_four_bits(data):
    """Write 4 bits to LCD"""
    i2c.write(LCD_ADDR, bytes([data | BACKLIGHT]))
    lcd_strobe(data)

def lcd_write(cmd, mode=LCD_CMD):
    """Write a byte to LCD"""
    lcd_write_four_bits(mode | (cmd & 0xF0))
    lcd_write_four_bits(mode | ((cmd << 4) & 0xF0))

def lcd_init():
    """Initialize the LCD"""
    sleep(50)
    lcd_write_four_bits(0x30)
    sleep(5)
    lcd_write_four_bits(0x30)
    sleep(1)
    lcd_write_four_bits(0x30)
    sleep(1)
    lcd_write_four_bits(0x20)  # Set to 4-bit mode
    sleep(1)
    lcd_write(0x28)  # 4-bit, 2-line, 5x7
    lcd_write(0x0C)  # Display on, cursor off
    lcd_write(0x06)  # Entry mode: increment, no shift
    lcd_write(0x01)  # Clear display
    sleep(5)

def lcd_clear():
    """Clear the display"""
    lcd_write(0x01)
    sleep(5)

def lcd_set_cursor(row, col):
    """Move cursor to row (0 or 1), col (0-15)"""
    row_offsets = [0x00, 0x40]
    lcd_write(0x80 | (col + row_offsets[row]))

def lcd_print(text):
    """Print text at current cursor position"""
    for char in text:
        lcd_write(ord(char), LCD_DATA)

def lcd_show(line1, line2=""):
    """Show two lines on LCD"""
    lcd_clear()
    lcd_set_cursor(0, 0)
    lcd_print(line1[:16])     # Truncate to 16 chars
    if line2:
        lcd_set_cursor(1, 0)
        lcd_print(line2[:16])

# ---- Business Display ---- #

sales = 0
price = 0.50          # Your price per candy
is_open = True        # Business open/closed
current_screen = 0    # Which screen to show
CALIBRATION = -3      # Temperature calibration

def get_temp_f():
    """Get temperature in Fahrenheit"""
    return round(((temperature() + CALIBRATION) * 9 / 5) + 32, 1)

def show_screen(screen_num):
    """Display the right screen"""
    if screen_num == 0:
        # Sales screen
        revenue = round(sales * price, 2)
        lcd_show(
            "CANDY BIZ SALES ",
            "Qty:{} Rev:${:.2f}".format(sales, revenue)
        )
    elif screen_num == 1:
        # Temperature screen
        temp = get_temp_f()
        status = "OK" if temp < 84 else "HOT!"
        lcd_show(
            "STORAGE TEMP    ",
            "{:.1f}F  Status:{}".format(temp, status)
        )
    elif screen_num == 2:
        # Business status screen
        status = "OPEN  " if is_open else "CLOSED"
        lcd_show(
            "BUSINESS STATUS ",
            status + " Sales:" + str(sales)
        )

# ---- Startup ---- #
lcd_init()
lcd_show("CANDY BIZ v1.0  ", "Starting up...  ")
sleep(1500)

display.scroll("LCD ON", delay=80)

# ---- Main loop ---- #
while True:
    # Update current screen
    show_screen(current_screen)

    # Button A: cycle through screens
    if button_a.was_pressed():
        current_screen = (current_screen + 1) % 3
        display.show(str(current_screen + 1))

    # Button B: add a sale (quick counter)
    if button_b.was_pressed():
        sales += 1
        display.show(str(sales) if sales < 10 else Image.YES)
        # Immediately show updated sales screen
        current_screen = 0

    sleep(2000)   # Refresh every 2 seconds
```

---

## Understand What You Built

### I2C Communication
You're talking to the LCD through I2C. The functions at the top (`lcd_strobe`, `lcd_write_four_bits`, etc.) are the "language" of I2C LCD communication.

These functions are boilerplate — code that's standard for this hardware. In real projects, someone else usually writes these. But now you've seen it, and you understand that "talking to hardware" is just sending specific sequences of bytes.

### `i2c.write(LCD_ADDR, bytes([data]))`
This is the actual hardware communication. You send data to the LCD's I2C address, and the LCD does what you told it.

### Formatting Numbers in Python
```python
"Rev:${:.2f}".format(revenue)
```
`:.2f` means "format as a decimal number with 2 places after the decimal." This is how you make `6.0` show as `$6.00`.

### Combining Multiple Projects
Notice this project uses:
- Temperature reading (from Project 3)
- Sales counter logic (from Project 2)
- Button input (from Projects 1 and 2)

This is what real software development looks like. You build pieces, then combine them.

---

## Troubleshooting the LCD

**LCD shows nothing (backlight on but blank):**
- The initialization didn't work, try running again
- Your LCD might be 0x3F address: change `LCD_ADDR = 0x27` to `LCD_ADDR = 0x3F`

**LCD shows garbled characters:**
- Usually means wrong I2C address
- Try both 0x27 and 0x3F

**LCD backlight doesn't turn on:**
- Check VCC and GND connections
- Check that SDA → Pin 20 and SCL → Pin 19

**Scan for I2C address:**
```python
from microbit import *
# Scan all possible I2C addresses
for addr in range(0x08, 0x78):
    try:
        i2c.read(addr, 1)
        print("Found device at:", hex(addr))
    except OSError:
        pass
```
Run this, then check the output at the bottom of Mu Editor (REPL).

---

## Before Moving On

- [ ] LCD is showing text
- [ ] All 3 screens are working
- [ ] Sales counter updates the display
- [ ] Temperature screen shows a reading
- [ ] Code pushed to GitHub
- [ ] Photo taken of the complete setup
- [ ] Journal entry written

---

## You've Completed the micro:bit Phase!

**You built:**
1. Basic blink and button input
2. Sales counter
3. Temperature alert
4. Motion security alarm
5. A real game
6. LCD business dashboard

That's 6 hardware projects. That's a hardware portfolio most adults don't have.

Next up: `BUSINESS/README.md` — Phase 2.

---

*Project 6 — Ricardo's Summer Builder Program v1.0*
