from microbit import *

# ============================================================
# Project 6: LCD Business Display
# Ricardo's Summer Builder Program
# ============================================================
# LCD (I2C) wiring:
#   VCC → 3V
#   GND → GND
#   SDA → Pin 20
#   SCL → Pin 19
#
# Press A → cycle screens (Sales / Temp / Status)
# Press B → add a sale quickly
# ============================================================

LCD_ADDR = 0x27       # Try 0x3F if display is blank
ENABLE_BIT = 0b00000100
BACKLIGHT = 0b00001000
LCD_CMD = 0
LCD_DATA = 1

CALIBRATION = -3      # Adjust based on your thermometer comparison
PRICE = 0.50          # Price per candy — change to your real price


def lcd_strobe(data):
    i2c.write(LCD_ADDR, bytes([data | ENABLE_BIT | BACKLIGHT]))
    sleep(1)
    i2c.write(LCD_ADDR, bytes([(data & ~ENABLE_BIT) | BACKLIGHT]))
    sleep(1)


def lcd_write_four_bits(data):
    i2c.write(LCD_ADDR, bytes([data | BACKLIGHT]))
    lcd_strobe(data)


def lcd_write(cmd, mode=LCD_CMD):
    lcd_write_four_bits(mode | (cmd & 0xF0))
    lcd_write_four_bits(mode | ((cmd << 4) & 0xF0))


def lcd_init():
    sleep(50)
    lcd_write_four_bits(0x30)
    sleep(5)
    lcd_write_four_bits(0x30)
    sleep(1)
    lcd_write_four_bits(0x30)
    sleep(1)
    lcd_write_four_bits(0x20)
    sleep(1)
    lcd_write(0x28)
    lcd_write(0x0C)
    lcd_write(0x06)
    lcd_write(0x01)
    sleep(5)


def lcd_clear():
    lcd_write(0x01)
    sleep(5)


def lcd_set_cursor(row, col):
    offsets = [0x00, 0x40]
    lcd_write(0x80 | (col + offsets[row]))


def lcd_print(text):
    for char in text:
        lcd_write(ord(char), LCD_DATA)


def lcd_show(line1, line2=""):
    lcd_clear()
    lcd_set_cursor(0, 0)
    lcd_print(line1[:16].ljust(16))
    if line2:
        lcd_set_cursor(1, 0)
        lcd_print(line2[:16].ljust(16))


def get_temp_f():
    return round(((temperature() + CALIBRATION) * 9 / 5) + 32, 1)


def show_screen(screen, sales, is_open):
    if screen == 0:
        revenue = round(sales * PRICE, 2)
        lcd_show("CANDY BIZ SALES", "Qty:{} ${:.2f}".format(sales, revenue))
    elif screen == 1:
        temp = get_temp_f()
        temp_status = "OK" if temp < 84 else "HOT!"
        lcd_show("STORAGE TEMP", "{:.1f}F  {}".format(temp, temp_status))
    elif screen == 2:
        biz_status = "OPEN  " if is_open else "CLOSED"
        lcd_show("STATUS", biz_status + " Sales:" + str(sales))


# --- Init ---
lcd_init()
lcd_show("CANDY BIZ v1.0", "Starting up...")
sleep(1500)
display.scroll("LCD READY", delay=80)

sales = 0
is_open = True
screen = 0

while True:
    show_screen(screen, sales, is_open)

    if button_a.was_pressed():
        screen = (screen + 1) % 3
        display.show(str(screen + 1))

    if button_b.was_pressed():
        sales += 1
        screen = 0
        display.show(str(sales) if sales < 10 else Image.YES)

    sleep(2000)
