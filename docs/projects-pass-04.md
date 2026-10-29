# Projects implementation — Pass 04

Implemented both approved Projects contracts: Projects Overview and the shared Project Detail family for Hollow Graves, Reditus Umbrae and Dreadwoods. Overview from Pass 03 remains implemented. Roles and Case Studies screen revisions remain SPEC ONLY.

## Projects Overview

The old overview video, Watch Overview CTA, featured single-project panel and duplicate counter are replaced by three simultaneous, large project cards. Each card uses one semantic anchor, real project media, live black title band, integrated arrow housing and the approved category line. Opaque cream frames, restrained rotations, compact depth and CSS halftone use the existing UI language.

The shared edge arrows and numbered index choose the highlighted card; they preserve wrap and keyboard behavior. The right contextual rail reflects the current route, so its Overview marker stays current until a project link is followed. Selection does not pretend a different route is active. For additional project records, desktop selection pages in groups of three; mobile uses normal stacked cards. Long titles use a readable 26px card-title variant instead of clipping. Project counts remain data-driven.

## Project Detail

All three project routes use one reusable two-column template: conventional 16:9 gameplay/video and gallery frames on the left; layered The Game and Playable Build panels on the right. Mobile stacks title, video, The Game, gallery/index and build. The project title has no subtitle/genre chips beneath it.

The full existing project prose is retained. The case CTA uses a shared light button with red arrow housing. Build status, red primary action, provider strip and subdued distribution note use actual existing data. Exact build URLs, external-link target/rel behavior and case relationships remain intact. Native video activation, controls and source/poster handling are retained.

The gallery now has shared side arrows and a generated numbered screenshot index. Old thumbnails, count and detached controls are removed according to the current TXT contract, which overrides the older reference image. All six existing screenshots per project remain selectable; ArrowLeft/Right, Home/End, wrap, active state and polite image announcements work. Media is fitted without distortion.

## Shared architecture and changes

- New `src/project-ui.js`: reusable `projectCard()`, `projectDetailPanel()`, `projectSelector()` and its scoped controller. Resize observers are disconnected on navigation.
- Existing `pageTitle`, `surface`, `headerPlate`, `button`, `carouselArrow`, `indexTabs`, `mediaFrame` and canonical icon lookup are consumed unchanged. No duplicate icon paths or primitive/token forks.
- `projectGallery()` and its existing binder now render/update shared side controls and numbered tabs. Count/thumbnail updates are optional compatibility paths; all actual data drives the displayed image and state.
- `src/app.js` binds the new card selector alongside existing components. Routing, shell widths and route context are unchanged.
- `styles/project-detail.css` owns the new Projects recipes. Superseded Projects-only desktop recipes were removed. Legacy publication button rules now exclude `.ui-btn`, allowing approved shared states to paint correctly without changing legacy controls elsewhere.
- `src/data.js` adds only the approved category arrays to existing projects. IDs, prose, hero/gallery/video paths, links and relationships remain authoritative and unchanged. Existing `tags` used by the Games Overview are not replaced.
- `tests/preview.html?fit=1#games/projects` optionally fits a canonical production iframe to the preview window. Production layouts themselves are never scaled.

## Artwork, placeholders and departures

No assets were generated or altered. Missing future artwork: the three illustrated project covers and `ui_decorative_architecture-gothic_01.webp`. The contracts explicitly allow actual project media and existing shell decoration as fallbacks. The visual result consequently shows genuine gameplay/project media rather than the mockup illustrations. No fake screenshots, invented cover art or random stock imagery.

The existing Projects introduction remains forthcoming; the contract's illustrative example is not substituted for project copy. The approved broad categories are now centralized project data. The newer detail TXT removes the subtitle, thumbnails/dots and counters shown in older references. There are no additional intentional functional deviations. The right rail continues to represent routes independently of an in-page card highlight.

## Verification

- `node tests/verify.mjs`: passed, including routes, dynamic counts, configured states, real media existence, shared foundation and new Projects contract tests.
- `scripts/verify_ui_assets.py`: all 13 canonical SVGs passed.
- `tests/projects-browser.html`: passed at 1434, 1920, 768, 390 and 320px, across the Projects index and all three detail routes. Verified no horizontal overflow; desktop no-scroll; actual copy/provider/build/case destinations; route-aware rail; 16:9 media; single-anchor cards; approved category data; shared selection/gallery controls; focus; keyboard; actual screenshot indices and side-arrow geometry. Additional long-title project fixture also passes canonical fit and selection.
- `tests/qa.html`: full production regression passed: 28 canonical routes, every required Games page family, seven responsive widths, 1920px fit, dynamic project/role/case fixtures, native playback/decoding for all three project videos, gallery interaction, CV, mobile navigation/selector, route refresh and Back/Forward.
- `git diff --check`: passed, with Git line-ending notices only.
- Source hashes confirm all existing SVG/raster assets, media, references and documentation are unchanged, as are shell/router, approved shared primitive definitions/tokens and Overview CSS.

Results: `tests/projects-browser-results.json` and `tests/browser-results.json`. Screenshots are delivered separately as `projects-overview.png` and `project-detail.png`.

## Delivery / preview

Run `node scripts/serve.mjs`, then open `http://127.0.0.1:4173/#games/projects` or any existing project deep link. The complete repository ZIP contains root-relative files and excludes `.git`, caches, temporary files, prior delivery ZIPs, bundles, patches and Codex artifacts. Packaging checks CRC, exact inventory and every file SHA-256 against the unchanged final working tree. Extract over `F:\Git\santiagoperezlosanovscky`; its existing `.git` remains untouched. No push, commit, bundle or patch was attempted.

Suggested commit: `Implement approved Projects overview and detail screens`.

## Exact files created

- `docs/projects-pass-04.md`
- `src/project-ui.js`
- `tests/projects-browser-results.json`
- `tests/projects-browser.html`
- `tests/projects.mjs`

## Exact files modified

- `ASSET_MANIFEST.md`
- `UI_COMPONENT_STATUS.md`
- `index.html`
- `src/app.js`
- `src/components.js`
- `src/data.js`
- `src/pages.js`
- `styles/desktop-fit.css`
- `styles/project-detail.css`
- `styles/publication.css`
- `tests/browser-results.json`
- `tests/preview.html`
- `tests/qa.js`
- `tests/stress.html`
- `tests/verify.mjs`

Files deleted: none.
