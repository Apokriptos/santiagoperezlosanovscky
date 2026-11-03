# Complete professional trajectory — Pass 17

The authoritative `profileContent.about.trajectory` array now contains the exact eight requested experiences, in the supplied order:

1. AOBSCURA GAMES — Creative Director — Nov 2021–Present
2. IMAGE CAMPUS — Professor — Game Design — Apr 2022–Present
3. ACONCAGUA GAMES — Product Owner / Lead Game Designer — May 2022–Sep 2024
4. PIXOWL — MATCH ISLAND — Game Designer / Level Designer — Sep 2020–Jan 2022
5. VR HEALTH — Lead Game Designer — Oct 2020–Jun 2021
6. INDEPENDENT GAME STUDIO — Lead Game Designer / Producer — Jan 2019–Sep 2020
7. COTO CICSA — Game Designer — Apr 2019–Nov 2019
8. INDEPENDENT AUTHOR — Author & Writer — 2009–Present

All eight descriptions use the supplied wording. Overlapping dates are retained. Pixowl and VR Health have separate cards. No portfolio projects are added as career entries.

## Implementation

`src/profile-content.js` remains the sole authoritative content source and initializes `config.about`. Entries now keep the employer/context in `title`, the appointment in optional `role`, and the exact `date` and `body` values separately. `src/about-ui.js` displays the role in the existing card heading and remains compatible with records that omit it. Neither renderer nor controller imposes an entry-count limit.

The approved cards, fonts, date styling, padding, buttons, snap behavior and 180ms keyboard/button motion remain. Wide desktop still shows three cards; medium desktop shows two, and phones one. The only fit adjustment in `styles/about.css` reallocates approximately 19px from the profile band to the trajectory band at desktop heights up to 740px, avoiding clipped text at 1280×720. All cards keep identical dimensions within each viewport. No font shrinkage, hidden text or internal vertical scrolling was added. Unrelated screens and assets are unchanged.

## Verification

- `node tests/verify.mjs`: passed, including exact employer/role/date ordering, project exclusion, escaped labels and an extensibility fixture with eleven entries.
- `tests/about-browser.html`: all six required desktop sizes passed: 1280×720, 1366×768, 1440×900, 1600×900, 1920×1080 and 2560×1440. All eight cards are reachable at every size, and Independent Author is fully visible at the final position. Arrows, every position indicator, Left/Right/Home/End keys, boundary states, visible focus, reduced motion and portrait decoding passed. No page-level vertical overflow or clipped career text on the supported desktops.
- Additional tablet/phone sizes passed horizontal containment and all-eight reachability: 768×1024, 390×844 and 320×720.
- Native keyboard End was also used to visually review the final three-card position. Detailed measurements are in `tests/about-browser-results.json`.

No trajectory placeholders remain. Other existing site placeholders are unchanged.

## Delivery

The complete repository working tree is delivered in a ZIP with repository files directly at its root. Git metadata, caches, temporary files, prior delivery archives and transfer artifacts are excluded. Packaging verifies CRC, inventory and every file's SHA-256 against the unchanged final working tree. Extract over `F:\Git\santiagoperezlosanovscky`; the existing `.git` directory remains untouched.

Suggested commit: `Complete About Me professional trajectory`
