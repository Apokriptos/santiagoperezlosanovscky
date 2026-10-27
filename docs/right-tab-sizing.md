# Right-side tab artwork sizing correction

`styles/games-visual.css` now applies `assets/polished_righttab_final.png` as the actual single-layer right-rail background with explicit `center top / cover no-repeat`. The former two-layer background declaration is removed. `styles/fidelity.css` no longer replaces only the image URL.

The previous URL-only replacement inherited sizing from the first layer of the old gradient/image background, causing a native-size crop. The corrected declaration displays the artwork's complete black/cream/red composition down the rail, including the red lower section and bottom halftone. There is no dark gradient overlay.

The 134px rail width, HTML links, timeline bullets and red active node remain intact. No route, data, project media, content or placeholder was changed.

Verification: Node configuration/router/media checks and whitespace checks pass. Browser regression checks include an explicit `background-size: cover` assertion alongside final-asset/no-overlay checks, canonical shell dimensions, desktop no-scroll, responsive layouts and navigation. All required Games desktop families pass at 1434 × 913. Visual proof is supplied with the delivery.

Suggested commit: `Fix final right-tab artwork sizing`.

Delivery: complete root-level repository ZIP, excluding `.git`, caches and transfer artifacts; CRC and every archived file hash are verified against the tested working tree. Extract over `F:\Git\santiagoperezlosanovscky` without touching its existing `.git`. No Git push was attempted.
