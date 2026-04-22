# Data Guide — For Mia

This explains every JSON file in the `data/` folder and what each field means. When in doubt, look at the `_template` entry in the file — it shows a filled-in example.

---

## Product Files (`data/products/thin-mint.json`, `vest.json`, `cookie-box.json`)

These are the three featured products with full supply chain stories.

| Field | What It Means |
|---|---|
| `slug` | A short URL-friendly name (no spaces, lowercase). Don't change this. |
| `name` | The display name visitors see on the site |
| `emoji` | An emoji shown next to the product name |
| `category` | Which category this product belongs to (must match an `id` from `categories.json`) |
| `description` | A 1-2 sentence description of the product |
| `carbonTotal` | Total carbon footprint in kg CO₂. Set to `null` until you have data. |
| `countriesCount` | How many countries are involved in making this product |

### Supply Chain Steps (the `supplyChain` array)

Each step represents one leg of the product's journey.

| Field | What It Means |
|---|---|
| `id` | A short identifier for this step (e.g., "palm-oil", "baking"). Don't change these. |
| `label` | The name shown on the site (e.g., "Palm Oil") |
| `emoji` | An emoji for this step |
| `origin` | Where this ingredient/step starts (e.g., "Indonesia & Malaysia") |
| `destination` | Where it goes (e.g., "North Sioux City, South Dakota") |
| `transportMode` | How it travels: `"ship"`, `"truck"`, `"rail"`, or `"air"` |
| `distanceKm` | Distance in kilometers. Set to `null` if unknown. |
| `carbonKg` | Carbon footprint for this step in kg CO₂. Set to `null` — the build script calculates this. |
| `confidence` | `"confirmed"` if you found a real source, `"estimated"` if it's an educated guess |
| `description` | A sentence or two about this step — what happens here, any interesting facts |

### Ethics Story

| Field | What It Means |
|---|---|
| `title` | A short title for the ethics angle (e.g., "Olivia Chaffin's Story") |
| `summary` | A 2-3 sentence summary. The full story goes in a separate content file. |

---

## Product Inventory (`data/products/inventory.json`)

The searchable list of 30-50 products for the "Explore Any Product" feature.

| Field | What It Means |
|---|---|
| `slug` | URL-friendly name (lowercase, hyphens instead of spaces) |
| `name` | Display name |
| `emoji` | An emoji for the product |
| `category` | Must be one of: `cookie-varieties`, `uniform-accessories`, `cookie-packaging`, `camping-outdoor`, `craft-supplies`, `meeting-snacks`, `everyday-items` |
| `carbonTotal` | Total carbon in kg CO₂ (use `null` if unknown) |
| `countriesCount` | Number of countries involved (use `null` if unknown) |
| `hasDedicatedPage` | `true` for the three featured products, `false` for everything else |

---

## Councils (`data/councils.json`)

Maps each of the 112 Girl Scout councils to their cookie bakery.

| Field | What It Means |
|---|---|
| `id` | A short identifier (e.g., "gs-kentuckiana") |
| `name` | The full council name (e.g., "Girl Scouts of Kentuckiana") |
| `state` | Two-letter state code (e.g., "KY") |
| `bakery` | Either `"abc-bakers"` or `"little-brownie"` — which bakery supplies this council |
| `regionCenter.lat` | Latitude of the council's approximate center |
| `regionCenter.lng` | Longitude of the council's approximate center |

You can find council-to-bakery mappings on the GSUSA website and individual council sites. For lat/lng, use the approximate center of the council's service area (Google Maps can help).

---

## Quiz Questions (`data/questions.json`)

The pool of 40 questions for the knowledge quiz.

| Field | What It Means |
|---|---|
| `id` | A unique identifier: q001 through q040 |
| `topic` | One of: `thin-mint`, `vest`, `cookie-box`, `carbon`, `why-it-matters`, `olivia-chaffin` |
| `question` | The question text |
| `choices` | An array of 3-4 answer options |
| `correctIndex` | Which answer is correct — this is the **position** in the choices array, starting from 0. So if the correct answer is the second option, `correctIndex` is `1`. |

---

## Sources (`data/sources.json`)

All cited sources for the site.

| Field | What It Means |
|---|---|
| `id` | A short identifier (e.g., "open-supply-hub") |
| `name` | The source name (e.g., "Open Supply Hub") |
| `url` | The web address |
| `description` | What this source is, in one sentence |
| `usedFor` | What specific data you got from this source |

---

## Files You Don't Need to Touch

- `data/carbon-factors.json` — Emission factors for the carbon calculator. Ryan manages this.
- `data/categories.json` — Product category definitions. Already filled in.
