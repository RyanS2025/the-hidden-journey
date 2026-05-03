# The Hidden Journey — Collaboration Checklist

**Mia** handles content, research, data files, and the entire frontend — every page and visual component, built with Claude Code.
**Ryan** handles setup, infrastructure, business logic (calculations, search, quiz flow), and deployment. He wires real data and logic into Mia's UI templates.

The goal is for both of you to work at the same time without waiting on each other. The only moment you need to sync is at the very start (Phase 0) — after that, your tracks are fully independent until integration.

---

## How This Works

Mia builds the **visual layer** — pages and component templates. Ryan builds the **logic layer** — data fetching, calculations, randomization, search. They meet in the middle: Ryan defines the props each interactive component takes (a TypeScript interface, basically a JSON shape for components), and Mia builds layouts that consume those props with placeholder values. When Ryan wires up real logic, Mia's templates light up.

The one rule: **complete Phase 0 together before splitting.** Everything after that can happen in parallel.

---

## Phase 0 — Kickoff (Do Together First)

These tasks have to happen before either of you can work independently. Should take one short session.

- [ ] **Ryan:** Initialize the Next.js project with Tailwind CSS and shadcn/ui
- [ ] **Ryan:** Connect the repo to Vercel so every push auto-deploys a live preview URL
- [ ] **Ryan:** Create all empty JSON data files with the correct structure (Mia fills these in later — Ryan just creates the blank templates with the right field names)
- [ ] **Ryan:** Define TypeScript prop interfaces for every interactive component Mia will build (journey step card, carbon chart, search input/results, council calculator, quiz question, score screen). Put them somewhere Mia can import them, like `lib/types.ts`.
- [ ] **Both:** Walk through the JSON file formats AND the component prop interfaces together so Mia knows exactly what shapes to build against without needing to ask Ryan

The JSON files Ryan creates (empty, for Mia to fill):
- `data/cookies/thin-mint.json` (the flagship deep dive — full supply chain detail)
- `data/cookies/lineup.json` (all 9 cookie varieties with summary data: name, ingredients, carbon estimate, key facts)
- `data/councils.json` (which council uses which bakery)
- `data/questions.json` (the 40 quiz questions)
- `data/sources.json` (all cited sources)

---

## Mia's Track — Content, Research, Data & Frontend

Work on these in any order you like. The Writing and Data tasks don't require code from Ryan; the Frontend Build tasks need Phase 0 done first.

### Writing (no JSON, just text)

- [x] Write the Olivia Chaffin story in your own words — this is the emotional centerpiece of the site. Aim for 300–500 words. Save it as `content/olivia-chaffin.md`
- [x] Write the "Why It Matters" section copy for all four themes:
  - Environmental Impact
  - Labor & Human Rights
  - Global Cooperation
  - Consumer Power
  Save as `content/why-it-matters.md`
- [x] Write a short ethics angle for the featured cookie content (2–3 paragraphs each):
  - Thin Mint: the "Mass Balance" palm oil story and what it means
  - Cookie Box (packaging note): what "100% recycled" really means
  Save as `content/ethics-angles.md`
- [x] Write the homepage intro copy — a short, engaging paragraph that explains what this site is and why it matters, written for a Girl Scout audience (ages 10–18). Save as `content/homepage.md`

### Data Files (filling in JSON)

Ryan will give you the empty files with the right format after Phase 0. Your job is to fill in the real facts.

- [ ] Fill in `data/cookies/thin-mint.json` — flagship deep dive. Supply chain steps, ingredient origins, confidence levels (confirmed vs. estimated), and total carbon footprint (~0.8 kg CO₂ per box)
- [ ] Fill in `data/cookies/lineup.json` — all 9 cookie varieties (Thin Mints, Samoas, Tagalongs, Do-si-dos, Trefoils, Lemon-Ups, Toffee-tastic, Adventurefuls, Exploremores). Each entry needs name, key ingredients, distinctive supply-chain note, and a rough carbon estimate
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
  | Other cookie varieties (lineup) | 8 |
  | Cookie packaging (the box) | 3 |
  | Carbon calculator / footprints | 7 |
  | Why It Matters themes | 7 |
  | Olivia Chaffin story | 5 |

