# ASSET_MANIFEST

Asset Pass 01 · 2026-10-29. Canonical physical filenames remain authoritative. Semantic names from contracts map to those files through the alias tables; no duplicate file is created just to rename existing artwork.

**Pass 01 scope:** asset production and audit. **Pass 02 update:** the approved SVGs are wired through the generated `src/ui-icons.js` lookup and shared `src/ui.js` renderers. Project action glyphs and existing role icon holders use canonical files. Shared foundations are ready; no complete approved screen has been implemented by this pass. See `UI_COMPONENT_STATUS.md`.

## Source of truth

All six `references/Designed/SCREEN_*_IMPLEMENTATION.txt` contracts were inspected, along with their five Designed images, the three existing Case Study references, current source code, assets and media. The 11 Designed source files were copied byte-for-byte from the user repository into this working repository so the delivery retains the contracts.

| Contract | Scope relevant to assets |
| --- | --- |
| `references/Designed/SCREEN_OVERVIEW_IMPLEMENTATION.txt` | Shared nomenclature, role icons, image/code split, future portrait. |
| `references/Designed/SCREEN_PROJECTS_OVERVIEW_IMPLEMENTATION.txt` | Three real-art project cards; optional reusable gothic skyline; no rasterized card geometry. |
| `references/Designed/SCREEN_PROJECT_DETAIL_IMPLEMENTATION.txt` | Real gameplay/screenshots; shared arrows/download/provider/info; component frames. |
| `references/Designed/SCREEN_ROLES_OVERVIEW_IMPLEMENTATION.txt` | Six SVG role icons, including planning/ownership; black plates; six-role grid remains future implementation. |
| `references/Designed/SCREEN_ROLE_DETAIL_IMPLEMENTATION.txt` | Real practice/case media; shared arrow/CTA vocabulary; no invented claims. |
| `references/Designed/SCREEN_CASE_STUDY_STEP_IMPLEMENTATION.txt` | One real evidence image; shared title/chapter/rail geometry; no fabricated analysis. |

The referenced Case Studies Overview contract is missing. Earlier wireframes are retained as references, not treated as newer authority.

## Role Icons

All six have a `0 0 24 24` viewBox, 2.25-unit rounded strokes, editable geometric paths and no baked text, gradients or raster imagery. Cream is a presentation fallback for black plates; inline SVG can override it through CSS color. Recommended role sizes are 24–48px; 16px is included as a legibility stress check.

| Canonical filename | Type | Status | Reuse | Screens | Notes |
| --- | --- | --- | --- | --- | --- |
| `assets/ui/roles/ui_role_icon_technical-game-design.svg` | SVG | CREATED | Reusable | Overview role cards; Roles Overview/Detail where appropriate | Generic controller, normalized from the existing controller vocabulary; no platform branding. Also the controller/gamepad alias. |
| `assets/ui/roles/ui_role_icon_level-design.svg` | SVG | CREATED | Reusable | Overview role cards; Roles Overview/Detail where appropriate | Wireframe cube; common spatial-design symbol, not a vendor logo. |
| `assets/ui/roles/ui_role_icon_gameplay-development.svg` | SVG | CREATED | Reusable | Overview role cards; Roles Overview/Detail where appropriate | Original crossed-blade glyph matching the approved Roles reference; no proprietary insignia. |
| `assets/ui/roles/ui_role_icon_creative-leadership.svg` | SVG | CREATED | Reusable | Overview role cards; Roles Overview/Detail where appropriate | Three-person coordination/group glyph. |
| `assets/ui/roles/ui_role_icon_technical-animation.svg` | SVG | CREATED | Reusable | Overview role cards; Roles Overview/Detail where appropriate | Geometric running figure; no traditional-character-animator claim. |
| `assets/ui/roles/ui_role_icon_product-ownership.svg` | SVG | CREATED | Reusable | Overview role cards; Roles Overview/Detail where appropriate | Owned plan/checklist, emphasizing planning and follow-through rather than generic management. |

