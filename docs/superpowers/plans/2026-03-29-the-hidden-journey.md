# The Hidden Journey — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an educational website that visualizes supply chains and carbon footprints behind Girl Scout products, with curated product search, council-based carbon calculator, and guided walkthrough mode.

**Architecture:** Static-first Next.js site using SSG. All product/carbon data lives in human-editable JSON files. A build-time Node.js script calculates carbon emissions from route segments and writes static output JSON. The UI reads this static data — zero runtime API dependencies. The passport/travel-journal visual theme from the approved mockup drives all component design.

**Tech Stack:** Next.js (App Router, SSG), Tailwind CSS, shadcn/ui, Vitest + React Testing Library, static JSON data layer, Vercel free tier hosting.

---

## File Structure

```
the-hidden-journey/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout (fonts, nav, footer)
│   │   ├── page.tsx                    # Home page (hero + sections)
│   │   ├── products/
│   │   │   ├── page.tsx                # All products overview
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Individual product deep dive
│   │   ├── explore/
│   │   │   └── page.tsx                # Curated product search
│   │   ├── calculator/
│   │   │   └── page.tsx                # Council carbon calculator
│   │   ├── why-it-matters/
│   │   │   └── page.tsx                # Four themes section
│   │   ├── olivia/
│   │   │   └── page.tsx                # Olivia Chaffin story
│   │   └── sources/
│   │       └── page.tsx                # Data sources & methodology
│   ├── components/
│   │   ├── ui/                         # shadcn/ui components
│   │   ├── layout/
│   │   │   ├── site-header.tsx         # Nav bar
│   │   │   ├── site-footer.tsx         # Footer
│   │   │   └── mobile-nav.tsx          # Mobile menu
│   │   ├── passport/
│   │   │   ├── passport-card.tsx       # Parchment-style card wrapper
│   │   │   ├── stamp-badge.tsx         # Red rotated stamp labels
│   │   │   ├── sticker.tsx             # Tilted sticker tags
│   │   │   └── route-line.tsx          # Dashed route connector
│   │   ├── journey/
│   │   │   ├── journey-step.tsx        # Single supply chain step
│   │   │   ├── journey-timeline.tsx    # Full timeline of steps
│   │   │   └── carbon-bar.tsx          # Horizontal carbon bar
│   │   ├── carbon/
│   │   │   ├── carbon-summary.tsx      # Total footprint breakdown
│   │   │   └── council-selector.tsx    # Council dropdown + results
│   │   ├── explore/
│   │   │   ├── product-search.tsx      # Search input + filtering
│   │   │   ├── category-tags.tsx       # Category filter buttons
│   │   │   ├── product-grid.tsx        # Grid of product cards
│   │   │   └── search-fallback.tsx     # "Not found" with external links
│   │   └── walkthrough/
│   │       ├── walkthrough-provider.tsx # Context for guided mode
│   │       ├── walkthrough-controls.tsx # Next/prev/progress bar
│   │       └── walkthrough-overlay.tsx  # Highlights current section
│   ├── lib/
│   │   ├── data.ts                     # Functions to read JSON data at build time
│   │   ├── types.ts                    # TypeScript types for all data structures
│   │   ├── carbon.ts                   # Carbon calculation helpers
│   │   └── search.ts                   # Product search/filter logic
│   └── styles/
│       └── globals.css                 # Tailwind base + passport theme CSS
├── data/
│   ├── products/
│   │   ├── thin-mint.json              # Thin Mint supply chain data
│   │   ├── girl-scout-vest.json        # Vest supply chain data
│   │   ├── cookie-box.json             # Cookie box supply chain data
│   │   └── ...                         # 30-50 curated products
│   ├── categories.json                 # Product category definitions
│   ├── councils.json                   # Council → bakery mappings
│   └── carbon-factors.json             # Emission factors for transport modes
├── scripts/
│   └── calculate-carbon.ts             # Build-time carbon calculation script
├── tests/
│   ├── lib/
│   │   ├── data.test.ts                # Data loading tests
│   │   ├── types.test.ts               # Type validation tests
│   │   ├── carbon.test.ts              # Carbon calculation tests
│   │   └── search.test.ts              # Search/filter logic tests
│   ├── components/
│   │   ├── passport-card.test.tsx      # Passport card rendering
│   │   ├── journey-timeline.test.tsx   # Journey timeline rendering
│   │   ├── carbon-summary.test.tsx     # Carbon summary rendering
│   │   ├── council-selector.test.tsx   # Council selector interaction
│   │   ├── product-search.test.tsx     # Product search interaction
│   │   └── walkthrough.test.tsx        # Walkthrough mode tests
│   └── scripts/
│       └── calculate-carbon.test.ts    # Build script tests
├── public/
│   └── fonts/                          # Self-hosted fonts (Caveat, Playfair, DM Sans)
├── tailwind.config.ts
├── vitest.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `vitest.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/styles/globals.css`

- [ ] **Step 1: Initialize Next.js project**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

This scaffolds Next.js with App Router, TypeScript, Tailwind, and the `src/` directory structure.

- [ ] **Step 2: Install testing dependencies**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 3: Install shadcn/ui**

```bash
npx shadcn@latest init
```

Choose: New York style, Zinc base color, CSS variables enabled.

- [ ] **Step 4: Create Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

- [ ] **Step 5: Create test setup file**

Create `tests/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 6: Add test script to package.json**

Add to `"scripts"` in `package.json`:

```json
"test": "vitest",
"test:run": "vitest run"
```

- [ ] **Step 7: Write a smoke test to verify the setup works**

Create `tests/smoke.test.ts`:

```ts
import { describe, it, expect } from "vitest";

describe("project setup", () => {
  it("can run tests", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 8: Run the smoke test**

```bash
npm run test:run
```

Expected: PASS — 1 test passed.

- [ ] **Step 9: Configure the passport theme in Tailwind**

Update `tailwind.config.ts` to add the custom colors and fonts from the mockup:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#f5e6c8",
        "parchment-dark": "#e8d4a8",
        ink: "#2c1810",
        stamp: "#c0392b",
        "stamp-faded": "#e74c3c33",
        forest: "#1a5c2e",
        ocean: "#1a4a6e",
        cocoa: "#5c3a1e",
      },
      fontFamily: {
        hand: ["var(--font-caveat)", "cursive"],
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 10: Set up global CSS with passport theme styles**

Update `src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-parchment text-ink min-h-screen;
  }
}

@layer components {
  .passport-page {
    background: linear-gradient(135deg, #f5e6c8 0%, #ede0c0 50%, #f0dbb0 100%);
    border: 1px solid #d4c4a0;
    box-shadow: 4px 4px 0px #d4c4a0, 8px 8px 20px rgba(44, 24, 16, 0.15);
  }

  .route-line {
    background: repeating-linear-gradient(
      90deg,
      #c0392b 0px,
      #c0392b 8px,
      transparent 8px,
      transparent 14px
    );
    height: 3px;
  }

  .stamp {
    @apply border-[3px] border-stamp rounded px-4 py-2 text-stamp font-display font-bold uppercase tracking-wider;
    transform: rotate(-6deg);
  }

  .sticker {
    background: linear-gradient(145deg, #fff9e8, #f5e6c8);
    @apply border-2 border-[#d4c4a0] shadow-sm;
    transform: rotate(var(--sticker-rotate, -2deg));
  }
}
```

- [ ] **Step 11: Set up root layout with fonts**

Update `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Caveat, Playfair_Display, DM_Sans } from "next/font/google";
import "@/styles/globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "The Hidden Journey — Where Your Stuff Really Comes From",
  description:
    "Trace the global supply chains and carbon footprints behind everyday Girl Scout products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${playfair.variable} ${dmSans.variable}`}
    >
      <body className="font-body">{children}</body>
    </html>
  );
}
```

- [ ] **Step 12: Create a minimal home page**

Update `src/app/page.tsx`:

```tsx
export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-display text-4xl font-bold">The Hidden Journey</h1>
    </main>
  );
}
```

- [ ] **Step 13: Verify the dev server starts**

```bash
npm run dev
```

Expected: Dev server starts at `http://localhost:3000`, page shows "The Hidden Journey" heading.

- [ ] **Step 14: Commit**

```bash
git add .
git commit -m "feat: scaffold Next.js project with Tailwind, shadcn/ui, Vitest, and passport theme"
```

---

## Task 2: TypeScript Types & Data Contracts

**Files:**
- Create: `src/lib/types.ts`
- Test: `tests/lib/types.test.ts`

> This task defines the data shapes that every other task depends on. Getting these right means the JSON data files, the carbon script, and every UI component will speak the same language.

- [ ] **Step 1: Write the failing test for type validation helpers**

Create `tests/lib/types.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  isValidProduct,
  isValidCouncil,
  isValidCarbonFactors,
  type Product,
  type SupplyChainStep,
  type Council,
} from "@/lib/types";

describe("type validation", () => {
  it("validates a well-formed product", () => {
    const product: Product = {
      slug: "thin-mint",
      name: "Thin Mint Cookie",
      emoji: "🍪",
      category: "cookie-varieties",
      description: "A chocolate-coated peppermint cookie.",
      carbonTotal: 0.8,
      countriesCount: 6,
      supplyChain: [
        {
          id: "palm-oil",
          label: "Palm Oil",
          emoji: "🌴",
          origin: "Indonesia & Malaysia",
          destination: "South Dakota or Kentucky, USA",
          transportMode: "ship",
          distanceKm: 15000,
          carbonKg: 0.25,
          confidence: "confirmed",
          description: "RSPO Mass Balance certified palm oil.",
        },
      ],
      ethicsStory: {
        title: "Olivia Chaffin's Story",
        summary: "A Girl Scout who questioned palm oil sourcing.",
      },
    };

    expect(isValidProduct(product)).toBe(true);
  });

  it("rejects a product missing required fields", () => {
    const bad = { slug: "test" };
    expect(isValidProduct(bad)).toBe(false);
  });

  it("validates a well-formed council", () => {
    const council: Council = {
      id: "gs-kentuckiana",
      name: "Girl Scouts of Kentuckiana",
      state: "KY",
      bakery: "little-brownie",
      regionCenter: { lat: 38.25, lng: -85.76 },
    };

    expect(isValidCouncil(council)).toBe(true);
  });

  it("rejects a council missing the bakery field", () => {
    const bad = { id: "test", name: "Test" };
    expect(isValidCouncil(bad)).toBe(false);
  });

  it("validates carbon factors structure", () => {
    const factors = {
      ship: 0.016,
      truck: 0.062,
      rail: 0.022,
      air: 0.5,
    };

    expect(isValidCarbonFactors(factors)).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run -- tests/lib/types.test.ts
```

Expected: FAIL — cannot find module `@/lib/types`.

- [ ] **Step 3: Implement types and validation helpers**

Create `src/lib/types.ts`:

