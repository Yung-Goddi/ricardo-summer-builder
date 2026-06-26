from microbit import *

# ============================================================
# Project 4: Motion Alarm (Candy Security System)
# Ricardo's Summer Builder Program
# ============================================================
# Wiring:
#   PIR VCC  → micro:bit 3V
#   PIR GND  → micro:bit GND
#   PIR OUT  → micro:bit Pin 0
# ============================================================

motion_count = 0

ALERT = Image(
    "90009:"
    "09090:"
    "00900:"
    "09090:"
    "90009"
)


def trigger_alarm():
    global motion_count
    motion_count += 1

    for _ in range(3):
        display.show(ALERT)
        sleep(300)
        display.clear()
        sleep(200)

    display.scroll("INTRUDER! #" + str(motion_count), delay=70)
    display.show(Image.ANGRY)


def show_status():
    display.scroll("SECURE | ALERTS: " + str(motion_count), delay=80)
    display.show(Image.YES)


# Startup
display.scroll("SECURITY ON", delay=80)
display.show(Image.HAPPY)

while True:
    motion_detected = pin0.read_digital()

    if motion_detected:
        trigger_alarm()
        sleep(3000)
        display.show(Image.YES)

    if button_a.was_pressed():
        show_status()

    if button_b.was_pressed():
        motion_count = 0
        display.scroll("RESET", delay=80)
        display.show(Image.YES)

    sleep(100)
