# Final Games artwork and real-content integration

## Approved final artwork

The canonical Games background is `assets/polished_background_final.png` (1570 × 1002). The contextual rail uses `assets/polished_righttab_final.png` (480 × 3272). Both files match the approved local sources byte-for-byte. The final computed backgrounds contain only the approved image URL, without old artwork layers or gradient overlays. The paper retains proportional cover sizing and centered top positioning; the right rail retains its 134px width and HTML/CSS timeline navigation. A small text shadow supports label contrast without darkening the artwork. Original/intermediate assets remain archived but are not the rendered Games sources.

## Project identities and media

The existing real project titles and source files were retained and verified. Internal IDs remain stable. The following files are beneath `media/`; no project media was copied into `assets/`.

| Project and route | Cover/poster | Gallery screenshots | Primary video |
| --- | --- | --- | --- |
| Hollow Graves — `#games/projects/project-1` | `hollow-graves/MainPic.png` | `hollow-graves/ScreenShot00000.png`, `ScreenShot00002.png`, `ScreenShot00005.png` | `hollow-graves/Hollowgravesshowcasenew.mp4` |
| Reditus Umbrae — `#games/projects/project-2` | `reditus-umbrae/ScreenShot00001.png` | `reditus-umbrae/ScreenShot00002.png`, `ScreenShot00004.png`, `ScreenShot00006.png` | `reditus-umbrae/Reditusumbraeshowcasenew.mp4` |
| Dreadwoods — `#games/projects/project-3` | `dreadwoods/DW_SS11.png` | `dreadwoods/DW_SS2.png`, `DW_SS20.png`, `DW_SS24.png` | `dreadwoods/Dreadwoods - Video - Final.mp4` |

Overview and Projects carousels use these covers and real titles. Project Detail retains its four-region composition with native video controls, poster, three-image gallery, and build section. Screenshots retain their aspect ratio; there are no recoloring filters. Roles remain unchanged.

## Case Studies

| Case | Project | Cover |
| --- | --- | --- |
| Designing Investigation in Hollow Graves (`case-1`) | Hollow Graves | Project cover above |
| Frenzy & Combat in Reditus Umbrae (`case-2`) | Reditus Umbrae | Project cover above |
| Exploration in Dreadwoods (`case-3`) | Dreadwoods | Project cover above |

These identities appear in the index cards, rail, headings, selectors and related project links. All three cases are data-driven. Covers are general project media, not analytical evidence.

Hollow Graves now has seven approved steps: Context, Design Problem, Investigation Loop, GhostSight, Clues & Feedback, Iteration, Outcome. Existing `step-1` through `step-4` IDs are preserved and extended through `step-7`. Reditus retains its two existing placeholder steps; Dreadwoods has one explicit `Steps forthcoming` slot. Both carry `structurePending: true`. Analytical prose, questions, ownership and exact evidence remain placeholders rather than invented claims.

## Build links

Read-only verification of [Aobscura games.config.js](https://github.com/Apokriptos/aobscuragames/blob/main/games.config.js), at file SHA `842b5a91f5de7fe39640ce4ee3f792ee7aac9d1d`, confirmed these configured build destinations:

- Hollow Graves: `https://drive.google.com/file/d/16a5fx6jZp_mfh7tM_XKza_Ro3E-bnU9-/view?usp=sharing`
- Reditus Umbrae: `https://drive.google.com/file/d/1Zc0uigVurvcOhfjpLCnYv9G74CkCa6Nv/view?usp=drive_link`
- Dreadwoods: no configured build URL; pending state retained.

The two available links and Google Drive provider labels are integrated. Verification confirms the reference configuration, not anonymous download access or the binaries themselves. Aobscura was not modified. No reference pitch prose or role ownership was imported.

## Loading behavior

Carousels render images only. A project video element is created only when its play button is activated; it uses `preload="metadata"`, native controls, keyboard focus and a poster. It does not autoplay with audio. Navigating away stops/removes the player. No other project's MP4 is initialized. No caption files were supplied.

## Verification

Node checks cover 30 valid routes, invalid routes, arbitrary 12-step rendering, configuration/document states, media-file existence, shell ownership, approved case relationships and the exact seven-step sequence. Browser checks verify final computed artwork has no gradient overlay, no project player initializes on Overview or before activation, all 12 project images decode, and all three videos decode with valid dimensions/duration.

All 28 Games routes are checked at 1434 × 913. All 26 routes in the required page families fit vertically at canonical desktop and 1920 × 913; main client and scroll heights both measure 913px. Canonical widths remain 251 / 1183 and 251 / 1049 / 134. Route details and measurements are recorded in `tests/browser-results.json`.

| Required desktop family | 1434 × 913 |
| --- | --- |
| Games Overview | PASS |
| Projects Overview | PASS |
| Project Detail | PASS |
| Roles Overview | PASS |
| Role Detail | PASS |
| About Me | PASS |
| Case Studies Overview | PASS |
| Case Study Cover | PASS |
| Case Study Step | PASS |

Responsive checks cover every Games route at widths 320, 360, 390, 768, 1000, 1200 and 1920 with no horizontal page overflow. Narrow/short-window scrolling, mobile menus/selectors, carousel controls/keyboard, Back/Forward, deep links, CV/PDF serving and dynamic case/step fixtures pass. JavaScript syntax and whitespace checks pass. Visual review includes Case Studies index, Hollow Graves cover and GhostSight step, and all three project details, particularly Dreadwoods.

## Remaining placeholders and delivery

Final project prose, roles/tags, professional biography, owner portrait, contact details, Case Study analysis/evidence, Reditus/Dreadwoods step structures and Dreadwoods build URL remain intentionally pending. Books remains a placeholder. Production hosting and external build binaries were not exercised.

No shell rebuild, route-ID migration, unrelated page redesign, Git push or authentication retry was performed. Implementation changes are limited to final artwork styling, centralized Case Study/build data and relevant tests/documentation. Existing media integration and the CV are preserved.

Suggested GitHub Desktop commit: `Integrate final Games artwork and real project media`.

The complete `portfolio-update.zip` contains repository files directly at its root and excludes `.git`, caches, temporary artifacts, bundles/patches and previous ZIPs. CRC, full inventory and every archived file hash are checked against the final tested working tree. Extract over `F:\Git\santiagoperezlosanovscky`; the existing `.git` remains untouched. User-facing ZIP: `C:\Users\Santi\Documents\Codex\2026-10-26\files-pasted-by-the-user-you\outputs\portfolio-update.zip`.
