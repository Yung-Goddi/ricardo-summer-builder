# Project 5 — Candy Dodge Game

## A Game You Built Yourself

**Time:** 2–3 hours (this is the most complex micro:bit project)
**Difficulty:** Intermediate
**Requires:** micro:bit, USB cable (no external wiring)

---

## What You're Building

A real game on the 5x5 LED grid.

**How to play:**
- Your player (a dot) starts at the bottom center of the display
- Candy "bombs" (things that spoil your candy!) fall from the top
- Tilt the micro:bit left/right to dodge them
- Every bomb you dodge earns you a point
- A bomb hits you = game over
- Your score is displayed at the end

This uses the **accelerometer** — the built-in sensor that detects how the micro:bit is tilted.

---

## This Project Is Different

The previous projects were mostly about building useful tools. This one is about building something fun.

But don't be fooled — this project teaches more programming concepts than any of the previous ones:

- **Game loops** — The heartbeat of every game
- **Collision detection** — Detecting when two things touch
- **Randomness** — Making enemies unpredictable
- **Multiple variables tracking state** — Player position, enemy position, score
- **Accelerometer input** — Reading physical sensors

These concepts show up in every game ever made, from Pong to Minecraft.

---

## The Code

```python
from microbit import *
import random

# ============================================================
# Project 5: Candy Dodge Game
# Ricardo's Summer Builder Program
# Tilt to dodge! Don't let the bombs hit you!
# ============================================================

def get_tilt():
    """Read accelerometer and return -1 (left), 0 (center), 1 (right)"""
    x = accelerometer.get_x()
    if x < -200:
        return -1     # Tilting left
    elif x > 200:
        return 1      # Tilting right
    else:
        return 0      # Level

def clamp(value, min_val, max_val):
    """Keep a value between min and max"""
    if value < min_val:
        return min_val
    if value > max_val:
        return max_val
    return value

def show_count_down():
    """Show 3...2...1...GO!"""
    for i in range(3, 0, -1):
        display.show(str(i))
        sleep(700)
    display.scroll("GO!", delay=60)

def play_game():
    """Main game function. Returns final score."""

    # Player starts at bottom center
    player_x = 2
    player_y = 4

    # Enemy (falling bomb) starts at random top position
    enemy_x = random.randint(0, 4)
    enemy_y = 0

    score = 0
    speed = 500      # Milliseconds between enemy moves (lower = faster)
    last_move = 0    # Track when enemy last moved

    show_count_down()

    while True:
        current_time = running_time()

        # --- Handle player movement ---
        tilt = get_tilt()
        new_x = clamp(player_x + tilt, 0, 4)
        player_x = new_x

        # --- Move enemy downward on a timer ---
        if current_time - last_move > speed:
            enemy_y += 1
            last_move = current_time

            # Enemy reached the bottom without hitting player?
            if enemy_y > 4:
                score += 1
                # Reset enemy at top, random column
                enemy_x = random.randint(0, 4)
                enemy_y = 0
                # Speed up slightly every 5 points
                if score % 5 == 0:
                    speed = max(150, speed - 50)

        # --- Check collision ---
        if player_x == enemy_x and player_y == enemy_y:
            # GAME OVER
            return score

        # --- Draw everything ---
        display.clear()
        display.set_pixel(player_x, player_y, 9)   # Player bright
        display.set_pixel(enemy_x, enemy_y, 5)      # Enemy dimmer
        sleep(30)

def game_over_screen(score):
    """Show game over animation and score"""
    display.show(Image.SKULL)
    sleep(600)
    display.scroll("GAME OVER! SCORE: " + str(score), delay=80)

    if score >= 20:
        display.scroll("AMAZING!", delay=80)
    elif score >= 10:
        display.scroll("GREAT!", delay=80)
    elif score >= 5:
        display.scroll("NICE TRY", delay=80)
    else:
        display.scroll("KEEP TRYING", delay=80)

def main():
    """Main program loop — play again and again"""
    high_score = 0

    while True:
        # Show title screen
        display.scroll("CANDY DODGE", delay=80)
        display.scroll("TILT TO PLAY", delay=80)

        # Wait for button press to start
        display.show(Image.ARROW_E)   # Point to button A
        while not button_a.was_pressed():
            sleep(100)

        # Play the game
        score = play_game()

        # Update high score
        if score > high_score:
            high_score = score

        # Show result
        game_over_screen(score)
        display.scroll("BEST: " + str(high_score), delay=80)

        # Press A to play again
        display.scroll("A=PLAY AGAIN", delay=80)

# Run the program
main()
```

---

## Understand the Game Architecture

This is the most code you've written yet. Let's break it down.

### The Game Loop

Every game in history has a game loop. It looks like this:

```
While game is running:
    1. Read input (what did the player do?)
    2. Update game state (move things, check collisions)
    3. Draw everything on screen
    4. Wait a tiny bit
    5. Repeat
```

Look at the `while True:` inside `play_game()`. That's exactly the game loop.

### State Variables
```python
player_x = 2       # Where is the player horizontally?
player_y = 4       # Where is the player vertically?
enemy_x = ...      # Where is the bomb?
enemy_y = 0        # How far has it fallen?
score = 0          # How many dodges?
speed = 500        # How fast does it fall?
```

Every variable tracks one piece of the game's state. Change any of them and the game changes.

### Collision Detection
```python
if player_x == enemy_x and player_y == enemy_y:
    return score   # GAME OVER
```

"Is the player at the same position as the enemy?" If yes — collision. Game over.

This is the simplest possible collision detection. In bigger games, you check areas, not just points. But the concept is identical.

### `running_time()`
Returns how many milliseconds have passed since the micro:bit turned on. By comparing current time to `last_move`, you control how fast the enemy falls without using `sleep()` (which would freeze the whole program).

This is called a **timer-based game loop** — a real game development technique.

### `random.randint(0, 4)`
Returns a random whole number between 0 and 4 (inclusive). This makes the enemy spawn at a random column every time — if it was predictable, the game would be too easy.

---

## Make It Your Own

This is your game. Change it.

**Ideas:**
- Change the speed progression — make it get harder faster or slower
- Add two enemies at once (two bombs falling)
- Change the display — use brighter/dimmer pixels for different things
- Add a "shield" that Button A activates (briefly move enemy away)
- Change the theme — instead of dodge, make the player CATCH falling candy

---

## Experiments

**Experiment 1:** What's the highest score you can get?

**Experiment 2:** Change `speed = 500` to `speed = 300`. Too hard? Try `800`.

**Experiment 3:** Can you add a second enemy? You'd need `enemy2_x` and `enemy2_y` variables.

**Experiment 4:** What if you press Button B during the game to get one "life" back?

---

## Before Moving On

- [ ] Game is running on micro:bit
- [ ] You can actually play it (player moves when you tilt)
- [ ] You made at least one customization to the game
- [ ] You can explain the game loop in your own words
- [ ] Code pushed to GitHub
- [ ] Journal entry written (describe your highest score and what you changed)

---

## Next Project

→ `MICROBIT/project6_lcd_display/README.md`

---

*Project 5 — Ricardo's Summer Builder Program v1.0*
