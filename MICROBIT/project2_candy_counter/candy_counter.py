from microbit import *

# ============================================================
# Project 2: Candy Counter
# Ricardo's Summer Builder Program
# ============================================================
# Press A  → count one sale
# Press B  → show total sales and estimated earnings
# Hold A+B → reset to zero
# ============================================================

sales_count = 0
price_per_candy = 0.50  # Change this to your real price

# Startup
display.scroll("CANDY COUNTER", delay=80)
display.show("0")

while True:

    # Button A: record a sale
    if button_a.was_pressed():
        sales_count += 1
        if sales_count < 10:
            display.show(str(sales_count))
        else:
            display.scroll(str(sales_count), delay=80, wait=False)
        sleep(100)

    # Button B: show summary
    elif button_b.was_pressed():
        total_cents = int(sales_count * price_per_candy * 100)
        display.scroll("SALES:" + str(sales_count) + " CENTS:" + str(total_cents), delay=80)
        # Return to showing count
        if sales_count < 10:
            display.show(str(sales_count))
        else:
            display.scroll(str(sales_count), delay=80, wait=False)

    # Both buttons held: reset
    elif button_a.is_pressed() and button_b.is_pressed():
        display.scroll("RESET!", delay=80)
        sales_count = 0
        display.show("0")
        sleep(1500)
