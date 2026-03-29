# The Hidden Journey — Product Requirements Document

**Project:** The Hidden Journey — Where Your Stuff Really Comes From  
**Type:** Girl Scout Gold Award Project  
**Created by:** Mia  
**Date:** March 29, 2026  

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
- Two licensed bakeries: ABC Bakers (owned by Canadian company Weston Foods) and Little Brownie Bakers (owned by Italian company Ferrero)
- Both use RSPO Mass Balance certified palm oil
- Combined production: 200+ million boxes per season
- Carbon footprint: ~0.8 kg CO₂ per box
- Ethics angle: The Olivia Chaffin story — a Tennessee Girl Scout who researched the "mixed" label on her cookie box's palm oil sourcing and launched a petition that got national attention

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

### 4.2 Explore Any Product

A search tool where visitors can type in any product and see its journey. Ships with 8 pre-loaded products:

| Product | Key Story |
|---|---|
| Banana | Central America → cargo ship → ripening warehouse → store |
| Smartphone | Lithium (S. America), rare earths (China), chips (Taiwan), assembly (China) |
| Chocolate Bar | Cocoa (West Africa), processing (Europe), manufacturing, retail |
| T-Shirt | Cotton farming → textile milling (Asia) → sewing (Vietnam/Bangladesh) → shipping |
| Coffee | Beans (Ethiopia/Colombia/Brazil) → processing → roasting → retail |
| Sneakers | Rubber (SE Asia), synthetic materials, assembly (Vietnam), branding |
| Pencil | Cedar (Pacific NW), graphite (China), assembly, painting, retail |
| Soccer Ball | Synthetic leather, bladder, hand-stitching (Pakistan/China), branding |

When a visitor searches for something not in the database, show a helpful fallback with links to free external tools where they can research it themselves:
- Open Supply Hub (opensupplyhub.org) — global factory/facility database
- Freightos (freightos.com) — shipping emissions calculator

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

All carbon numbers are estimates (always present with "~") derived from published lifecycle assessment studies, Freightos and EcoTransIT calculators, and EPA guidance documents. These are educational approximations, not precise measurements. That should be transparent to visitors.

---

## 6. Constraints

- **$0 budget** — No paid tools, APIs, services, or hosting costs
- **No backend** — All data is hardcoded; no database, no server, no API keys
- **Sustainable without maintenance** — The site should work indefinitely without anyone updating a server or renewing a subscription
- **Mobile-friendly** — Girl Scouts and parents will primarily access on phones

---

## 7. What Success Looks Like

- A visitor can pick any Girl Scout product and trace its full journey from raw materials to their hands
- Carbon footprint data is clear and visual at every step
- The ethics stories (especially Olivia Chaffin) make the content feel real, not like a textbook
- The "explore any product" tool works smoothly for the 8 pre-loaded products and gracefully handles unknown searches
- The site looks polished enough that Mia can present it to her Gold Award panel with confidence
- All sources are cited and verifiable

---

## 8. Future Ideas (Not for v1)

- Interactive world map showing supply chain routes
- "Guess the Product's Journey" quiz
- Downloadable teacher lesson plans
- Expanded product database (20+ products)
- Side-by-side product carbon comparison tool
- Impact calculator ("If every Girl Scout chose X, we'd save Y kg CO₂")
- Dark mode
- Spanish language support

---

*This PRD defines what to build and why. Technical stack, design, and architecture decisions will be made during development.*
