# The Hidden Journey — Product Requirements Document

**Project:** The Hidden Journey — Where Your Stuff Really Comes From
**Type:** Girl Scout Gold Award Project
**Created by:** Mia
**Developer:** Ryan (first-year CS student, using Claude Code learning mode)
**Date:** March 29, 2026
**Last Updated:** March 29, 2026 (post-Q&A revision)

---

## 1. What Is This Project?

The Hidden Journey is an educational website that shows people the global supply chains and carbon footprints behind everyday products. It uses Girl Scout products (cookies, uniforms, cookie boxes) as the main examples because they're familiar to the target audience, then lets visitors explore any product.

---

## 2. Why Does This Project Exist?

Most people have no idea how many countries, workers, and miles are involved in making the products they use every day. A single Girl Scout cookie touches six countries before it reaches your doorstep. This project makes that invisible journey visible.

This also fulfills the Girl Scout Gold Award requirement: a sustainable, community-impacting project that demonstrates leadership.

---

## 3. Who Is This For?

- **Girl Scouts (ages 10–18):** The primary audience. Content should be engaging and visual, not dry or academic.
- **Parents & troop leaders:** They'll share the site and use it as an educational tool.
- **Educators:** Could use it as a classroom supplement.
- **Gold Award reviewers:** Need to see clear scope, real research, and community impact.

---

## 4. Core Features

### 4.1 Girl Scout Product Deep Dives

Three featured products, each with a full supply chain story:

**Product 1 — Thin Mint Cookie**
- Journey: Palm oil (Indonesia/Malaysia) → Cocoa (Ivory Coast/Ghana) → Sugar, flour, peppermint (U.S. Midwest/Pacific NW) → Baking (South Dakota or Kentucky) → Distribution (your neighborhood)
- Two licensed bakeries:
  - **ABC Bakers** — North Sioux City, South Dakota (owned by Canadian company Weston Foods)
  - **Little Brownie Bakers** — Louisville, Kentucky (owned by Italian company Ferrero)
- 112 regional Girl Scout councils each choose one bakery — not geographically determined
- Both use RSPO Mass Balance certified palm oil (ABC Bakers upgraded to Mass Balance in 2021)
- ABC Bakers sources cocoa from World Cocoa Foundation members
- Combined production: 200+ million boxes per season
- Carbon footprint: ~0.8 kg CO₂ per box (varies by council location — see §4.5)
- Ingredient sourcing confidence levels:
  - **Confirmed:** Palm oil (Indonesia/Malaysia, RSPO certified), Cocoa (West Africa, World Cocoa Foundation)
  - **Estimated:** Sugar (~U.S. Midwest), Flour (~U.S. Midwest wheat), Peppermint oil (~Pacific NW)
- Ethics angle: The Olivia Chaffin story — a Tennessee Girl Scout who researched the "mixed" label on her cookie box's palm oil sourcing and launched a petition that got national attention. **This will be original content written by Mia** (the emotional centerpiece of the project)

**Product 2 — Girl Scout Vest**
- Journey: Cotton farming (India/China/U.S.) → Textile production & dyeing (Asia) → Sewing & assembly → Shipping → Retail
- The vest is actually made in the USA from recycled polyester — a positive sustainability story that contrasts with the cookies
- Carbon footprint: ~10 kg CO₂ per vest
- Ethics angle: "Made in USA" as a supply chain choice — what does domestic production mean for transparency and labor?

**Product 3 — Cookie Box (Packaging)**
- Journey: Pulp sourcing → Paper mill → Printing → Assembly → Filled at bakery
- Uses 100% recycled content paperboard
- Ethics angle: What does "100% recycled" actually mean? Where does recycled pulp come from?

Each product should show:
- A step-by-step journey with locations
- Carbon footprint at each step and in total
- A breakdown of where the carbon comes from (farming vs. manufacturing vs. shipping vs. distribution)
- An ethics/sustainability story specific to that product

### 4.2 Explore Any Product (Scoped to the Girl Scout World)

A search tool scoped to products Girl Scouts encounter in their daily lives and activities. The search matches against a **curated, category-based inventory** — not open-ended. The inventory is stored in a **standalone, human-editable data format** (JSON files) so products and categories can be added or removed without code changes.

**Product Categories:**

| Category | Example Products |
|---|---|
| Cookie Varieties | Thin Mints, Samoas/Caramel deLites, Tagalongs, Do-si-dos, Trefoils, Lemon-Ups |
| Uniform & Accessories | Vest, sash, badges, pins |
| Cookie Packaging | Cookie box, case packaging, shipping materials |
| Camping & Outdoor Gear | Tent, sleeping bag, water bottle, backpack |
| Craft Supplies | Colored pencils, glue sticks, construction paper |
| Meeting Snacks & Supplies | Bananas, juice boxes, paper plates |
| Everyday Items | T-shirt, sneakers, smartphone, pencil |

Target: **30–50 products** across these categories, each with pre-calculated supply chain and carbon data.

**Fallback for unknown searches:** When a visitor searches for something not in the inventory, show a helpful fallback:
> "We don't have supply chain data for **[product]** yet. But you can research it yourself:"
- **Find where it's made →** Open Supply Hub (opensupplyhub.org) — pre-filled search link
- **Calculate shipping emissions →** Freightos (freightos.com) — shipping emissions calculator

### 4.5 Council-Based Carbon Calculator

A key interactive feature: the carbon footprint of Girl Scout cookies **changes based on where you live.**

