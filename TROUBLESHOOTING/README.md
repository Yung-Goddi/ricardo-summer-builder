# Troubleshooting

## When Things Break (And They Will)

---

Breaking things is normal. Fixing broken things is the job.

Every professional developer spends a huge portion of their time debugging — figuring out why something doesn't work.

The difference between beginners and experienced developers isn't that experienced developers make fewer mistakes. It's that they're better at **finding and fixing** those mistakes.

This section helps you build that skill.

---

## Where to Start

1. **`common_errors.md`** — The most frequent errors in this program with solutions
2. **`how_to_read_errors.md`** — How to decode any error message
3. **`how_to_search.md`** — How to search effectively for programming problems

---

## The Universal Debugging Process

No matter what language or project:

```
1. Reproduce the problem reliably
   (Can you make it happen again on purpose?)

2. Read the error message
   (What exactly does it say? Line number?)

3. Isolate the problem
   (Comment out code until you find the broken part)

4. Form a hypothesis
   ("I think it's broken because...")

5. Test the hypothesis
   (Try something. See what happens.)

6. If wrong, revise and repeat
```

This process works on Python bugs, hardware issues, website problems, everything.

---

## When to Ask AI vs. Search vs. Ask Dad

| Situation | Try This First |
|-----------|---------------|
| Error message you don't understand | Search the exact error message |
| Conceptual confusion ("how does X work?") | Ask AI |
| Code that's almost right but not quite | Ask AI, show it the code |
| Wiring isn't working | Check the diagram, check connections |
| Website layout looks wrong | Browser developer tools (F12) |
| Something worked yesterday, not today | Check `git diff` — what changed? |
| Stuck for more than 30 min | Go through before_asking_dad.md |

---

*Troubleshooting — Ricardo's Summer Builder Program v1.0*
