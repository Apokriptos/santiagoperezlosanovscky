# UI_COMPONENT_STATUS

Pass 05 · 2026-10-29. Overview, Projects Overview/Detail and Roles Overview/Detail layouts are implemented and verified using the approved shared foundation. Role content/evidence remains forthcoming where not supplied. Case Studies approved revisions remain SPEC ONLY.

## Shared primitives

| Component | Status | Source screen / contract | Implementation | Dependencies | Notes |
| --- | --- | --- | --- | --- | --- |
| Shared tokens | FOUNDATION READY | Overview shared system; inherited everywhere | `styles/ui-tokens.css` | Existing palette and type | Color, border, spacing, compact/elevated depth, underslab, hover/press/duration. Existing `--games-*` variables alias these values rather than creating a second palette. |
| `ui-role-icon` / action icon lookup | IMPLEMENTED | Overview; Roles Overview; functional controls across all specs | `src/ui-icons.js`; `.ui-icon`, `.ui-role-icon` | `assets/ui/asset-index.json`, 13 approved SVG files, generator | Generated path registry, no embedded SVG paths. CSS masks inherit color. Existing project glyphs and role holders use it. All six role glyphs are used; Product Ownership is now a configured role/route. |
| `ui-page-title` | IMPLEMENTED | Overview §2.2; inherited Projects/Roles/Case Studies | `pageTitle()` in `src/ui.js`; `.ui-page-title`, `.ui-plate` | Tokens | Angular black plate, live cream text, optional double slash, variable title length and responsive size. Consumed by the production Overview compact title; other page headers retain their existing treatment. |
| `ui-section-title` | IMPLEMENTED | Overview §2.3 | `sectionTitle()`; `.ui-section-title` | Shared plate/tokens | Compact red or black heading with continuation rule. |
| Shared internal header plate | IMPLEMENTED | Project Detail; Roles Overview/Detail; Case Study panels | `headerPlate()`; `.ui-header-plate` | `.ui-plate`, tokens | Shared material/geometry, component-controlled size via `--ui-header-size`. No forced common width or screen layout. |
| `ui-surface` | IMPLEMENTED | Overview §2.4; inherited tactile surfaces | `surface()`; `.ui-surface`, `__edge`, `__body` | Tokens | Opaque cream, structural outline, compact depth; accent underslab, dark and square modifiers. Content/padding/cut remain component-controlled. |
| `ui-btn` | IMPLEMENTED | Overview §2.5; all later CTAs | `button()`; `.ui-btn` | Tokens, icon helper | Neutral/secondary, primary red, compact, arrow housing. Native disabled buttons; disabled links omit href. Focus/hover/pressed/reduced-motion support. Overview consumes these controls; unrelated live CTAs retain local geometry pending their screen passes. |
| `ui-carousel-arrow` | IMPLEMENTED | Overview §2.6; media/card navigation | `carouselArrow()`; prev/next modifiers | `ui-btn`, approved shared arrow SVGs | Explicit accessible label required. Does not own project or carousel state. |
| `ui-index`, `ui-index-tab` | IMPLEMENTED | Overview §2.7; Projects/Role media index | `indexTabs()`; `.ui-index`, `.ui-index-tab` | `ui-btn` | Controlled native buttons or links; active attributes drive red state. Caller owns selection/navigation. No duplicated data/controller logic. |
| `ui-context-rail` | IMPLEMENTED | Shared navigation grammar across Projects/Roles/Case Studies | `contextRail()`; `src/shell.js`; `.ui-context-rail__track`, `__item`, `__marker`, `__label` | Escaped caller data; token styles | One visual/structural renderer. No data merge. Existing selector, URLs, active logic, artwork, shell width and legacy padding remain intact. Generic legacy fixture context is supported. |
| `ui-project-rail` | IMPLEMENTED | Projects Overview/Detail | Semantic modifier on common context rail | Existing `Projects` data/context creation | Only rail foundation integrated; not a complete Projects screen. |
| `ui-role-rail` | IMPLEMENTED | Roles Overview/Detail | Semantic modifier on common context rail | Existing `Roles` data/context creation | Six approved roles, including Product Ownership, generated from data. Occupational entry labels preserve canonical IDs. Same rail artwork uses a taller proportional crop for the longer role index, without text backplates. |
| `ui-case-study-rail` | IMPLEMENTED | Case Study Step contract | Semantic modifier on common context rail | Existing `CaseStudies` data/context creation | Between-case navigation stays separate from internal step navigation. |
| `ui-media-frame` / `ui-project-media-frame` vocabulary | IMPLEMENTED | Overview; Project Detail; Role Detail; Case Study Step | `mediaFrame()`; `.ui-media-frame`, `__viewport`, `__controls`; `--plain` compatibility mode | `ui-surface`, optional arrows/controls | Standard-ratio rectangular viewport, contain fitting, cream frame/depth and optional side controls. Passive by default. Existing media/video helper uses structural plain mode without new paint or height. |
| `ui-shell` | IMPLEMENTED | Existing approved shell | `src/shell.js`, `styles/shell.css` | Existing router/context | Existing dimensions reused: 251 / 1183 or 251 / 1049 / 134 at 1434 × 913. No new layout framework or width tokens added. |

## Screen component recipes

