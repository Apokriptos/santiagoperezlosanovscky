# Shared UI Foundation Pass 02

Completed 2026-10-29. This pass supplies reusable foundations. No complete approved screen revision is implemented. Local designed screens and supplied guides were readable; no reattachment is needed.

## Available foundations

Existing palette/type values now feed shared tokens for cream/black/red, borders, spacing, compact depth, underslabs and interaction states. Existing games variables alias the tokens. Opt-in renderers cover page/section titles, internal header plates, physical surfaces, neutral/secondary/red/compact buttons, arrow housings, carousel arrows, controlled numbered indices, contextual rails and landscape media frames.

Import renderers from `src/ui.js`; load `styles/ui-tokens.css` then `styles/ui-primitives.css` after shell CSS and before page CSS. Labels are escaped. Surface/media HTML slots accept trusted renderer output. Button links reject unsafe schemes; icon-only controls require labels. Disabled links have no href, and buttons use native disabled behavior. Focus, pressed/hover and reduced-motion rules are shared.

`src/ui-icons.js` is generated from the approved asset index by `scripts/build_ui_assets.py`. CSS masks load the original SVG files and inherit currentColor; no runtime SVG path duplication. Decorative icons are aria-hidden. Existing project glyphs and role holders use this lookup. All six approved role glyphs are available without adding a role route.

The contextual rail now has one renderer and shared marker/connector styles. Project, role and case-study semantic modifiers remain separate; caller data/controllers own routes and active state. Existing shell dimensions, rail artwork and legacy padding remain intact.

`mediaFrame()` provides an opaque cream physical frame and undistorted landscape viewport, passive by default, with optional independent controls. Existing production media uses plain compatibility mode. Carousel and index renderers do not install controllers or own playback/navigation state.

Inspect `docs/ui-foundation-preview.html` for isolated component examples. See `UI_COMPONENT_STATUS.md` for per-component status, sources and dependencies.

## Consolidation and boundaries

Removed the local inline project SVG path map. Consolidated duplicated contextual rail rules from games-visual/fidelity CSS, moved common media geometry into the shared frame and aliased existing palette values. Existing authored SVG/raster/media/reference files and application data/router hashes match the pre-pass snapshot. Legacy duplicate PNGs remain untouched. Screen-specific surface/button recipes remain scoped because collapsing them would perform the deferred screen implementations.

Existing routes, left navigation, responsive selector, media/gallery/video controls, build links and application data remain intact. No new artwork, evidence, portrait, project illustration or analytical claims were authored. No Git authentication, push, bundle, patch or implementation commit was attempted.

## Specification conflicts

- The six supplied screen contracts match the local F: references. `SCREEN_CASE_STUDIES_OVERVIEW_IMPLEMENTATION.txt` is referenced but absent; that future screen still needs its contract.
- New Roles contracts specify six roles; older AGENTS/current data specify five. Only the sixth approved icon is exposed now.
- Latest Project Detail TXT differs from the older thumbnail-gallery mockup/current layout. Preserve the working gallery until that screen pass, then follow the TXT.
- Latest Case Study Step TXT specifies one genuine evidence image, overriding the old three-image wireframe.
- Overview/role specifications vary in icon motifs and Design/Designer terminology. Reuse the approved icon family and canonical IDs rather than inventing duplicates.

Recommended next screen: Overview, only after explicit request. All complete approved screen revisions remain SPEC ONLY.

## Verification

- `node tests/verify.mjs`: 30 valid routes, invalid-route handling, dynamic case steps, configured media/build/document states, existing shell/data checks and new foundation unit checks passed.
- `scripts/verify_ui_assets.py`: all 13 canonical SVGs passed structure, weight, currentColor, duplicate/alias and resource checks.
- Production `tests/qa.html`: passed, including canonical no-scroll routes, responsive navigation, gallery keyboard behavior, media/CV and deep navigation. Results: `tests/browser-results.json`.
- `tests/ui-foundation-browser.html`: passed at 1434, 768, 390 and 320px. Each width passed 22 component checks, all 13 icon loads, active index, blocked disabled activation, 3px focus outline and no horizontal overflow. Results: `tests/ui-foundation-browser-results.json`.
- Visual review corrected a shrinking media frame and oversized accent slab; checks now cover available-width sizing in addition to ratio. The component preview uses intentional placeholder content, not finished portfolio art.
- `git diff --check`: passed; Git emitted only line-ending normalization notices.

## Delivery

The complete repository ZIP has files directly at its root. It excludes `.git`, caches, temporary files, Codex artifacts, transfer bundles/patches and prior ZIPs. Packaging validates CRC, exact inventory and every file SHA-256 against the unchanged final working tree. Extract over `F:\Git\santiagoperezlosanovscky`; its existing `.git` is untouched.

Suggested commit message: `Add shared UI foundations and approved icon wiring`.

## Exact files created

- `UI_COMPONENT_STATUS.md`
- `docs/ui-foundation-pass-02.md`
- `docs/ui-foundation-preview.html`
- `src/html.js`
- `src/ui-icons.js`
- `src/ui.js`
- `styles/ui-primitives.css`
- `styles/ui-tokens.css`
- `tests/ui-foundation-browser-results.json`
- `tests/ui-foundation-browser.html`
- `tests/ui-foundation.mjs`

## Exact files modified

- `ASSET_ARTWORK_NEEDED.md`
- `ASSET_MANIFEST.md`
- `assets/ui/README.md`
- `index.html`
- `scripts/build_ui_assets.py`
- `src/app.js`
- `src/components.js`
- `src/pages.js`
- `src/shell.js`
- `styles/fidelity.css`
- `styles/games-visual.css`
- `styles/pages.css`
- `tests/browser-results.json`
- `tests/qa.js`
- `tests/stress.html`
- `tests/verify.mjs`

Files deleted: none.
