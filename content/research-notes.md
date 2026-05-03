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

**[Council mapping draft is in `content/councils-research.md`](councils-research.md).** All 112 GSUSA councils are mapped to either ABC Bakers (North Sioux City, SD) or Little Brownie Bakers (Louisville, KY), with draft HQ cities included.

**Status:**
- [x] Bakery assignment for all 112 councils — drafted (LBB direct from littlebrowniebakers.com, ABC by subtraction)
- [x] Draft HQ city for each council — included with confidence labels (✓ confident, ~ likely, ? verify)
- [x] **Top 10 verifications complete** (2026-05-03) — all 10 confirmed via individual council websites; **one correction**: "Lakes and Pines" is actually "Girl Scouts of Minnesota and Wisconsin Lakes and Pines" with HQ in Waite Park MN (not Duluth), and covers WI in addition to MN. See full address table in `councils-research.md`.
- [ ] Distance from each council HQ to its bakery — to be calculated by Ryan via Google Maps API at build time (no manual research needed)

**Spot-checking shortcut:** Visit any council's website and check the cookie names they list. "Caramel deLites" + "Peanut Butter Patties" = ABC. "Samoas" + "Tagalongs" = LBB.

---

## Priority 3 — Thin Mint Full Supply Chain (→ `data/cookies/thin-mint.json`)

The flagship cookie. Goes deepest of all 9.

### Box weight
- [x] **9 oz / ~255 g** per box (confirmed across multiple sources)

### Ingredients
For each: source country, RSPO/certification status, processing location, shipping route to bakery, cargo mode, confidence level.

- [x] **Palm oil** — Indonesia/Malaysia. RSPO Mass Balance certification.
  - **ABC Bakers**: 2015–2020 used RSPO Credits; **2021 upgraded to Mass Balance**; **2022 selling season onward = 100% RSPO Mass Balance**. Future goal: 100% RSPO Segregated.
  - **Little Brownie Bakers (Ferrero)**: also Mass Balance for Girl Scout cookies. Parent Ferrero overall sources 96.2% RSPO Segregated, 97% traceable to plantation, ranked #2 of 285 in 2024 WWF Palm Oil Buyers Scorecard.
  - US landing port: typically Long Beach, CA (Pacific crossing from Indonesia ~9,500 statute mi, ~27 days).
- [x] **Cocoa** — Ivory Coast & Ghana (~70% world supply). ABC Bakers states it sources from **World Cocoa Foundation members**. Specific corporate supplier not publicly disclosed; industry leaders are Barry Callebaut and Cargill. Atlantic crossing to US East Coast (~6,500 statute mi).
- [x] **Sugar** — From **sugar beets** (confirmed via cookie ingredient label analysis). Top US sugar-beet states are Minnesota, North Dakota, Idaho, Michigan. ~95% of US sugar beets are genetically engineered.
- [x] **Peppermint oil** — Pacific Northwest. Top producers (2023):
  - **Idaho**: 1.13M lbs (~40% US output) ← #1 nationally
  - **Oregon**: 840K lbs (~30%)
  - **Washington**: 638K lbs (~23%)
  - Pacific NW = ~93% of all US peppermint oil.
