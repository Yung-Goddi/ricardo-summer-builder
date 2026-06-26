from microbit import *
import random

# ============================================================
# Project 5: Candy Dodge Game
# Ricardo's Summer Builder Program
# ============================================================
# Tilt left/right to dodge falling bombs.
# Every bomb dodged = 1 point.
# Hit a bomb = game over.
# Press A to start / play again.
# ============================================================


def get_tilt():
    x = accelerometer.get_x()
    if x < -200:
        return -1
    elif x > 200:
        return 1
    return 0


def clamp(value, min_val, max_val):
    if value < min_val:
        return min_val
    if value > max_val:
        return max_val
    return value


def show_countdown():
    for i in range(3, 0, -1):
        display.show(str(i))
        sleep(700)
    display.scroll("GO!", delay=60)


def play_game():
    player_x = 2
    player_y = 4
    enemy_x = random.randint(0, 4)
    enemy_y = 0
    score = 0
    speed = 500
    last_move = running_time()

    show_countdown()

    while True:
        now = running_time()
        tilt = get_tilt()
        player_x = clamp(player_x + tilt, 0, 4)

        if now - last_move > speed:
            enemy_y += 1
            last_move = now

            if enemy_y > 4:
                score += 1
                enemy_x = random.randint(0, 4)
                enemy_y = 0
                if score % 5 == 0:
                    speed = max(150, speed - 50)

        if player_x == enemy_x and player_y == enemy_y:
            return score

        display.clear()
        display.set_pixel(player_x, player_y, 9)
        display.set_pixel(enemy_x, enemy_y, 5)
        sleep(30)


def game_over_screen(score):
    display.show(Image.SKULL)
    sleep(600)
    display.scroll("SCORE: " + str(score), delay=80)
    if score >= 20:
        display.scroll("AMAZING!", delay=80)
    elif score >= 10:
        display.scroll("GREAT!", delay=80)
    elif score >= 5:
        display.scroll("NICE TRY!", delay=80)
    else:
        display.scroll("KEEP TRYING!", delay=80)


def main():
    high_score = 0

    while True:
        display.scroll("CANDY DODGE", delay=80)
        display.scroll("PRESS A", delay=80)
        display.show(Image.ARROW_E)

        while not button_a.was_pressed():
            sleep(100)

        score = play_game()

        if score > high_score:
            high_score = score

        game_over_screen(score)
        display.scroll("BEST: " + str(high_score), delay=80)


main()
