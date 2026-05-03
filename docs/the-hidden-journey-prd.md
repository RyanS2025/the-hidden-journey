# The Hidden Journey — Product Requirements Document

**Project:** The Hidden Journey — Where Your Stuff Really Comes From
**Type:** Girl Scout Gold Award Project
**Created by:** Mia
**Developers:** Mia (frontend — pages and components, with Claude Code) and Ryan (first-year CS student — infrastructure, logic, and data wiring, with Claude Code learning mode)
**Date:** March 29, 2026
**Last Updated:** May 3, 2026 (booth-education framing + developer split + cookies-only scope cut)

---

## 1. What Is This Project?

The Hidden Journey is an educational website that traces the global supply chains and carbon footprints behind Girl Scout cookies. Scouts can see exactly where the ingredients in every cookie variety come from, how those ingredients travel, and what the certifications on the box actually mean — so they can answer customer questions at booths with real, accurate information.

---

## 2. Why Does This Project Exist?

A single Girl Scout cookie touches six countries before it reaches a customer's hands, and most of the people behind every ingredient and process never get acknowledged. This project gives Scouts the full picture of what they're selling — so when a customer at a booth asks "where does this come from?" or "is this sustainable?", a Scout can answer with real, accurate information instead of a memorized pitch.

The site is built for Scouts (the people doing the selling) and for the customers and community members they sell to. It also fulfills the Girl Scout Gold Award requirement: a sustainable, community-impacting project that demonstrates leadership.

---

## 3. Who Is This For?

- **Girl Scouts (ages 10–18):** The primary audience. Content should be engaging and visual, not dry or academic.
- **Parents & troop leaders:** They'll share the site and use it as an educational tool.
- **Educators:** Could use it as a classroom supplement.
- **Gold Award reviewers:** Need to see clear scope, real research, and community impact.

---

## 4. Core Features

**Site architecture:** Every section described below is its own page (its own URL) — not a section on a long scrolling homepage. The homepage is a brief landing page (hero + tagline + intro paragraph + links to the other pages); each feature below lives at its own route. Visitors navigate via the global nav, or step through them in order via the Guided Walkthrough Mode (§4.4).

| Section | URL |
|---|---|
| Homepage | `/` |
| Thin Mint deep dive | `/thin-mint` |
| Cookie lineup | `/lineup` |
| Council calculator | `/calculator` |
| Why It Matters | `/why-it-matters` |
| Olivia's Story | `/olivia` |
| Quiz | `/quiz` |
| Sources | `/sources` |

### 4.1 The Thin Mint Flagship Deep Dive

The Thin Mint is the flagship cookie page — the most thoroughly researched supply chain on the site, and the entry point for visitors who want the full journey of a single cookie.

