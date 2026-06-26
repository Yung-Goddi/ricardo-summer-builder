# micro:bit Setup

## Get Your Hardware Ready

---

Your micro:bit is a tiny computer that fits in your hand. It has buttons, lights, sensors, and it can connect to all the components in your Freenove kit.

Setting it up takes about 20 minutes. Do it once, and you're good for all the projects.

---

## What's In Your Kit

The Freenove Ultimate Starter Kit for BBC micro:bit includes:

- BBC micro:bit (the main board)
- USB cable (to connect to your laptop)
- Breadboard (for connecting components without soldering)
- LEDs (various colors)
- Resistors
- Servo motor
- Ultrasonic sensor (measures distance)
- Motion sensor (PIR)
- Temperature sensor
- LCD display (16x2)
- Joystick
- 4x4 keypad
- Various wires and jumpers

You'll use all of these this summer.

---

## Two Ways to Program the micro:bit

### Option 1: MakeCode (Online, Blocks or JavaScript)
- Go to `makecode.microbit.org`
- Works in your browser, no installation needed
- Good for quick experiments

### Option 2: Python (MicroPython) in VS Code
- Uses a tool called `mu-editor` or the `microbit` Python library
- All code in this program is written in Python
- **This is what we'll use for the main projects**

---

## Install Mu Editor

Mu is a simple Python editor designed specifically for micro:bit.

1. Go to `codewith.mu`
2. Download Mu for your operating system
3. Install it

When you open Mu:
1. Click "Mode" (top left button)
2. Select "BBC micro:bit"
3. Click OK

Now Mu is set up for micro:bit Python.

---

## Connect Your micro:bit

1. Plug the micro:bit into your laptop using the USB cable
2. It should light up — that means it has power
3. In Mu, look at the bottom — it should show "Connected" with a micro:bit icon

If it doesn't connect:
- Try a different USB port
- Try a different USB cable (some cables only charge, they don't transfer data)
- Try unplugging and replugging

---

## Your First Test Program

Let's make sure everything works.

**In Mu, type this exactly:**

```python
from microbit import *

while True:
    display.show(Image.HEART)
    sleep(1000)
    display.show(Image.HEART_SMALL)
    sleep(1000)
```

Click the **Flash** button (it looks like a lightning bolt).

Wait about 10 seconds. Your micro:bit will restart.

**You should see a beating heart on the LED display.**

If you see this — everything is working. 

---

## If Flashing Fails

**"Device not found" error:**
- Make sure the USB cable is fully plugged in
- Check Device Manager (Windows) or System Information (Mac) to see if micro:bit appears

**"Timeout" error:**
- Wait a moment and try again
- Sometimes the first flash is slow

**Nothing happens after flashing:**
- Press the reset button on the back of the micro:bit
- Wait 10 seconds

---

## Understanding Your micro:bit

```
    [ Button A ]  [5x5 LED grid]  [ Button B ]
                  
         [ USB port ]  [ Reset button ]
    
    [ Edge connector pins at the bottom ]
         Pin 0, Pin 1, Pin 2, 3V, GND
```

**The 5x5 LED grid** — 25 lights you can control individually

**Button A and Button B** — Physical buttons you can detect in code

**Edge connector** — This is where you connect wires to the breadboard

**3V and GND** — Power (+) and ground (-)

---

## Breadboard Basics

The breadboard lets you connect wires and components without soldering.

```
     a b c d e   f g h i j
  1  · · · · ·   · · · · ·
  2  · · · · ·   · · · · ·
  3  · · · · ·   · · · · ·
  ...
```

**Key rule:** Holes in the SAME ROW (like a1, b1, c1, d1, e1) are connected to each other.

The middle gap separates the two halves.

The red (+) and blue (-) rails on the sides run the entire length — use these for power.

---

## Wiring Conventions

- **Red wire** → Power (+, 3V)
- **Black or blue wire** → Ground (GND)
- **Other colors** → Signals

Always connect GND before you connect power. Always disconnect power before changing wires.

---

## Where the Code Lives

Save your micro:bit Python files in the `microbit/` folder of your GitHub repository.

After you write a program in Mu and it works, copy the code into a `.py` file in VS Code and push it to GitHub. This way you have a backup of everything.

---

## Ready to Build?

Go to `MICROBIT/README.md` to start your first project.

---

*micro:bit Setup — Ricardo's Summer Builder Program v1.0*