## Functional Icons

All seven use the same 24-unit canvas, stroke family and `currentColor`. Arrow-right, download, info and folder reuse/normalize geometry already present in `src/pages.js#projectIcon`. Arrow-left is the mirrored navigation counterpart. Play and external-link replace text-only affordances when later screens are implemented. Pass 02 removed the inline path map from the page renderer; canonical files are now consumed through the shared CSS-mask helper. No more path variants are needed.

| Canonical filename | Type | Status | Reuse | Screens | Notes |
| --- | --- | --- | --- | --- | --- |
| `assets/ui/actions/ui_action_arrow-right.svg` | SVG | CREATED | Reusable | Project/role media and CTAs; Case Studies navigation; other common controls | Alias: next. No separate next.svg. |
| `assets/ui/actions/ui_action_arrow-left.svg` | SVG | CREATED | Reusable | Project/role media and CTAs; Case Studies navigation; other common controls | Alias: previous. No separate previous.svg. |
| `assets/ui/actions/ui_action_play.svg` | SVG | CREATED | Reusable | Project/role media and CTAs; Case Studies navigation; other common controls | Filled geometric play triangle; no proprietary player branding. |
| `assets/ui/actions/ui_action_download.svg` | SVG | CREATED | Reusable | Project/role media and CTAs; Case Studies navigation; other common controls | Normalized from existing inline download path. |
| `assets/ui/actions/ui_action_external-link.svg` | SVG | CREATED | Reusable | Project/role media and CTAs; Case Studies navigation; other common controls | Generic box/outgoing arrow, not a provider logo. |
| `assets/ui/actions/ui_action_info.svg` | SVG | CREATED | Reusable | Project/role media and CTAs; Case Studies navigation; other common controls | Normalized from existing inline information path. |
| `assets/ui/actions/ui_action_folder.svg` | SVG | CREATED | Reusable | Project/role media and CTAs; Case Studies navigation; other common controls | Normalized neutral destination icon. Never label it as a branded provider logo. |

No duplicate files for `previous`, `next`, `controller` or `gamepad`. `assets/ui/asset-index.json` records aliases, paths and sizes. External `<img>` SVGs do not inherit the host CSS color; use inline SVG or a CSS mask when recoloring actions. Decorative icons need `aria-hidden="true"`; controls still need a visible label or accessible name.

## Decorative Vector Assets

No new standalone decorative vectors are justified. Two simple polygons for double slashes, radial-gradient halftone dots, corner cuts and divider marks belong to CSS/component geometry. This avoids creating rasterized UI or redundant micro-assets.

| Canonical filename / identifier | Type | Status | Reuse | Screens | Notes |
| --- | --- | --- | --- | --- | --- |
| `assets/selected-tab.svg` | SVG | EXISTING | Reusable legacy navigation asset | Current left navigation | Existing vector tab art retained, not duplicated. Future tactile tab geometry stays in components. |
| CSS double-slash / corner / divider / halftone geometry | CSS | EXISTING | Reusable patterns already expressed in styles | Overview and existing title/panel/portrait accents | No new decorative file. Keep authored brush texture distinct from simple geometric slash marks. |

## Texture / Illustration Assets

