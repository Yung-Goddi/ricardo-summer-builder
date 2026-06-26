# GitHub Setup

## Your Code's Home on the Internet

---

GitHub is where your code lives. Think of it like Google Drive, but specifically for code, and built for showing your work to the world.

Every professional developer uses GitHub. By the end of summer, your portfolio will live here.

---

## Create Your Account

1. Go to `github.com`
2. Click "Sign up" (top right)
3. Enter your email (use your Google email)
4. Create a password
5. Choose a username

**Username tips:**
- Use your real name or something professional
- Good: `ricardo-builds`, `ricardodev`, `rbusiness-tech`
- Avoid: gaming names, random numbers, anything you'd be embarrassed to show a future employer

6. Verify your email when GitHub sends you a message

---

## Understand the Basics

**Repository** = A project folder. All your project's files live here.

**Commit** = A saved version of your code. Like a save point in a game, but it shows what changed and when.

**Push** = Sending your local code up to GitHub.

**Pull** = Getting code from GitHub to your computer.

**Branch** = A separate copy of your code to try experiments without breaking the main version.

For this summer, you'll mostly just: **commit** and **push**. That's it.

---

## Set Up Git on Your Laptop

Git is the program that connects VS Code to GitHub.

**Check if it's installed:**
1. Open VS Code
2. Open the terminal (`Ctrl+`` ` ``)
3. Type: `git --version`
4. If you see a version number, you're good
5. If not, download it at `git-scm.com`

**Tell Git who you are:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@gmail.com"
```

Replace with your actual name and email. Do this once and you're done.

---

## Create Your Summer Repository

1. Log into GitHub
2. Click the green "New" button (or the `+` icon → "New repository")
3. Fill it out:
   - **Repository name:** `candy-builder-2026`
   - **Description:** `My summer build projects — candy business tech + hardware + web`
   - **Visibility:** Public ← important for your portfolio
   - **Initialize with README:** Check this box
4. Click "Create repository"

---

## Clone It to Your Laptop

"Cloning" = downloading the repository so you can work on it locally.

1. On your new repository page, click the green "Code" button
2. Make sure "HTTPS" is selected
3. Copy the URL (looks like: `https://github.com/yourusername/candy-builder-2026.git`)

In VS Code:
1. Press `Ctrl+Shift+P`
2. Type "Git: Clone"
3. Paste the URL
4. Choose where to save it (Desktop or Documents)
5. Click "Open" when VS Code asks

---

## The Daily GitHub Habit

Every time you finish a session, do this in the VS Code terminal:

```bash
git add .
git commit -m "What I built today: brief description"
git push
```

Example commit messages:
- `"Add blink LED project"`
- `"Fix inventory formula in Google Sheets notes"`
- `"Start candy website homepage"`

**Good commit messages** describe WHAT changed and WHY. Bad ones just say "update" or "fix."

---

## View Your Work Online

After pushing, go to `github.com/yourusername/candy-builder-2026`.

You'll see all your files. This is your portfolio starting to take shape.

---

## If Push Is Asking for Password

GitHub no longer accepts plain passwords for pushing. You need a Personal Access Token (PAT).

1. Click your profile picture (top right)
2. Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
3. Generate new token (classic)
4. Give it a name, set expiration to 90 days, check "repo" scope
5. Click Generate, then COPY the token immediately (you only see it once)
6. Use this token as your password when pushing

Alternatively, install GitHub Desktop (`desktop.github.com`) — it handles authentication automatically.

---

## Folder Structure for Your Repository

Organize your repository like this from the start:

```
candy-builder-2026/
├── README.md          (already there)
├── microbit/          (micro:bit projects)
├── business/          (Google Sheets documentation and scripts)
├── website/           (your candy website)
├── game/              (your game)
├── journal/           (your engineering journal)
└── portfolio/         (screenshots and demo links)
```

Create these folders as you go through the program.

---

*GitHub Setup — Ricardo's Summer Builder Program v1.0*