- Journey: Palm oil (Indonesia/Malaysia) → Cocoa (Ivory Coast/Ghana) → Sugar, flour, peppermint (U.S. Midwest/Pacific NW) → Baking (South Dakota or Kentucky) → Distribution (your neighborhood)
- Two licensed bakeries:
  - **ABC Bakers** — North Sioux City, South Dakota (operates as a division of Interbake Foods; owned by Hearthside Food Solutions, a U.S. company that acquired the cookies/crackers division from Weston Foods of Canada in 2021)
  - **Little Brownie Bakers** — Louisville, Kentucky (owned by Italian company Ferrero, which acquired it from Kellogg's in 2019)
- 112 regional Girl Scout councils each choose one bakery — not geographically determined
- Both use RSPO Mass Balance certified palm oil (ABC Bakers upgraded to Mass Balance in 2021)
- ABC Bakers sources cocoa from World Cocoa Foundation members
- Combined production: 200+ million boxes per season
- Carbon footprint: ~0.8 kg CO₂ per box (varies by council location — see §4.3)
- Ingredient sourcing confidence levels:
  - **Confirmed:** Palm oil (Indonesia/Malaysia, RSPO certified), Cocoa (West Africa, World Cocoa Foundation)
  - **Estimated:** Sugar (~U.S. Midwest), Flour (~U.S. Midwest wheat), Peppermint oil (~Pacific NW)
- Ethics angles surfaced on this page:
  - **Mass Balance palm oil** — what the certification actually guarantees (and what it doesn't)
  - **The cookie box itself** — 100% recycled paperboard, and what "100% recycled" really means as a packaging note
- The Olivia Chaffin story — a Tennessee Girl Scout who researched the "mixed" label on her cookie box's palm oil sourcing and started a national conversation about transparency in food supply chains. **This is original content written by Mia** (the emotional centerpiece of the project)

The Thin Mint deep dive should show:
- A step-by-step journey with locations
- Carbon footprint at each step and in total
- A breakdown of where the carbon comes from (farming vs. manufacturing vs. shipping vs. distribution)
- The ethics angles above
- A pointer to the Olivia Chaffin story

### 4.2 The Cookie Lineup

A grid of all 9 Girl Scout cookie varieties, each with a custom illustration and a summary card showing key ingredients, country count, and a rough carbon estimate. The Thin Mint links out to its full deep dive (§4.1); the other 8 are summary-only on this page.

**The 9 cookies:**

| Cookie | Distinctive ingredients | Notes |
|---|---|---|
| Thin Mints | Palm oil, cocoa, peppermint | Flagship deep dive |
| Samoas / Caramel deLites | Coconut, caramel, chocolate | Adds a Southeast Asian coconut supply chain |
| Tagalongs / Peanut Butter Patties | Peanuts, chocolate | U.S. peanuts + West African cocoa |
| Do-si-dos / Peanut Butter Sandwich | Oats, peanut butter | Mostly domestic |
| Trefoils / Shortbread | Butter, flour, sugar | Simplest supply chain |
| Lemon-Ups / Lemonades | Lemon flavoring, sugar | Citrus oils |
| Toffee-tastic | Toffee, butter (gluten-free) | Limited release |
| Adventurefuls | Caramel brownie, sea salt | Newer variety |
| Exploremores | Chocolate, marshmallow, toasted-almond crème (sandwich, rocky-road inspired) | Brand new — debuted 2026 cookie season (announced Sept 2025) |

The cookie lineup is stored as `data/cookies/lineup.json` — human-editable, so cookies can be added or removed when GSUSA changes the lineup without any code changes.

**Search:** A search bar above the grid filters cookies by name or ingredient. For searches outside the cookie lineup (someone types "tent" or "smartphone"), a fallback message points them to:
- **Find where it's made →** Open Supply Hub (opensupplyhub.org)
- **Calculate shipping emissions →** Freightos (freightos.com)

### 4.3 Council-Based Carbon Calculator

A key interactive feature: the carbon footprint of Girl Scout cookies **changes based on where you live.**

- The user selects their Girl Scout council (or general region)
- The site determines which bakery supplies that council (ABC Bakers in SD or Little Brownie in KY)
- The domestic shipping leg (bakery → distribution → your area) is calculated per council
- Raw ingredient shipping (palm oil from Indonesia, cocoa from Ghana) is the same regardless of council

This means a Thin Mint bought in California has a longer domestic shipping footprint than one bought in Kentucky, even though the overseas ingredient journey is identical. The council-to-bakery mapping is stored as part of the editable data layer.

### 4.4 Guided Walkthrough Mode

A presentation mode that lets Mia step through the site's content sequentially during her Gold Award panel presentation. The site must work both as:
- **Self-serve:** Visitors navigate freely on their own
- **Guided demo:** Mia can walk through a structured flow during a live presentation

Walkthrough sequence: Homepage → Thin Mint deep dive → Cookie Lineup → Council Calculator → Why It Matters → Olivia's Story → Quiz.

### 4.5 Knowledge Quiz & Certificate

A 10-question quiz that visitors can take after exploring the site. Passing earns a printable certificate with the visitor's name.

**How it works:**
1. Visitor enters their name before starting
2. 10 questions are drawn randomly from a pool of 40
3. All questions are multiple choice (3–4 answer options)
4. Visitor submits answers and sees their score immediately
5. Score ≥ 7/10 (70%): certificate screen appears with their name — printable or saveable as PDF
6. Score < 7/10: they see which questions they missed and can retake immediately
7. Each retake draws a fresh random 10 from the pool — no two attempts are identical
8. Unlimited retakes

**Question pool (40 questions, distributed across):**
- Thin Mint supply chain (10)
- Other cookie varieties from the lineup (8)
- Cookie packaging / "100% recycled" (3)
- Carbon calculator / footprints (7)
- Why It Matters themes (7)
- Olivia Chaffin story (5)

Each question entry includes: question text, answer choices (array), correct answer index, and topic tag.

**Certificate:**
- Displays visitor's name (entered at quiz start), a congratulations message, and the site name
- Printable via browser print dialog; also saves cleanly as a PDF
- No login or account required — name is only used for the certificate display

### 4.6 Why It Matters

Explain why understanding supply chains is important. Four key themes (booth-education framing, not corporate critique):

1. **Environmental Impact** — Every cookie has a footprint; understanding it lets Scouts talk about it accurately
2. **Labor & Human Rights** — Real people grow and make every ingredient; knowing about them is part of respecting the work
3. **Global Cooperation** — One cookie connects workers across six countries — Scouts who understand this can tell that story confidently
4. **Consumer Power** — When a Scout knows what they're selling, they can answer customer questions honestly, and that builds the kind of trust that actually moves cookies

### 4.7 Sources

All data sources must be free and publicly accessible. Confirmed sources:

| Source | What It Provides |
|---|---|
| Open Supply Hub (opensupplyhub.org) | Factory and supplier location data |
| Freightos Emissions Calculator | Shipping carbon footprint estimates |
| EcoTransIT World (ecotransit.org) | Transport emissions calculations |
| EPA Supply Chain Guidance | U.S. environmental supply chain data |
| RSPO Records (rspo.org) | Palm oil certification details (Mass Balance, Segregated, Identity Preserved) |
| World Cocoa Foundation | Cocoa supply chain & sourcing data |
| Company sustainability reports | Direct data from Girl Scouts, ABC Bakers, Ferrero |

---

## 5. Key Content & Research

### 5.1 Supply Chain Facts to Get Right

- ABC Bakers (SD) is owned by Hearthside Food Solutions, a U.S. company (acquired from Weston Foods Canada in 2021); Little Brownie Bakers (KY) is owned by Ferrero, an Italian company (acquired from Kellogg's in 2019)
- All cookies use RSPO "Mass Balance" palm oil — a certification system worth understanding so Scouts can accurately explain what "sustainable" means on the box
- Palm oil sourced from Indonesia and Malaysia
- Cocoa sourced from West Africa (Ivory Coast and Ghana produce ~70% of world supply)
- Cookie boxes are made of 100% recycled paperboard (post-consumer + pre-consumer mix)
- Olivia Chaffin's story is the emotional centerpiece of the project

### 5.2 Carbon Data Approach

All carbon numbers are calculated at **build time** using a carbon footprint API (Carbon Interface or Climatiq — decision deferred). The API takes route segments (origin, destination, transport mode) and returns emissions estimates.

Data confidence levels:
- **Confirmed** — sourced from public sustainability reports, RSPO records, or company disclosures
- **Estimated (~)** — educated approximations based on U.S. agricultural geography and industry norms

All numbers are presented with "~" and the site is transparent about methodology. These are educational approximations, not precise measurements.

### 5.3 Data Template Structure

The flagship Thin Mint deep dive follows this structure:

```
Cookie (Thin Mint)
├── Ingredient 1 (e.g., palm oil)
│   ├── Source location (country/region)
│   ├── Confidence level (confirmed / estimated)
│   ├── Transport mode (ship, truck, rail)
│   ├── Destination (bakery location)
│   └── Carbon footprint (calculated via API at build time)
├── Ingredient 2...
├── Manufacturing (baking)
│   ├── Bakery location (ABC SD or Little Brownie KY)
│   └── Energy footprint
├── Packaging (the box)
│   └── 100% recycled paperboard
└── Distribution
    ├── From (bakery)
    ├── To (council region — variable per council)
    └── Carbon footprint (calculated per region)
```

The cookie lineup (the other 8 cookies) uses a lighter summary structure: name, distinctive ingredients, country count, rough carbon estimate, and a short note about what makes that cookie's supply chain different from the Thin Mint baseline.

Both live as editable JSON files. Mia adds or updates a cookie by filling in the data; the build script calculates emissions automatically.

**Quiz question template:**
Each entry in the question pool (`questions.json`) follows this structure:

```json
{
  "id": "q001",
  "topic": "thin-mint",
  "question": "Which country is the largest source of palm oil used in Girl Scout cookies?",
  "choices": ["Brazil", "Indonesia", "United States", "Ghana"],
  "correctIndex": 1
}
```

---

## 6. Constraints

- **$0 budget** — No paid tools, APIs, services, or hosting costs at runtime
- **Build-time data generation** — Carbon footprint data is calculated at build time using a free API (Carbon Interface or Climatiq — decision deferred), then baked into static JSON. No runtime API dependencies.
- **Sustainable without maintenance** — The site should work indefinitely without anyone updating a server or renewing a subscription
- **Mobile-friendly** — Girl Scouts and parents will primarily access on phones
- **Editable data layer** — Cookie data and council mappings live in standalone JSON files that can be updated without touching code
- **Transparency** — All data points are labeled as "confirmed" (from public sources) or "estimated" (educated approximations with ~). The site is transparent about its methodology.

---

## 7. What Success Looks Like

- A visitor can trace the full journey of a Thin Mint cookie from raw materials to their hands, with carbon at every step
- Visitors can browse the cookie lineup and see how every variety differs in ingredients and supply chain complexity
- Carbon footprint data is clear and visual at every step, with confirmed vs estimated labels
- The council-based calculator shows how cookie carbon footprint varies by location
- The Olivia Chaffin story (in Mia's own words) makes the content feel real, not like a textbook
- The cookie search smoothly handles known cookies and gracefully points users to external research tools (Open Supply Hub, Freightos) for products outside the lineup
- The guided walkthrough mode lets Mia present confidently to her Gold Award panel
- The site also works as a standalone self-serve experience for visitors
- All sources are cited and verifiable; data confidence levels are transparent
- Adding or removing a cookie variety requires editing a JSON file, not code changes
- Visitors who score 7/10 or higher on the knowledge quiz receive a printable certificate with their name on it; the question pool of 40 is randomized per attempt so retakes feel fresh

---

## 8. Technical Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js | File-based routing, SSG support, large community, great for learning and portfolio |
| **Styling** | Tailwind CSS | Utility-first, no CSS file context-switching, beginner-friendly |
| **UI Components** | shadcn/ui | Copy-paste components (not black-box), readable source code for learning |
| **Data Layer** | Static JSON files | Human-editable, no database, Mia can update products without touching code; quiz question pool lives in `questions.json` with the same edit-without-code-changes pattern |
| **Carbon Calculation** | Build-time Node.js script | Calls Carbon Interface or Climatiq API during build, outputs static JSON |
| **Hosting** | Vercel free tier | Zero-config Next.js deploys, free custom domain, git push → live URL |
| **Testing** | Vitest + React Testing Library | Fast, modern, supports TDD workflow |

### 8.1 Visual Design (TBD)

Visual style to be determined. Ryan generates two to three sample HTML layouts using the `/frontend-design` skill with Tailwind CSS, based on this PRD. Mia picks one and applies it across her pages and components as she builds them.

Design priorities:
- Engaging and visual for ages 10–18 (not dry or academic)
- Mobile-first (primary audience accesses on phones)
- Clean navigation flow that supports both free exploration and sequential walkthrough
- Polished enough for Gold Award panel presentation

---

## 9. Future Ideas (Not for v1)

- Interactive world map showing supply chain routes with animated paths
- "Guess the Product's Journey" quiz
- Downloadable teacher lesson plans
- Expanded product database beyond Girl Scout world
- Side-by-side product carbon comparison tool
- Impact calculator ("If every Girl Scout chose X, we'd save Y kg CO₂")
- Dark mode
- Spanish language support
- Real-time carbon API integration (move from build-time to runtime calculation)

---

*This PRD defines what to build and why. Technical stack, design, and architecture decisions will be made during development.*