| Canonical filename | Type | Status | Reuse | Screens | Notes |
| --- | --- | --- | --- | --- | --- |
| `assets/polished_background_final.png` | PNG | EXISTING | Reusable / source | All Games content | Canonical clean paper; semantic alias ui_global_paper-cream_01. No new ui_global file needed. |
| `assets/left-rail-hd.png` | PNG | EXISTING | Reusable / source | All Games left rail | Current left shell artwork. Preserve source. |
| `assets/righttab-black-top-v2.png` | PNG | EXISTING | Reusable / source | Projects/Roles/Case Studies right rail | Current approved black-top rail artwork. Separate live labels/markers. |
| `assets/polished_righttab_final.png` | PNG | EXISTING | Reusable / source | Right-rail source/reference | Prior approved full composition; retained as source, not current active rail. |
| `assets/paper-hd.png` | PNG | EXISTING | Reusable / source | Historical background source | Superseded generated intermediate; no new export. |
| `assets/right-rail-hd.png` | PNG | EXISTING | Reusable / source | Historical right-rail source | Superseded intermediate; no new export. |
| `assets/left_tab_asset 1.png` | PNG | EXISTING | Reusable / source | Historical left-rail source | Low-resolution original; current HD file reused. |
| `assets/right_tab_asset 1.png` | PNG | EXISTING | Reusable / source | Historical right-rail source | Low-resolution original; retained only. |
| `assets/tabbutton 1.png` | PNG | EXISTING | Reusable / source | Historical selected-tab art | Raster tab source; no new raster buttons are produced. |
| `assets/bg_1424x913.png` | PNG | EXISTING | Reusable / source | Legacy CSS / reference background | Canonical member of exact-duplicate pair with image 63.png; not the current final paper. |
| `assets/bg_1629x917.png` | PNG | EXISTING | Reusable / source | Legacy root selector / reference | Canonical member of exact-duplicate pair with image 62.png; do not copy as a new paper asset. |
| `assets/boxcontainer_A.png` | PNG | EXISTING | Reusable / source | Legacy frame reference | Exact duplicate of image 78.png. Do not promote to reusable raster panels. |
| `assets/buildcontainer_A.png` | PNG | EXISTING | Reusable / source | Legacy frame reference | Exact duplicate of image 77.png. Build panel geometry remains code. |
| `assets/videocarousel_A.png` | PNG | EXISTING | Reusable / source | Legacy media-frame reference | Exact duplicate of image 76.png. Media frames remain code. |
| `media/hollow-graves/theme.svg` | SVG | EXISTING | Project-specific | Existing project-themed diagram source | Reuse only if suitable and approved; not the shared paper/skyline and not evidence of a case-study finding. |
| `media/reditus-umbrae/theme.svg` | SVG | EXISTING | Project-specific | Existing project-themed diagram source | Reuse only if suitable and approved; not the shared paper/skyline and not evidence of a case-study finding. |
| `media/dreadwoods/theme.svg` | SVG | EXISTING | Project-specific | Existing project-themed diagram source | Reuse only if suitable and approved; not the shared paper/skyline and not evidence of a case-study finding. |
| `assets/ui/decorative/ui_decorative_architecture-gothic_01.webp` | WEBP | NEEDS ART | Reusable site decoration; never gameplay evidence | Projects Overview; Project Detail; Roles Overview/Detail; Case Study Step headers | Reserved future filename. See artwork audit for dimensions/source/crop. |
| `assets/ui/decorative/ui_decorative_brush-slash_red_01.webp` | WEBP | NEEDS ART | Reusable | Shared title/section accent edges, only where CSS is insufficient | Reserved future filename. See artwork audit for dimensions/source/crop. |
| `assets/ui/decorative/ui_decorative_brush-edge_black_01.webp` | WEBP | NEEDS ART | Reusable | Shared peripheral distressed edges, only where CSS is insufficient | Reserved future filename. See artwork audit for dimensions/source/crop. |

### Semantic-name bridge (no file duplication)

| Contract name | Canonical source / decision |
| --- | --- |
| `ui_global_paper-cream_01` | `assets/polished_background_final.png` |
| `ui_decorative_brush-slash_red_01` | Existing composite paper/rail strokes first; standalone alpha texture only if genuinely needed. |
| `ui_decorative_brush-edge_black_01` | Existing composite edges first; no exported raster panel. |
| `ui_decorative_halftone-dots_black_01` / `ui_decorative_halftone-dots_red_01` | Simple versions are CSS patterns; no duplicate WEBP/PNG is required. |