```ts
// --- Supply Chain Step ---

export type Confidence = "confirmed" | "estimated";

export type TransportMode = "ship" | "truck" | "rail" | "air";

export interface SupplyChainStep {
  id: string;
  label: string;
  emoji: string;
  origin: string;
  destination: string;
  transportMode: TransportMode;
  distanceKm: number;
  carbonKg: number;
  confidence: Confidence;
  description: string;
}

// --- Product ---

export interface EthicsStory {
  title: string;
  summary: string;
}

export interface Product {
  slug: string;
  name: string;
  emoji: string;
  category: string;
  description: string;
  carbonTotal: number;
  countriesCount: number;
  supplyChain: SupplyChainStep[];
  ethicsStory?: EthicsStory;
}

// --- Council ---

export interface Council {
  id: string;
  name: string;
  state: string;
  bakery: "abc-bakers" | "little-brownie";
  regionCenter: { lat: number; lng: number };
}

// --- Categories ---

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

// --- Carbon Factors ---

export type CarbonFactors = Record<TransportMode, number>;

// --- Validation helpers ---

export function isValidProduct(obj: unknown): obj is Product {
  if (typeof obj !== "object" || obj === null) return false;
  const p = obj as Record<string, unknown>;
  return (
    typeof p.slug === "string" &&
    typeof p.name === "string" &&
    typeof p.emoji === "string" &&
    typeof p.category === "string" &&
    typeof p.description === "string" &&
    typeof p.carbonTotal === "number" &&
    typeof p.countriesCount === "number" &&
    Array.isArray(p.supplyChain) &&
    p.supplyChain.length > 0
  );
}

export function isValidCouncil(obj: unknown): obj is Council {
  if (typeof obj !== "object" || obj === null) return false;
  const c = obj as Record<string, unknown>;
  return (
    typeof c.id === "string" &&
    typeof c.name === "string" &&
    typeof c.bakery === "string" &&
    typeof c.regionCenter === "object" &&
    c.regionCenter !== null
  );
}

export function isValidCarbonFactors(obj: unknown): obj is CarbonFactors {
  if (typeof obj !== "object" || obj === null) return false;
  const f = obj as Record<string, unknown>;
  return (
    typeof f.ship === "number" &&
    typeof f.truck === "number" &&
    typeof f.rail === "number" &&
    typeof f.air === "number"
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test:run -- tests/lib/types.test.ts
```

Expected: PASS — 5 tests passed.

- [ ] **Step 5: Commit**

```bash
git add src/lib/types.ts tests/lib/types.test.ts
git commit -m "feat: add TypeScript types and validation for products, councils, and carbon data"
```

---

## Task 3: JSON Data Layer — Featured Products

**Files:**
- Create: `data/products/thin-mint.json`, `data/products/girl-scout-vest.json`, `data/products/cookie-box.json`, `data/categories.json`, `data/carbon-factors.json`
- Create: `src/lib/data.ts`
- Test: `tests/lib/data.test.ts`

> The data layer is the foundation — everything else reads from these JSON files. We build the three featured products first, then bulk-add the remaining 27+ in Task 17.

- [ ] **Step 1: Create carbon emission factors file**

Create `data/carbon-factors.json`:

```json
{
  "ship": 0.016,
  "truck": 0.062,
  "rail": 0.022,
  "air": 0.5
}
```

These are kg CO2 per ton-km, sourced from EcoTransIT/EPA averages.

- [ ] **Step 2: Create categories file**

Create `data/categories.json`:

```json
[
  { "id": "cookie-varieties", "name": "Cookie Varieties", "emoji": "🍪" },
  { "id": "uniform-accessories", "name": "Uniform & Accessories", "emoji": "👕" },
  { "id": "cookie-packaging", "name": "Cookie Packaging", "emoji": "📦" },
  { "id": "camping-gear", "name": "Camping & Outdoor Gear", "emoji": "🏕️" },
  { "id": "craft-supplies", "name": "Craft Supplies", "emoji": "🎨" },
  { "id": "meeting-snacks", "name": "Meeting Snacks & Supplies", "emoji": "🍌" },
  { "id": "everyday-items", "name": "Everyday Items", "emoji": "👟" }
]
```

- [ ] **Step 3: Create Thin Mint product data**

Create `data/products/thin-mint.json`:

```json
{
  "slug": "thin-mint",
  "name": "Thin Mint Cookie",
  "emoji": "🍪",
  "category": "cookie-varieties",
  "description": "Before this cookie reaches your hands, its ingredients have traveled across oceans, through factories owned by Italian and Canadian companies, and finally to one of just two bakeries in the entire United States.",
  "carbonTotal": 0.8,
  "countriesCount": 6,
  "supplyChain": [
    {
      "id": "palm-oil",
      "label": "Palm Oil",
      "emoji": "🌴",
      "origin": "Indonesia & Malaysia",
      "destination": "USA (bakery)",
      "transportMode": "ship",
      "distanceKm": 15000,
      "carbonKg": 0.25,
      "confidence": "confirmed",
      "description": "RSPO Mass Balance certified. Harvested from palm plantations, processed, and shipped across the Pacific."
    },
    {
      "id": "cocoa",
      "label": "Cocoa",
      "emoji": "🍫",
      "origin": "Ivory Coast & Ghana",
      "destination": "USA (bakery)",
      "transportMode": "ship",
      "distanceKm": 9000,
      "carbonKg": 0.2,
      "confidence": "confirmed",
      "description": "Sourced from World Cocoa Foundation members. ~70% of the world's cocoa comes from West Africa."
    },
    {
      "id": "domestic-ingredients",
      "label": "Sugar, Flour & Peppermint",
      "emoji": "🌾",
      "origin": "U.S. Midwest & Pacific NW",
      "destination": "USA (bakery)",
      "transportMode": "truck",
      "distanceKm": 1500,
      "carbonKg": 0.1,
      "confidence": "estimated",
      "description": "Sugar and flour from the Midwest, peppermint oil from the Pacific Northwest. Transported by truck and rail."
    },
    {
      "id": "baking",
      "label": "Baking",
      "emoji": "🏭",
      "origin": "South Dakota or Kentucky, USA",
      "destination": "Regional warehouses",
      "transportMode": "truck",
      "distanceKm": 0,
      "carbonKg": 0.15,
      "confidence": "confirmed",
      "description": "ABC Bakers in North Sioux City, SD (owned by Canadian co. Weston Foods) or Little Brownie Bakers in Louisville, KY (owned by Italian co. Ferrero). Your council chooses which one."
    },
    {
      "id": "distribution",
      "label": "Distribution",
      "emoji": "🚛",
      "origin": "Bakery",
      "destination": "Your neighborhood",
      "transportMode": "truck",
      "distanceKm": 800,
      "carbonKg": 0.1,
      "confidence": "estimated",
      "description": "From the bakery to regional warehouses to your local troop. This leg varies depending on where you live."
    }
  ],
  "ethicsStory": {
    "title": "Olivia Chaffin's Story",
    "summary": "A Tennessee Girl Scout who researched the 'mixed' label on her cookie box's palm oil sourcing and launched a petition that got national attention."
  }
}
```

- [ ] **Step 4: Create Girl Scout Vest product data**

Create `data/products/girl-scout-vest.json`:

```json
{
  "slug": "girl-scout-vest",
  "name": "Girl Scout Vest",
  "emoji": "👕",
  "category": "uniform-accessories",
  "description": "Made in the USA from recycled polyester — a positive sustainability story that contrasts with the cookies.",
  "carbonTotal": 10,
  "countriesCount": 2,
  "supplyChain": [
    {
      "id": "recycled-polyester",
      "label": "Recycled Polyester",
      "emoji": "♻️",
      "origin": "USA (recycling facilities)",
      "destination": "USA (textile mill)",
      "transportMode": "truck",
      "distanceKm": 500,
      "carbonKg": 3.0,
      "confidence": "estimated",
      "description": "Post-consumer plastic bottles collected, cleaned, and processed into polyester fiber at U.S. recycling facilities."
    },
    {
      "id": "textile-production",
      "label": "Textile Production & Dyeing",
      "emoji": "🧵",
      "origin": "USA (textile mill)",
      "destination": "USA (assembly)",
      "transportMode": "truck",
      "distanceKm": 300,
      "carbonKg": 4.0,
      "confidence": "estimated",
      "description": "Fiber is woven into fabric and dyed green. Dyeing is the most energy-intensive step in textile production."
    },
    {
      "id": "assembly",
      "label": "Sewing & Assembly",
      "emoji": "🪡",
      "origin": "USA",
      "destination": "USA (warehouse)",
      "transportMode": "truck",
      "distanceKm": 200,
      "carbonKg": 1.5,
      "confidence": "estimated",
      "description": "Cut, sewn, and assembled in U.S. facilities. Domestic production means shorter supply chains and U.S. labor standards."
    },
    {
      "id": "distribution",
      "label": "Retail Distribution",
      "emoji": "🚛",
      "origin": "USA (warehouse)",
      "destination": "Girl Scout shops nationwide",
      "transportMode": "truck",
      "distanceKm": 1000,
      "carbonKg": 1.5,
      "confidence": "estimated",
      "description": "Shipped from central warehouse to Girl Scout council shops across the country."
    }
  ],
  "ethicsStory": {
    "title": "Made in USA",
    "summary": "'Made in USA' as a supply chain choice — what does domestic production mean for transparency and labor?"
  }
}
```

- [ ] **Step 5: Create Cookie Box product data**

Create `data/products/cookie-box.json`:

```json
{
  "slug": "cookie-box",
  "name": "Cookie Box (Packaging)",
  "emoji": "📦",
  "category": "cookie-packaging",
  "description": "100% recycled content paperboard. But what does '100% recycled' actually mean? Where does the pulp come from?",
  "carbonTotal": 0.2,
  "countriesCount": 1,
  "supplyChain": [
    {
      "id": "recycled-pulp",
      "label": "Recycled Pulp Sourcing",
      "emoji": "♻️",
      "origin": "USA (recycling centers)",
      "destination": "USA (paper mill)",
      "transportMode": "truck",
      "distanceKm": 400,
      "carbonKg": 0.05,
      "confidence": "confirmed",
      "description": "Post-consumer recycled cardboard and paper collected from recycling programs and sorted at material recovery facilities."
    },
    {
      "id": "paper-mill",
      "label": "Paper Mill Processing",
      "emoji": "🏭",
      "origin": "USA (paper mill)",
      "destination": "USA (printing)",
      "transportMode": "truck",
      "distanceKm": 200,
      "carbonKg": 0.08,
      "confidence": "estimated",
      "description": "Recycled pulp is processed into paperboard. Uses ~70% less energy than virgin paper production."
    },
    {
      "id": "printing",
      "label": "Printing & Assembly",
      "emoji": "🖨️",
      "origin": "USA (printing facility)",
      "destination": "USA (bakery)",
      "transportMode": "truck",
      "distanceKm": 300,
      "carbonKg": 0.04,
      "confidence": "estimated",
      "description": "Boxes printed with Girl Scout branding and cookie variety designs, then flat-packed and shipped to bakeries."
    },
    {
      "id": "filling",
      "label": "Filled at Bakery",
      "emoji": "🍪",
      "origin": "USA (bakery)",
      "destination": "Your neighborhood",
      "transportMode": "truck",
      "distanceKm": 0,
      "carbonKg": 0.03,
      "confidence": "estimated",
      "description": "Boxes are assembled and filled with cookies at the bakery, then distributed with the cookies themselves."
    }
  ],
  "ethicsStory": {
    "title": "What Does '100% Recycled' Mean?",
    "summary": "Where does recycled pulp come from? How much energy does recycling really save compared to making new paper?"
  }
}
```

- [ ] **Step 6: Write the failing test for the data loading module**

