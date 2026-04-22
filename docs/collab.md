# The Hidden Journey — Collaboration Checklist

**Mia** handles content, research, data files, and a handful of simple pages built with Claude Code.
**Ryan** handles setup, infrastructure, complex components, and deployment.

The goal is for both of you to work at the same time without waiting on each other. The only moment you need to sync is at the very start (Phase 0) — after that, your tracks are fully independent until integration.

---

## How This Works

Ryan writes code that reads from JSON files. Mia fills in those JSON files with real content and research. Because they're separate, Ryan can build and test with placeholder data while Mia fills in the real thing — no waiting.

The one rule: **complete Phase 0 together before splitting.** Everything after that can happen in parallel.

---

## Phase 0 — Kickoff (Do Together First)

These tasks have to happen before either of you can work independently. Should take one short session.

- [ ] **Ryan:** Initialize the Next.js project with Tailwind CSS and shadcn/ui
- [ ] **Ryan:** Connect the repo to Vercel so every push auto-deploys a live preview URL
- [ ] **Ryan:** Create all empty JSON data files with the correct structure (Mia fills these in later — Ryan just creates the blank templates with the right field names)
- [ ] **Both:** Walk through the JSON file formats together so Mia knows exactly how to fill them in without needing to ask Ryan

The JSON files Ryan creates (empty, for Mia to fill):
- `data/products/thin-mint.json`
- `data/products/vest.json`
- `data/products/cookie-box.json`
- `data/products/inventory.json` (the 30–50 product search list)
- `data/councils.json` (which council uses which bakery)
- `data/questions.json` (the 40 quiz questions)
- `data/sources.json` (all cited sources)

---

## Mia's Track — Content, Research & Data

Work on these in any order you like. None of them require code from Ryan.

### Writing (no JSON, just text)

- [ ] Write the Olivia Chaffin story in your own words — this is the emotional centerpiece of the site. Aim for 300–500 words. Save it as `content/olivia-chaffin.md`
- [ ] Write the "Why It Matters" section copy for all four themes:
  - Environmental Impact
  - Labor & Human Rights
  - Global Cooperation
  - Consumer Power
  Save as `content/why-it-matters.md`
- [ ] Write a short ethics angle for each of the three featured products (2–3 paragraphs each):
  - Thin Mint: the "Mass Balance" palm oil story and what it means
  - Vest: what "Made in USA" actually means for workers and transparency
  - Cookie Box: what "100% recycled" really means
  Save as `content/ethics-angles.md`
- [ ] Write the homepage intro copy — a short, engaging paragraph that explains what this site is and why it matters, written for a Girl Scout audience (ages 10–18). Save as `content/homepage.md`

### Data Files (filling in JSON)

Ryan will give you the empty files with the right format after Phase 0. Your job is to fill in the real facts.

- [ ] Fill in `data/products/thin-mint.json` — supply chain steps, ingredient origins, confidence levels (confirmed vs. estimated), and total carbon footprint (~0.8 kg CO₂ per box)
- [ ] Fill in `data/products/vest.json` — supply chain steps from cotton/polyester sourcing through USA manufacturing (~10 kg CO₂ per vest)
- [ ] Fill in `data/products/cookie-box.json` — pulp sourcing, paper mill, printing, assembly steps
- [ ] Fill in `data/products/inventory.json` — the 30–50 product search inventory, one entry per product across all seven categories (see PRD §4.2 for the category list and examples)
- [ ] Fill in `data/councils.json` — which of the 112 Girl Scout councils uses ABC Bakers (South Dakota) vs. Little Brownie Bakers (Kentucky). This data is available from GSUSA's website and council directories.
- [ ] Fill in `data/questions.json` — write all 40 quiz questions. Each question needs:
  - The question text
  - 3 or 4 answer choices
  - Which answer is correct (by position: 0, 1, 2, or 3)
  - A topic tag so it's clear what part of the site it covers

  Aim for roughly this distribution:
  | Topic | # of Questions |
  |---|---|
  | Thin Mint supply chain | 10 |
  | Girl Scout Vest | 6 |
  | Cookie Box | 5 |
  | Carbon calculator / footprints | 7 |
  | Why It Matters themes | 7 |
  | Olivia Chaffin story | 5 |