- [ ] Fill in `data/sources.json` — all cited sources from PRD §4.4, plus any additional sources you use while researching

### Design Review

- [ ] Review the design mockups Ryan generates and pick the visual style you want (Ryan will ping you when these are ready)
- [ ] Apply the chosen design to your pages and components as you build them
- [ ] Test the live preview URL on your phone at each milestone — you're the mobile-first audience

### Frontend Build (with Claude Code)

You're building the visual layer of the entire site. Use Claude Code to walk through each task. For interactive components (search, calculator, quiz), Ryan will define a TypeScript interface that tells you exactly what props your component will receive — your job is to make it look great with placeholder values. Ryan plugs in the real data and logic later.

**Wait until after Phase 0 before starting these** — Ryan needs to set up the project and define the component interfaces first.

#### Site shell

- [ ] **Site layout** (`app/layout.tsx` plus header/footer components) — Build the global header with site name and navigation links (Home, Thin Mint, Cookie Lineup, Calculator, Why It Matters, Olivia, Quiz, Sources), and the footer. Make sure mobile navigation works (hamburger menu or similar). Ask Claude Code: *"Help me build a Next.js site layout with a responsive header and mobile navigation menu using Tailwind CSS and shadcn/ui."*

#### Static pages

- [ ] **Homepage page** (`app/page.tsx`) — Build the homepage using the copy you wrote in `content/homepage.md`. Hero heading, tagline, intro paragraph, and links to the Thin Mint deep dive and the full cookie lineup. Ask Claude Code: *"Help me build a Next.js homepage page that displays my homepage.md content with Tailwind CSS styling."*

- [ ] **"Why It Matters" page** (`app/why-it-matters/page.tsx`) — Show your four themes as four visual cards. Ask Claude Code: *"Help me build a Next.js page that shows four content sections as cards using Tailwind CSS, reading from my why-it-matters.md file."*

- [ ] **Sources page** (`app/sources/page.tsx`) — Lists all sources from `data/sources.json` in a clean table or list. Ask Claude Code: *"Help me build a Next.js page that reads sources.json and displays each source as a row in a table using Tailwind CSS."*

- [ ] **Olivia's Story page** (`app/olivia/page.tsx`) — Dedicated page for the Olivia Chaffin story from `content/olivia-chaffin.md`. Editorial layout with the polaroid photo placeholder, body paragraphs, and pull quote. Ask Claude Code: *"Help me build a Next.js page that displays my olivia-chaffin.md content with editorial styling — body text, a polaroid photo block on the side, and a pull quote — using Tailwind CSS."*

#### Cookie pages

- [ ] **Thin Mint flagship deep dive page** (`app/thin-mint/page.tsx`) — The flagship product page. Shows the supply chain journey (a series of `JourneyStep` cards), the `CarbonChart` component, the "Mass Balance" ethics angle from `content/ethics-angles.md`, the "100% recycled" cookie-box packaging note, and an excerpt or link to the Olivia Chaffin story. Use placeholder data — Ryan wires the real JSON later. Ask Claude Code: *"Help me build a Next.js product page that displays a series of supply-chain step cards and a carbon breakdown chart, against the TypeScript interface Ryan defined."*

- [ ] **Cookie lineup page** (`app/lineup/page.tsx`) — A grid of all 9 cookie varieties (Thin Mints, Samoas, Tagalongs, Do-si-dos, Trefoils, Lemon-Ups, Toffee-tastic, Adventurefuls, Exploremores). Each card shows the cookie's SVG illustration, name, key ingredients, country count, and rough carbon estimate. Click-through opens a focused view. Ask Claude Code: *"Help me build a Next.js page that reads `data/cookies/lineup.json` and displays a 3×3 grid of cookie cards with their illustrations, names, and carbon estimates."*

#### Reusable components