| Component | Status | Source | Available foundation | Notes |
| --- | --- | --- | --- | --- |
| Overview `role-card` recipe | IMPLEMENTED | Overview | Canonical role icons, surface, button | Three configured roles, solid cream/depth, CSS halftone, live titles and CTA focus. Roles Overview uses the shared black-header card variant below. |
| Approved `project-card` recipe | IMPLEMENTED | Projects Overview | `src/project-ui.js`, shared surface/icon/button styles | Three large real-media cards, live title bands and approved category data, single semantic links. Future illustrated covers remain absent. |
| Roles Overview `role-card` variant | IMPLEMENTED | Roles Overview | `roleCard()` in `src/role-ui.js`; shared surface/header/icon/button | Six equal-height black-header cards; 3/2/1 responsive columns. |
| `role-detail-panel` | IMPLEMENTED | Role Detail | `roleDetailPanel()`; shared surface/header | Four-panel structure; current summaries, experience and approach retained without invented claims. |
| `role-case-study-card` | IMPLEMENTED | Role Detail featured strip | `roleCaseStudyCard()`; surface/media/button | Cover/text/CTA when a real featured case is configured. Honest disabled forthcoming state otherwise. |
| `project-media-panel` recipe | IMPLEMENTED | Project Detail | `projectGallery()` in `src/components.js`, shared `mediaFrame()` and side arrows | Standard rectangular video/gallery, generated numbered screenshot index. Role Detail now also consumes this frame family for practice evidence. |
| `project-detail-panel` | IMPLEMENTED | Project Detail | `projectDetailPanel()` in `src/project-ui.js`, shared surface/header/button | The Game and Playable Build share one layered panel renderer; real copy, status/provider/action/footer. |
| `ui-identity-rail` | IMPLEMENTED | Overview | Existing identity fallback, shared tokens | Approved forthcoming state retained, full-height desktop rail; real portrait treatment remains absent. |
| `ui-btn--nav` revision | SPEC ONLY | Overview | Shared tokens and button state vocabulary | Existing left rail is deliberately unchanged. |
| Case Study numbered chapter header, explanation panel and bottom step rail | SPEC ONLY | Case Study Step | Page/header/surface/frame primitives | Do not merge internal chapter navigation with the right sibling-case rail. |

## Whole approved screens

| Approved revision | Status | Why |
| --- | --- | --- |
| Overview | IMPLEMENTED | Production composition and functional/responsive regressions passed. Real portrait remains forthcoming as specified. |
| Projects Overview | IMPLEMENTED | Approved three-card gateway, selector/index, real-media fallback and route rail verified. |
| Project Detail | IMPLEMENTED | One shared template for all three projects; native video, side gallery arrows, numbered tabs and real build/case actions verified. |
| Roles Overview | IMPLEMENTED | Six-role board, current overview-video placeholder/configured playback path, shared cards and role rail verified. |
| Role Detail | IMPLEMENTED | Shared layout for all six entry routes; real-media/featured-case paths verified with test-only fixtures. Production summaries, experience, media and featured cases remain forthcoming where not supplied. |
| Case Studies Overview | SPEC ONLY | Referenced implementation contract is absent from the supplied folder. |
| Case Study Step | SPEC ONLY | New one-image chapter composition not implemented in this pass. |

## Conflicts / deferred decisions

1. All six supplied contracts match `F:\Git\santiagoperezlosanovscky\references\Designed`. The referenced `SCREEN_CASE_STUDIES_OVERVIEW_IMPLEMENTATION.txt` is not present; no direct reattachment of the other guides is needed.
2. Resolved in Pass 05: newer Roles contracts approve Product Ownership as the sixth role. Data, route/context and AGENTS taxonomy now agree. Games Overview still uses its configured three-role subset.
3. The newer Project Detail TXT overrides the older thumbnail/dot/counter mockup. Pass 04 implements the TXT: side arrows and numbered screenshot tabs only.
4. Case Study Step TXT specifies one genuine evidence image, overriding older three-image wireframes. No evidence or analytical claims are invented.
5. Overview and Roles Overview use different role-icon motifs and occupational labels. Use the approved single icon family and keep canonical IDs; don't create duplicate Designer/Design assets.
6. Production-specific surface/button/step-rail CSS cannot be safely collapsed wholesale without doing the screen implementations. It remains intentionally scoped; the new primitives are opt-in. Source artwork and all duplicate legacy PNGs are unchanged.

## Use and verification

- Load `ui-tokens.css` and `ui-primitives.css` after the neutral shell and before page styles.
- Import renderers from `src/ui.js`. Text labels are escaped. HTML content slots are trusted renderer output, not untrusted prose.
- Index/carousel state belongs to the caller. These pure renderers do not install a competing global controller.
- Inspect `docs/ui-foundation-preview.html`; it is an isolated component review, not a portfolio route.
- Run `node tests/verify.mjs` for existing and foundation checks. `tests/ui-foundation-browser.html` tests four widths under a repository prefix; `tests/qa.html` remains the production regression suite.
- `docs/ui-foundation-pass-02.md` records exact changes, verification and delivery.

## Pass 03 verification

Overview uses shared primitives without editing `src/ui.js`, `styles/ui-primitives.css` or token definitions. The existing carousel binder now accepts nested Overview slides and an optional counter, with a polite project-title announcement. No duplicate carousel controller was added. See `docs/overview-pass-03.md` and `tests/overview-browser-results.json`. Next suggested screen: Projects Overview, only after explicit request.

## Pass 04 Projects verification

Projects Overview and all three Project Detail routes pass production/regression checks. The selector index controls a card selection while the contextual rail reflects the current route; selecting a card index does not falsely mark a detail route current. Added projects page in groups of three on desktop; mobile shows normal stacked cards. See `docs/projects-pass-04.md`. Suggested next screen: Roles Overview, only after explicit request.

## Pass 05 Roles verification

Roles Overview and all six Role Detail routes pass responsive/functional checks. Native playback is shared through `bindMediaPlayback()`; configured practice media is filtered to real sources, with synchronized caption/index controls. No fake evidence/experience/case selection or portrait/decorative art was supplied. See `docs/roles-pass-05.md`. Case Studies is the next screen family; its missing Overview contract is still needed for that approved overview revision.
