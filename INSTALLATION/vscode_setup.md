# VS Code Setup

## Your Coding Environment

---

VS Code (Visual Studio Code) is the tool you'll use to write all your code this summer. It's free, it's what professional developers use, and it's really good.

---

## Install VS Code

1. Open your browser and go to `code.visualstudio.com`
2. Click the big blue download button
3. Run the installer
4. Keep all the default settings during installation
5. Launch VS Code when it's done

---

## The VS Code Layout

When you open VS Code, here's what you're looking at:

```
┌─────────────────────────────────────────────────────┐
│  [File] [Edit] [View] ...           Top menu bar    │
├──────┬──────────────────────────────────────────────┤
│      │                                              │
│  S   │         Your code goes here                 │
│  I   │                                              │
│  D   │                                              │
│  E   │                                              │
│  B   ├──────────────────────────────────────────────┤
│  A   │         Terminal (bottom panel)             │
│  R   │                                              │
└──────┴──────────────────────────────────────────────┘
```

- **Sidebar** — File explorer, search, source control, extensions
- **Main area** — Where you write code
- **Terminal** — Where you run code (open with `Ctrl+` ` ` `)

---

## Install Extensions

Extensions add extra features to VS Code.

To install:
1. Click the icon on the left sidebar that looks like 4 squares with one pulling away
2. Type the name in the search box
3. Click "Install"

Install these three:

### 1. Python (by Microsoft)
- Search: `Python`
- It's the first result, by Microsoft
- Install it
- This lets VS Code run Python files and gives you autocomplete

### 2. Prettier
- Search: `Prettier - Code formatter`
- Install it
- This automatically formats your code to look clean

### 3. GitLens
- Search: `GitLens`
- Install it
- This makes working with GitHub easier

---

## Important Keyboard Shortcuts

Memorize these. They will save you hours.

| Shortcut | What It Does |
|----------|--------------|
| `Ctrl+S` | Save file |
| `Ctrl+Z` | Undo |
| `Ctrl+/` | Comment out a line |
| `Ctrl+D` | Select next occurrence of selected word |
| `Ctrl+Shift+P` | Open command palette (do anything) |
| `Ctrl+`` ` `` ` | Open/close terminal |
| `F5` | Run the current file |
| `Ctrl+F` | Find in file |
| `Ctrl+Shift+F` | Find in all files |

On Mac, replace `Ctrl` with `Cmd`.

---

## Settings to Change

Open settings with `Ctrl+,` (or `Cmd+,` on Mac).

Change these:
- **Auto Save** → Set to "afterDelay" (so you never lose work)
- **Font Size** → Set to whatever is comfortable (14 or 16 is good)
- **Word Wrap** → Turn ON (lines won't go off screen)

---

## Creating Your First File

1. In VS Code, open the folder where your GitHub repository is (`File → Open Folder`)
2. Click the new file icon in the sidebar
3. Name it `test.py`
4. Type this:
   ```python
   name = "Ricardo"
   print(f"Hello, {name}! You're ready to build.")
   ```
5. Press `Ctrl+S` to save
6. Press `F5` to run
7. See the output in the terminal at the bottom

If you see your message — VS Code is working perfectly.

---

## If Python Isn't Running

VS Code needs to know which Python to use. If you press F5 and nothing happens:

1. Press `Ctrl+Shift+P`
2. Type "Python: Select Interpreter"
3. Choose the Python version that appears (any version 3.x is fine)

If Python isn't installed at all:
1. Go to `python.org`
2. Download Python 3 (latest version)
3. Install it (check the box that says "Add Python to PATH")
4. Restart VS Code

---

*VS Code Setup — Ricardo's Summer Builder Program v1.0*