- [ ] **Supply chain journey step card** (`components/JourneyStep.tsx`) — Reusable card showing one step of a supply chain: origin, destination, transport mode, carbon amount, confidence label (confirmed vs. estimated). Build the visual; Ryan defines the prop shape. Ask Claude Code: *"Help me build a React component called JourneyStep that displays one supply-chain step as a card with origin, destination, transport mode, carbon amount, and confidence label, using Tailwind CSS."*

- [ ] **Carbon footprint chart** (`components/CarbonChart.tsx`) — Visual bar or pie chart showing how a product's total carbon footprint breaks down (farming vs. manufacturing vs. shipping vs. distribution). Build the visual; Ryan supplies real numbers. Ask Claude Code: *"Help me build a React component called CarbonChart that displays a carbon footprint breakdown as a bar chart, taking in a list of categories and amounts as a prop."*

- [ ] **Certificate component** (`components/Certificate.tsx`) — The visual certificate that appears when someone passes the quiz. Visitor's name, congratulations message, site name, print button. Ryan wires *when* it appears — your job is making it look great. Ask Claude Code: *"Help me build a React component called Certificate that takes a `name` prop and displays a printable certificate with a congratulations message and a print button, styled with Tailwind CSS."*

#### Interactive page templates (you build the look, Ryan adds the logic)

- [ ] **Cookie search page** (`app/explore/page.tsx`) — Visual layout: a search input that filters the 9 cookies by name or ingredient, plus a "no results" fallback message with links to Open Supply Hub and Freightos for cookies/products beyond your lineup. Use placeholder results until Ryan wires the fuzzy search. Ask Claude Code: *"Help me build a Next.js search page with a text input, a result list area, and a 'no results' fallback message, using Tailwind CSS — Ryan will wire the search logic later."*

- [ ] **Council carbon calculator page** (`app/calculator/page.tsx`) — Visual layout: a dropdown listing all 112 councils (placeholder list until Ryan loads from `data/councils.json`), and a result display showing the calculated carbon footprint. Ask Claude Code: *"Help me build a Next.js page with a council dropdown and a result display area for a carbon calculator, using Tailwind CSS — Ryan will plug in the calculation logic."*

- [ ] **Quiz entry screen** (`app/quiz/page.tsx`) — Name input field and a "Start Quiz" button. Ask Claude Code: *"Help me build a Next.js quiz entry page with a name input and a Start Quiz button using Tailwind CSS and shadcn/ui."*

- [ ] **Quiz question display** (`components/QuizQuestion.tsx`) — Visual layout for one question at a time: question text, 3–4 radio button answer choices, progress indicator ("Question 3 of 10"). Ryan wires which question shows when. Ask Claude Code: *"Help me build a React component called QuizQuestion that displays a question, 3-4 radio button answer choices, and a 'Question X of N' progress indicator — Ryan will wire the question selection."*

- [ ] **Score results screen** (`components/QuizResults.tsx`) — Visual layout: score, list of missed questions with correct answers, and a slot where either the Certificate component or a "try again" prompt appears. Ryan wires the score logic and the conditional rendering. Ask Claude Code: *"Help me build a React component called QuizResults that displays a quiz score, a list of missed questions with correct answers, and a slot where Ryan will conditionally render either a Certificate or a try-again prompt."*

#### Helper script

- [ ] **JSON validation script** (`scripts/validate-data.js`) — A small script you can run after editing a data file, to catch missing fields or typos before Ryan pulls your files in. Ask Claude Code: *"Help me write a Node.js script that reads my JSON data files and checks that every entry has all the required fields, then prints a list of any errors it finds."*

---

## Ryan's Track — Setup, Logic & Wiring

Work on these in order within each section, but the sections themselves can overlap with Mia's work.

### Setup

- [ ] Initialize Next.js project (App Router), add Tailwind CSS and shadcn/ui
- [ ] Connect to Vercel, confirm auto-deploy works on every push
- [ ] Create all empty JSON data files with correct schemas and field names (see Phase 0 list above)
- [ ] Define TypeScript prop interfaces for every interactive component Mia will build (journey step, carbon chart, search input, council calculator, quiz question, score screen) — put them in `lib/types.ts` so Mia can import them
- [ ] Write a short `DATA_GUIDE.md` file in the `data/` folder explaining each JSON field in plain English — for Mia, not for code
- [ ] Generate design mockups (2–3 options) using the `/frontend-design` skill based on the PRD — share with Mia for her to pick

