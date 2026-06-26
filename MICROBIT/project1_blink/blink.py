from microbit import *

# ============================================================
# Project 1: First Blink
# Ricardo's Summer Builder Program
# ============================================================
# Your first micro:bit program!
# Press Button A for CANDY BIZ
# Press Button B for a countdown
# Otherwise: pulsing heart
# ============================================================

# Scroll your name when the program starts
display.scroll("RICARDO", delay=100)

# Show a heart to start
display.show(Image.HEART)
sleep(1000)

# Main loop — this runs forever
while True:

    # Button A: show candy business message
    if button_a.was_pressed():
        display.scroll("CANDY BIZ", delay=80)

    # Button B: countdown from 5
    elif button_b.was_pressed():
        for i in range(5, 0, -1):
            display.show(str(i))
            sleep(500)
        display.show(Image.YES)
        sleep(800)

    # No button: pulse heart
    else:
        display.show(Image.HEART)
        sleep(600)
        display.show(Image.HEART_SMALL)
        sleep(600)
