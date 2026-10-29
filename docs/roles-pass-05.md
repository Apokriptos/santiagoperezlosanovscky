# Roles implementation — Pass 05

Implemented the approved Roles Overview and shared Role Detail layout for all six roles. Source contracts: `SCREEN_ROLES_OVERVIEW_IMPLEMENTATION.txt` and `SCREEN_ROLE_DETAIL_IMPLEMENTATION.txt`, with `Roles_Overview.png` and `Roles_Entry.png`. The approved role layouts are implemented; substantive content remains forthcoming where the production data has not supplied it.

## Roles Overview

The composed header uses the shared compact title, actual introduction, Watch Overview CTA and a conventional framed landscape video block. The existing video placeholder remains because no Roles overview reel is configured. Watch Overview is visibly disabled in that state. When configured, the action activates the actual native/current media player.

MY ROLES sits below the header in an equal-height 3×2 desktop board. Tablet uses two columns; mobile uses one. Each role card uses a shared cream surface, black title/icon plates, canonical SVG, current description and full-width light CTA with red arrow housing. Technical Animation's longer text fits the common grid without truncation. The approved Product Ownership summary/icon is added as the sixth record, with card, route, desktop rail and mobile selector generated from that same data.

## Role entries

Every entry uses the shared compact title and role-specific subtitle, two rows of tactile panels (Role & Experience, Selected Experience, In Practice, My Approach), then a full-width featured-case strip. Existing canonical IDs/taxonomy titles remain stable. The first three occupational entry display titles follow the approved contract (Technical Game Designer, Level Designer, Gameplay Developer); these are display data, not duplicate roles. Entry rail labels follow those display titles and current route state.

Summary and experience use actual role data. Structured principles with bold leads/supporting text and an optional approach intro are supported alongside existing string entries. Experience project links remain configurable. Featured case selection uses actual case ID/media/summary when supplied. No featured case is selected in current production role data, so the strip clearly says forthcoming and has a disabled CTA.

Practice entries with actual sources generate shared side arrows, a numbered index, real media and synchronized captions. Null-source planned entries are not counted as real evidence. With no real practice media, an honest forthcoming frame and disabled arrows appear. ArrowLeft/Right, Home/End, wrapping and visible focus are supported. Real practice videos use the same native playback binder as existing project videos. Switching examples pauses the previous video.

## Architecture / shared changes

- New `src/role-ui.js`: `roleCard`, `roleDetailPanel`, `rolePractice`, `roleCaseStudyCard` and scoped `bindRoleUI`.
- Existing `surface`, `pageTitle`, `headerPlate`, `sectionTitle`, `button`, `mediaFrame`, `carouselArrow`, `indexTabs` and canonical SVG lookup are consumed unchanged. No primitive/token fork or new icon paths.
- The existing video handler is extracted into reusable `bindMediaPlayback()` in `src/components.js`; initialization still calls it, and later practice selections call the same helper. Native controls, captions/poster, iframe handling and error fallback are preserved.
- `src/app.js` binds Roles controls and uses approved entry display labels on detail-route role rails. Existing router resolves the new Product Ownership record without special-case routing.
- `styles/roles.css` scopes the Roles recipes. Superseded Roles desktop rules were removed from `desktop-fit.css`. The shared shell dimensions remain untouched.
- The seven-entry role rail uses the same approved artwork at a proportional taller crop (`auto 150%`). This keeps labels over the dark section, without modifying the image or reintroducing letter backplates. Projects/case rail paint and all rail widths remain unchanged.
- `AGENTS.md` and README now reflect the explicitly approved sixth role. Games Overview retains its configured three-role subset.

## Content / asset limitations

No assets were generated or altered. The Roles overview reel, practice evidence/captions, detailed role summaries/experience/approach copy and featured-case selections are not supplied in production data. Existing forthcoming states remain; the mockup's example experience/teaching claims, case relationship and practice screenshot are not fabricated or treated as verified professional evidence. No portraits or gothic artwork were invented. The optional gothic poster/header art remains pending.

The approved three Designer/Developer entry labels are stored separately from canonical taxonomy titles. Existing subtitles are used as positioning lines rather than inventing final positioning prose. The missing Overview video remains a complete framed placeholder with disabled action, as allowed by the contract. These are content-dependent fallbacks, not alternate screen designs.

## Verification

- `node tests/verify.mjs`: passed, including 31 valid routes, invalid routes, dynamic records/case steps, actual project media, existing configured states, shared foundation and new role contracts.
- `scripts/verify_ui_assets.py`: all 13 canonical SVGs passed.
- `tests/roles-browser.html`: passed at 1434, 1920, 768, 390 and 320px. Verified 3/2/1 column transitions, equal desktop card heights/CTA baselines, all six entry routes, proper rail/selector data, Product Ownership, visible focus, standard media ratio, no horizontal overflow and desktop no-scroll. The video frame also uses its allocated width rather than shrinking to its placeholder text.
- Test-only configured role content verifies four practice examples (three actual project images and one project video used strictly as playback fixtures), side controls/index/captions, keyboard/focus, native video after selection, featured-case/project links and Watch Overview's configured playback path. Fixture content is never written to production role data. Checks include practice content staying inside its panel and the featured strip clearing it.
- `tests/qa.html`: full production regression passed across 29 canonical routes, seven responsive widths, 1920px desktop fit, dynamic fixtures, all three project videos/gallery/build paths, CV, mobile navigation/selectors, deep links and Back/Forward. Final Roles-specific geometry was rechecked after adjusting row sizing for configured practice content.
- `git diff --check`: passed; Git may emit line-ending notices.
- Hash verification confirms existing assets, real media, references and documentation remain unchanged, along with router/shell, shared primitive definitions/tokens, Overview CSS and Projects component/style files.

Results: `tests/roles-browser-results.json` and `tests/browser-results.json`. Delivered screenshots: `roles-overview.png` and `role-entry.png`.

## Delivery / preview

Run `node scripts/serve.mjs`, then open `http://127.0.0.1:4173/#games/roles` or `#games/roles/product-ownership`. Test-only `tests/stress.html?role-ui=1#games/roles/technical-game-design` demonstrates configured media/case plumbing; its content is explicitly a fixture, not professional evidence.

The complete repository ZIP has files directly at its root, excludes `.git`, caches/temp/Codex artifacts, prior ZIPs, patches and bundles, and is verified by CRC, exact inventory and each file SHA-256 against the unchanged final working tree. Extract over `F:\Git\santiagoperezlosanovscky`; existing `.git` remains untouched. No Git push, commit, bundle or patch was attempted.

Suggested commit: `Implement approved six-role overview and entry layouts`.

## Exact files created

- `docs/roles-pass-05.md`
- `src/role-ui.js`
- `styles/roles.css`
- `tests/roles-browser-results.json`
- `tests/roles-browser.html`
- `tests/roles.mjs`

## Exact files modified

- `AGENTS.md`
- `ASSET_MANIFEST.md`
- `README.md`
- `UI_COMPONENT_STATUS.md`
- `index.html`
- `src/app.js`
- `src/components.js`
- `src/data.js`
- `src/pages.js`
- `styles/desktop-fit.css`
- `tests/browser-results.json`
- `tests/overview-browser.html`
- `tests/qa.js`
- `tests/stress.html`
- `tests/verify.mjs`

Files deleted: none.
