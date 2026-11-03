# Global polish, professional content and Roles card redesign

This delivery includes all three requested scopes, as confirmed in chat: global interface polish/responsive fit, the supplied professional-profile content, and the six-card Roles Overview redesign. Cream background and neutral shared artwork stay active. No raster/vector assets were generated or modified. No Git push, authentication attempt or commit was made.

## Files

Created:

- `src/profile-content.js`
- `styles/global-polish.css`
- `tests/profile.mjs`
- `tests/global-fit.html`
- `tests/global-fit-results.json`
- `docs/global-polish-13.md`
- Unchanged copies of this pass's supplied references: `references/Designed/SCREEN_GLOBAL_POLISH_IMPLEMENTATION.txt`, `PROFILE_CONTENT_ADDENDUM.txt`, `SCREEN_ROLES_CARDS_IMPLEMENTATION.txt`, and `Roles_Overview_RoleCards.png`.

Modified:

- `src/data.js`, `src/role-ui.js`
- `styles/ui-tokens.css`
- `index.html`, `tests/stress.html`
- `tests/verify.mjs`, `tests/roles.mjs`
- `tests/roles-browser.html`, `tests/projects-browser.html`, `tests/qa.js`
- `README.md`, `UI_COMPONENT_STATUS.md`

Browser result files are refreshed: `tests/browser-results.json`, `tests/roles-browser-results.json`, `tests/projects-browser-results.json`.

## Professional content

`src/profile-content.js` is the editable source of the supplied About biography, focus, current work, five trajectory entries, twelve skills, location and language; Roles Overview intro and summaries; six Role Detail positioning statements, summaries, selected experience and approaches. It exports the data and an import-free initializer. `src/data.js` imports and applies it exactly once after stable records are created. There is no circular import or duplicated page markup. Titles and route IDs remain unchanged.

The supplied professional prose is retained. Attachment instructions such as “Use Hollow Graves…” and “Do not fabricate…” are treated as implementation guidance, not page copy. Hollow Graves/Investigation is linked for Technical Game Design and Level Design; Reditus/Combat is linked for Gameplay Development. The other roles have no invented featured case. The existing renderer supports a case hook, not a separate Featured Experience record; its honest pending strip remains for those roles rather than inventing a dedicated case or adding a parallel content system.

The About portrait, role reel, real practice evidence/captions and case analysis remain forthcoming. Other unsupplied Overview/project/contact copy remains as before. Cases stay grey/Coming soon with development routes open; the separate release access lock is still deferred.

## Role identities and structure

Each role defines `accentColor` once in the profile module. The shared renderer validates the hex value and exposes it as `--role-accent` on its identity slab. This metadata can be reused on Role Detail later without duplicating role definitions.

| Role | Final accent |
|---|---|
| Technical Game Design | `#3F78A8` |
| Level Design | `#A77B23` |
| Gameplay Development | `#C45D36` |
| Creative Leadership | `#76558E` |
| Technical Animation | `#3D8F91` |
| Product Ownership | `#71824B` |

Level Design's proposed ochre was darkened to keep the cream SVG above 3:1 contrast. All six icon/slab combinations pass the contrast check. The written palette governs identity rather than the mockup's differing hue assignments.

The card body is an 18% identity column plus a flexible content column inside the existing sharp cream/black/red surface. The slab spans the interior height, with restrained CSS diagonal screenprint bands. Canonical SVG masks remain unchanged, square, cream and centered, sized to 80% of slab width with a 70px desktop cap and 60px narrow-screen cap. They are not rasterized.

Black angular title plates support multiline text and retain red structural edges. Display sizes respond between roughly 21–29px, with 21px laptop titles. Descriptions increase from 13px to 15px, using 14px at short laptop heights, with sensible leading and the supplied final summaries. The lower-right CTA fits its uppercase label and red arrow housing, remains at least 44px high, and no longer consumes a full-width footer. Its natural minimum width takes more than 40% of the content column on narrow cards to preserve legibility and a usable arrow target.

Hover/focus lifts the card 2px and strengthens physical depth. The slab keeps its identity color; the CTA becomes action red. Focus retains visible red outlines. No card reflow, scaling, new icons or global theme changes were introduced. The header, Watch Overview popup, MY ROLES section, 3×2 desktop board, role order and right rail remain.

## Shared polish

