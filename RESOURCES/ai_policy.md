# AI Policy

## How to Use AI the Right Way

---

You're allowed to use AI. AI is a great tool.

But there's one rule, and it's not negotiable:

> **If you cannot explain the code in your own words, you have not learned it.**

That's it. That's the whole policy.

Here's what that looks like in practice.

---

## Good AI Use (Do These)

### Debugging

You're stuck. Your code has an error you can't figure out.

**Good:** Share the error message and relevant code. Ask AI to explain what the error means and what might cause it.

```
You: "I'm getting this error in MicroPython: NameError: name 'celsius_to_f' is not defined.
Here's my code: [paste 15 lines]. What does this error mean and where should I look?"

AI: "NameError means Python can't find a name you're using. Looking at your code,
you're calling celsius_to_f() on line 12, but you define the function on line 25 —
which is after you try to use it. Python reads files top to bottom, so the function
needs to be defined before it's called. Move the function definition above line 12."
```

This is perfect. AI explained the concept and you understand what to fix.

---

### Learning a Concept

You don't understand how something works.

**Good:** Ask AI to explain it simply with an example.

```
You: "Can you explain how JavaScript's addEventListener works?
I know what it's supposed to do but I'm confused about why you
need it instead of just putting code in the HTML."

AI: [gives clear explanation with example]
```

After reading the explanation, can you explain it back? If yes — you own it.

---

### Generating Starter Code

You're starting something new and want a skeleton to work from.

**Good:** Ask for starter code, then read every line before using it.

```
You: "Can you show me how to set up a basic fetch() call in JavaScript
that sends JSON data to a URL? I'll customize it for my project."

AI: [shows example]

You: [reads it line by line, asks "what does mode: 'no-cors' do?",
      asks "why is JSON.stringify needed here?", etc.]
```

Only use it when you can explain what each line does.

---

### Getting Unstuck on Logic

You know what you want to build but can't figure out the structure.

**Good:** Describe the problem in words, ask AI to sketch an approach (not full code).

```
You: "I want my candy website to update the order total in real time as
the user picks products. I know it involves JavaScript listening for
changes in a dropdown, but I'm not sure how to structure it."

AI: [explains the event listener approach, maybe shows 5 lines of the key pattern]

You: [fills in the rest yourself using the pattern]
```

---

## Bad AI Use (Don't Do These)

### Copying Without Understanding

**Bad:**
```
You: "Write me a function that reads the micro:bit temperature and converts it to
Fahrenheit and shows it on the display."

AI: [writes 20 lines of code]

You: [copies, pastes, moves on]
```

Why this is bad: If anything breaks, you can't fix it. You don't know what changed between what you had and what AI gave you. You haven't learned anything. You're dependent on AI for the next project too.

---

### Using AI to Skip Thinking

**Bad:** Jumping to AI before reading the error message, before searching, before trying anything.

The struggle is where the learning happens. If you skip the struggle, you skip the learning.

AI should be what you try after you've spent at least 10–15 minutes trying yourself.

---

### Asking AI to "Fix" Without Explaining

**Bad:**
```
You: "My code is broken, here it is: [paste everything]. Fix it."
```

This is the most common mistake. You get fixed code but learn nothing about why it was broken.

**Good version:**
```
You: "My code is broken. Here's the error: [error]. Here's the relevant section: [code].
Can you tell me what's wrong and explain why so I understand it?"
```

---

### Using AI During the "Build It First" Phase

For each project, there's a phase where you should try building it yourself before asking anyone — including AI.

Give yourself 20–30 minutes to struggle with the concept before bringing in AI.

The attempt, even if it fails, makes you much better at understanding the correct solution when you see it.

---

## The Test

After any AI interaction, ask yourself:

1. Can I explain what the code does, line by line?
2. If this code breaks tomorrow, could I debug it?
3. Did I actually understand the concept, or did I just get working code?

If the answer to any of these is no — go back and learn it.

---

## AI Is a Tutor, Not a Shortcut

Think of AI like a really smart friend who knows a lot about programming.

You wouldn't have that friend do your homework for you. But you might have them:
- Explain a concept you're confused about
- Look over your work and point out mistakes
- Suggest an approach when you're totally lost
- Quiz you to see if you actually understand something

That's the right relationship.

---

*AI Policy — Ricardo's Summer Builder Program v1.0*
