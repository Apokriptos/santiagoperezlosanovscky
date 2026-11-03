# About portrait — Pass 16

Derived `assets/ui/identity/about-portrait-v1.png` from the existing supplied `authorbanner.png` with the built-in imagegen editor, as requested. The 1086×1448 opaque PNG uses a 3:4 composition, a charcoal backdrop and restrained red edge lighting. Banner lettering and poster registration graphics are removed. The original pose, facial identity, black shirt/tie and tattooed arm provide the reference. The original author banner remains unchanged.

`config.portrait` in `src/data.js` now supplies the image and descriptive alt text to the existing About renderer. Existing cover fitting adapts the image to the responsive angular frame; no layout or global style changes were needed. The Overview still uses its original author banner.

Validation: `node tests/verify.mjs` passes. The About browser matrix passes at all six required desktop resolutions plus tablet and two phone sizes, including portrait decoding/alt text, horizontal containment and career controls. All six desktops retain no page-level vertical scroll. The image was visually reviewed in the full desktop composition. Results: `tests/about-browser-results.json`.

About no longer has a portrait placeholder. This is a generated edit derived from the supplied portrait, rather than a newly supplied unedited photograph. Other existing content placeholders are unchanged.

Delivery: complete working-tree ZIP, repository files directly at root, excluding `.git`, caches, temporary files, previous ZIPs and transfer artifacts. Every file's SHA-256, archive inventory and CRC are verified against the unchanged final working tree.

Suggested commit: `Add derived About Me portrait`
