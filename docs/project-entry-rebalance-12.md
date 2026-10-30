# Cream background restoration and Project Detail proportions

The previous approved cream artwork and foreground styling are restored by removing the dark trial stylesheet from production and stress-fixture entry points. The trial assets and stylesheet remain stored but inactive. Projects Overview spotlight, Roles iterations, supplied author banner, rails and Case Studies Coming soon behavior are retained.

All three game entries share the updated Project Detail recipe. The media/text columns now use a 1.35:1 ratio within a centered maximum 1000px content grid. Video/gallery frames fill the media column; the previous 29dvh frame-width cap is removed. At canonical desktop the media is roughly 20% wider than that former cap. The build and description column is narrower, including on large displays where it previously expanded substantially.

Case-study links fit their content with a 380px maximum. Download actions fit their labels rather than stretching across the build panel; icon/label spacing is natural. The video Play Gameplay button is compact and stays at the lower left of its poster. Touch targets remain at least 44px. Real links and all copy are retained.

Desktop description padding, prose leading and header/gallery-index spacing are compacted to keep the larger media and gallery controls in the approved single-screen height. Narrower views retain the existing stacked structure. All media preserves 16:9 proportions and contain fitting.

## Files

- `index.html`, `tests/stress.html`: dark theme no longer loaded.
- `styles/project-detail.css`: shared entry proportions and compact actions.
- `tests/qa.js`: approved cream background assertion restored.
- `tests/projects-browser.html`: assertions for enlarged media, narrower build panel and compact actions.
- `tests/browser-results.json`, `tests/projects-browser-results.json`: refreshed results.
- `ASSET_MANIFEST.md`, `UI_COMPONENT_STATUS.md`: current trial status.
- `docs/project-entry-rebalance-12.md`: this report.

No data/config, routing, media, asset or JavaScript controller changes.

## Validation

`node tests/verify.mjs`; Projects suite at 1434, 1623, 1920, 768, 390 and 320px covering all three games, 16:9 media, exact build URLs, project/case routes, galleries, keyboard behavior, focus layering and responsive overflow; full portfolio regression for canonical rail geometry and desktop fit, all routes, media decoding, mobile controls and history; visual preview; `git diff --check`.

Existing content/evidence placeholders remain. No commit or push attempted. Delivery is the complete repository directly at ZIP root, excluding Git/caches/transfers, checked by CRC, exact file inventory and per-file SHA-256 against the final working tree.

Suggested commit: `Restore cream background and rebalance project entry media`