- The user selects their Girl Scout council (or general region)
- The site determines which bakery supplies that council (ABC Bakers in SD or Little Brownie in KY)
- The domestic shipping leg (bakery → distribution → your area) is calculated per council
- Raw ingredient shipping (palm oil from Indonesia, cocoa from Ghana) is the same regardless of council

This means a Thin Mint bought in California has a longer domestic shipping footprint than one bought in Kentucky, even though the overseas ingredient journey is identical. The council-to-bakery mapping is stored as part of the editable data layer.

### 4.6 Guided Walkthrough Mode

A presentation mode that lets Mia step through the site's content sequentially during her Gold Award panel presentation. The site must work both as:
- **Self-serve:** Visitors navigate freely on their own
- **Guided demo:** Mia can walk through a structured flow during a live presentation

### 4.7 Knowledge Quiz & Certificate

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

**Question pool:**
- 40 total questions stored in an editable JSON file (same data-layer pattern as products)
- Topics span all site content: Thin Mint supply chain, Girl Scout Vest, Cookie Box packaging, the carbon calculator, "Why It Matters" themes, and the Olivia Chaffin story
- Each question entry includes: question text, answer choices (array), correct answer index, and topic tag

**Certificate:**
- Displays visitor's name (entered at quiz start), a congratulations message, and the site name
- Printable via browser print dialog; also saves cleanly as a PDF
- No login or account required — name is only used for the certificate display

### 4.3 Why It Matters

Explain why understanding supply chains is important. Four key themes:

1. **Environmental Impact** — Global freight produces ~7% of all greenhouse gas emissions
2. **Labor & Human Rights** — Supply chains can hide child labor and unsafe conditions
3. **Global Cooperation** — One cookie connects workers across six countries
4. **Consumer Power** — Informed consumers can push brands toward better practices

### 4.4 Sources

All data sources must be free and publicly accessible. Confirmed sources:

| Source | What It Provides |
|---|---|
| Open Supply Hub (opensupplyhub.org) | Factory and supplier location data |
| Freightos Emissions Calculator | Shipping carbon footprint estimates |
| EcoTransIT World (ecotransit.org) | Transport emissions calculations |
| EPA Supply Chain Guidance | U.S. environmental supply chain data |
| NY Fed Supply Chain Index | Real-time supply chain pressure data |
| Company sustainability reports | Direct data from Girl Scouts, ABC Bakers, Ferrero |

---

## 5. Key Content & Research

### 5.1 Supply Chain Facts to Get Right

- Both Girl Scout cookie bakeries are foreign-owned (Ferrero is Italian, Weston Foods is Canadian)
- All cookies use RSPO "Mass Balance" palm oil — this certification level still has links to deforestation and labor concerns
- Palm oil sourced from Indonesia and Malaysia
- Cocoa sourced from West Africa (Ivory Coast and Ghana produce ~70% of world supply)
- The vest is a positive counterpoint — made in the USA from recycled polyester
- Olivia Chaffin's story is the emotional centerpiece of the project

### 5.2 Carbon Data Approach

All carbon numbers are calculated at **build time** using a carbon footprint API (Carbon Interface or Climatiq — decision deferred). The API takes route segments (origin, destination, transport mode) and returns emissions estimates.

Data confidence levels:
- **Confirmed** — sourced from public sustainability reports, RSPO records, or company disclosures
- **Estimated (~)** — educated approximations based on U.S. agricultural geography and industry norms

All numbers are presented with "~" and the site is transparent about methodology. These are educational approximations, not precise measurements.

### 5.3 Data Template Structure

Each product in the inventory follows this structure:

```
Product
├── Category (e.g., "Cookie Varieties")
├── Ingredient 1
│   ├── Source location (country/region)
│   ├── Confidence level (confirmed / estimated)
│   ├── Transport mode (ship, truck, rail)
│   ├── Destination (bakery/factory location)
│   └── Carbon footprint (calculated via API at build time)
├── Ingredient 2...
├── Manufacturing
│   ├── Location
│   └── Energy footprint
└── Distribution
    ├── From (factory/bakery)
    ├── To (council region — variable for cookies)
    └── Carbon footprint (calculated per region)
```

This template lives as editable JSON files. Mia can add products by filling in the route data; the build script calculates emissions automatically.

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
- **Editable data layer** — Product data, categories, and council mappings live in standalone JSON files that can be updated without touching code
- **Transparency** — All data points are labeled as "confirmed" (from public sources) or "estimated" (educated approximations with ~). The site is transparent about its methodology.

---

## 7. What Success Looks Like

- A visitor can pick any Girl Scout product and trace its full journey from raw materials to their hands
- Carbon footprint data is clear and visual at every step, with confirmed vs estimated labels
- The council-based calculator shows how cookie carbon footprint varies by location
- The ethics stories (especially Olivia Chaffin, in Mia's own words) make the content feel real, not like a textbook
- The "explore any product" tool searches smoothly across 30–50 curated products and gracefully handles unknown searches with links to external research tools
- The guided walkthrough mode lets Mia present confidently to her Gold Award panel
- The site also works as a standalone self-serve experience for visitors
- All sources are cited and verifiable; data confidence levels are transparent
- Adding or removing products requires editing a JSON file, not code changes
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

Visual style to be determined. Two to three sample HTML layouts will be generated using the `/frontend-design` skill with Tailwind CSS, based on this PRD, for Mia to choose from before implementation begins.

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