- Added `--ui-media-radius:11px` and `--ui-shadow-ambient:0 2px 5px #19191826` to shared tokens. Existing palette, duration/easing, hard shadows, lift/pressed and red underslab tokens are reused.
- Inner media windows/images are subtly rounded and clipped; outer tactile surfaces, plates, buttons and rails stay angular. Source media keeps its aspect ratio and contain/cover behavior.
- Major Games surfaces combine the existing compact hard shadow with a low-opacity ambient shadow; print panels use the same tokens. No continuous filter animation or large blur is used.
- Neutral controls hover/focus red with cream content; primary controls hover/focus dark red; enabled controls press black with collapsed shadow. Coming soon/disabled states remain grey.
- Arrow icons nudge 3px in their direction on hover/focus, returning when interaction leaves. Index tabs retain persistent red selected state with a stronger inset marker and use black pressed feedback.
- Inactive left-nav entries receive restrained red hover/focus emphasis and a 2px pointer response. Right-rail labels/nodes brighten with a subtle red edge. Current navigation remains strongest.
- Rails receive small inward-facing hard/ambient edge shadows. They do not float away from the content plane.
- Projects Overview retains its central shade, bright active card, warm contour glow, small lift, keyboard priority and pointer-input pass-through. No new Project focus controller or mouse tracking was added.
- Fine-pointer hover is gated where introduced. Keyboard focus gets color/outline equivalents on all devices. Reduced motion removes lifts/nudges/transitions while retaining color and selection hierarchy. No wiggle or looping animation is introduced.

## Responsive fit

The Games desktop composition uses real component geometry at widths above 1000px and heights of at least 700px. Shared density variables adjust page padding/gaps; headers, panels, media caps, typography and existing grid fractions respond to available height. Canonical 1434×913 rail widths remain 251px and 134px; smaller laptops use constrained responsive rail widths. This is explicitly allowed by the global pass and avoids shrinking the content into unreadable columns.

The populated four-panel Role Detail layout keeps the previous panel assignment: Approach and Practice left, Selected Experience and Role & Experience right, featured strip below. Rows and media limits now accommodate real copy. About keeps biography/focus/current work above its trajectory/facts bands; the skills list wraps naturally instead of forcing long skill names into narrow cells. No supplied text is line-clamped, ellipsized or removed.

There is no page scaling or hidden-overflow trick in production. The preview harness alone can scale an actual iframe for screenshots. Normal document flow remains below the desktop width/height range for accessibility. The CV document's own scroll and horizontal navigation for arbitrary chapter counts are intentional content behavior, not vertical UI-fit workarounds.

## Validation

All 29 configured Games routes were checked at each required resolution: 174 route/viewport cases. The harness tests document/main scroll dimensions, essential element bounds, panel containment, About-band overlap and the 3-column Roles board. It does not hide overflow to pass.

| Viewport | Routes | Page overflow / clipped essential content |
|---|---:|---|
| 1280×720 | 29 | PASS |
| 1366×768 | 29 | PASS |
| 1440×900 | 29 | PASS |
| 1600×900 | 29 | PASS |
| 1920×1080 | 29 | PASS |
| 2560×1440 | 29 | PASS |

Results: `tests/global-fit-results.json`. No supported desktop/laptop route requires page-level scrolling.

Additional checks:

- `node tests/verify.mjs`: route/data/media contracts, single profile initialization, supplied content, stable identities, six accents, icon contrast, no circular import and no invented practice evidence.
- `tests/qa.html`: full portfolio navigation/history, canonical geometry, responsive widths 320–1920px, galleries, video decode, arbitrary cases/chapters, active horizontal chapter reveal, mobile controls, CV/contact/root states and stress fixtures.
- `tests/roles-browser.html`: five responsive widths, six role routes, canonical icon/slab metadata, compact CTA focus color, modal playback/reset/focus, real-media-only counts and configured media/case fixtures.
- `tests/projects-browser.html`: six widths, original project lineup/links, focus hierarchy, no reflow, correct media ratios, new 11px inner radius, galleries, compact actions and arbitrary project paging.
- Native keyboard: Watch Overview opens its modal, Escape returns focus, Tab reaches the first role CTA, CTA is red while its slab remains blue. Review screenshots record the result.
- `git diff --check`: whitespace check. Existing repository line-ending normalization warnings are not errors.

Two old chapter-rail edge assertions allow a 1px subpixel tolerance, matching other geometry checks. Focus-color checks wait for the existing transition before sampling. Touch and reduced-motion gating were inspected in CSS; no physical touch-device or OS preference emulation is claimed.

## Delivery

The complete working-tree ZIP places repository files directly at its root and excludes `.git`, caches, temporary/Codex artifacts, prior delivery ZIPs and transfer bundles/patches. CRC, exact inventory and every file SHA-256 are verified against the final unchanged working tree.

Suggested commit: `Redesign role cards and polish profile content and responsive interface`
