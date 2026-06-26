# How to Read Error Messages

## Errors Are Information, Not Insults

---

Every error message is the computer trying to tell you something. The computer isn't wrong — it's explaining what went wrong in its language.

Your job is to learn to read that language.

---

## Python Error Anatomy

Every Python error has the same structure:

```
Traceback (most recent call last):
  File "blink.py", line 23, in <module>
    show_reading(temp_c)
  File "blink.py", line 12, in show_reading
    temp_f = celsius_to_f(temp_c)
NameError: name 'celsius_to_f' is not defined
```

**How to read it:**

1. **Start at the bottom** — The last line is the actual error type and message.
   → `NameError: name 'celsius_to_f' is not defined`
   → The function `celsius_to_f` doesn't exist when it's being called.

2. **Read the "File" lines from bottom to top** — This is the chain of calls that led to the error.
   → Line 23 called `show_reading()`, which on line 12 tried to call `celsius_to_f()`

3. **Go to the line number mentioned** — Line 12 is where the problem actually is.

4. **Ask yourself** — Is `celsius_to_f` defined anywhere? Did I spell it correctly?

---

## JavaScript Error Anatomy (Browser Console)

Open the browser console with `F12` → Console tab.

```
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
    at script.js:47:28
```

**How to read it:**

1. **Error type:** `TypeError` — wrong type of thing being used
2. **Error message:** `Cannot read properties of null` — you're treating `null` as if it's an element
3. **Location:** `script.js:47` — line 47 of script.js, character 28

**What this usually means:** You called `document.getElementById("something")` and got `null` back because the element doesn't exist yet (or has a different ID in your HTML).

---

## The Most Important Question

After reading any error, ask yourself:

> "What does the computer THINK is happening on that line?"

Not what you WANTED to happen — what the computer ACTUALLY found.

Example:
- You thought: "I'm calling my function"
- Computer found: "This name doesn't exist"
- Conclusion: Either the function isn't defined, or you spelled it differently

---

## Common Error Type Meanings

| Error Type | What It Means |
|------------|--------------|
| `NameError` | Variable or function name doesn't exist |
| `TypeError` | Wrong type — like trying to add a string to a number |
| `SyntaxError` | Invalid code — can't even be parsed |
| `IndentationError` | Wrong indentation |
| `AttributeError` | Trying to use a method that doesn't exist on this type |
| `IndexError` | List index out of range — list is shorter than you think |
| `ZeroDivisionError` | Tried to divide by zero |
| `FileNotFoundError` | File path is wrong |
| `OSError` | Operating system or hardware problem (common with micro:bit) |
| `KeyError` | Dictionary key doesn't exist |

---

## When You Can't Figure Out the Error

Do this:

1. Copy the error message exactly (Ctrl+C)
2. Google: `python "exact error text"` (keep the quotes)
3. If it's micro:bit specific: `micropython "exact error text"`
4. If it's JavaScript: `javascript "exact error text"`

The first Stack Overflow result will almost always explain it.

---

## Keep a Bug Log

In your engineering journal, keep a running list:

```markdown
## Bugs I Fixed

**Bug:** NameError: name 'celsius_to_f' is not defined
**Cause:** I called the function before defining it (wrong order in file)
**Fix:** Moved the function definition above where it's called
**Date:** July 10
```

Reading this at the end of summer, you'll see your own growth.

---

*How to Read Errors — Ricardo's Summer Builder Program v1.0*
