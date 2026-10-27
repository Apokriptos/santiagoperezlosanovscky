# Games visual calibration — Overview review baseline

This is a calibration pass, not a final visual system. Review Overview before applying its detailed card/media treatment to other screens. Other Games screens receive only the shared rail, paper, focus, and heading treatment. Books and the root selector retain the foundation styling.

## Changes and boundaries

`styles/games-visual.css` owns Games-only cream/ink/red tokens, condensed system-font hierarchy, editorial rules, paper backgrounds, supplied rail art, selected-state ribbon, mobile header/select colors, and focus treatments. `styles/overview.css` owns only the internal Overview composition, role cards, featured project presentation/controls, and portrait placeholder. Both are loaded after foundation CSS in `index.html`.

`src/pages.js` changes only Overview markup and adds the Overview page class. Its header/intro, Roles, and Projects remain in the editorial column, alongside the tall identity area inside MainContent. `src/data.js` adds `config.overview.featuredRoleIds`: a curated selection referencing the existing `Roles[]`, with no duplicated role definitions. The five-role taxonomy remains intact. `Projects[]` still feeds the existing carousel, which supports new records without renderer changes.

The router, component interaction code, app navigation, shared shell module, `styles/shell.css`, and other screen templates are unchanged. No breakpoint architecture changes were made; the existing 1000px shell/menu transition and 700px content stacking are retained.

## Asset inspection and use

All supplied assets were inspected. Dimensions below are intrinsic pixel sizes; sources are used directly, without editing their pixels or baking text into them.

| Supplied file | Dimensions | Decision |
| --- | --- | --- |
| `left_tab_asset 1.png` | 265 × 922 | Background of the existing left rail; real HTML identity/navigation remains above it. |
| `right_tab_asset 1.png` | 148 × 921 | Background of the existing contextual rail, with a dark overlay for readable index labels. |
| `tabbutton 1.png` | 2172 × 724 | Pseudo-element behind the active HTML navigation label. Brightness is reduced to retain cream-text contrast; transparent margins remain part of the source. |
| `bg_1424x913.png` | **1434 × 913** | Main Games paper field. The filename differs from its actual width. Aspect-preserving cover plus a translucent central wash keeps body copy readable. |
| `bg_1629x917.png` | 1629 × 917 | Wider paper variant at desktop widths of 1600px and above. |
| `boxcontainer_A.png` | 1448 × 1086 | Reserved: its large ornate panel would crowd the compact Overview role summaries. Plain editorial borders are used for those summaries. No generic illustrated container system is propagated before review. |
| `buildcontainer_A.png` | 1484 × 1060 | Reserved for a later build-panel pass; no build panel exists on Overview. |
| `videocarousel_A.png` | 1446 × 667 | Deliberately unused: painted arrows and five pagination squares would duplicate live controls and imply a fixed count. |
| `image 62.png`, `image 63.png` | 1629 × 917; 1434 × 913 | Legacy duplicates of the named background variants; named files are used instead. |
| `image 76.png` | 1446 × 667 | Legacy duplicate of the baked carousel frame; unused for the same reason. |
| `image 77.png`, `image 78.png` | 1484 × 1060; 1448 × 1086 | Legacy duplicates of the build/container candidates; reserved with their named equivalents. |

No files in `references/` are loaded as runtime UI. `references/OVERVIEW.png` guided the internal hierarchy, three-role presentation, editorial/project relationship, and vertical portrait zone. Its older outer rail proportions, taxonomy, sample claims, and baked imagery are not reproduced. The explicit new cream/black/red brief and supplied production assets guide the aesthetic.

## Geometry and responsive behavior

The approved variables and grid definitions remain solely in `styles/shell.css`. At an actual 1434 × 913 iframe viewport, Overview measures **251 / 1183**, without a contextual rail. Contextual pages still measure **251 / 1049 / 134**. The Overview grid operates only inside the 1183px content rectangle. It does not participate in shell column ownership.

Desktop keeps the portrait as a strong right-side vertical area. At narrower desktop/tablet widths, role summaries and featured project content stack within the editorial column. Below 700px, the portrait follows the editorial sections. The 1000px menu and contextual select remain accessible; no fixed desktop rail consumes mobile content width. On long mobile pages the paper artwork remains at an aspect-preserving fixed height and fades into the cream base, avoiding stretched texture and repeated seams.

## Verification

- `npm test`: route coverage, invalid-route behavior, arbitrary case-step count, data-driven Overview role/project rendering, and CSS ownership checks.
- `/tests/qa.html`: Overview role/project route transitions, carousel previous/next/pagination/keyboard, absence of a right rail, canonical dimensions, and the existing cross-route functional suite.
- 23 Games routes checked at 1434 × 913 and widths 390/768/1000/1200/1920, with no document or main-content horizontal overflow.
- `git diff origin/main -- styles/shell.css src/shell.js src/router.js src/components.js src/app.js` is empty.
- `/tests/preview.html` defaults to Overview at 1434 × 913. Use `?viewport=mobile` or `?viewport=tablet` for review, and optional `#games/projects` to inspect shared contextual-rail styling.

## Remaining placeholders

No standalone production portrait or project media was supplied. The tall dark identity zone is explicitly labeled as forthcoming, uses the configured name as live text, and is replaced by `config.portrait` when supplied. Project images, final introduction, real project facts, CV/contact fields, and other foundation placeholders remain unchanged. No artwork, achievements, personal history, or statistics were invented.
