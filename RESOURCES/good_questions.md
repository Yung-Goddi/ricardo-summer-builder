# How to Ask Good Questions

## The Skill That Makes Everything Faster

---

Knowing how to ask a good question is one of the most underrated skills in technology.

A good question gets answered in 5 minutes. A bad question gets ignored or gets an unhelpful answer.

This applies to asking AI, searching online, asking on forums, or asking Dad.

---

## The XY Problem

This is the most common mistake when asking programming questions.

**What happens:** You're trying to solve problem X. You try solution Y. Y doesn't work. You ask about Y — not X.

The person helping you has no idea about X, only sees Y, and gives you an answer about Y that doesn't actually solve X.

**Example:**
```
Bad question: "How do I convert a number to a string in Python?"
(This is Y — a specific thing you tried)

Better question: "I'm trying to display my sales count on the micro:bit display.
The display.show() function isn't accepting my sales_count variable.
Error: TypeError. I tried str(sales_count) — is that the right approach?"
(This explains X — what you're actually trying to do)
```

Always explain what you're ultimately trying to achieve, not just the specific thing you got stuck on.

---

## A Good Question Has Five Parts

1. **What you're trying to do** (the goal)
2. **What you tried** (your approach)
3. **What happened** (the actual result or error)
4. **What you expected** (what you thought would happen)
5. **What you've already tried** (what you've ruled out)

---

## Examples

### Bad Question:
> "My website doesn't work, help"

### Good Question:
> "I'm building my candy business website. The order form on order.html is supposed
> to show a confirmation message when submitted, but instead the page just reloads.
> I added event.preventDefault() in my submit handler but the page still reloads.
> Here's the relevant code: [paste 15 lines]. What am I doing wrong?"

---

### Bad Question:
> "My micro:bit isn't working"

### Good Question:
> "I'm on Project 4 (motion alarm). The PIR sensor is wired with VCC → 3V,
> GND → GND, OUT → Pin 0. When I run the code and wave my hand in front of
> the sensor, nothing happens. I waited 90 seconds for it to warm up. No errors
> in Mu. The micro:bit is showing the startup message so the code is running.
> Is there something wrong with how I'm reading pin0?"

---

## The Rubber Duck Method

Before you ask anyone, explain your problem out loud to an imaginary rubber duck.

Seriously. This sounds silly but it works.

The act of explaining the problem clearly — to anyone, even a rubber duck — often reveals the answer before you even finish explaining.

It forces you to slow down and actually think through what's happening instead of just feeling frustrated.

---

## Sharing Code

When sharing code with AI or anyone:

**Don't paste 200 lines.** Find the minimum amount of code that shows the problem.

Isolate it:
```python
# This is the function that's broken.
# When I call it, I get: TypeError: unsupported types for +: 'str', 'int'
def show_count(count):
    display.scroll("SALES: " + count)    # ← Error is on this line
```

This is much more useful than pasting your entire 50-line program.

---

## Asking AI to Teach, Not Just Fix

When asking AI for help, you'll learn more from:

> "Can you explain why I need `str()` here instead of just using the number directly?"

...than from:

> "Fix this code"

The first question teaches you a concept. The second just gives you working code.

Ask to understand, not just to fix.

---

*Good Questions — Ricardo's Summer Builder Program v1.0*