## Project Media

Every existing image/video is inventoried below at its original filename. No content was renamed, regenerated, copied to assets, or replaced. PDFs and README files in media folders are documents rather than UI/art assets; they remain unchanged.

| Canonical filename | Type | Status | Reuse | Screens | Notes |
| --- | --- | --- | --- | --- | --- |
| `media/dreadwoods/Captura de pantalla 2026-10-11 221729.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Available source; not selected by current data. Review context before reuse. |
| `media/dreadwoods/Dreadwoods - Video - Final.mp4` | VIDEO | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Current primary showcase for Dreadwoods |
| `media/dreadwoods/Dreadwoodseva.mp4` | VIDEO | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Available source; not selected by current data. Review context before reuse. |
| `media/dreadwoods/DW_SS11.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Dreadwoods |
| `media/dreadwoods/DW_SS2.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Dreadwoods |
| `media/dreadwoods/DW_SS20.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Available source; not selected by current data. Review context before reuse. |
| `media/dreadwoods/DW_SS24.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Dreadwoods |
| `media/dreadwoods/DW_SS5.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Available source; not selected by current data. Review context before reuse. |
| `media/dreadwoods/DW_SS9.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Dreadwoods |
| `media/dreadwoods/ScreenShot00000.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Dreadwoods |
| `media/dreadwoods/ScreenShot00001.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Available source; not selected by current data. Review context before reuse. |
| `media/dreadwoods/ScreenShot00003.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Available source; not selected by current data. Review context before reuse. |
| `media/dreadwoods/ScreenShot00004.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Available source; not selected by current data. Review context before reuse. |
| `media/dreadwoods/ScreenShot00007.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Dreadwoods |
| `media/dreadwoods/ScreenShot00011.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Available source; not selected by current data. Review context before reuse. |
| `media/hollow-graves/2027 ROADMAP HOLLOW GRAVES.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Project roadmap/document PNG; not a generic hero or analytical evidence. |
| `media/hollow-graves/HollowGravesShort.mp4` | VIDEO | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Available source; not selected by current data. Review context before reuse. |
| `media/hollow-graves/Hollowgravesshowcasenew.mp4` | VIDEO | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Current primary showcase for Hollow Graves |
| `media/hollow-graves/MainPic.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Hollow Graves |
| `media/hollow-graves/ScreenShot00000.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Hollow Graves |
| `media/hollow-graves/ScreenShot00001.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Hollow Graves |
| `media/hollow-graves/ScreenShot00002.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Hollow Graves |
| `media/hollow-graves/ScreenShot00003.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Hollow Graves |
| `media/hollow-graves/ScreenShot00005.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Hollow Graves |
| `media/hollow-graves/ScreenShot00006.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Hollow Graves |
| `media/reditus-umbrae/REDITUSSHORT.mp4` | VIDEO | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Available source; not selected by current data. Review context before reuse. |
| `media/reditus-umbrae/Reditusumbraeshowcasenew.mp4` | VIDEO | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Current primary showcase for Reditus Umbrae |
| `media/reditus-umbrae/ScreenShot00001.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Reditus Umbrae |
| `media/reditus-umbrae/ScreenShot00002.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Reditus Umbrae |
| `media/reditus-umbrae/ScreenShot00003.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Reditus Umbrae |
| `media/reditus-umbrae/ScreenShot00004.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Reditus Umbrae |
| `media/reditus-umbrae/ScreenShot00005.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Reditus Umbrae |
| `media/reditus-umbrae/ScreenShot00006.png` | PNG | EXISTING | Project-specific; reuse by data identity | Overview; Projects Overview/Detail; general Case/featured covers where suitable | Selected real cover/gallery source for Reditus Umbrae |
| `media/hollow-graves/art/hollow-graves-hero_01.webp` | WEBP | NEEDS ART | Project-specific | Projects Overview large cards; optional project/case cover reuse | Optional approved illustration; current real cover is valid fallback. No generated replacement in this pass. |
| `media/reditus-umbrae/art/reditus-umbrae-hero_01.webp` | WEBP | NEEDS ART | Project-specific | Projects Overview large cards; optional project/case cover reuse | Optional approved illustration; current real cover is valid fallback. No generated replacement in this pass. |
| `media/dreadwoods/art/dreadwoods-hero_01.webp` | WEBP | NEEDS ART | Project-specific | Projects Overview large cards; optional project/case cover reuse | Optional approved illustration; current real cover is valid fallback. No generated replacement in this pass. |