- [x] **Wheat (flour)** — Cookies use bread flour = **Hard Red Winter wheat**, ~40% of US wheat production. Grown primarily in the Great Plains (Kansas #1, then Texas, Montana, North Dakota, Idaho). Some cookies may use blends with Hard Red Spring wheat (North Dakota dominant). Confidence: ~ (the bakery doesn't publish its specific wheat source).
- [x] **Soybean oil** — US Midwest. Top producer states 2024: **Illinois (#1, 688M bushels record year), Iowa, Indiana**, Minnesota, Ohio. ~80% of US soybean acreage is in the Midwest. Confidence: ~ (specific bakery source not published).
- [ ] **Cocoa butter, salt, leavening, natural flavor** — minor ingredients; pending. Cocoa butter is from cocoa beans (same source as cocoa).

### Manufacturing
- [x] **ABC Bakers** (North Sioux City, SD; division of Interbake Foods, Hearthside-owned): produces **100+ million boxes of Girl Scout cookies annually** at the SD facility. Multiple recent capital upgrades to expand capacity. Energy source: pending.
- [x] **Little Brownie Bakers** (Ferrero North America, Louisville, KY): the larger of the two bakeries; also has a facility in Richmond, VA. Per LBB's own published council list, they serve ~60 of 112 GSUSA councils (~54%) — note: a thomasnet article cites "~75%" but that appears outdated or refers to sales volume rather than council count.
- Combined: ~200M boxes per Girl Scout cookie season (verified, see Priority 1 sources).
- [ ] Energy/water/emissions per box at the bakery level — not publicly disclosed.

### Distribution legs
- [ ] Bakery → council distribution warehouse → local troop → customer (depends per council; council mapping in Priority 2 covers this).

### Carbon footprint
- Estimates from chocolate-coated biscuit LCA (1.81 kg CO₂eq/kg product × 0.255 kg/box) → ~0.46 kg CO₂ baseline per box.
- With significant overseas palm oil + cocoa, range likely **0.5–0.8 kg per box**.
- Per-step kg CO₂ — to be calculated by Carbon Interface or Climatiq API at build time once Ryan integrates.
- Mockup currently uses ~0.8 kg total / 0.85 kg for LA-routed boxes; flagged as estimated until API runs.

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
| ABC Bakers Cookie FAQs | [FAQ page](https://www.abcbakers.com/faqs/) | RSPO certification timeline: 2015–2020 RSPO Credits, 2021 upgrade to Mass Balance, 2022 selling season onward = 100% Mass Balance. Future goal: 100% Segregated. | 2026-05-03 |
| Source Palm Oil Sustainably (Ferrero Group) | [Page](https://www.ferrero.com/int/en/people-planet/source-our-ingredients-sustainably/palm-oil) | Ferrero (Little Brownie Bakers' parent) sources 96.2% RSPO Segregated palm oil overall, 97% traceable to plantation; ranked #2 of 285 in 2024 WWF Palm Oil Buyers Scorecard | 2026-05-03 |
| Pacific Northwest peppermint oil production (USDA / Capital Press 2024 article) | [Article](https://capitalpress.com/2024/01/30/usda-mint-production-drops-again/) | 2023 US peppermint oil production: Idaho 1.13M lbs (40%), Oregon 840K lbs (30%), Washington 638K lbs (23%); Pacific NW = ~93% of US peppermint oil | 2026-05-03 |
| Mint Farming in Washington (HistoryLink.org) | [Article](https://historylink.org/File/20562) | Pacific NW mint production: ~80% of US acreage, ~90% of US mint oil; mint counties in WA + ID detailed | 2026-05-03 |
| Wheat production in the United States (Wikipedia) | [Article](https://en.wikipedia.org/wiki/Wheat_production_in_the_United_States) | Hard Red Winter wheat (~40% US production, primary bread/cookie flour) grown in Great Plains: Kansas #1, plus Texas/Montana/North Dakota | 2026-05-03 |
| Soybeans and Oil Crops at a Glance (USDA ERS) | [Page](https://www.ers.usda.gov/topics/crops/soybeans-and-oil-crops/oil-crops-sector-at-a-glance) | 2024 top soybean states: Illinois (record 688M bushels), Iowa, Indiana; Midwest = ~80% of US soybean acreage | 2026-05-03 |
| Interbake Foods Upgrades Its North Sioux City Plant (Area Development) | [Article](https://www.areadevelopment.com/newsitems/11-13-2014/interbake-foods-production-facility-upgrade-north-sioux-city-south-dakota900135.shtml) | ABC Bakers / Interbake produces 100+ million boxes of Girl Scout cookies annually at North Sioux City, SD facility | 2026-05-03 |
| Girl Scout cookie shortage at Louisville bakery (NBC News, 2023) | [Article](https://www.nbcnews.com/news/us-news/girl-scout-cookie-shortage-blamed-delays-louisville-kentucky-manufactu-rcna74379) | Little Brownie Bakers Louisville KY facility; LBB is the larger of the two cookie bakeries | 2026-05-03 |

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
