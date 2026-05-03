# The Hidden Journey — Research Notes

Your scratchpad for everything the site needs. Fill in sections as you research. Once Ryan creates the JSON data files in Phase 0, we'll transfer structured data into them.

---

## Priority 1 — Verify ❓ flagged facts (quick wins)

These are claims already in your content/mockup that should be verified before submitting to the panel. Each one is small — knock them out first.

- [x] **Olivia Chaffin's exact age when she started the petition** — *verified.* News coverage from December 2020 (CBS News, Detroit News, WTOP, Texarkana Gazette, etc.) consistently cites her as **14 at the time of the petition**. 14 in 2020 → 20 in 2026. Math checks out. Wording in `content/olivia-chaffin.md` ("about 20 now... stopped selling at 14") is accurate as-is.
- [x] **"Malaysian government report, kids as young as 5"** — *verified.* Source: *The Employment Survey in Oil Palm Plantations, Malaysia 2018*, conducted by Department of Statistics Malaysia (DOSM), commissioned by the Ministry of Plantation Industries and Commodities (MPIC), with ILO technical support. Found ~33,600 children ages 5–17 on Malaysian palm oil plantations, nearly half between 5 and 11. PDF: https://www.kpk.gov.my/kpk/images/mpi_penerbitan/kajian-menyeluruh-buruh-malaysia-2018/flipbook.pdf. Wording in `content/why-it-matters.md` updated 2026-05-03 to cite this directly.
- [x] **The cookie box's certification logo** — *verified.* It is the **RSPO Mass Balance** logo (a green oil-palm tree), NOT the Rainforest Alliance frog. Both ABC Bakers and Little Brownie Bakers use RSPO Mass Balance certified palm oil; the "mixed" label that Olivia spotted is part of the Mass Balance certification system. Wording in `content/olivia-chaffin.md` ("a little green tree logo and the words 'certified sustainable'") is accurate.
- [x] **Bakery ownership** — *verified, with one correction.* **Little Brownie Bakers**: still owned by Ferrero (Italy), since their $1.3B acquisition of Kellogg's cookie business closed July 2019. **ABC Bakers**: NO LONGER owned by Weston Foods. As of 2021, the cookies/crackers division of Weston Foods (which includes ABC Bakers via Interbake Foods) was sold to **Hearthside Food Solutions** (a U.S. company) for ~CAD$370M. Hearthside filed Chapter 11 in late 2024 and was acquired by Charlesbank Capital Partners + Partners Group as part of restructuring. ABC Bakers continues to operate. Updated PRD §4.1, §5.1, and the mockup to reflect this on 2026-05-03.
- [x] **Exploremores release year** — *verified.* Announced by GSUSA on **September 9, 2025**; debuted nationally in the **2026 cookie season** (on sale January 2026). Rocky-road-inspired sandwich cookie. Original PRD said "2024+" — corrected to "2026 season" on 2026-05-03.
- [ ] **WWF cotton stat** — *not used anymore* (vest got cut). Skip this one.

---

## Priority 2 — Council-to-Bakery Mapping (→ `data/councils.json`)

**[Council mapping draft is in `content/councils-research.md`](councils-research.md).** All 112 GSUSA councils are mapped to either ABC Bakers (North Sioux City, SD) or Little Brownie Bakers (Louisville, KY) — derived from Little Brownie's "Our Councils" page (direct, authoritative for LBB) plus Wikipedia's full GSUSA council list (subtraction gives ABC).

**Status:**
- [x] Bakery assignment for all 112 councils — drafted
- [ ] HQ city for each council — still to do (needed for shipping distance calculation)
- [ ] Spot-check ~10 councils against their own websites to validate the LBB-direct list (Utah switching in 2024 is a known recent change)

**Where to find HQ cities:**
- Each council's "About" or "Contact Us" page on its own site usually lists its HQ
- Or visit girlscouts.org → Find a Council → click each one

---

## Priority 3 — Thin Mint Full Supply Chain (→ `data/cookies/thin-mint.json`)

The flagship cookie. Goes deepest of all 9.

### Ingredients (per 100g of cookie)
For each: source country, RSPO/certification status, processing location, shipping route to bakery, cargo mode, confidence level.

