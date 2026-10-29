# Project Detail — approved mockup refinement

## Files and scope

Changed `src/pages.js`, `src/components.js`, `src/data.js`, `index.html`, `tests/stress.html`, `tests/qa.js`, `tests/verify.mjs` and documentation. Added `styles/project-detail.css`.

The shared shell, rails, router and non-project page layouts are unchanged. The template remains generic and data-driven. Central project subtitles are now real source taglines, so the same values also appear on existing project cards.

## Layout

The compact header retains breadcrumb, large real title, italic tagline and available genre metadata. Unverified team/status fields are omitted. Four regions remain in the existing content rectangle: real gameplay video, The Game, Media Gallery and Playable Build. The stylesheet is scoped to Project Detail; no global scaling or font reduction is used. The approved final paper and black-top contextual rail remain intact.

The video keeps 16:9, a real poster and a central accessible play button. Activation initializes only that project's player, with native controls, `preload="metadata"` and no autoplay with audio. Project switching removes the player.

## The Game

Removed the tag/feature bullet row. The panel now contains continuous descriptive paragraphs and its associated Case Study CTA at the bottom, with no divider through the prose. Invalid/missing Case Study relationships omit the CTA.

Copy, subtitle and genre come from [Aobscura games.config.js](https://github.com/Apokriptos/aobscuragames/blob/main/games.config.js): the original primary description, secondary description and first premise paragraph are reused verbatim for each project. No pitch prose, metadata or ownership was invented. The mockup's haunted-town tagline and chapel illustration were not used because the verified Hollow Graves source describes Belerofonte III and no suitable supplied decorative illustration exists. The optional `decorativeArt` field is supported; current panels remain clean.

## Gallery

The new reusable `projectGallery` component renders one dominant image, a compact vertical thumbnail strip, index, previous/next controls and an obvious red selected border. Six screenshots per project come from centralized data. Thumbnail selection, arrows, Left/Right, Home and End update the selected image and pressed state. The active thumbnail is revealed within the local strip without scrolling the page. On mobile the strip becomes horizontal beneath the image.

The selected image uses `object-fit: contain`; thumbnails also retain aspect ratio. Native screenshot files are preserved and shared between stage and thumbnails through browser caching. Thumbnails render at small CSS dimensions and lazy-load; there are no hidden full-size slide copies and no MP4s in galleries.

| Project | Six gallery files, beneath its `media/<project>/` folder |
| --- | --- |
| Hollow Graves | `ScreenShot00000.png`, `ScreenShot00001.png`, `ScreenShot00002.png`, `ScreenShot00003.png`, `ScreenShot00005.png`, `ScreenShot00006.png` |
| Reditus Umbrae | `ScreenShot00001.png`, `ScreenShot00002.png`, `ScreenShot00003.png`, `ScreenShot00004.png`, `ScreenShot00005.png`, `ScreenShot00006.png` |
| Dreadwoods | `DW_SS11.png`, `DW_SS2.png`, `DW_SS9.png`, `DW_SS24.png`, `ScreenShot00007.png`, `ScreenShot00000.png` |

Primary videos remain `Hollowgravesshowcasenew.mp4`, `Reditusumbraeshowcasenew.mp4` and `Dreadwoods - Video - Final.mp4` in their corresponding folders. Posters remain `MainPic.png`, `ScreenShot00001.png` and `DW_SS11.png`.

## Build panel

The build region now groups source-confirmed availability and a large red CTA on the left, compact provider metadata on the right, and the existing Aobscura evaluation/distribution notice below. Unknown platform, architecture, file size and version are omitted.

Read-only [media-update-20261023.js](https://github.com/Apokriptos/aobscuragames/blob/main/media-update-20261023.js) supersedes the base config. The current destinations are:

- Hollow Graves: `https://drive.google.com/file/d/16a5fx6jZp_mfh7tM_XKza_Ro3E-bnU9-/view?usp=sharing`
- Reditus Umbrae: `https://drive.google.com/drive/folders/1db4vGlSh1NJghHg6os328QoY0oEfYDyK?usp=sharing`
- Dreadwoods: `https://drive.google.com/file/d/1yjH6Oi-ztkgb1dWLLasjnNVkFZPQVwDr/view?usp=sharing`

The provider is Google Drive for all three. Reditus no longer uses the older file URL. Dreadwoods now uses its confirmed available build. These destinations were verified against the read-only reference configuration; anonymous binary download access was not exercised. Aobscura was not modified.

## Verification

| Route at 1434 × 913 | Result | Main client / scroll height | Shell columns |
| --- | --- | --- | --- |
| `#games/projects/project-1` | PASS | 913 / 913 | 251 / 1049 / 134 |
| `#games/projects/project-2` | PASS | 913 / 913 | 251 / 1049 / 134 |
| `#games/projects/project-3` | PASS | 913 / 913 | 251 / 1049 / 134 |

All four regions, header, CTAs and controls fit without desktop page scrolling. The thumbnail list alone intentionally scrolls locally. Checks verify its frame and active item remain visible.

Node checks pass for 30 valid routes, invalid routes, arbitrary case steps, document/config states, shell ownership, media-file existence, real prose, data-driven gallery count and the current Reditus folder URL. JavaScript syntax and whitespace checks pass.

Browser checks pass for all 28 Games routes, required single-screen families at 1434 × 913 and 1920 × 913, horizontal overflow at 320/360/390/768/1000/1200/1920 widths, carousel and navigation behavior, mobile menu/selectors, Back/Forward, deep links and CV serving. Each project's gallery is tested for next/previous, thumbnail selection, pressed state, End, keyboard wrap and active-thumbnail reveal. Mobile selection/reveal is tested for each project. All configured screenshots and all three videos decode. Exact results are in `tests/browser-results.json`.

All three Project Detail screens were visually reviewed. The approved shell and unrelated layouts are preserved.

## Remaining content and delivery

No decorative illustration, team attribution, development status, file size or platform facts were invented. Those optional fields remain unavailable. Longer future prose should be checked against the desktop space budget. Other existing portfolio and Case Study content placeholders remain unchanged.

Suggested commit: `Refine Project Detail layout to approved mockup`.

The complete `portfolio-update.zip` contains repository files directly at its root. It excludes `.git`, caches, temporary files, previous ZIPs and bundles/patches. CRC, inventory and every archived file SHA-256 are checked against the final tested working tree. Extract over `F:\Git\santiagoperezlosanovscky`; its existing `.git` is untouched. No Git push was attempted.
