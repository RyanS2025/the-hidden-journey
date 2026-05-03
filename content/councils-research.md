# Council-to-Bakery Mapping (Research Draft)

Initial mapping of all Girl Scout councils to their bakery (ABC Bakers in North Sioux City, SD or Little Brownie Bakers in Louisville, KY). Derived from:

- **Little Brownie Bakers "Our Councils"** page — direct, authoritative list of LBB councils, [littlebrowniebakers.com/our-story/our-council](https://www.littlebrowniebakers.com/our-story/our-council) (accessed 2026-05-03)
- **Wikipedia "List of councils (GSUSA)"** — comprehensive list of all 112 GSUSA councils, [wikipedia.org](https://en.wikipedia.org/wiki/List_of_councils_(Girl_Scouts_of_the_USA))
- ABC Bakers councils derived by subtraction (everything not on LBB's list)

⚠️ **Caveats:**
- Council assignments can change year-to-year. Example: **Girl Scouts of Utah switched to ABC Bakers** starting with the 2024 cookie season. Always verify against the current season.
- The "HQ city" column is **not yet filled in** — needed for shipping distance calculations in the council calculator. That's a follow-up research task.
- A handful of councils ABC-vs-LBB might need spot-checking by visiting their individual council websites (look at the cookie names sold — Caramel deLites + Peanut Butter Patties = ABC; Samoas + Tagalongs = LBB).

---

## Little Brownie Bakers (LBB) — Louisville, KY (~60 councils)

| Council Name | State(s) Covered |
|---|---|
| Girl Scouts of North-Central Alabama | AL |
| Girl Scouts of Southern Alabama | AL |
| Girl Scouts of Alaska | AK |
| Girl Scouts of Farthest North | AK |
| Girl Scouts of Arizona Cactus Pine | AZ |
| Girl Scouts of Southern Arizona | AZ |
| Girl Scouts Heart of the South | AR, MS, TN |
| Girl Scouts Diamonds of Arkansas, Oklahoma, and Texas | AR, OK, TX |
| Girl Scouts of Greater Los Angeles | CA |
| Girl Scouts of Colorado | CO |
| Girl Scouts of Connecticut | CT |
| Girl Scouts of the Chesapeake Bay | DE, MD |
| Girl Scouts of Nation's Capital | DC, MD, VA |
| Girl Scouts of Tropical Florida | FL |
| Girl Scouts of West Central Florida | FL |
| Girl Scouts of Southeast Florida | FL |
| Girl Scouts of Gulfcoast Florida | FL |
| Girl Scouts of Greater Atlanta | GA |
| Girl Scouts of Historic Georgia | GA |
| Girl Scouts of the Southern Appalachians | GA, NC, TN, VA |
| Girl Scouts of Hawai'i | HI |
| Girl Scouts of Eastern Washington and Northern Idaho | ID, WA |
| Girl Scouts of Greater Chicago and Northwest Indiana | IL, IN |
| Girl Scouts of Northern Illinois | IL |
| Girl Scouts Southern Illinois | IL |
| Girl Scouts of Eastern Iowa and Western Illinois | IA, IL |
| Girl Scouts of Central Indiana | IN |
| Girl Scouts of Kentuckiana | KY, IN |
| Girl Scouts of Central & Western Massachusetts | MA |
| Girl Scouts Heart of Michigan | MI |
| Girl Scouts of Southeastern Michigan | MI |
| Girl Scouts of Dakota Horizons | MN, ND, SD |
| Girl Scouts of Greater Mississippi | MS |
| Girl Scouts of Eastern Missouri | MO |
| Girl Scouts of the Green and White Mountains | NH, VT |
| Girl Scouts of the Jersey Shore | NJ |
| Girl Scouts of Northern New Jersey | NJ |
| Girl Scouts Overseas (USAGSO) | International |
| Girl Scouts of NYPENN Pathways | NY, PA |
| Girl Scouts of Northeastern New York | NY |
| Girl Scouts of Suffolk County | NY |
| Girl Scouts of Nassau County | NY |
| Girl Scouts Heart of the Hudson | NY |
| Girl Scouts of Greater New York | NY |
| Girl Scouts Hornets' Nest | NC |
| Girl Scouts of Ohio's Heartland | OH |
| Girl Scouts of North East Ohio | OH |
| Girl Scouts of Western Oklahoma | OK |
| Girl Scouts of Eastern Oklahoma | OK |
| Girl Scouts Western Pennsylvania | PA |
| Girl Scouts of South Carolina – Mountains to Midlands | SC |
| Girl Scouts of Middle Tennessee | TN |
| Girl Scouts of Northeast Texas | TX |
| Girl Scouts of Southwest Texas | TX |
| Girl Scouts of the Colonial Coast | VA |
| Girl Scouts of Virginia Skyline | VA |
| Girl Scouts of Western Washington | WA |
| Girl Scouts of Black Diamond | WV |
| Girl Scouts of Manitou | WI |
| Girl Scouts of Caribe | Puerto Rico |

---

## ABC Bakers — North Sioux City, SD (~52 councils)

| Council Name | State(s) Covered |
|---|---|
| Girl Scouts of California's Central Coast | CA |
| Girl Scouts Carolinas Peaks to Piedmont | NC |
| Girl Scouts of Central & Southern New Jersey | NJ |
| Girl Scouts of Central California South | CA |
| Girl Scouts of Central Illinois | IL |
| Girl Scouts of Central Maryland | MD |
| Girl Scouts of Central Texas | TX |
| Girl Scouts of Citrus | FL |
| Girl Scouts of the Commonwealth | VA |
| Girl Scouts of the Desert Southwest | NM, TX |
| Girl Scouts of Eastern Massachusetts | MA |
| Girl Scouts of Eastern Pennsylvania | PA |
| Girl Scouts of Eastern South Carolina | SC |
| Girl Scouts of Gateway Council | FL |
| Girl Scouts of Greater Iowa | IA |
| Girl Scouts of Greater South Texas | TX |
| Girl Scouts Heart of Central California | CA |
| Girl Scouts Heart of New Jersey | NJ |
| Girl Scouts in the Heart of Pennsylvania | PA |
| Girl Scouts of Kansas Heartland | KS |
| Girl Scouts of Kentucky's Wilderness Road | KY |
| Girl Scouts Lakes and Pines | MN |
| Girl Scouts of Louisiana East | LA |
| Girl Scouts Louisiana – Pines to the Gulf | LA |
| Girl Scouts of Maine | ME |
| Girl Scouts of Michigan Shore to Shore | MI |
| Girl Scouts of Missouri Heartland | MO |
| Girl Scouts of Montana and Wyoming | MT, WY |
| Girl Scouts of NE Kansas and NW Missouri | KS, MO |
| Girl Scouts of New Mexico Trails | NM |
| Girl Scouts North Carolina Coastal Pines | NC |
| Girl Scouts of Northern California | CA |
| Girl Scouts of Northern Indiana-Michiana | IN |
| Girl Scouts of the Northwestern Great Lakes | WI |
| Girl Scouts of Orange County | CA |
| Girl Scouts of Oregon and Southwest Washington | OR, WA |
| Girl Scouts River Valleys | MN |
| Girl Scouts San Diego | CA |
| Girl Scouts of San Gorgonio | CA |
| Girl Scouts of San Jacinto Council | TX |
| Girl Scouts Sierra Nevada | NV |
| Girl Scouts Silver Sage | ID |
| Girl Scouts of Southeastern New England | RI |
| Girl Scouts of Southern Nevada | NV |
| Girl Scouts of Southwest Indiana | IN |
| Girl Scouts of Spirit of Nebraska | NE |
| Girl Scouts of Texas Oklahoma Plains | TX |
| Girl Scouts of Utah | UT *(switched from LBB to ABC in 2024 season)* |
| Girl Scouts of Western New York | NY |
| Girl Scouts of Western Ohio | OH |
| Girl Scouts of Wisconsin Badgerland | WI |
| Girl Scouts of Wisconsin Southeast Council | WI |

---

## Next research step: HQ cities + shipping distances

For the council calculator (PRD §4.3), each council needs:
- HQ city (or representative city)
- Approximate driving/freight distance from that city to the council's bakery (Louisville, KY for LBB or North Sioux City, SD for ABC)

This gets us the variable "domestic shipping leg" that makes the calculator interesting. The overseas leg (palm oil from Indonesia, cocoa from West Africa) is the same regardless of council.

For the JSON format (`data/councils.json`), each entry will look something like:

```json
{
  "name": "Girl Scouts of Greater Los Angeles",
  "states": ["CA"],
  "bakery": "LBB",
  "hq_city": "Los Angeles, CA",
  "distance_to_bakery_mi": 2100
}
```

Distance can be calculated via Google Maps / Mapbox once Ryan's API is wired up — Mia just needs the HQ city for each council.