## Case Study Media

| Canonical filename / reserved collection | Type | Status | Reuse | Screens | Notes |
| --- | --- | --- | --- | --- | --- |
| `media/hollow-graves/MainPic.png` | PNG | EXISTING | Shared with its project; no copy | Designing Investigation in Hollow Graves general cover | General hero only. Does not substantiate analytical steps. |
| `media/reditus-umbrae/ScreenShot00001.png` | PNG | EXISTING | Shared with its project; no copy | Frenzy & Combat in Reditus Umbrae general cover | General hero only. Does not substantiate analytical steps. |
| `media/dreadwoods/DW_SS11.png` | PNG | EXISTING | Shared with its project; no copy | Exploration in Dreadwoods general cover | General hero only. Does not substantiate analytical steps. |
| `media/hollow-graves/case-studies/hollow-graves-context-evidence_01.png` | PNG | NEEDS ART | Case/step-specific; reuse real source if approved | Hollow Graves Case Study Step — Context | Reserved evidence brief, not an existing file. Use one genuine image per approved chapter; no fabricated findings. |
| `media/hollow-graves/case-studies/hollow-graves-design-problem-evidence_01.png` | PNG | NEEDS ART | Case/step-specific; reuse real source if approved | Hollow Graves Case Study Step — Design Problem | Reserved evidence brief, not an existing file. Use one genuine image per approved chapter; no fabricated findings. |
| `media/hollow-graves/case-studies/hollow-graves-investigation-loop-evidence_01.png` | PNG | NEEDS ART | Case/step-specific; reuse real source if approved | Hollow Graves Case Study Step — Investigation Loop | Reserved evidence brief, not an existing file. Use one genuine image per approved chapter; no fabricated findings. |
| `media/hollow-graves/case-studies/hollow-graves-ghostsight-evidence_01.png` | PNG | NEEDS ART | Case/step-specific; reuse real source if approved | Hollow Graves Case Study Step — GhostSight | Reserved evidence brief, not an existing file. Use one genuine image per approved chapter; no fabricated findings. |
| `media/hollow-graves/case-studies/hollow-graves-clues-feedback-evidence_01.png` | PNG | NEEDS ART | Case/step-specific; reuse real source if approved | Hollow Graves Case Study Step — Clues & Feedback | Reserved evidence brief, not an existing file. Use one genuine image per approved chapter; no fabricated findings. |
| `media/hollow-graves/case-studies/hollow-graves-iteration-evidence_01.png` | PNG | NEEDS ART | Case/step-specific; reuse real source if approved | Hollow Graves Case Study Step — Iteration | Reserved evidence brief, not an existing file. Use one genuine image per approved chapter; no fabricated findings. |
| `media/hollow-graves/case-studies/hollow-graves-outcome-evidence_01.png` | PNG | NEEDS ART | Case/step-specific; reuse real source if approved | Hollow Graves Case Study Step — Outcome | Reserved evidence brief, not an existing file. Use one genuine image per approved chapter; no fabricated findings. |
| `media/reditus-umbrae/case-studies/reditus-umbrae-<approved-step-id>-evidence_01.png` | PNG | NEEDS ART | Case/step-specific collection | Reditus Umbrae Case Study Step family | Reserved evidence brief, not an existing file. Use one genuine image per approved chapter; no fabricated findings. |
| `media/dreadwoods/case-studies/dreadwoods-<approved-step-id>-evidence_01.png` | PNG | NEEDS ART | Case/step-specific collection | Dreadwoods Case Study Step family | Reserved evidence brief, not an existing file. Use one genuine image per approved chapter; no fabricated findings. |

