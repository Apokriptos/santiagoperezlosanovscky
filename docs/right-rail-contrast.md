# Right-rail contrast refinement

The approved `polished_righttab_final.png` remains the actual full-height right-tab artwork. `styles/fidelity.css` now gently darkens it with a neutral multiply blend (approximately 26% dimming), preserving its black/cream/red composition and `cover` sizing.

`src/shell.js` wraps contextual labels in an inline span. Each label and rail heading has a soft near-black shade behind its text, with line-by-line background continuation for wrapped titles. The timeline, red active bullet, 134px rail width, existing labels and links are preserved.

This contrast treatment follows the latest user request and supersedes the earlier undimmed artwork requirement. No project data, route, media, content or placeholders changed.

Verification: Node router/configuration/media checks, whitespace checks, browser desktop geometry/no-scroll, responsive and navigation regression checks pass. Long Case Study labels were visually reviewed over the artwork's bright diagonals. Existing content placeholders remain unchanged.

Suggested commit: `Improve contextual rail artwork and label contrast`.

The complete repository ZIP retains root-level files, excludes `.git` and transfer/cache artifacts, and is verified by CRC, inventory and every archived file SHA-256 against the final tested working tree. No push was attempted.
