# Roles layout iteration 07

Follow-up repair: desktop right-hand panels now split their column evenly, independently of the compact My Approach panel above the left carousel. Selected Experience is no longer squeezed into the short top row. The practice image width, modal behavior and content assignments remain unchanged. The dedicated Roles responsive suite was rerun after this CSS correction; the full portfolio regression below refers to the preceding iteration.

The latest user direction overrides the earlier inline Roles overview-video composition. Watch overview now opens the shared media player inside a native dialog over the content page. There is no inline preview. Close, Escape and clicking outside the dialog dismiss it; focus returns to Watch overview. Closing pauses native playback and resets the media slot, removing any embedded player. The native dialog provides focus containment and an inert background.

Role card icon and title boxes are rectangular, flush and equal height; the existing italic display typography remains. All six roles use the shared rendering path.

Entry pages move My Approach and its content to the top-left, and Role & Experience and its summary to the larger lower-right panel. Selected Experience remains top-right; In Practice remains bottom-left. On mobile the source order is My Approach, Selected Experience, In Practice, Role & Experience, then the featured case.

Practice media fills the panel body width instead of retaining the old viewport-height width limit. The desktop practice column is capped at 480px so full-width 16:9 media, captions and indices fit the single-screen composition; remaining width goes to the summary column. The index and caption share a wrapping footer, and active indices reveal themselves locally without scrolling the page.

## Verification

- `node tests/verify.mjs`: passed, including 31 configured routes, dynamic cases, data/media and shell ownership checks.
- `tests/roles-browser.html`: passed at 1434, 1920, 768, 390 and 320px, covering all six entries, aligned headers, full-width practice, swapped panels, modal playback/reset/focus, and configured media/case fixtures. Desktop checks include no vertical scrolling and media/caption containment.
- Native browser interaction: Escape and backdrop dismissal close the dialog and restore Watch overview focus.
- `git diff --check`: passed (existing line-ending normalization warnings only).
- Full portfolio browser regression results are recorded in `tests/browser-results.json`.

The shared QA ratio check skips hidden media in the closed dialog. Configured reel/practice examples used by checks are test-only fixtures. Production reel, practice evidence and unsupplied role copy remain forthcoming. Existing Case Studies Coming soon! styling and open development routes are preserved; the release access lock remains deferred.

No assets, data, references, shell geometry, routing, author banner or project implementation were changed by this iteration. No commit or push was attempted.

Suggested commit: `Refine Roles layout and move overview video into modal`

## Exact iteration inventory

Modified:

- `README.md`
- `UI_COMPONENT_STATUS.md`
- `src/pages.js`
- `src/role-ui.js`
- `styles/roles.css`
- `tests/qa.js`
- `tests/roles-browser-results.json`
- `tests/roles-browser.html`

Created:

- `docs/roles-iteration-07.md`

All other files match the pre-iteration SHA-256 baseline, including assets, media, references, documentation, data, routing and shell files.