- [ ] **Palm oil** — Indonesia/Malaysia? RSPO Mass Balance. Where does it land in US? (LA port? Houston?)
- [ ] **Cocoa** — Ivory Coast & Ghana (~70% world supply). Which port lands in US? Process: liquor → mass → cookies.
- [ ] **Cocoa butter** — same source as cocoa
- [ ] **Sugar** — likely US Midwest beet sugar (Michigan/Minnesota) or Florida cane sugar. Confirm.
- [ ] **Flour (wheat)** — US Midwest. Specific state?
- [ ] **Peppermint oil** — likely Oregon/Washington. Distillation process.
- [ ] **Soybean oil** — US (Iowa/Illinois Midwest)
- [ ] **Other**: salt, leavening (baking soda), natural flavor, possibly chocolate liquor

### Manufacturing
- [ ] ABC Bakers (SD): annual production volume, energy source if findable
- [ ] Little Brownie Bakers (KY): same

### Distribution legs
- [ ] Bakery → council distribution warehouse → local troop → customer

### Carbon footprint
- [ ] Per-step kg CO₂ (palm oil shipping, cocoa shipping, US ingredient transport, baking, domestic distribution)
- [ ] Total per box (~0.8 kg target)

---

## Priority 4 — Other 8 Cookies (→ `data/cookies/lineup.json`)

For each: name, distinctive ingredients vs. Thin Mint, country count, rough carbon estimate, one-line "what makes this cookie's supply chain different" note.

- [ ] **Samoas / Caramel deLites** — coconut (Philippines? Sri Lanka?) is the new addition vs. Thin Mint. Caramel = corn syrup (US).
- [ ] **Tagalongs / Peanut Butter Patties** — peanuts (US South — Georgia, Alabama). Cocoa coating same as Thin Mint.
- [ ] **Do-si-dos / Peanut Butter Sandwich** — oats (US Midwest), peanut butter. Mostly domestic.
- [ ] **Trefoils / Shortbread** — simplest. Flour, butter, sugar. Almost entirely US.
- [ ] **Lemon-Ups / Lemonades** — lemon flavoring (Italy? US?). Citrus oil source.
- [ ] **Toffee-tastic** — toffee, butter, gluten-free flour blend. Limited release.
- [ ] **Adventurefuls** — caramel brownie, sea salt. Recent addition.
- [ ] **Exploremores** — chocolate, marshmallow, almond crème. Almonds = California.

---

## Priority 5 — Quiz Questions (→ `data/questions.json`)

40 total questions. Distribution from the PRD:

| Topic | Count |
|---|---|
| Thin Mint supply chain | 10 |
| Other cookie varieties (lineup) | 8 |
| Cookie packaging (the box) | 3 |
| Carbon calculator / footprints | 7 |
| Why It Matters themes | 7 |
| Olivia Chaffin story | 5 |

For each: question text, 3–4 answer choices, correct index (0/1/2/3), topic tag.

**Write the questions only after you've finished priorities 1–4** — you'll know more facts and the questions will be sharper.

---

## Priority 6 — Sources Catalog (→ `data/sources.json`)

Build this *as you go.* Every fact you cite should have a source on this list.