## Identity / Portrait

| Canonical filename | Type | Status | Reuse | Screens | Notes |
| --- | --- | --- | --- | --- | --- |
| `assets/ui/identity/authorbanner.png` | PNG | SUPPLIED / INTEGRATED | Owner identity | Games Overview identity rail | User-supplied 715×1671 composite, copied unchanged. Preserve the full image/embedded text using contain fitting. |
| `assets/ui/identity/ui_identity_portrait-treatment_01.webp` | WEBP | OPTIONAL FUTURE | Standalone owner portrait | Future separate portrait use | Reserved transparent treatment is not supplied; the current Games landing requirement is fulfilled by the supplied banner. |
| Existing `.portrait-placeholder` / `.portrait-caption` composition | CSS | EXISTING | Identity component geometry | Current Games Overview | Keep live labels, registration and fallback. Do not bake them into portrait artwork. |

## Deferred / Not Yet Required

| Canonical filename / identifier | Type | Status | Reuse | Screens | Notes |
| --- | --- | --- | --- | --- | --- |
| `media/roles/roles-overview_01.mp4` | VIDEO | NEEDS ART | Role-family media | Roles Overview | Real recording/capture only, with verified role relationship. Reserved filename; nothing generated or wired. |
| `media/roles/technical-game-design/role-practice_technical-game-design_01.webp` | WEBP | NEEDS ART | Role-specific evidence; project source may be reused if relationship is verified | Technical Game Design Role Detail — In Practice | Real recording/capture only, with verified role relationship. Reserved filename; nothing generated or wired. |
| `media/roles/level-design/role-practice_level-design_01.webp` | WEBP | NEEDS ART | Role-specific evidence; project source may be reused if relationship is verified | Level Design Role Detail — In Practice | Real recording/capture only, with verified role relationship. Reserved filename; nothing generated or wired. |
| `media/roles/gameplay-development/role-practice_gameplay-development_01.webp` | WEBP | NEEDS ART | Role-specific evidence; project source may be reused if relationship is verified | Gameplay Development Role Detail — In Practice | Real recording/capture only, with verified role relationship. Reserved filename; nothing generated or wired. |
| `media/roles/creative-leadership/role-practice_creative-leadership_01.webp` | WEBP | NEEDS ART | Role-specific evidence; project source may be reused if relationship is verified | Creative Leadership Role Detail — In Practice | Real recording/capture only, with verified role relationship. Reserved filename; nothing generated or wired. |
| `media/roles/technical-animation/role-practice_technical-animation_01.webp` | WEBP | NEEDS ART | Role-specific evidence; project source may be reused if relationship is verified | Technical Animation Role Detail — In Practice | Real recording/capture only, with verified role relationship. Reserved filename; nothing generated or wired. |
| `media/roles/product-ownership/role-practice_product-ownership_01.webp` | WEBP | NEEDS ART | Role-specific evidence; project source may be reused if relationship is verified | Product Ownership Role Detail — In Practice | Real recording/capture only, with verified role relationship. Reserved filename; nothing generated or wired. |
| Shared `ui-page-title`, `ui-section-title`, `ui-btn`, `role-card`, `project-card`, `ui-media-frame`, `ui-project-rail`, `ui-role-rail`, `ui-case-study-rail` geometry | CSS | DEFERRED | Shared components | Approved screen families | Later screen implementation; not separate raster asset files. |
| Official provider marks (no canonical file reserved yet) | SVG | DEFERRED | Provider-specific | Download/provider strips | Use authorized official source if needed. Neutral `ui_action_folder.svg` exists; do not fabricate brand logos. |
| Separate painterly role-icon variants | PNG | DEFERRED | Not justified | None in this pass | Approved role direction is clean SVG. No duplicate icon family. |

