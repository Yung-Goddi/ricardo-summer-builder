# Common Errors

## The Most Frequent Problems and How to Fix Them

---

## micro:bit / MicroPython Errors

---

### `NameError: name 'X' is not defined`

**What it means:** You used a variable or function that doesn't exist yet.

**Common causes:**
- Typo in the variable name (`sales_Count` vs `sales_count`)
- Used a variable before defining it
- Forgot to import something

**Fix:**
```python
# WRONG
print(sales_count)    # Using it before defining
sales_count = 0

# RIGHT
sales_count = 0       # Define it first
print(sales_count)    # Then use it
```

---

### `IndentationError: expected an indented block`

**What it means:** Python is extremely picky about indentation (spaces at the start of lines). Something is indented wrong.

**Fix:**
- Use 4 spaces (or 1 tab) consistently — don't mix them
- Everything inside a `while`, `if`, `for`, or `def` must be indented one level
- VS Code can help: `Edit → Convert Indentation to Spaces`

---

### `SyntaxError: invalid syntax`

**What it means:** Python can't understand the code because something is written wrong.

**Common causes:**
- Missing colon after `if`, `while`, `for`, `def`
- Unclosed parenthesis, bracket, or quote
- Using `=` when you meant `==` (assignment vs. comparison)

**Fix:**
Look at the line the error mentions AND the line just above it. The actual mistake is often one line up from where Python reports it.

---

### `OSError: [Errno 5] I2C timeout` (LCD project)

**What it means:** The micro:bit can't communicate with the LCD.

**Fixes to try in order:**
1. Check wiring: SDA → Pin 20, SCL → Pin 19, VCC → 3V, GND → GND
2. Try changing `LCD_ADDR = 0x27` to `LCD_ADDR = 0x3F`
3. Make sure you're using the I2C module on the LCD (the small board on the back)
4. Try a different USB cable

---

### Micro:bit flashes but nothing visible happens

**Fixes:**
- Wait — sometimes it takes 10–15 seconds after flashing
- Press the reset button on the back
- Make sure you actually clicked **Flash** not just **Save** in Mu

---

## Python Errors (General)

---

### `TypeError: can only concatenate str (not "int") to str`

**What it means:** You tried to combine a string (text) with a number without converting.

**Fix:**
```python
# WRONG
count = 5
print("Count: " + count)

# RIGHT
print("Count: " + str(count))
# OR
print(f"Count: {count}")
```

---

### `ZeroDivisionError: division by zero`

**What it means:** You tried to divide by zero. Math doesn't allow it.

**Fix:**
Check that your denominator can never be zero before dividing:
```python
if total_sales > 0:
    average = total_revenue / total_sales
else:
    average = 0
```

---

## JavaScript / Website Errors

---

### `Uncaught ReferenceError: X is not defined`

**What it means:** JavaScript can't find a variable or function named X.

**Common causes:**
- Typo
- The script loaded before the HTML element it's looking for
- Variable declared in one scope, used in another

**Fix:**
- Check spelling
- Make sure your `<script>` tag is at the bottom of the HTML body (or use `DOMContentLoaded`)

---

### The page looks blank / nothing loads

**Fixes to try:**
1. Open the browser console: `F12 → Console tab`
2. Look for red error messages
3. Check the file paths — is `style.css` in the same folder as `index.html`?
4. Open the Network tab (F12) — are any files failing to load (shown in red)?

---

### Form submits but nothing happens

**Common causes:**
- JavaScript error is stopping execution (check console)
- The button type is "submit" which reloads the page — you need `event.preventDefault()`
- Your `GOOGLE_SCRIPT_URL` is still the placeholder value

**Fix:**
```javascript
form.addEventListener("submit", function(event) {
    event.preventDefault();   // CRITICAL — stop the page from reloading
    // your code here
});
```

---

## Google Sheets Errors

---

### Formula shows `#REF!`

**What it means:** The formula is pointing to a cell or range that doesn't exist.

**Fix:** Click the cell and look at the formula. Find the part that says something like `A1:A100` — update the range to match where your data actually is.

---

### Formula shows `#DIV/0!`

**What it means:** The formula is dividing by zero (usually because a cell is empty).

**Fix:** Wrap with `IFERROR`:
```
=IFERROR(SUM(A:A)/COUNT(A:A), 0)
```

---

### `#VALUE!`

**What it means:** You're doing math on a cell that contains text.

**Fix:** Make sure cells in your calculation columns contain numbers, not text. Format them as numbers: Format → Number → Number.

---

## GitHub / Git Errors

---

### `fatal: not a git repository`

**What it means:** You're running git commands in the wrong folder.

**Fix:** Make sure you're inside your repository folder, not in a parent folder. In VS Code, check the terminal is open in the right directory.

---

### `error: failed to push some refs`

**What it means:** Your local code is behind what's on GitHub (someone or something pushed before you).

**Fix:**
```bash
git pull
git push
```
If `git pull` causes a merge conflict, read the conflict markers in the file and fix them.

---

### Changes aren't showing up on GitHub

**Did you remember all three steps?**
```bash
git add .       # Stage changes
git commit -m "message"   # Save a version
git push        # Send to GitHub
```

Missing any one of these and your changes stay local.

---

*Common Errors — Ricardo's Summer Builder Program v1.0*