| Source | URL | What it provided | Date accessed |
|---|---|---|---|
| The Employment Survey in Oil Palm Plantations, Malaysia 2018 (DOSM / MPIC / ILO) | [PDF](https://www.kpk.gov.my/kpk/images/mpi_penerbitan/kajian-menyeluruh-buruh-malaysia-2018/flipbook.pdf) | Child labor stats on Malaysian palm oil plantations (33,600 children 5–17, nearly half 5–11) | 2026-05-03 |
| Ferrero completes acquisition of Kellogg's cookie businesses (Baking Business) | [Article, Jul 2019](https://www.bakingbusiness.com/articles/49020-ferrero-completes-acquisition-of-kelloggs-cookie-businesses) | Confirms Ferrero owns Little Brownie Bakers since July 2019 ($1.3B deal) | 2026-05-03 |
| Hearthside Foods to Acquire Baking Division Assets of Weston Foods (BusinessWire) | [Press release, Nov 2021](https://www.businesswire.com/news/home/20211115005955/en/Hearthside-Foods-to-Acquire-Baking-Division-Assets-of-Weston-Foods) | Confirms Hearthside Food Solutions (U.S.) acquired Interbake Foods / ABC Bakers from Weston Foods in 2021 | 2026-05-03 |
| A Girl Scout calls out link to palm oil industry and child labor in Girl Scout cookies (CBS News) | [Article, Dec 2020](https://www.cbsnews.com/news/girl-scout-cookies-palm-oil-industry-child-labor/) | Confirms Olivia Chaffin was 14 at time of petition (Dec 2020), Jonesborough TN, sold 600+ boxes | 2026-05-03 |
| Girl Scout Cookies and Palm Oil — Product FAQ (GSUSA / Girl Scouts of Northern California) | [PDF, Feb 2023](https://www.gsnorcal.org/content/dam/gsnorcal-redesign/documents/product-program/cookie/palm-oil-faqs.pdf) | Confirms Girl Scout cookies use RSPO Mass Balance certified palm oil with the green-tree RSPO logo on packaging | 2026-05-03 |
| New Exploremores Girl Scout Sandwich Cookie Joins Nationwide Lineup for 2026 Season (girlscouts.org) | [Press release, Sept 2025](https://www.girlscouts.org/en/footer/press-room/2025-press-announcements/new-explormores-girl-scout-cookie.html) | Official announcement of Exploremores debut for 2026 season — rocky-road-inspired sandwich cookie | 2026-05-03 |
| Girl Scout Cookie sales: Lessons from the Thin Mint trenches (NPR) | [Article, Feb 2024](https://www.npr.org/2024/02/29/1234163657/girl-scout-cookies-thin-mints-how-it-works) | Confirms ~200M boxes sold per Girl Scout cookie season ($1.2-1.4B total revenue) | 2026-05-03 |
| Freight from Indonesia to Long Beach Sea Port 2025 Guide (FreightAmigo) | [Guide](https://www.freightamigo.com/en/blog/logistics/the-comprehensive-guide-to-freight-from-indonesia-to-long-beach-sea-port/) | Indonesia → Long Beach: ~8,300 nautical miles (~9,500 statute miles) by cargo ship, ~27 days transit | 2026-05-03 |
| United States to Ghana shipping (Fluent Cargo) | [Guide](https://www.fluentcargo.com/routes/united-states/ghana) | West Africa (Tema, Ghana) → Savannah, US East Coast: ~5,690 nautical miles (~6,500 statute miles) by cargo ship, ~18 days | 2026-05-03 |
| Environmental management of confectionery products: Life cycle impacts (ScienceDirect) | [Paper](https://www.sciencedirect.com/science/article/pii/S0959652617330081) | Chocolate-coated biscuit LCA: **1.81 kg CO₂eq/kg of product**. Raw material production accounts for 41–61% of total emissions. Raw materials + manufacturing combined account for 77–97% of total chocolate product impact. | 2026-05-03 |
| Our Councils (Little Brownie Bakers) | [Page](https://www.littlebrowniebakers.com/our-story/our-council) | Authoritative list of all ~60 Girl Scout councils that contract with Little Brownie Bakers, organized by state | 2026-05-03 |
| List of councils (Girl Scouts of the USA) (Wikipedia) | [Article](https://en.wikipedia.org/wiki/List_of_councils_(Girl_Scouts_of_the_USA)) | Comprehensive list of all 112 GSUSA councils with state coverage; used to derive ABC Bakers council list by subtraction | 2026-05-03 |

**Already-known sources to include:**
- Open Supply Hub (opensupplyhub.org)
- Freightos Emissions Calculator
- EcoTransIT World (ecotransit.org)
- EPA Supply Chain Guidance
- RSPO Records (rspo.org)
- World Cocoa Foundation
- ABC Bakers / Little Brownie Bakers official sites
- GSUSA official site
- New York Times (Olivia Chaffin coverage)
- Malaysian government report (need exact citation — see Priority 1)

---

## Where to keep notes while researching

- **For numerical data** (council mapping, supply chain steps): Google Sheets, then we'll export to JSON later.
- **For narrative findings** (a quote from a report, a paragraph from a news article): paste into this file under the relevant section.
- **For sources**: always grab the URL, the title, and the date you accessed it. The panel will ask.