## Redundancy and collisions

Five byte-identical PNG pairs were found (verified by SHA-256):

| Canonical legacy source | Redundant alias |
| --- | --- |
| `assets/bg_1424x913.png` | `assets/image 63.png` |
| `assets/bg_1629x917.png` | `assets/image 62.png` |
| `assets/boxcontainer_A.png` | `assets/image 78.png` |
| `assets/buildcontainer_A.png` | `assets/image 77.png` |
| `assets/videocarousel_A.png` | `assets/image 76.png` |

These originals were preserved; no deletion or automatic source rewrite occurred. Generated intermediates (`paper-hd.png`, `right-rail-hd.png`) are different images, not hash duplicates, and remain historical sources. The approved current right rail is `righttab-black-top-v2.png`; do not confuse it with the older full-detail right-tab file.

No six-icon set or standalone functional family already existed. Existing inline paths were exported/normalized rather than copied from a third-party icon library. The two role naming forms (Design/Designer) are labels, not separate assets. A simple `previous`/`next` alias is not a new glyph.

## Pack use, verification and boundaries

- Canonical lookup and aliases: `assets/ui/asset-index.json`.
- Regenerate only this pack/review sheet: `python scripts/build_ui_assets.py`.
- Validate XML, viewBoxes, stroke, currentColor, complexity and aliases: `python scripts/verify_ui_assets.py`.
- Visual review sheet: `docs/ui-asset-preview.html`; it embeds the SVGs and is usable offline. It is documentation, not a redesigned portfolio screen.
- Visual review covered every glyph at small/medium sizes, including 16/24px; roles also at 32/48/64px, actions also on cream/red. The browser sampled 58 SVG instances and confirmed display-size/plate containment and inherited colors.
- No embedded rasters, baked text, scripts, metadata blobs, filters or external resources are present in the new SVGs.
- Pass 01 left production files unchanged. Pass 02 conservatively integrates shared icon/rail/media foundations and token aliases; existing site regression checks pass. No whole approved screen was implemented, no role route added, no artwork invented and no Git push attempted.
- See `ASSET_ARTWORK_NEEDED.md` for source/crop/priority briefs and contract gaps. Asset readiness does not certify portfolio experience or analytical claims.

## Pass 03 production use

The approved Overview now consumes the shared role/action SVGs, existing paper/rail decoration and actual project hero media. No image or SVG asset was generated or modified. The identity portrait is still forthcoming, per its required real-source-photo fallback. CSS supplies halftone accents and functional geometry. See `docs/overview-pass-03.md`.

## Pass 04 Projects production use

Projects Overview and Project Detail now use shared surfaces, title/header plates, arrows, numbered indices and actual existing project media. No SVG, raster artwork, media or decorative asset was generated or changed. Illustrated project covers and the shared gothic architectural decoration remain future art; existing real media and paper/rail art are the approved implementation fallback.

## Pass 05 Roles production use

All six approved role SVGs are consumed by the 3×2 Roles Overview board, including Product Ownership. Shared title/header/surface/button/media/index primitives are reused. No authored image, SVG, media or decorative asset was generated or changed. The same right-tab image uses a taller proportional crop for seven role-index entries; no letter backplates were reintroduced. Roles overview reel, practice evidence/captions and selected featured cases remain forthcoming unless configured with actual source content.

## Supplied author banner update

The user supplied `authorbanner.png`; it is integrated unchanged at `assets/ui/identity/authorbanner.png` through `config.overview.authorBanner`. Native size: 715×1671. SHA-256: `f2bb95e043671ed58f4fafa5250c5daa68bdce320a140651af4be3bce1457a50`. Full contain fitting preserves the face, name and role text without cropping/stretching. The root Games/Books selector and About portrait setting are unchanged.
