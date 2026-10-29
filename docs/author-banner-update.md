# Supplied author banner — Games landing

Replaced the Games Overview portrait-forthcoming composition with the user-supplied author banner. The original 715×1671 PNG is copied byte-for-byte to `assets/ui/identity/authorbanner.png`; no image editing, regeneration, cropping or stretching.

`config.overview.authorBanner` owns the path, descriptive alt text and intrinsic dimensions. The image preserves the full composition and embedded name/role labels using contain fitting over black. Desktop keeps the established identity rail geometry. Tablet/mobile stack the banner beneath the editorial content at its native ratio, capped to 420px wide. The old forthcoming labels disappear when the banner is configured; the previous fallback still exists if it is removed.

The minimal root Games/Books branch selector and separate About portrait configuration remain unchanged. Project/role/case data, media, routes and controllers are unchanged.

## Verification

- Supplied file and repository copy SHA-256 match: `f2bb95e043671ed58f4fafa5250c5daa68bdce320a140651af4be3bce1457a50`.
- `node tests/verify.mjs` passed (31 valid routes, data/media checks, shared UI, Projects and Roles checks).
- Updated `tests/overview-browser.html` passed at 1434, 1920, 768, 390 and 320px. It verifies banner decode/native dimensions, contain fitting, no obsolete portrait placeholder, native responsive aspect, no horizontal overflow, desktop no-scroll, carousel and role links. The media assertion now measures the visible slide instead of assuming the first DOM slide is visible.
- Full `tests/qa.html` production regression passed, including all 29 canonical routes, responsive widths, project playback/gallery, CV, navigation and Back/Forward.
- `git diff --check` passed (line-ending notices only).
- Existing authored assets, real media, references, documentation, router/shell and Projects/Roles styles match the prior working tree.

Remaining content placeholders elsewhere are unchanged. No missing asset remains for this landing banner. A separate standalone About portrait is still unconfigured.

Suggested commit: `Add supplied author banner to Games landing`.

## Delivery

The complete repository ZIP is verified by CRC, exact root-relative inventory and every file SHA-256 against the final unchanged working tree. It excludes `.git`, caches, temporary/Codex files, prior ZIPs, bundles and patches. Extract directly over `F:\Git\santiagoperezlosanovscky`; existing `.git` remains untouched. No push or commit attempted.

## Exact files created

- `assets/ui/identity/authorbanner.png`
- `docs/author-banner-update.md`

## Exact files modified

- `ASSET_ARTWORK_NEEDED.md`
- `ASSET_MANIFEST.md`
- `UI_COMPONENT_STATUS.md`
- `src/data.js`
- `src/pages.js`
- `styles/overview.css`
- `tests/overview-browser.html`

Files deleted: none.