- [ ] Fill in `data/sources.json` — all cited sources from PRD §4.4, plus any additional sources you use while researching

### Design Review

- [ ] Review the design mockups Ryan generates and pick the visual style you want (Ryan will ping you when these are ready)
- [ ] Test the live preview URL on your phone at each milestone Ryan shares — you're the mobile-first audience, so your feedback matters

### Simple Code (with Claude Code)

These tasks involve writing real code, but they're all "show the content I already wrote" — no complex logic. Use Claude Code to help you build each one step by step. Each task is self-contained and doesn't need anything from Ryan's code to work.

**Wait until after Phase 0 before starting these** — Ryan needs to set up the project first so you have a place to put your files.

- [ ] **Homepage page** (`app/page.tsx`) — Build the homepage using the copy you wrote in `content/homepage.md`. It should have a hero heading, a short intro paragraph, and links to the three featured products. Ask Claude Code: *"Help me build a Next.js homepage page that displays my homepage.md content with Tailwind CSS styling."*

- [ ] **"Why It Matters" page** (`app/why-it-matters/page.tsx`) — Build a page that shows your four themes (Environmental Impact, Labor & Human Rights, Global Cooperation, Consumer Power) as four visual cards. Ask Claude Code: *"Help me build a Next.js page that shows four content sections as cards using Tailwind CSS, reading from my why-it-matters.md file."*

- [ ] **Sources page** (`app/sources/page.tsx`) — Build a simple page that lists all the sources from `data/sources.json` in a clean table or list. Ask Claude Code: *"Help me build a Next.js page that reads sources.json and displays each source as a row in a table using Tailwind CSS."*

- [ ] **Certificate layout component** (`components/Certificate.tsx`) — Build the visual certificate that appears when someone passes the quiz. It should show the visitor's name, a congratulations message, the site name, and a print button. Ryan will wire up when it appears — your job is just making it look great. Ask Claude Code: *"Help me build a React component called Certificate that takes a `name` prop and displays a printable certificate with a congratulations message and a print button, styled with Tailwind CSS."*

- [ ] **JSON validation script** (`scripts/validate-data.js`) — Build a small script you can run yourself any time you've edited a data file, to catch missing fields or typos before Ryan pulls your files in. Ask Claude Code: *"Help me write a Node.js script that reads my JSON data files and checks that every entry has all the required fields, then prints a list of any errors it finds."*

---

## Ryan's Track — Code & Build

Work on these in order within each section, but the sections themselves can overlap with Mia's work.

### Setup

- [ ] Initialize Next.js project (App Router), add Tailwind CSS and shadcn/ui
- [ ] Connect to Vercel, confirm auto-deploy works on every push
- [ ] Create all empty JSON data files with correct schemas and field names (see Phase 0 list above)
- [ ] Write a short `DATA_GUIDE.md` file in the `data/` folder that explains each JSON field in plain English — this is for Mia, not for code

### Data Infrastructure

- [ ] Write the build-time carbon calculation script — reads route data from JSON, calls Carbon Interface or Climatiq API, writes output back to static JSON. This runs once at build time, not on every page load.
- [ ] Decide between Carbon Interface and Climatiq (both free tier) and get an API key
- [ ] Test the build script with the Thin Mint placeholder data before Mia's real data arrives

### UI Components

Build each component to read from the JSON files. Use placeholder data until Mia's files are filled in.