### Data Infrastructure

- [ ] Write the build-time carbon calculation script — reads route data from JSON, calls Carbon Interface or Climatiq API, writes output back to static JSON. This runs once at build time, not on every page load.
- [ ] Decide between Carbon Interface and Climatiq (both free tier) and get an API key
- [ ] Test the build script with the Thin Mint placeholder data before Mia's real data arrives

### Wiring & Logic

Mia builds the UI templates; you wire the data and logic in.

- [ ] Wire JSON data into Mia's Thin Mint deep-dive page — feed the journey steps and carbon chart data from `data/cookies/thin-mint.json`
- [ ] Wire JSON data into Mia's cookie lineup page — feed the 9 cookies from `data/cookies/lineup.json` into the grid
- [ ] Fuzzy search logic for the cookie search page — match user input against `data/cookies/lineup.json` (cookie names + ingredients), return ranked results to Mia's result list
- [ ] Council carbon calculation — read `data/councils.json`, compute the full Thin Mint footprint for the selected council's bakery + shipping distance, hand the number to Mia's result display
- [ ] Carbon chart data transformation — turn raw carbon numbers from JSON into chart-ready category breakdowns for Mia's `CarbonChart` component

### Quiz Logic

- [ ] Random selection logic — draws 10 questions from `data/questions.json` pool of 40 on each page load, no duplicates within a single quiz
- [ ] Quiz state management — tracks which question is showing, user's answers, score
- [ ] Wire Mia's `QuizQuestion` component to the question pool and to the user's progress through the quiz
- [ ] Score calculation — count correct answers, identify which were missed
- [ ] Wire Mia's `QuizResults` component: pass it the score and missed questions, conditionally render Mia's `Certificate` (when score ≥ 7/10) or a "try again" prompt
- [ ] Print stylesheet — makes the certificate look clean when printed or saved as PDF (hides nav, quiz controls, etc.)

### Guided Walkthrough Mode

- [ ] Add a "Presentation Mode" toggle to the site (hidden by default, accessible via a URL like `/present`)
- [ ] In presentation mode: hide the free navigation, show Previous / Next buttons, and step through a fixed sequence: Homepage → Thin Mint → Cookie Lineup → Carbon Calculator → Why It Matters → Olivia → Quiz
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
- [ ] **Mia:** Review every page for content accuracy — check that the facts displayed match what you researched
- [ ] **Both:** Walk through the full guided walkthrough sequence together as a dry run for the Gold Award panel presentation
- [ ] **Mia:** Test the quiz — take it yourself, check that all 40 questions are accurate and the certificate prints cleanly
- [ ] **Both:** Read through every page on a phone together and note anything that feels too small, too cramped, or hard to tap
- [ ] **Both:** Fix any bugs or layout issues from the review (Mia handles UI fixes, Ryan handles logic fixes)
- [ ] **Both:** Final sign-off before submitting to the Gold Award panel

---

## Notes

- If you're ever blocked waiting on the other person, add a comment in the relevant file and move on to another task — there's always something on your own track to work on.
- Mia: if a JSON field or component prop interface ever feels confusing, ask Ryan to walk you through one example before you build the rest. You should never have to guess what something means.
- Mia: for your coding tasks, use Claude Code. Open the terminal in VS Code, type `claude`, and describe what you want in plain English. You don't need to understand every line — just make sure each task works the way you expect before moving on.
- Mia: build interactive components against Ryan's TypeScript interfaces using placeholder values. When Ryan wires the real data later, your component should "just work" because the prop shape matches.
- Ryan: Mia owns all files in `app/` and `components/`. Don't restructure her layouts — wire your logic into the props she's already consuming. If a page needs a new visual element, ask Mia to add it to her template.
- Mia: don't touch files in `lib/`, `tests/`, or anything ending in `.test.ts` — those are Ryan's logic and tests. Your validation script in `scripts/validate-data.js` is fine.
