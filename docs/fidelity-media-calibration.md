# Targeted artwork and project-media calibration

The current shell, route IDs and page hierarchy are preserved. No Git push or authentication attempt was made.

## Artwork and framing

| New asset | Dimensions | Use |
| --- | --- | --- |
| `assets/paper-hd.png` | 1571 × 1001 | Games content paper background, regenerated from the supplied composition |
| `assets/left-rail-hd.png` | 725 × 2170 | Left rail texture, regenerated from the supplied artwork |
| `assets/right-rail-hd.png` | 725 × 2169 | Right rail texture, regenerated from the supplied artwork |
| `assets/selected-tab.svg` | Resolution-independent | Red selected navigation ribbon, including diagonal cuts and halftone detail |

The cream/black/red distressed art direction and corner composition remain. The rail sources now exceed twice their displayed desktop pixel dimensions. The generated paper is a fresh reconstruction, not a 4K source; its exact dimensions are listed above. Existing original assets are retained for reference. Reused content panels already use CSS surfaces, borders and vector accent bars rather than blurry panel images.

`styles/fidelity.css` applies the replacements and a connected circular-node contextual index. The active node is red and the active label bold; inactive nodes are outlined. The fixed 134px rail width is unchanged. Project names now appear throughout project cards, detail headings, rail entries and selectors.

Overview's portrait frame now meets the top, right and bottom edges at 1434 × 913. A supplied portrait will fill it using `object-fit: cover` without distortion. No owner photo exists in the supplied media, so the explicit portrait placeholder remains; no portrait was fabricated.

## Connected media

All paths below are beneath `media/`. Existing `project-1`, `project-2` and `project-3` IDs remain unchanged to preserve links.

| Project / detail route | Cover and video poster | Gallery | Playable showcase |
| --- | --- | --- | --- |
| Hollow Graves / `#games/projects/project-1` | `hollow-graves/MainPic.png` | `hollow-graves/ScreenShot00000.png`, `ScreenShot00002.png`, `ScreenShot00005.png` | `hollow-graves/Hollowgravesshowcasenew.mp4` |
| Reditus Umbrae / `#games/projects/project-2` | `reditus-umbrae/ScreenShot00001.png` | `reditus-umbrae/ScreenShot00002.png`, `ScreenShot00004.png`, `ScreenShot00006.png` | `reditus-umbrae/Reditusumbraeshowcasenew.mp4` |
| Dreadwoods / `#games/projects/project-3` | `dreadwoods/DW_SS11.png` | `dreadwoods/DW_SS2.png`, `DW_SS20.png`, `DW_SS24.png` | `dreadwoods/Dreadwoods - Video - Final.mp4` |

The covers feed both `#games` and `#games/projects` carousels. Each detail page has its poster, click-to-play video and three-image gallery. Videos load on demand and retain the existing native player and navigation cleanup. No filenames or professional claims were invented. All 49 original media-folder files were preserved unchanged from the local repository, including unused videos, screenshots and documents; the complete delivery is consequently larger.

## Verification

- Node route/configuration checks: 25 valid routes, invalid routes, arbitrary 12-step case, document/build/experience states and shell ownership passed. Every configured media file exists.
- Browser checks: all three covers and nine gallery images decode. Each of the three showcase videos decodes with valid dimensions and duration.
- All 21 configured routes in the nine required desktop page families pass at 1434 × 913 and 1920 × 913. Main client height and scroll height are both 913px. Canonical widths remain 251 / 1183 and 251 / 1049 / 134.
- All 23 Games routes pass horizontal overflow checks at widths 320, 360, 390, 768, 1000, 1200 and 1920. Navigation, carousels, keyboard controls, mobile menu, context selectors, Back/Forward, CV serving and stress fixtures pass.
- The Overview frame's top/right/bottom edges are explicitly asserted. Visual review covers Overview and all three project details, including paper, rail artwork, red tab and contextual nodes.
- JavaScript syntax and whitespace checks passed. Measurements are saved in `tests/browser-results.json`.

| Required desktop family | Result at 1434 × 913 |
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

## Remaining content and delivery

Owner portrait, final professional/project copy, detailed captions, case evidence, build links and some contact data remain placeholders. Supplied videos have no configured caption tracks. Books remains a placeholder. Production hosting was not exercised.

Architecture is unchanged. Changes are limited to asset replacements, a final calibration stylesheet, centralized project media/name configuration, video-poster rendering and relevant verification. CV files are unchanged.

Suggested commit: `Sharpen Games artwork and connect project media`.

The ZIP contains the complete finished working tree with files directly at its root, including the supplied media folder. It excludes `.git`, caches, temporary artifacts, bundles, patches and previous ZIPs. CRC, inventory and every archived file SHA-256 are verified against the final working tree. Extract over `F:\Git\santiagoperezlosanovscky`; its existing `.git` remains untouched.
