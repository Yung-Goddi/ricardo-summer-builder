# How to Search Effectively

## Finding Answers Online Is a Skill

---

Knowing how to search for programming answers is almost as important as knowing how to code. Professional developers search things constantly — they just do it efficiently.

---

## The Core Technique

**Be specific. Include the error. Include the language/tool.**

| Bad Search | Good Search |
|------------|-------------|
| `python not working` | `python NameError name not defined before assignment` |
| `led doesnt work` | `microbit python LED not turning on` |
| `javascript form problem` | `javascript event.preventDefault not working form submit` |
| `google sheets formula wrong` | `google sheets SUMIF returns 0 but data exists` |
| `website looks bad phone` | `css flexbox not working mobile responsive` |

The difference: the good searches give the search engine enough to find the right results.

---

## Search Operators

**Quotes for exact phrases:**
```
"NameError: name 'temperature' is not defined" microbit
```
This searches for that EXACT phrase. Hugely useful for error messages.

**site: to search a specific site:**
```
site:stackoverflow.com microbit i2c lcd not working
```
Searches Stack Overflow only — usually the best source for code problems.

**minus to exclude words:**
```
python for loop -tutorial -beginner
```
Excludes beginner tutorials if you want more technical answers.

---

## The Best Sources

### Stack Overflow (`stackoverflow.com`)
The best site for specific code problems. Look for answers with the green checkmark (accepted answer) and high upvotes.

**How to read a Stack Overflow answer:**
1. Read the question to confirm it matches YOUR problem
2. Read the accepted answer first
3. Check the comments under the answer — often has important follow-ups
4. If there's no accepted answer, read the most upvoted one

### MDN Web Docs (`developer.mozilla.org`)
The official reference for HTML, CSS, and JavaScript. If you want to know exactly what a function does, check MDN.

### micro:bit documentation (`microbit-micropython.readthedocs.io`)
The official reference for micro:bit Python (MicroPython). Every function is documented here.

### Google Sheets Help (`support.google.com/docs`)
Official docs for all Sheets formulas and features. Reliable.

---

## When AI Search Is Better

Ask AI instead of Googling when:

- You want something **explained**, not just answered
- You need **example code** for a concept
- You want to **understand WHY** something works, not just how
- The error is complex and involves multiple things interacting

When you ask AI:
- Paste the ACTUAL error message
- Paste the relevant code (not everything — just the broken part)
- Say what you've already tried
- Ask it to explain, not just fix

---

## How to Ask AI Well

**Bad:**
> "My code doesn't work, help"

**Good:**
> "I'm writing MicroPython for a BBC micro:bit. When I run this code, I get this error:
> `OSError: [Errno 5] I2C timeout`
> Here's the relevant code: [paste 10–20 lines]
> The LCD I2C module is wired to pins 19 and 20. I tried address 0x27 already.
> Can you explain what might cause this and what I should check?"

The good prompt gives AI:
- What platform (micro:bit + MicroPython)
- The exact error
- The code
- What you already tried

You'll get a much better answer.

---

## The Rule About AI Answers

**You must understand any code AI gives you before using it.**

Test: Can you explain what each line does to someone else?

If no — go back and ask AI to explain it to you line by line.

This rule exists for one reason: if the code breaks later, you need to be able to fix it. If you just copied it without understanding, you're stuck.

---

*How to Search — Ricardo's Summer Builder Program v1.0*
