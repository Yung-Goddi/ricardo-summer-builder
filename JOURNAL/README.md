# Engineering Journal

## Your *Weekly* Reflection — Portfolio Material

---

> **First, know the difference so you're never confused about where to write:**
>
> - **`WORK_LOG.md`** (project root) = your **every-session** home base. Daily notes, questions, and where to start next time. Use it constantly.
> - **This Journal** = **once a week.** A deeper look back at what you *learned*. This is the good stuff you'll show off later in your portfolio.
>
> You are not doing double work. The Work Log is fast and daily. The Journal is slower and weekly. If you only have 60 seconds, use the Work Log — that's the important one.

---

## Why Keep a Journal?

Short answer: because you'll want it later.

When you look back at Week 1 from Week 10, you'll be amazed at how far you've come. The journal makes that visible.

It also forces you to think about what you actually learned — not just what you did. That reflection is where real learning happens.

This is NOT a school assignment. Nobody is grading it. Write like you're texting your future self.

---

## The Format

Each week, create a file called `weekN.md` (week1.md, week2.md, etc.).

Use the template in `JOURNAL/template.md`.

You only need to write **5–10 minutes** per session. More is fine, but it doesn't have to be long.

---

## Journal Prompts

If you're not sure what to write, pick from these:

- What did I build today?
- What was the hardest part? How did I get past it?
- What took longer than I expected?
- What was easier than I expected?
- What's one thing I learned that I didn't know this morning?
- What broke and how did I fix it?
- What do I want to build next?
- What's one thing I'm proud of?

You don't have to answer all of them. Pick one or two.

---

## What Goes In Your Journal

**Code snippets** that you're proud of or that took a long time to figure out:
```python
# Finally figured out how to convert temp to Fahrenheit!
def celsius_to_f(c):
    return (c * 9/5) + 32
```

**Error messages** and how you solved them:
```
Error: OSError: [Errno 5] I2C timeout
Fix: The LCD was at address 0x3F not 0x27 — changed the constant
```

**Questions** you still have:
- Why does the PIR sensor need 60 seconds to warm up?
- How does fetch() actually send data to the internet?

**Screenshots or photos** of things you built (paste the file path or link).

---

## Push Your Journal to GitHub

Your journal files go in the `journal/` folder of your GitHub repository.

Push them with your code so Dad can read them:

```bash
git add journal/
git commit -m "Add week 3 journal"
git push
```

---

## Your First Entry

Write your first journal entry after setup is done.

Go to: `JOURNAL/week1.md`

---

*Engineering Journal — Ricardo's Summer Builder Program v1.0*