Create `tests/lib/data.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  getAllProducts,
  getProductBySlug,
  getFeaturedProducts,
  getCategories,
  getCarbonFactors,
} from "@/lib/data";

describe("data loading", () => {
  it("loads all products from JSON files", () => {
    const products = getAllProducts();
    expect(products.length).toBeGreaterThanOrEqual(3);
    expect(products[0]).toHaveProperty("slug");
    expect(products[0]).toHaveProperty("supplyChain");
  });

  it("loads a single product by slug", () => {
    const product = getProductBySlug("thin-mint");
    expect(product).not.toBeNull();
    expect(product!.name).toBe("Thin Mint Cookie");
    expect(product!.supplyChain.length).toBeGreaterThan(0);
  });

  it("returns null for unknown slug", () => {
    const product = getProductBySlug("does-not-exist");
    expect(product).toBeNull();
  });

  it("loads featured products (the three deep dives)", () => {
    const featured = getFeaturedProducts();
    expect(featured).toHaveLength(3);
    const slugs = featured.map((p) => p.slug);
    expect(slugs).toContain("thin-mint");
    expect(slugs).toContain("girl-scout-vest");
    expect(slugs).toContain("cookie-box");
  });

  it("loads categories", () => {
    const categories = getCategories();
    expect(categories.length).toBeGreaterThanOrEqual(7);
    expect(categories[0]).toHaveProperty("id");
    expect(categories[0]).toHaveProperty("name");
    expect(categories[0]).toHaveProperty("emoji");
  });

  it("loads carbon factors", () => {
    const factors = getCarbonFactors();
    expect(factors).toHaveProperty("ship");
    expect(factors).toHaveProperty("truck");
    expect(factors).toHaveProperty("rail");
    expect(factors).toHaveProperty("air");
    expect(typeof factors.ship).toBe("number");
  });
});
```

- [ ] **Step 7: Run test to verify it fails**

```bash
npm run test:run -- tests/lib/data.test.ts
```

Expected: FAIL — cannot find module `@/lib/data`.

- [ ] **Step 8: Implement the data loading module**

Create `src/lib/data.ts`:

```ts
import fs from "fs";
import path from "path";
import type { Product, Category, Council, CarbonFactors } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_DIR = path.join(DATA_DIR, "products");

const FEATURED_SLUGS = ["thin-mint", "girl-scout-vest", "cookie-box"];

export function getAllProducts(): Product[] {
  const files = fs.readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const content = fs.readFileSync(path.join(PRODUCTS_DIR, file), "utf-8");
    return JSON.parse(content) as Product;
  });
}

export function getProductBySlug(slug: string): Product | null {
  const filePath = path.join(PRODUCTS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as Product;
}

export function getFeaturedProducts(): Product[] {
  return FEATURED_SLUGS.map((slug) => getProductBySlug(slug)).filter(
    (p): p is Product => p !== null
  );
}

export function getCategories(): Category[] {
  const content = fs.readFileSync(
    path.join(DATA_DIR, "categories.json"),
    "utf-8"
  );
  return JSON.parse(content) as Category[];
}

export function getCouncils(): Council[] {
  const content = fs.readFileSync(
    path.join(DATA_DIR, "councils.json"),
    "utf-8"
  );
  return JSON.parse(content) as Council[];
}

export function getCarbonFactors(): CarbonFactors {
  const content = fs.readFileSync(
    path.join(DATA_DIR, "carbon-factors.json"),
    "utf-8"
  );
  return JSON.parse(content) as CarbonFactors;
}
```

- [ ] **Step 9: Run tests to verify they pass**

```bash
npm run test:run -- tests/lib/data.test.ts
```

Expected: PASS — 6 tests passed.

- [ ] **Step 10: Commit**

```bash
git add data/ src/lib/data.ts tests/lib/data.test.ts
git commit -m "feat: add JSON data layer with featured products, categories, and data loading"
```

---

## Task 4: Search & Filter Logic

**Files:**
- Create: `src/lib/search.ts`
- Test: `tests/lib/search.test.ts`

> Pure logic with no UI — easy to test thoroughly. This powers the "Explore Any Product" feature.

- [ ] **Step 1: Write the failing test**

Create `tests/lib/search.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { searchProducts, filterByCategory } from "@/lib/search";
import type { Product } from "@/lib/types";

const mockProducts: Product[] = [
  {
    slug: "thin-mint",
    name: "Thin Mint Cookie",
    emoji: "🍪",
    category: "cookie-varieties",
    description: "A peppermint cookie.",
    carbonTotal: 0.8,
    countriesCount: 6,
    supplyChain: [],
  },
  {
    slug: "tent",
    name: "Camping Tent",
    emoji: "⛺",
    category: "camping-gear",
    description: "A nylon tent for outdoor camping trips.",
    carbonTotal: 25,
    countriesCount: 4,
    supplyChain: [],
  },
  {
    slug: "samoas",
    name: "Samoas Cookie",
    emoji: "🥥",
    category: "cookie-varieties",
    description: "Caramel and coconut cookie.",
    carbonTotal: 0.9,
    countriesCount: 5,
    supplyChain: [],
  },
];

describe("searchProducts", () => {
  it("returns all products for empty query", () => {
    const results = searchProducts(mockProducts, "");
    expect(results).toHaveLength(3);
  });

  it("matches by product name (case-insensitive)", () => {
    const results = searchProducts(mockProducts, "thin");
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe("thin-mint");
  });

  it("matches by description", () => {
    const results = searchProducts(mockProducts, "nylon");
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe("tent");
  });

  it("returns empty array for no matches", () => {
    const results = searchProducts(mockProducts, "smartphone");
    expect(results).toHaveLength(0);
  });
});

describe("filterByCategory", () => {
  it("filters products by category id", () => {
    const results = filterByCategory(mockProducts, "cookie-varieties");
    expect(results).toHaveLength(2);
  });

  it("returns all products for null category", () => {
    const results = filterByCategory(mockProducts, null);
    expect(results).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run -- tests/lib/search.test.ts
```

Expected: FAIL — cannot find module `@/lib/search`.

- [ ] **Step 3: Implement search and filter logic**

Create `src/lib/search.ts`:

```ts
import type { Product } from "./types";

export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) return products;

  const lower = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower)
  );
}

export function filterByCategory(
  products: Product[],
  categoryId: string | null
): Product[] {
  if (!categoryId) return products;
  return products.filter((p) => p.category === categoryId);
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test:run -- tests/lib/search.test.ts
```

Expected: PASS — 5 tests passed.

- [ ] **Step 5: Commit**

```bash
git add src/lib/search.ts tests/lib/search.test.ts
git commit -m "feat: add product search and category filter logic"
```

---

## Task 5: Carbon Calculation Helpers

**Files:**
- Create: `src/lib/carbon.ts`
- Test: `tests/lib/carbon.test.ts`

> These helpers calculate the domestic shipping leg that varies by council. The council calculator UI (Task 13) calls them at runtime for the interactive selector.

- [ ] **Step 1: Write the failing test**

Create `tests/lib/carbon.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  calculateShippingCarbon,
  calculateTotalWithCouncil,
  haversineDistance,
} from "@/lib/carbon";

describe("haversineDistance", () => {
  it("calculates distance between two coordinates in km", () => {
    // Louisville, KY to Los Angeles, CA — ~2,800 km
    const distance = haversineDistance(38.25, -85.76, 34.05, -118.24);
    expect(distance).toBeGreaterThan(2700);
    expect(distance).toBeLessThan(2900);
  });

  it("returns 0 for same point", () => {
    const distance = haversineDistance(38.25, -85.76, 38.25, -85.76);
    expect(distance).toBe(0);
  });
});

describe("calculateShippingCarbon", () => {
  it("calculates carbon for a truck shipment", () => {
    // 1000 km by truck at 0.062 kg CO2/ton-km, assume 0.5 ton cargo weight for a cookie shipment
    const carbon = calculateShippingCarbon(1000, "truck");
    expect(carbon).toBeGreaterThan(0);
    expect(typeof carbon).toBe("number");
  });
});

describe("calculateTotalWithCouncil", () => {
  it("returns a higher footprint for farther councils", () => {
    const baseCarbon = 0.7; // all steps except distribution

    // Louisville, KY (near the bakery)
    const nearResult = calculateTotalWithCouncil(
      baseCarbon,
      { lat: 38.25, lng: -85.76 },
      { lat: 38.19, lng: -85.67 } // bakery location
    );

    // Los Angeles, CA (far from bakery)
    const farResult = calculateTotalWithCouncil(
      baseCarbon,
      { lat: 34.05, lng: -118.24 },
      { lat: 38.19, lng: -85.67 }
    );

    expect(farResult).toBeGreaterThan(nearResult);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run -- tests/lib/carbon.test.ts
```

Expected: FAIL — cannot find module `@/lib/carbon`.

- [ ] **Step 3: Implement carbon calculation helpers**

Create `src/lib/carbon.ts`:

```ts
import type { TransportMode } from "./types";

// kg CO2 per ton-km (educational estimates from EcoTransIT/EPA)
const EMISSION_FACTORS: Record<TransportMode, number> = {
  ship: 0.016,
  truck: 0.062,
  rail: 0.022,
  air: 0.5,
};

// Assumed cargo weight in tons for a cookie box shipment
const COOKIE_CARGO_TONS = 0.001;

/**
 * Calculates the great-circle distance between two points using the Haversine formula.
 * Returns distance in kilometers.
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Calculates CO2 emissions for a shipment.
 * Returns kg CO2 for one cookie box (educational approximation).
 */
export function calculateShippingCarbon(
  distanceKm: number,
  mode: TransportMode
): number {
  const factor = EMISSION_FACTORS[mode];
  return distanceKm * factor * COOKIE_CARGO_TONS;
}

/**
 * Calculates total carbon footprint including the council-specific distribution leg.
 * baseCarbon = sum of all supply chain steps except the final distribution.
 * councilCenter = lat/lng of the council's region center.
 * bakeryLocation = lat/lng of the assigned bakery.
 */
export function calculateTotalWithCouncil(
  baseCarbon: number,
  councilCenter: { lat: number; lng: number },
  bakeryLocation: { lat: number; lng: number }
): number {
  const distance = haversineDistance(
    bakeryLocation.lat,
    bakeryLocation.lng,
    councilCenter.lat,
    councilCenter.lng
  );
  const distributionCarbon = calculateShippingCarbon(distance, "truck");
  return baseCarbon + distributionCarbon;
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test:run -- tests/lib/carbon.test.ts
```

Expected: PASS — 4 tests passed.

- [ ] **Step 5: Commit**

```bash
git add src/lib/carbon.ts tests/lib/carbon.test.ts
git commit -m "feat: add carbon calculation helpers with haversine distance"
```

---

## Task 6: Council Data

**Files:**
- Create: `data/councils.json`
- Update: `tests/lib/data.test.ts` (add council loading test)

> The council data maps each of the 112 Girl Scout councils to their bakery. We start with ~20 representative councils across different states/regions, enough to demonstrate the calculator. More can be added by editing the JSON file.

- [ ] **Step 1: Create councils data file**

Create `data/councils.json`:

