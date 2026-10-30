# Projects focus second pass

The white strip in the earlier screenshot came from the test preview fitting a canonical 1434×913 viewport into a wider canvas. Production already fills its viewport. Shared shell widths and production card layout are preserved.

`tests/preview.html` now centers explicit canonical/tablet/mobile viewports against the dark site color, with a correctly sized preview stage. The optional `?fit=1&viewport=screen#games/projects` mode uses a real responsive viewport with height 913 and width calculated from the browser aspect ratio. At a 1280×720 browser canvas it previews 1623×913, filling the canvas without a white strip. Resize recalculates the stage and iframe dimensions. This is preview-only behavior, not production scaling.

The active hover frame now uses its actual clipped silhouette for the cream/red edge glow, removing the detached rectangular pointer-hover outline. The local radial highlight extends farther behind the card, with a warmer tint. The single central shade is warm black at 55%. Keyboard focus retains its distinct 3px outline and the same frame highlight. Original rotation, 5px lift, 180ms timing, reduced-motion handling and touch hover gating remain. Mobile glow bounds are smaller to avoid creating horizontal scroll. No content, project artwork or routes changed.

## Files

- `styles/project-detail.css`
- `tests/preview.html`
- `tests/projects-browser.html`
- `tests/projects-browser-results.json`
- `UI_COMPONENT_STATUS.md`
- `docs/projects-focus-10.md`

## Validation

`node tests/verify.mjs` and `git diff --check` passed. The Projects browser suite checks 1434, 1623, 1920, 768, 390 and 320px, including rest/reset states, focus hierarchy, unchanged card layout geometry, contour glow, pagination, project links, galleries and responsive overflow. Native pointer hover was visually inspected in the full-canvas screen preview. Touch/reduced-motion branches remain CSS-inspected rather than physically emulated. Full portfolio regression results from the earlier iteration remain in `tests/browser-results.json`.

The repository ZIP is checked against the final working tree with CRC, exact file inventory and every file SHA-256. Files are directly at ZIP root; Git, caches and prior transfer artifacts are excluded. No new assets or placeholders. Existing introductory copy remains forthcoming.

Suggested commit: `Refine project spotlight and correct preview framing`