- [ ] Site layout: header, footer, mobile navigation
- [ ] Supply chain journey step component — reusable card that shows one step: origin, destination, transport mode, carbon amount, confidence label
- [ ] Carbon footprint breakdown chart — visual bar or pie showing farming vs. manufacturing vs. shipping vs. distribution
- [ ] **Thin Mint deep dive page** — uses the journey step and carbon chart components, plus the ethics angle and Olivia Chaffin story
- [ ] **Vest deep dive page** — same components, different data
- [ ] **Cookie Box deep dive page** — same components, different data
- [ ] "Explore Any Product" search page — text input, fuzzy search against `data/products/inventory.json`, fallback message with Open Supply Hub and Freightos links for unknown products
- [ ] Council-based carbon calculator — dropdown of 112 councils (from `data/councils.json`), calculates and displays the full Thin Mint footprint for that council's bakery + shipping distance
- [ ] Generate design mockups (2–3 options) using the `/frontend-design` skill based on the PRD — share with Mia for her to choose
- [ ] Apply Mia's chosen design to all pages

### Quiz & Certificate

- [ ] Quiz entry screen — name input field, "Start Quiz" button
- [ ] Quiz question display — shows one question at a time with radio button answer choices, progress indicator (Question 3 of 10)
- [ ] Random selection logic — draws 10 questions from `data/questions.json` pool of 40 on each page load
- [ ] Score results screen — shows score, which questions were missed (with correct answers), and either the certificate (Mia's component) or a "try again" prompt
- [ ] Wire up Mia's Certificate component — show it when score ≥ 7/10, pass the visitor's name as a prop
- [ ] Print stylesheet — makes the certificate look clean when printed or saved as PDF (hides nav, quiz controls, etc.)

### Guided Walkthrough Mode

- [ ] Add a "Presentation Mode" toggle to the site (hidden by default, accessible via a URL like `/present`)
- [ ] In presentation mode: hide the free navigation, show Previous / Next buttons, and step through a fixed sequence: Homepage → Thin Mint → Vest → Cookie Box → Carbon Calculator → Why It Matters → Quiz
- [ ] Make sure presentation mode works on a laptop connected to a projector (landscape, larger text)

### Testing

- [ ] Unit tests for the random question selection logic (confirm 10 drawn from 40, no duplicates)
- [ ] Unit tests for the council carbon calculation logic
- [ ] Integration test: search for a product that exists, confirm the right page loads
- [ ] Integration test: search for a product that doesn't exist, confirm the fallback message appears
- [ ] Test the print certificate layout on Chrome, Safari, and Firefox

---

## Phase 3 — Integration (Both)

Do this after both tracks are substantially complete.

- [ ] **Ryan:** Pull Mia's finished JSON files into the live site and confirm all pages render correctly with real data
- [ ] **Mia:** Review every page for content accuracy — check that the facts Ryan's code is displaying match what you researched
- [ ] **Both:** Walk through the full guided walkthrough sequence together as a dry run for the Gold Award panel presentation
- [ ] **Mia:** Test the quiz — take it yourself, check that all 40 questions are accurate and the certificate prints cleanly
- [ ] **Both:** Read through every page on a phone together and note anything that feels too small, too cramped, or hard to tap
- [ ] **Ryan:** Fix any bugs or layout issues from the review
- [ ] **Both:** Final sign-off before submitting to the Gold Award panel

---

## Notes

- If you're ever blocked waiting on the other person, add a comment in the relevant file and move on to another task — there's always something on your own track to work on.
- Mia: if a JSON file format ever feels confusing, ask Ryan to walk you through one example entry before you fill in the rest. You should never have to guess what a field means.
- Mia: for your coding tasks, use Claude Code. Open the terminal in VS Code, type `claude`, and describe what you want in plain English. You don't need to understand every line — just make sure each task works the way you expect before moving on.
- Ryan: build every component to handle missing or incomplete data gracefully — Mia's files will be works in progress for a while.
- Ryan: don't touch `app/page.tsx`, `app/why-it-matters/page.tsx`, `app/sources/page.tsx`, or `components/Certificate.tsx` — those are Mia's files. If you need to reference the certificate in your quiz logic, import it from `components/Certificate.tsx`.