```json
[
  { "id": "gs-kentuckiana", "name": "Girl Scouts of Kentuckiana", "state": "KY", "bakery": "little-brownie", "regionCenter": { "lat": 38.25, "lng": -85.76 } },
  { "id": "gs-greater-la", "name": "Girl Scouts of Greater Los Angeles", "state": "CA", "bakery": "little-brownie", "regionCenter": { "lat": 34.05, "lng": -118.24 } },
  { "id": "gs-northeast-texas", "name": "Girl Scouts of Northeast Texas", "state": "TX", "bakery": "abc-bakers", "regionCenter": { "lat": 32.78, "lng": -96.8 } },
  { "id": "gs-northern-california", "name": "Girl Scouts of Northern California", "state": "CA", "bakery": "abc-bakers", "regionCenter": { "lat": 37.77, "lng": -122.42 } },
  { "id": "gs-heart-south", "name": "Girl Scouts Heart of the South", "state": "TN", "bakery": "little-brownie", "regionCenter": { "lat": 35.15, "lng": -90.05 } },
  { "id": "gs-western-washington", "name": "Girl Scouts of Western Washington", "state": "WA", "bakery": "abc-bakers", "regionCenter": { "lat": 47.61, "lng": -122.33 } },
  { "id": "gs-nation-capital", "name": "Girl Scout Council of the Nation's Capital", "state": "DC", "bakery": "little-brownie", "regionCenter": { "lat": 38.91, "lng": -77.04 } },
  { "id": "gs-eastern-pennsylvania", "name": "Girl Scouts of Eastern Pennsylvania", "state": "PA", "bakery": "abc-bakers", "regionCenter": { "lat": 39.95, "lng": -75.17 } },
  { "id": "gs-colorado", "name": "Girl Scouts of Colorado", "state": "CO", "bakery": "abc-bakers", "regionCenter": { "lat": 39.74, "lng": -104.99 } },
  { "id": "gs-gateway", "name": "Girl Scouts Gateway Council", "state": "FL", "bakery": "little-brownie", "regionCenter": { "lat": 30.33, "lng": -81.66 } },
  { "id": "gs-southeastern-michigan", "name": "Girl Scouts of Southeastern Michigan", "state": "MI", "bakery": "abc-bakers", "regionCenter": { "lat": 42.33, "lng": -83.05 } },
  { "id": "gs-greater-chicago", "name": "Girl Scouts of Greater Chicago", "state": "IL", "bakery": "little-brownie", "regionCenter": { "lat": 41.88, "lng": -87.63 } },
  { "id": "gs-greater-new-york", "name": "Girl Scouts of Greater New York", "state": "NY", "bakery": "little-brownie", "regionCenter": { "lat": 40.71, "lng": -74.01 } },
  { "id": "gs-desert-southwest", "name": "Girl Scouts of the Desert Southwest", "state": "AZ", "bakery": "abc-bakers", "regionCenter": { "lat": 33.45, "lng": -112.07 } },
  { "id": "gs-minnesota-wisconsin", "name": "Girl Scouts of Minnesota & Wisconsin River Valleys", "state": "MN", "bakery": "abc-bakers", "regionCenter": { "lat": 44.98, "lng": -93.27 } },
  { "id": "gs-ohio-heartland", "name": "Girl Scouts of Ohio's Heartland", "state": "OH", "bakery": "abc-bakers", "regionCenter": { "lat": 39.96, "lng": -82.99 } },
  { "id": "gs-georgia", "name": "Girl Scouts of Greater Atlanta", "state": "GA", "bakery": "little-brownie", "regionCenter": { "lat": 33.75, "lng": -84.39 } },
  { "id": "gs-hawaii", "name": "Girl Scouts of Hawaii", "state": "HI", "bakery": "abc-bakers", "regionCenter": { "lat": 21.31, "lng": -157.86 } },
  { "id": "gs-oregon-sw-washington", "name": "Girl Scouts of Oregon & SW Washington", "state": "OR", "bakery": "abc-bakers", "regionCenter": { "lat": 45.52, "lng": -122.68 } },
  { "id": "gs-dakotas", "name": "Girl Scouts Dakota Horizons", "state": "SD", "bakery": "abc-bakers", "regionCenter": { "lat": 43.55, "lng": -96.7 } }
]
```

- [ ] **Step 2: Add council loading test to existing data test file**

Add to the end of `tests/lib/data.test.ts`, inside the `describe` block:

```ts
  it("loads councils with bakery assignments", () => {
    const councils = getCouncils();
    expect(councils.length).toBeGreaterThanOrEqual(20);
    expect(councils[0]).toHaveProperty("id");
    expect(councils[0]).toHaveProperty("bakery");
    expect(["abc-bakers", "little-brownie"]).toContain(councils[0].bakery);
  });
```

Also add `getCouncils` to the import at the top of the file.

- [ ] **Step 3: Run tests to verify they pass**

```bash
npm run test:run -- tests/lib/data.test.ts
```

Expected: PASS — 7 tests passed.

- [ ] **Step 4: Commit**

```bash
git add data/councils.json tests/lib/data.test.ts
git commit -m "feat: add council-to-bakery mapping data (20 councils)"
```

---

## Task 7: Passport Theme Components

**Files:**
- Create: `src/components/passport/passport-card.tsx`, `src/components/passport/stamp-badge.tsx`, `src/components/passport/sticker.tsx`, `src/components/passport/route-line.tsx`
- Test: `tests/components/passport-card.test.tsx`

> These are the reusable building blocks for the passport/travel-journal visual theme. Every section of the site uses them.

- [ ] **Step 1: Write the failing test**

Create `tests/components/passport-card.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PassportCard } from "@/components/passport/passport-card";
import { StampBadge } from "@/components/passport/stamp-badge";
import { Sticker } from "@/components/passport/sticker";

describe("PassportCard", () => {
  it("renders children inside a passport-styled container", () => {
    render(
      <PassportCard>
        <p>Test content</p>
      </PassportCard>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies the passport-page CSS class", () => {
    const { container } = render(
      <PassportCard>Content</PassportCard>
    );
    expect(container.firstChild).toHaveClass("passport-page");
  });
});

describe("StampBadge", () => {
  it("renders text in a stamp style", () => {
    render(<StampBadge>6 Countries</StampBadge>);
    expect(screen.getByText("6 Countries")).toBeInTheDocument();
    expect(screen.getByText("6 Countries")).toHaveClass("stamp");
  });
});

describe("Sticker", () => {
  it("renders content with sticker styling", () => {
    render(<Sticker rotate={-3}>Indonesia</Sticker>);
    expect(screen.getByText("Indonesia")).toBeInTheDocument();
    expect(screen.getByText("Indonesia")).toHaveClass("sticker");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run -- tests/components/passport-card.test.tsx
```

Expected: FAIL — cannot find modules.

- [ ] **Step 3: Implement passport theme components**

Create `src/components/passport/passport-card.tsx`:

```tsx
interface PassportCardProps {
  children: React.ReactNode;
  className?: string;
}

export function PassportCard({ children, className = "" }: PassportCardProps) {
  return (
    <div className={`passport-page rounded-lg p-6 md:p-10 ${className}`}>
      {children}
    </div>
  );
}
```

Create `src/components/passport/stamp-badge.tsx`:

```tsx
interface StampBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function StampBadge({ children, className = "" }: StampBadgeProps) {
  return (
    <span className={`stamp inline-block text-xs ${className}`}>
      {children}
    </span>
  );
}
```

Create `src/components/passport/sticker.tsx`:

```tsx
interface StickerProps {
  children: React.ReactNode;
  rotate?: number;
  className?: string;
}

export function Sticker({ children, rotate = -2, className = "" }: StickerProps) {
  return (
    <span
      className={`sticker px-3 py-1 rounded font-hand text-lg ${className}`}
      style={{ "--sticker-rotate": `${rotate}deg` } as React.CSSProperties}
    >
      {children}
    </span>
  );
}
```

Create `src/components/passport/route-line.tsx`:

```tsx
interface RouteLineProps {
  className?: string;
}

export function RouteLine({ className = "" }: RouteLineProps) {
  return <div className={`route-line ${className}`} />;
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test:run -- tests/components/passport-card.test.tsx
```

Expected: PASS — 4 tests passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/passport/ tests/components/passport-card.test.tsx
git commit -m "feat: add passport theme components (card, stamp, sticker, route line)"
```

---

## Task 8: Journey Timeline & Carbon Summary Components

**Files:**
- Create: `src/components/journey/journey-step.tsx`, `src/components/journey/journey-timeline.tsx`, `src/components/journey/carbon-bar.tsx`, `src/components/carbon/carbon-summary.tsx`
- Test: `tests/components/journey-timeline.test.tsx`, `tests/components/carbon-summary.test.tsx`

> These components render the supply chain steps and carbon breakdown for each product. They're used on every product deep dive page.

- [ ] **Step 1: Write the failing test for JourneyTimeline**

Create `tests/components/journey-timeline.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { JourneyTimeline } from "@/components/journey/journey-timeline";
import type { SupplyChainStep } from "@/lib/types";

const mockSteps: SupplyChainStep[] = [
  {
    id: "palm-oil",
    label: "Palm Oil",
    emoji: "🌴",
    origin: "Indonesia & Malaysia",
    destination: "USA (bakery)",
    transportMode: "ship",
    distanceKm: 15000,
    carbonKg: 0.25,
    confidence: "confirmed",
    description: "RSPO Mass Balance certified.",
  },
  {
    id: "cocoa",
    label: "Cocoa",
    emoji: "🍫",
    origin: "Ivory Coast & Ghana",
    destination: "USA (bakery)",
    transportMode: "ship",
    distanceKm: 9000,
    carbonKg: 0.2,
    confidence: "confirmed",
    description: "From West Africa.",
  },
];

