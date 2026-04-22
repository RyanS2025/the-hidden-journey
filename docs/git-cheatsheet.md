# Git Cheat Sheet — Mia's Reference

Git is how you and Ryan share code without emailing files back and forth. Think of it like Google Docs version history, but for code and data files. Every time you save a "commit," Git remembers exactly what the project looked like at that moment.

---

## The Big Picture

```
Your computer  -->  git add  -->  Staging area  -->  git commit  -->  Local history  -->  git push  -->  GitHub
GitHub         -->  git pull  -->  Your computer
```

- **Staging area** — a waiting room where you put files before officially saving them
- **Commit** — an official save with a message describing what you changed
- **Push** — sending your saved commits up to GitHub so Ryan can see them
- **Pull** — downloading Ryan's latest commits from GitHub to your computer

---

## Before You Start — Check Where You Are

```bash
git status
```
Shows what files you've changed and whether anything is staged (in the waiting room) or not. Run this first whenever you sit down to work.

```bash
git branch
```
Shows which branch you're on. The branch with a `*` next to it is your current one. You'll almost always be on a branch named after your work (e.g., `mia/content`).

---

## Daily Workflow — The Sequence You'll Use Most

This is the order you follow every time you finish working on something and want to share it with Ryan.

### Step 1 — See what changed
```bash
git status
```

### Step 2 — Stage the files you want to save
```bash
git add data/questions.json
```
Replace `data/questions.json` with the actual file you changed. You can stage multiple files:
```bash
git add data/questions.json content/olivia-chaffin.md
```
Or stage everything you changed at once (use carefully — make sure `git status` only shows files you meant to change):
```bash
git add .
```

### Step 3 — Commit with a message
```bash
git commit -m "Add first 20 quiz questions"
```
The message goes inside the quotes. Keep it short and describe what you did. Good examples:
- `"Fill in thin mint supply chain data"`
- `"Write Olivia Chaffin story"`
- `"Add 112 council-to-bakery mappings"`

### Step 4 — Push to GitHub
```bash
git push
```
That's it. Your changes are now on GitHub and Ryan can see them.

---

## Getting Ryan's Latest Changes

```bash
git pull
```
Run this at the start of every work session before you change anything. It downloads whatever Ryan pushed since you last synced.

If you and Ryan edited the same file at the same time, Git will tell you there's a conflict. If that happens, come get Claude Code to help — don't try to resolve it manually the first time.

---

## Switching Branches

A branch is a separate version of the project. You and Ryan will each work on your own branch so you don't overwrite each other's changes.

Switch to an existing branch:
```bash
git checkout mia/content
```
Replace `mia/content` with the branch name you want. After you run this, all your edits go onto that branch.

Create a brand new branch and switch to it at the same time:
```bash
git checkout -b mia/quiz-questions
```
Use this when you're starting a new chunk of work that should be separate from your other changes.

Go back to the main branch:
```bash
git checkout main
```
Do this carefully — make sure you've committed your changes first, or they could get mixed up between branches.

---

## Checking History

```bash
git log --oneline
```
Shows a short list of recent commits — who made them and what the message was. Press `q` to exit.

---

## Undoing a Mistake (Before You Push)

If you staged a file by accident and want to un-stage it:
```bash
git restore --staged data/questions.json
```

If you changed a file and want to throw away your changes and go back to the last saved version:
```bash
git restore data/questions.json
```
Warning: this permanently erases your unsaved changes to that file.

---

## Quick Reference Card

| What you want to do | Command |
|---|---|
| See what's changed | `git status` |
| See which branch you're on | `git branch` |
| Switch to an existing branch | `git checkout branch-name` |
| Create a new branch and switch to it | `git checkout -b branch-name` |
| Get Ryan's latest changes | `git pull` |
| Stage one file | `git add filename` |
| Stage all changed files | `git add .` |
| Save a commit | `git commit -m "your message"` |
| Send to GitHub | `git push` |
| See recent commits | `git log --oneline` |
| Un-stage a file | `git restore --staged filename` |
| Undo changes to a file | `git restore filename` |

---

## Tips

- Always `git pull` before you start working — this prevents conflicts with Ryan's changes.
- Commit often. Small commits with clear messages are easier to undo than one giant commit.
- If Git ever prints something scary and you don't know what it means, paste it into Claude Code and ask what happened before doing anything else.