describe("JourneyTimeline", () => {
  it("renders all supply chain steps", () => {
    render(<JourneyTimeline steps={mockSteps} />);
    expect(screen.getByText("Palm Oil")).toBeInTheDocument();
    expect(screen.getByText("Cocoa")).toBeInTheDocument();
  });

  it("shows origin for each step", () => {
    render(<JourneyTimeline steps={mockSteps} />);
    expect(screen.getByText("Indonesia & Malaysia")).toBeInTheDocument();
    expect(screen.getByText("Ivory Coast & Ghana")).toBeInTheDocument();
  });

  it("shows confidence badges", () => {
    render(<JourneyTimeline steps={mockSteps} />);
    const confirmedBadges = screen.getAllByText(/Confirmed/);
    expect(confirmedBadges.length).toBe(2);
  });

  it("shows carbon for each step", () => {
    render(<JourneyTimeline steps={mockSteps} />);
    expect(screen.getByText(/0\.25/)).toBeInTheDocument();
    expect(screen.getByText(/0\.2/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Write the failing test for CarbonSummary**

Create `tests/components/carbon-summary.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarbonSummary } from "@/components/carbon/carbon-summary";
import type { SupplyChainStep } from "@/lib/types";

const mockSteps: SupplyChainStep[] = [
  {
    id: "farming",
    label: "Farming",
    emoji: "🌾",
    origin: "USA",
    destination: "USA",
    transportMode: "truck",
    distanceKm: 500,
    carbonKg: 0.3,
    confidence: "estimated",
    description: "Test",
  },
  {
    id: "shipping",
    label: "Shipping",
    emoji: "🚢",
    origin: "Indonesia",
    destination: "USA",
    transportMode: "ship",
    distanceKm: 15000,
    carbonKg: 0.5,
    confidence: "confirmed",
    description: "Test",
  },
];

describe("CarbonSummary", () => {
  it("renders the total carbon footprint", () => {
    render(<CarbonSummary steps={mockSteps} totalCarbon={0.8} />);
    expect(screen.getByText(/0\.8/)).toBeInTheDocument();
    expect(screen.getByText(/kg CO/)).toBeInTheDocument();
  });

  it("renders a bar for each step", () => {
    render(<CarbonSummary steps={mockSteps} totalCarbon={0.8} />);
    expect(screen.getByText("Farming")).toBeInTheDocument();
    expect(screen.getByText("Shipping")).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
npm run test:run -- tests/components/journey-timeline.test.tsx tests/components/carbon-summary.test.tsx
```

Expected: FAIL — cannot find modules.

- [ ] **Step 4: Implement JourneyStep component**

Create `src/components/journey/journey-step.tsx`:

```tsx
import type { SupplyChainStep } from "@/lib/types";

interface JourneyStepProps {
  step: SupplyChainStep;
  isLast: boolean;
}

const confidenceStyles = {
  confirmed: "bg-forest/10 text-forest",
  estimated: "bg-amber-100 text-amber-700",
};

export function JourneyStep({ step, isLast }: JourneyStepProps) {
  return (
    <div className={`flex items-start gap-4 relative ${!isLast ? "journey-step" : ""}`}>
      <div className="w-12 h-12 rounded-full bg-ink/5 border-2 border-ink/20 flex items-center justify-center text-xl shrink-0">
        {step.emoji}
      </div>
      <div>
        <h4 className="font-display font-bold text-lg">{step.label}</h4>
        <p className="font-body text-sm text-ink/70">{step.origin}</p>
        <p className="font-body text-sm text-ink/60 mt-1">{step.description}</p>
        <div className="flex items-center gap-3 mt-2">
          <span
            className={`text-xs font-body font-semibold px-2 py-0.5 rounded ${confidenceStyles[step.confidence]}`}
          >
            {step.confidence === "confirmed" ? "Confirmed" : "Estimated ~"}
          </span>
          <span className="text-xs font-body text-ink/40">
            ~{step.carbonKg} kg CO2
          </span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Implement JourneyTimeline component**

Create `src/components/journey/journey-timeline.tsx`:

```tsx
import type { SupplyChainStep } from "@/lib/types";
import { JourneyStep } from "./journey-step";

interface JourneyTimelineProps {
  steps: SupplyChainStep[];
}

export function JourneyTimeline({ steps }: JourneyTimelineProps) {
  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <JourneyStep
          key={step.id}
          step={step}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 6: Implement CarbonBar component**

Create `src/components/journey/carbon-bar.tsx`:

```tsx
interface CarbonBarProps {
  label: string;
  percentage: number;
}

export function CarbonBar({ label, percentage }: CarbonBarProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-body text-xs w-24 text-ink/50">{label}</span>
      <div className="flex-1 bg-ink/5 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-forest to-green-400 rounded-full h-3 transition-all duration-1000"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="font-body text-xs text-ink/50">{Math.round(percentage)}%</span>
    </div>
  );
}
```

- [ ] **Step 7: Implement CarbonSummary component**

Create `src/components/carbon/carbon-summary.tsx`:

```tsx
import type { SupplyChainStep } from "@/lib/types";
import { CarbonBar } from "@/components/journey/carbon-bar";

interface CarbonSummaryProps {
  steps: SupplyChainStep[];
  totalCarbon: number;
}

export function CarbonSummary({ steps, totalCarbon }: CarbonSummaryProps) {
  return (
    <div className="bg-ink/5 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="font-display font-bold text-lg">
          Total Carbon Footprint
        </span>
        <span className="font-display font-bold text-2xl text-stamp">
          ~{totalCarbon} kg CO2
        </span>
      </div>
      <div className="space-y-3">
        {steps.map((step) => (
          <CarbonBar
            key={step.id}
            label={step.label}
            percentage={(step.carbonKg / totalCarbon) * 100}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 8: Run tests to verify they pass**

```bash
npm run test:run -- tests/components/journey-timeline.test.tsx tests/components/carbon-summary.test.tsx
```

Expected: PASS — 6 tests passed.

- [ ] **Step 9: Commit**

```bash
git add src/components/journey/ src/components/carbon/carbon-summary.tsx tests/components/journey-timeline.test.tsx tests/components/carbon-summary.test.tsx
git commit -m "feat: add journey timeline and carbon summary components"
```

---

## Task 9: Site Layout (Header, Footer, Mobile Nav)

**Files:**
- Create: `src/components/layout/site-header.tsx`, `src/components/layout/site-footer.tsx`, `src/components/layout/mobile-nav.tsx`
- Update: `src/app/layout.tsx`

> The nav and footer wrap every page. Mobile nav is critical — the PRD says the primary audience accesses on phones.

- [ ] **Step 1: Install shadcn/ui Sheet component (for mobile nav)**

```bash
npx shadcn@latest add sheet button
```

- [ ] **Step 2: Implement SiteHeader**

Create `src/components/layout/site-header.tsx`:

```tsx
import Link from "next/link";
import { MobileNav } from "./mobile-nav";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/explore", label: "Explore" },
  { href: "/calculator", label: "Calculator" },
  { href: "/why-it-matters", label: "Why It Matters" },
  { href: "/olivia", label: "Olivia's Story" },
];

export function SiteHeader() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-parchment/90 backdrop-blur-sm border-b border-parchment-dark">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          <span className="font-display font-bold text-lg">
            The Hidden Journey
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-body text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-stamp transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-stamp after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <MobileNav links={navLinks} />
      </div>
    </nav>
  );
}
```

- [ ] **Step 3: Implement MobileNav**

Create `src/components/layout/mobile-nav.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  links: { href: string; label: string }[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-2xl">
          ☰
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-parchment border-parchment-dark">
        <nav className="flex flex-col gap-6 mt-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-body text-lg font-medium hover:text-stamp transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```

- [ ] **Step 4: Implement SiteFooter**

Create `src/components/layout/site-footer.tsx`:

```tsx
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="py-12 px-4 border-t border-parchment-dark">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-display font-bold text-lg mb-2">
          The Hidden Journey
        </p>
        <p className="font-body text-sm text-ink/50 mb-4">
          A Girl Scout Gold Award Project by Mia
        </p>
        <div className="flex justify-center gap-6 mb-4 font-body text-xs text-ink/40">
          <Link href="/sources" className="hover:text-stamp transition-colors">
            Sources & Methodology
          </Link>
        </div>
        <p className="font-body text-xs text-ink/30">
          All carbon data are educational approximations marked with ~. Sources
          cited throughout.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Update root layout to include header and footer**

Update `src/app/layout.tsx` — add imports and wrap children:

```tsx
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

// ... (keep existing font and metadata code)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${playfair.variable} ${dmSans.variable}`}
    >
      <body className="font-body">
        <SiteHeader />
        <main className="pt-16">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Verify the layout renders in the browser**

```bash
npm run dev
```

Expected: Nav bar at top with links, footer at bottom, mobile hamburger menu works.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/ src/components/ui/ src/app/layout.tsx
git commit -m "feat: add site header, footer, and mobile navigation"
```

---

## Task 10: Home Page (Hero Section)

**Files:**
- Update: `src/app/page.tsx`

> The hero is the first thing visitors see. It sets the tone with the passport theme and draws them into the content.

- [ ] **Step 1: Implement the hero section**

Update `src/app/page.tsx`:

```tsx
import Link from "next/link";
import { StampBadge } from "@/components/passport/stamp-badge";
import { Sticker } from "@/components/passport/sticker";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
        <div className="absolute top-20 right-10 opacity-10 text-8xl select-none">🌏</div>
        <div className="absolute bottom-20 left-10 opacity-10 text-7xl select-none">🚢</div>
        <div className="absolute top-40 left-20 opacity-10 text-6xl select-none">✈️</div>

        <div className="max-w-4xl mx-auto text-center relative">
          <StampBadge className="mb-8 text-sm md:text-base">
            Girl Scout Gold Award Project
          </StampBadge>

          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
            The Hidden
            <br />
            <span className="text-stamp italic">Journey</span>
          </h1>

          <p className="font-hand text-2xl md:text-3xl text-cocoa mb-4">
            Where Your Stuff Really Comes From
          </p>

          <p className="font-body text-lg text-ink/70 max-w-xl mx-auto mb-10">
            A single Girl Scout cookie touches{" "}
            <strong className="text-stamp">six countries</strong> before it
            reaches your doorstep. Follow the journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="bg-stamp text-white font-body font-semibold px-8 py-3 rounded-sm hover:bg-red-800 transition-colors shadow-md"
            >
              Start Exploring
            </Link>
            <Link
              href="/olivia"
              className="font-body font-medium text-ink/70 hover:text-stamp transition-colors underline underline-offset-4 decoration-stamp/30"
            >
              Read Olivia&apos;s Story
            </Link>
          </div>

          {/* Journey preview */}
          <div className="mt-16 flex items-center justify-center gap-2 md:gap-4 flex-wrap">
            <Sticker rotate={-3}>🌴 Indonesia</Sticker>
            <span className="text-stamp font-bold">→</span>
            <Sticker rotate={2}>🍫 Ghana</Sticker>
            <span className="text-stamp font-bold">→</span>
            <Sticker rotate={-1}>🏭 Kentucky</Sticker>
            <span className="text-stamp font-bold">→</span>
            <Sticker rotate={3}>🏠 You!</Sticker>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify in the browser**

```bash
npm run dev
```

Expected: Full hero section matching the mockup design — stamp badge, large title, sticker journey preview.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: implement hero section with passport theme"
```

---

## Task 11: Product Deep Dive Pages

**Files:**
- Create: `src/app/products/page.tsx`, `src/app/products/[slug]/page.tsx`

> These are the heart of the site — full supply chain stories for each product. Uses SSG with `generateStaticParams` so every product page is pre-rendered at build time.

- [ ] **Step 1: Implement the products overview page**

Create `src/app/products/page.tsx`:

```tsx
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/data";
import { PassportCard } from "@/components/passport/passport-card";

export default function ProductsPage() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-hand text-2xl text-stamp">
            Featured Products
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl mt-2">
            Girl Scout Product Deep Dives
          </h1>
          <p className="font-body text-ink/60 mt-4 max-w-lg mx-auto">
            Three products you know and love — and the surprising global
            journeys behind them.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <Link key={product.slug} href={`/products/${product.slug}`}>
              <PassportCard className="hover:shadow-xl transition-shadow cursor-pointer group h-full">
                <span className="font-hand text-lg text-stamp">
                  Passport #{String(i + 1).padStart(3, "0")}
                </span>
                <h3 className="font-display font-bold text-2xl mt-1 group-hover:text-stamp transition-colors">
                  {product.name}
                </h3>
                <p className="font-body text-sm text-ink/60 mt-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-body text-sm font-semibold text-forest">
                    ~{product.carbonTotal} kg CO2
                  </span>
                  <span className="font-body text-sm text-stamp group-hover:translate-x-1 transition-transform">
                    Read more →
                  </span>
                </div>
              </PassportCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Implement the individual product page with SSG**

Create `src/app/products/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/data";
import { PassportCard } from "@/components/passport/passport-card";
import { StampBadge } from "@/components/passport/stamp-badge";
import { JourneyTimeline } from "@/components/journey/journey-timeline";
import { CarbonSummary } from "@/components/carbon/carbon-summary";

export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <PassportCard>
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="font-hand text-xl text-stamp">
                Product Passport
              </span>
              <h1 className="font-display font-bold text-3xl md:text-4xl mt-1">
                {product.emoji} {product.name}
              </h1>
            </div>
            <StampBadge className="hidden md:block">
              {product.countriesCount}{" "}
              {product.countriesCount === 1 ? "Country" : "Countries"}
            </StampBadge>
          </div>

          <p className="font-body text-ink/70 mb-8 max-w-2xl">
            {product.description}
          </p>

          <JourneyTimeline steps={product.supplyChain} />

          <div className="mt-10">
            <CarbonSummary
              steps={product.supplyChain}
              totalCarbon={product.carbonTotal}
            />
          </div>

          {product.ethicsStory && (
            <div className="mt-10 p-6 border-2 border-dashed border-stamp/20 rounded-lg">
              <h3 className="font-display font-bold text-xl mb-2">
                {product.ethicsStory.title}
              </h3>
              <p className="font-body text-ink/70">
                {product.ethicsStory.summary}
              </p>
            </div>
          )}
        </PassportCard>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify in the browser**

```bash
npm run dev
```

Expected: `/products` shows three product cards. Clicking one opens `/products/thin-mint` with full journey timeline and carbon breakdown.

- [ ] **Step 4: Verify static build works**

```bash
npm run build
```

Expected: Build succeeds. All three product pages are pre-rendered as static HTML.

- [ ] **Step 5: Commit**

```bash
git add src/app/products/
git commit -m "feat: add product overview and deep dive pages with SSG"
```

---

## Task 12: Explore Products Page (Search & Filter)

**Files:**
- Create: `src/components/explore/product-search.tsx`, `src/components/explore/category-tags.tsx`, `src/components/explore/product-grid.tsx`, `src/components/explore/search-fallback.tsx`
- Create: `src/app/explore/page.tsx`
- Test: `tests/components/product-search.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/product-search.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductSearch } from "@/components/explore/product-search";
import type { Product, Category } from "@/lib/types";

const mockProducts: Product[] = [
  {
    slug: "thin-mint",
    name: "Thin Mint Cookie",
    emoji: "🍪",
    category: "cookie-varieties",
    description: "A peppermint cookie.",
    carbonTotal: 0.8,
    countriesCount: 6,
    supplyChain: [],
  },
  {
    slug: "tent",
    name: "Camping Tent",
    emoji: "⛺",
    category: "camping-gear",
    description: "A nylon tent.",
    carbonTotal: 25,
    countriesCount: 4,
    supplyChain: [],
  },
];

const mockCategories: Category[] = [
  { id: "cookie-varieties", name: "Cookie Varieties", emoji: "🍪" },
  { id: "camping-gear", name: "Camping Gear", emoji: "🏕️" },
];

describe("ProductSearch", () => {
  it("renders the search input", () => {
    render(
      <ProductSearch products={mockProducts} categories={mockCategories} />
    );
    expect(
      screen.getByPlaceholderText(/search for a product/i)
    ).toBeInTheDocument();
  });

  it("shows all products initially", () => {
    render(
      <ProductSearch products={mockProducts} categories={mockCategories} />
    );
    expect(screen.getByText("Thin Mint Cookie")).toBeInTheDocument();
    expect(screen.getByText("Camping Tent")).toBeInTheDocument();
  });

  it("filters products when typing in search", async () => {
    const user = userEvent.setup();
    render(
      <ProductSearch products={mockProducts} categories={mockCategories} />
    );
    const input = screen.getByPlaceholderText(/search for a product/i);
    await user.type(input, "tent");
    expect(screen.getByText("Camping Tent")).toBeInTheDocument();
    expect(screen.queryByText("Thin Mint Cookie")).not.toBeInTheDocument();
  });

  it("shows fallback message when no products match", async () => {
    const user = userEvent.setup();
    render(
      <ProductSearch products={mockProducts} categories={mockCategories} />
    );
    const input = screen.getByPlaceholderText(/search for a product/i);
    await user.type(input, "smartphone");
    expect(
      screen.getByText(/we don't have supply chain data/i)
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run -- tests/components/product-search.test.tsx
```

Expected: FAIL — cannot find module.

- [ ] **Step 3: Implement CategoryTags component**

Create `src/components/explore/category-tags.tsx`:

```tsx
"use client";

import type { Category } from "@/lib/types";

interface CategoryTagsProps {
  categories: Category[];
  selected: string | null;
  onSelect: (categoryId: string | null) => void;
}

export function CategoryTags({
  categories,
  selected,
  onSelect,
}: CategoryTagsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={() => onSelect(null)}
        className={`sticker px-4 py-2 rounded font-body text-sm font-medium transition-all cursor-pointer ${
          selected === null ? "bg-stamp text-white" : ""
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id === selected ? null : cat.id)}
          className={`sticker px-4 py-2 rounded font-body text-sm font-medium transition-all cursor-pointer ${
            selected === cat.id ? "bg-stamp text-white" : ""
          }`}
          style={{ "--sticker-rotate": "0deg" } as React.CSSProperties}
        >
          {cat.emoji} {cat.name}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Implement ProductGrid component**

Create `src/components/explore/product-grid.tsx`:

```tsx
import Link from "next/link";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link key={product.slug} href={`/products/${product.slug}`}>
          <div className="passport-page rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer group text-center">
            <div className="text-4xl mb-2">{product.emoji}</div>
            <h4 className="font-display font-bold text-sm group-hover:text-stamp transition-colors">
              {product.name}
            </h4>
            <p className="font-body text-xs text-ink/40 mt-1">
              {product.countriesCount}{" "}
              {product.countriesCount === 1 ? "country" : "countries"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Implement SearchFallback component**

Create `src/components/explore/search-fallback.tsx`:

```tsx
interface SearchFallbackProps {
  query: string;
}

export function SearchFallback({ query }: SearchFallbackProps) {
  const encodedQuery = encodeURIComponent(query);

  return (
    <div className="passport-page rounded-lg p-8 text-center max-w-lg mx-auto">
      <p className="font-body text-ink/70 mb-4">
        We don&apos;t have supply chain data for{" "}
        <strong className="text-ink">{query}</strong> yet. But you can research
        it yourself:
      </p>
      <div className="space-y-3">
        <a
          href={`https://opensupplyhub.org/facilities?q=${encodedQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block font-body text-sm text-ocean hover:text-stamp transition-colors"
        >
          Find where it&apos;s made → Open Supply Hub
        </a>
        <a
          href="https://www.freightos.com/freight-tools/freight-carbon-calculator/"
          target="_blank"
          rel="noopener noreferrer"
          className="block font-body text-sm text-ocean hover:text-stamp transition-colors"
        >
          Calculate shipping emissions → Freightos
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Implement ProductSearch (combined client component)**

Create `src/components/explore/product-search.tsx`:

```tsx
"use client";

import { useState } from "react";
import type { Product, Category } from "@/lib/types";
import { searchProducts, filterByCategory } from "@/lib/search";
import { CategoryTags } from "./category-tags";
import { ProductGrid } from "./product-grid";
import { SearchFallback } from "./search-fallback";

interface ProductSearchProps {
  products: Product[];
  categories: Category[];
}

export function ProductSearch({ products, categories }: ProductSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const searched = searchProducts(products, query);
  const filtered = filterByCategory(searched, selectedCategory);

  return (
    <div>
      <div className="max-w-2xl mx-auto mb-10">
        <div className="passport-page rounded-lg p-2 flex items-center">
          <span className="text-xl pl-3">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a product... (e.g., sleeping bag, Samoas, pencil)"
            className="flex-1 bg-transparent font-body text-lg px-3 py-3 outline-none placeholder:text-ink/30"
          />
        </div>
      </div>

      <div className="mb-12">
        <CategoryTags
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {filtered.length > 0 ? (
        <ProductGrid products={filtered} />
      ) : query.trim() ? (
        <SearchFallback query={query} />
      ) : (
        <p className="text-center font-body text-ink/50">
          No products in this category yet.
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 7: Implement the Explore page**

Create `src/app/explore/page.tsx`:

```tsx
import { getAllProducts, getCategories } from "@/lib/data";
import { ProductSearch } from "@/components/explore/product-search";

export default function ExplorePage() {
  const products = getAllProducts();
  const categories = getCategories();

  return (
    <section className="py-20 px-4 bg-parchment-dark/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-hand text-2xl text-stamp">
            Search the Girl Scout World
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl mt-2">
            Explore Any Product
          </h1>
          <p className="font-body text-ink/60 mt-4">
            Discover the hidden journeys behind 30+ products Girl Scouts use
            every day.
          </p>
        </div>

        <ProductSearch products={products} categories={categories} />
      </div>
    </section>
  );
}
```

- [ ] **Step 8: Run tests to verify they pass**

```bash
npm run test:run -- tests/components/product-search.test.tsx
```

Expected: PASS — 4 tests passed.

- [ ] **Step 9: Commit**

```bash
git add src/components/explore/ src/app/explore/ tests/components/product-search.test.tsx
git commit -m "feat: add explore page with product search, category filter, and fallback"
```

---

## Task 13: Council Carbon Calculator Page

**Files:**
- Create: `src/components/carbon/council-selector.tsx`, `src/app/calculator/page.tsx`
- Test: `tests/components/council-selector.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/council-selector.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CouncilSelector } from "@/components/carbon/council-selector";
import type { Council } from "@/lib/types";

const mockCouncils: Council[] = [
  {
    id: "gs-kentuckiana",
    name: "Girl Scouts of Kentuckiana",
    state: "KY",
    bakery: "little-brownie",
    regionCenter: { lat: 38.25, lng: -85.76 },
  },
  {
    id: "gs-greater-la",
    name: "Girl Scouts of Greater Los Angeles",
    state: "CA",
    bakery: "little-brownie",
    regionCenter: { lat: 34.05, lng: -118.24 },
  },
];

describe("CouncilSelector", () => {
  it("renders the council dropdown", () => {
    render(<CouncilSelector councils={mockCouncils} />);
    expect(
      screen.getByText(/choose your girl scout council/i)
    ).toBeInTheDocument();
  });

  it("shows carbon result after selecting a council", async () => {
    const user = userEvent.setup();
    render(<CouncilSelector councils={mockCouncils} />);
    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "gs-kentuckiana");
    expect(screen.getByText(/kg CO/)).toBeInTheDocument();
    expect(screen.getByText(/Little Brownie Bakers/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run -- tests/components/council-selector.test.tsx
```

Expected: FAIL — cannot find module.

- [ ] **Step 3: Implement CouncilSelector**

Create `src/components/carbon/council-selector.tsx`:

```tsx
"use client";

import { useState } from "react";
import type { Council } from "@/lib/types";
import { calculateTotalWithCouncil } from "@/lib/carbon";
import { RouteLine } from "@/components/passport/route-line";

const BAKERIES = {
  "abc-bakers": {
    name: "ABC Bakers",
    location: "North Sioux City, South Dakota",
    lat: 42.49,
    lng: -96.47,
  },
  "little-brownie": {
    name: "Little Brownie Bakers",
    location: "Louisville, Kentucky",
    lat: 38.19,
    lng: -85.67,
  },
} as const;

// Base carbon for a Thin Mint box excluding the distribution leg
const BASE_CARBON = 0.7;

interface CouncilSelectorProps {
  councils: Council[];
}

export function CouncilSelector({ councils }: CouncilSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>("");

  const selectedCouncil = councils.find((c) => c.id === selectedId);
  const bakery = selectedCouncil ? BAKERIES[selectedCouncil.bakery] : null;

  const totalCarbon =
    selectedCouncil && bakery
      ? calculateTotalWithCouncil(BASE_CARBON, selectedCouncil.regionCenter, {
          lat: bakery.lat,
          lng: bakery.lng,
        })
      : null;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <label
          htmlFor="council-select"
          className="font-display font-bold text-lg block mb-3"
        >
          Select Your Council
        </label>
        <select
          id="council-select"
          role="combobox"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full bg-parchment border-2 border-parchment-dark rounded px-4 py-3 font-body text-ink outline-none focus:border-stamp transition-colors"
        >
          <option value="">Choose your Girl Scout council...</option>
          {councils.map((council) => (
            <option key={council.id} value={council.id}>
              {council.name} ({council.state})
            </option>
          ))}
        </select>

        {selectedCouncil && bakery && (
          <div className="mt-6 p-4 bg-ink/5 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🏭</span>
              <span className="font-body text-sm font-semibold">
                Your bakery: {bakery.name}
              </span>
            </div>
            <p className="font-body text-xs text-ink/50">
              {bakery.location} → Your area
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center">
        {totalCarbon !== null ? (
          <div className="text-center p-6 bg-stamp/5 rounded-lg border-2 border-dashed border-stamp/20">
            <p className="font-hand text-xl text-stamp mb-2">
              Your Thin Mint&apos;s Total Journey
            </p>
            <p className="font-display font-bold text-5xl text-stamp">
              ~{totalCarbon.toFixed(2)}
            </p>
            <p className="font-body text-sm text-ink/50 mt-1">
              kg CO2 per box
            </p>
            <RouteLine className="mt-4 mx-auto max-w-48" />
            <p className="font-body text-xs text-ink/40 mt-3">
              Same ingredients, different last mile.
            </p>
          </div>
        ) : (
          <div className="text-center p-6 bg-ink/5 rounded-lg border-2 border-dashed border-ink/10">
            <p className="font-hand text-xl text-ink/30">
              Select a council to see your cookie&apos;s carbon footprint
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Implement the Calculator page**

Create `src/app/calculator/page.tsx`:

```tsx
import { getCouncils } from "@/lib/data";
import { PassportCard } from "@/components/passport/passport-card";
import { CouncilSelector } from "@/components/carbon/council-selector";

export default function CalculatorPage() {
  const councils = getCouncils();

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-hand text-2xl text-stamp">
            Your Cookies, Your Footprint
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl mt-2">
            Council Carbon Calculator
          </h1>
          <p className="font-body text-ink/60 mt-4">
            Where you live changes how far your cookies travel. Find your
            council.
          </p>
        </div>

        <PassportCard>
          <CouncilSelector councils={councils} />
        </PassportCard>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm run test:run -- tests/components/council-selector.test.tsx
```

Expected: PASS — 2 tests passed.

- [ ] **Step 6: Commit**

```bash
git add src/components/carbon/council-selector.tsx src/app/calculator/ tests/components/council-selector.test.tsx
git commit -m "feat: add council carbon calculator with interactive selector"
```

---

## Task 14: Why It Matters & Olivia's Story Pages

**Files:**
- Create: `src/app/why-it-matters/page.tsx`, `src/app/olivia/page.tsx`

> Content-focused pages. Olivia's story has placeholder text since Mia will write the real content.

- [ ] **Step 1: Implement Why It Matters page**

Create `src/app/why-it-matters/page.tsx`:

```tsx
function Highlight({ children }: { children: React.ReactNode }) {
  return <strong className="text-stamp">{children}</strong>;
}

const themes = [
  {
    emoji: "🌍",
    title: "Environmental Impact",
    content: (
      <p className="font-body text-parchment/60 text-sm leading-relaxed">
        Global freight produces <Highlight>~7% of all greenhouse gas emissions</Highlight>.
        Every product you buy has a carbon cost that starts long before it reaches the shelf.
      </p>
    ),
  },
  {
    emoji: "✊",
    title: "Labor & Human Rights",
    content: (
      <p className="font-body text-parchment/60 text-sm leading-relaxed">
        Supply chains can hide <Highlight>child labor and unsafe conditions</Highlight>.
        &ldquo;Mixed&rdquo; certification labels can obscure the reality of where materials come from.
      </p>
    ),
  },
  {
    emoji: "🤝",
    title: "Global Cooperation",
    content: (
      <p className="font-body text-parchment/60 text-sm leading-relaxed">
        One cookie connects workers across <Highlight>six countries</Highlight>.
        Your purchase is part of a web of human effort spanning continents.
      </p>
    ),
  },
  {
    emoji: "💡",
    title: "Consumer Power",
    content: (
      <p className="font-body text-parchment/60 text-sm leading-relaxed">
        <Highlight>Informed consumers</Highlight> can push brands toward better practices.
        Knowing where your stuff comes from is the first step to changing how it&apos;s made.
      </p>
    ),
  },
];

export default function WhyItMattersPage() {
  return (
    <section className="py-20 px-4 bg-ink text-parchment">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-hand text-2xl text-stamp">
            The Bigger Picture
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl mt-2">
            Why It Matters
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {themes.map((theme) => (
            <div
              key={theme.title}
              className="border border-parchment/20 rounded-lg p-8 hover:border-stamp/50 transition-colors"
            >
              <div className="text-4xl mb-4">{theme.emoji}</div>
              <h3 className="font-display font-bold text-xl mb-3">
                {theme.title}
              </h3>
              {theme.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Implement Olivia's Story page**

Create `src/app/olivia/page.tsx`:

```tsx
import { PassportCard } from "@/components/passport/passport-card";
import { StampBadge } from "@/components/passport/stamp-badge";

export default function OliviaPage() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <PassportCard className="relative">
          <StampBadge className="absolute top-6 right-6 hidden md:block">
            True Story
          </StampBadge>

          <span className="font-hand text-2xl text-stamp">
            The Emotional Centerpiece
          </span>
          <h1 className="font-display font-bold text-3xl md:text-4xl mt-2 mb-6">
            Olivia Chaffin&apos;s Story
          </h1>

          <div className="space-y-4 font-body text-ink/70 leading-relaxed">
            <p>
              <span className="font-display font-bold text-2xl text-ink float-left mr-2 mt-1">
                O
              </span>
              livia Chaffin was a Girl Scout in Tennessee when she decided to
              look more closely at the label on her cookie box. What she found
              changed everything.
            </p>
            <p>
              The palm oil in her cookies carried a &ldquo;mixed&rdquo;
              certification label — meaning it could come from sustainable
              sources, or it could come from plantations linked to deforestation
              and labor abuses. There was no way to tell.
            </p>
            <p>
              She didn&apos;t look away. She researched. She asked questions. And
              then she launched a petition that got{" "}
              <strong className="text-ink">national attention</strong>,
              challenging the Girl Scouts of the USA to do better.
            </p>
            <p className="font-hand text-xl text-stamp italic">
              &ldquo;One Girl Scout asked a question. That question became a
              movement.&rdquo;
            </p>
            <p className="text-sm text-ink/40 italic">
              — Original content by Mia, coming soon
            </p>
          </div>
        </PassportCard>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify in the browser**

```bash
npm run dev
```

Expected: `/why-it-matters` shows four themed cards on a dark background. `/olivia` shows the story in a passport card.

- [ ] **Step 4: Commit**

```bash
git add src/app/why-it-matters/ src/app/olivia/
git commit -m "feat: add Why It Matters and Olivia's Story pages"
```

---

## Task 15: Sources & Methodology Page

**Files:**
- Create: `src/app/sources/page.tsx`

- [ ] **Step 1: Implement the Sources page**

Create `src/app/sources/page.tsx`:

```tsx
import { PassportCard } from "@/components/passport/passport-card";

const sources = [
  {
    name: "Open Supply Hub",
    url: "https://opensupplyhub.org",
    description: "Factory and supplier location data",
  },
  {
    name: "Freightos Emissions Calculator",
    url: "https://www.freightos.com/freight-tools/freight-carbon-calculator/",
    description: "Shipping carbon footprint estimates",
  },
  {
    name: "EcoTransIT World",
    url: "https://www.ecotransit.org",
    description: "Transport emissions calculations",
  },
  {
    name: "EPA Supply Chain Guidance",
    url: "https://www.epa.gov/climateleadership",
    description: "U.S. environmental supply chain data",
  },
  {
    name: "NY Fed Supply Chain Index",
    url: "https://www.newyorkfed.org/research/policy/gscpi",
    description: "Real-time supply chain pressure data",
  },
];

export default function SourcesPage() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-hand text-2xl text-stamp">Transparency</span>
          <h1 className="font-display font-bold text-4xl md:text-5xl mt-2">
            Sources & Methodology
          </h1>
        </div>

        <PassportCard className="mb-8">
          <h2 className="font-display font-bold text-xl mb-4">
            How We Calculate Carbon
          </h2>
          <div className="space-y-3 font-body text-sm text-ink/70">
            <p>
              All carbon footprint numbers on this site are{" "}
              <strong>educational approximations</strong>, not precise
              measurements. We calculate emissions based on:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Transport mode (ship, truck, rail, air)</li>
              <li>Distance between origin and destination</li>
              <li>
                Standard emission factors from EcoTransIT and EPA databases
              </li>
            </ul>
            <p>
              Numbers marked with <strong>~</strong> are estimates. Data labeled{" "}
              <strong>&ldquo;Confirmed&rdquo;</strong> comes from public
              sustainability reports or company disclosures. Data labeled{" "}
              <strong>&ldquo;Estimated ~&rdquo;</strong> uses educated
              approximations based on industry norms.
            </p>
          </div>
        </PassportCard>

        <PassportCard>
          <h2 className="font-display font-bold text-xl mb-4">Data Sources</h2>
          <div className="space-y-4">
            {sources.map((source) => (
              <div
                key={source.name}
                className="flex items-start gap-3 p-3 bg-ink/5 rounded-lg"
              >
                <span className="text-stamp font-bold mt-0.5">→</span>
                <div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body font-semibold text-ocean hover:text-stamp transition-colors"
                  >
                    {source.name}
                  </a>
                  <p className="font-body text-xs text-ink/50 mt-0.5">
                    {source.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PassportCard>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in the browser**

```bash
npm run dev
```

Expected: `/sources` shows methodology explanation and linked data sources.

- [ ] **Step 3: Commit**

```bash
git add src/app/sources/
git commit -m "feat: add sources and methodology page"
```

---

## Task 16: Guided Walkthrough Mode

**Files:**
- Create: `src/components/walkthrough/walkthrough-provider.tsx`, `src/components/walkthrough/walkthrough-controls.tsx`, `src/components/walkthrough/walkthrough-overlay.tsx`
- Update: `src/app/layout.tsx`
- Test: `tests/components/walkthrough.test.tsx`

> This lets Mia step through the site sequentially during her Gold Award presentation. It's an overlay on the existing site — the site works without it for self-serve visitors.

- [ ] **Step 1: Write the failing test**

Create `tests/components/walkthrough.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  WalkthroughProvider,
  useWalkthrough,
} from "@/components/walkthrough/walkthrough-provider";

function TestConsumer() {
  const { isActive, currentStep, totalSteps, next, previous, start, exit } =
    useWalkthrough();

  return (
    <div>
      <span data-testid="active">{String(isActive)}</span>
      <span data-testid="step">{currentStep}</span>
      <span data-testid="total">{totalSteps}</span>
      <button onClick={start}>Start</button>
      <button onClick={next}>Next</button>
      <button onClick={previous}>Previous</button>
      <button onClick={exit}>Exit</button>
    </div>
  );
}

const steps = [
  { id: "hero", label: "Welcome", path: "/" },
  { id: "products", label: "Products", path: "/products" },
  { id: "calculator", label: "Calculator", path: "/calculator" },
];

describe("WalkthroughProvider", () => {
  it("starts inactive", () => {
    render(
      <WalkthroughProvider steps={steps}>
        <TestConsumer />
      </WalkthroughProvider>
    );
    expect(screen.getByTestId("active").textContent).toBe("false");
  });

  it("activates and navigates through steps", async () => {
    const user = userEvent.setup();
    render(
      <WalkthroughProvider steps={steps}>
        <TestConsumer />
      </WalkthroughProvider>
    );

    await user.click(screen.getByText("Start"));
    expect(screen.getByTestId("active").textContent).toBe("true");
    expect(screen.getByTestId("step").textContent).toBe("0");
    expect(screen.getByTestId("total").textContent).toBe("3");

    await user.click(screen.getByText("Next"));
    expect(screen.getByTestId("step").textContent).toBe("1");

    await user.click(screen.getByText("Previous"));
    expect(screen.getByTestId("step").textContent).toBe("0");
  });

  it("exits walkthrough", async () => {
    const user = userEvent.setup();
    render(
      <WalkthroughProvider steps={steps}>
        <TestConsumer />
      </WalkthroughProvider>
    );

    await user.click(screen.getByText("Start"));
    await user.click(screen.getByText("Exit"));
    expect(screen.getByTestId("active").textContent).toBe("false");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run -- tests/components/walkthrough.test.tsx
```

Expected: FAIL — cannot find module.

- [ ] **Step 3: Implement WalkthroughProvider**

Create `src/components/walkthrough/walkthrough-provider.tsx`:

```tsx
"use client";

import { createContext, useContext, useState, useCallback } from "react";

export interface WalkthroughStep {
  id: string;
  label: string;
  path: string;
}

interface WalkthroughContextValue {
  isActive: boolean;
  currentStep: number;
  totalSteps: number;
  steps: WalkthroughStep[];
  start: () => void;
  exit: () => void;
  next: () => void;
  previous: () => void;
}

const WalkthroughContext = createContext<WalkthroughContextValue | null>(null);

export function useWalkthrough() {
  const context = useContext(WalkthroughContext);
  if (!context) {
    throw new Error("useWalkthrough must be used within WalkthroughProvider");
  }
  return context;
}

interface WalkthroughProviderProps {
  steps: WalkthroughStep[];
  children: React.ReactNode;
}

export function WalkthroughProvider({
  steps,
  children,
}: WalkthroughProviderProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const start = useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
  }, []);

  const exit = useCallback(() => {
    setIsActive(false);
    setCurrentStep(0);
  }, []);

  const next = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const previous = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <WalkthroughContext.Provider
      value={{
        isActive,
        currentStep,
        totalSteps: steps.length,
        steps,
        start,
        exit,
        next,
        previous,
      }}
    >
      {children}
    </WalkthroughContext.Provider>
  );
}
```

- [ ] **Step 4: Implement WalkthroughControls**

Create `src/components/walkthrough/walkthrough-controls.tsx`:

```tsx
"use client";

import { useWalkthrough } from "./walkthrough-provider";
import { useRouter } from "next/navigation";

export function WalkthroughControls() {
  const { isActive, currentStep, totalSteps, steps, next, previous, exit } =
    useWalkthrough();
  const router = useRouter();

  if (!isActive) return null;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      next();
      router.push(steps[currentStep + 1].path);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      previous();
      router.push(steps[currentStep - 1].path);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-ink text-parchment p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="font-body text-sm px-4 py-2 rounded bg-parchment/10 hover:bg-parchment/20 disabled:opacity-30 transition-colors"
        >
          ← Previous
        </button>

        <div className="text-center">
          <p className="font-body text-xs text-parchment/60">
            {steps[currentStep].label}
          </p>
          <div className="flex gap-1 mt-1 justify-center">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === currentStep ? "bg-stamp" : "bg-parchment/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exit}
            className="font-body text-xs text-parchment/40 hover:text-parchment transition-colors"
          >
            Exit
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === totalSteps - 1}
            className="font-body text-sm px-4 py-2 rounded bg-stamp hover:bg-red-800 disabled:opacity-30 transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Implement WalkthroughStartButton**

Create `src/components/walkthrough/walkthrough-overlay.tsx`:

```tsx
"use client";

import { useWalkthrough } from "./walkthrough-provider";

export function WalkthroughStartButton() {
  const { isActive, start } = useWalkthrough();

  if (isActive) return null;

  return (
    <button
      onClick={start}
      className="fixed bottom-6 right-6 z-40 bg-ink text-parchment font-body text-sm font-medium px-6 py-3 rounded-full shadow-lg hover:bg-ink/90 transition-colors"
      title="Start guided walkthrough"
    >
      🎤 Presentation Mode
    </button>
  );
}
```

- [ ] **Step 6: Integrate walkthrough into the root layout**

Update `src/app/layout.tsx` — add the walkthrough provider, controls, and start button wrapping the page content. Define the walkthrough steps array:

```tsx
import { WalkthroughProvider } from "@/components/walkthrough/walkthrough-provider";
import { WalkthroughControls } from "@/components/walkthrough/walkthrough-controls";
import { WalkthroughStartButton } from "@/components/walkthrough/walkthrough-overlay";

const walkthroughSteps = [
  { id: "hero", label: "Welcome", path: "/" },
  { id: "products", label: "Product Deep Dives", path: "/products" },
  { id: "thin-mint", label: "Thin Mint Journey", path: "/products/thin-mint" },
  { id: "explore", label: "Explore Products", path: "/explore" },
  { id: "calculator", label: "Carbon Calculator", path: "/calculator" },
  { id: "why", label: "Why It Matters", path: "/why-it-matters" },
  { id: "olivia", label: "Olivia's Story", path: "/olivia" },
  { id: "sources", label: "Sources", path: "/sources" },
];
```

Wrap `{children}` in `<WalkthroughProvider steps={walkthroughSteps}>` and add `<WalkthroughControls />` and `<WalkthroughStartButton />` inside the provider.

- [ ] **Step 7: Run tests to verify they pass**

```bash
npm run test:run -- tests/components/walkthrough.test.tsx
```

Expected: PASS — 3 tests passed.

- [ ] **Step 8: Commit**

```bash
git add src/components/walkthrough/ tests/components/walkthrough.test.tsx src/app/layout.tsx
git commit -m "feat: add guided walkthrough mode for presentation"
```

---

## Task 17: Bulk Product Data (30+ Products)

**Files:**
- Create: `data/products/*.json` (27+ additional products)

> Fill out the curated inventory to hit the PRD target of 30-50 products. Each product follows the same JSON schema as the three featured products, with simplified supply chains (2-4 steps each).

- [ ] **Step 1: Create cookie variety products**

Create JSON files in `data/products/` for:
- `samoas.json` — Caramel, coconut (Philippines), chocolate
- `tagalongs.json` — Peanut butter, chocolate coating
- `do-si-dos.json` — Peanut butter sandwich cookie
- `trefoils.json` — Classic shortbread
- `lemon-ups.json` — Lemon-flavored cookie

Each follows the same schema with 3-4 supply chain steps, appropriate carbon estimates, and confidence levels.

- [ ] **Step 2: Create uniform & accessories products**

- `sash.json` — Fabric sash for badges
- `badges.json` — Embroidered iron-on badges
- `pins.json` — Metal enamel pins

- [ ] **Step 3: Create camping gear products**

- `tent.json` — Nylon camping tent
- `sleeping-bag.json` — Synthetic fill sleeping bag
- `water-bottle.json` — Stainless steel water bottle
- `backpack.json` — Nylon daypack

- [ ] **Step 4: Create craft supplies products**

- `colored-pencils.json` — Cedar wood pencils
- `glue-sticks.json` — PVA glue sticks
- `construction-paper.json` — Colored paper

- [ ] **Step 5: Create meeting snacks products**

- `bananas.json` — Imported fruit
- `juice-boxes.json` — Juice boxes with packaging
- `paper-plates.json` — Disposable paper plates

- [ ] **Step 6: Create everyday items products**

- `t-shirt.json` — Cotton t-shirt
- `sneakers.json` — Athletic shoes
- `smartphone.json` — Mobile phone (most complex chain)
- `pencil.json` — Standard #2 pencil
- `backpack-everyday.json` — School backpack

- [ ] **Step 7: Create cookie packaging products**

- `case-packaging.json` — Corrugated case for cookie boxes
- `shipping-materials.json` — Shrink wrap and shipping labels

- [ ] **Step 8: Verify data loading**

```bash
npm run test:run -- tests/lib/data.test.ts
```

Expected: PASS — `getAllProducts()` returns 30+ products.

- [ ] **Step 9: Commit**

```bash
git add data/products/
git commit -m "feat: add 27+ curated products to reach 30+ product inventory"
```

---

## Task 18: Build Verification & Static Export

**Files:**
- Update: `next.config.ts` (if needed for static export settings)

> Verify the entire site builds as static HTML with no runtime dependencies. This is the core constraint — $0 hosting on Vercel's free tier.

- [ ] **Step 1: Run full test suite**

```bash
npm run test:run
```

Expected: All tests pass.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build succeeds. All pages are pre-rendered. No errors about missing data or failed API calls.

- [ ] **Step 3: Test the production build locally**

```bash
npx serve out
```

(Or `npm start` if using Next.js default server mode)

Expected: All pages load, search works, calculator works, walkthrough mode works.

- [ ] **Step 4: Verify mobile responsiveness**

Open in browser dev tools → toggle device toolbar → test at 375px width (iPhone SE).

Expected: All pages are readable, nav collapses to hamburger menu, cards stack vertically.

- [ ] **Step 5: Commit final state**

```bash
git add .
git commit -m "chore: verify production build and mobile responsiveness"
```

---

## Summary

| Task | What it builds | Dependencies |
|------|---------------|-------------|
| 1 | Project scaffolding | None |
| 2 | TypeScript types | Task 1 |
| 3 | JSON data + data loading | Tasks 1, 2 |
| 4 | Search/filter logic | Tasks 1, 2 |
| 5 | Carbon calculation | Tasks 1, 2 |
| 6 | Council data | Tasks 1, 2, 3 |
| 7 | Passport theme components | Task 1 |
| 8 | Journey + carbon components | Tasks 2, 7 |
| 9 | Site layout (nav, footer) | Tasks 1, 7 |
| 10 | Home page hero | Tasks 7, 9 |
| 11 | Product deep dive pages | Tasks 3, 7, 8 |
| 12 | Explore products page | Tasks 3, 4, 7 |
| 13 | Council calculator page | Tasks 5, 6, 7 |
| 14 | Why It Matters + Olivia | Tasks 7, 9 |
| 15 | Sources page | Tasks 7, 9 |
| 16 | Guided walkthrough | Tasks 9, 10-15 |
| 17 | Bulk product data | Tasks 2, 3 |
| 18 | Build verification | All above |

**Parallel tracks:** Tasks 4, 5, 7 can run in parallel after Task 2. Tasks 10-15 can partially overlap. Task 17 can happen anytime after Task 3.
