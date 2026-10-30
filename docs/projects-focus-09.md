# Projects Overview focus interaction

The existing Projects Overview remains the layout source of truth. The supplied mockup informs interaction only; its alternate shell, content and card composition were not implemented.

## Files

- `styles/project-detail.css`: scoped CSS focus mode.
- `tests/projects-browser.html`: focus layering, reset, glow, outline and unchanged layout geometry checks; waits for actual rendering in the asynchronous additional-project fixture.
- `tests/projects-browser-results.json`: refreshed browser results (same result structure as the preceding pass).
- `UI_COMPONENT_STATUS.md`: current interaction status.
- `docs/projects-focus-09.md`: this report.

No production JavaScript, markup, project data, media, links or asset files changed. No shared primitive was extracted because this behavior currently belongs to one screen.

## Behavior

One pointer-transparent pseudo-element shades only the central index page at 50% black. Resting cards and normal content sit below it; the active card sits above it with a 5px transform-only lift, compact shadow, cream edge/outline and a faint cream/red radial highlight. The original card rotation is preserved; no scale or intrinsic geometry changes. Existing palette, surface, duration and easing tokens are reused. The local duration is 180ms (1.5 times the shared 120ms token).

Hover activates only for a fine pointer with hover support. Keyboard `:focus-visible` receives equivalent selection hierarchy and a clear 3px cream outline at every width. Keyboard focus takes priority over pointer hover so two cards cannot compete above the shade. Pagination selection remains independent of this temporary visual state. Outside either active state, the normal presentation returns.

Touch-only pointer hover cannot activate focus mode; its former hover lift/shadow is also suppressed. Keyboard input on a hybrid/touch device still works through `:focus-visible`. This intentionally uses `:focus-visible` rather than generic `:focus-within`: each card is a single semantic anchor, and pointer/touch focus must not leave a sticky spotlight after tapping.

Reduced motion retains shade/highlight hierarchy, disables transitions and sets lift to zero, preserving original rotation. No mouse tracking, continuous animation, blur, canvas or WebGL is introduced. Artwork is left at its original brightness/saturation; artificial brightening was optional.

## Checks

- `node tests/verify.mjs`: passed, including routes, data/media, shell ownership and existing UI contracts.
- Projects browser suite: passed at 1434, 1920, 768, 390 and 320px; links, selection/pagination, keyboard navigation, configured galleries, 16:9 media and responsive overflow checks remain intact. Desktop pages fit without scrolling.
- Added assertions confirm transparent resting overlay, input pass-through, active card above overlay, visible glow/outline, no reflow in card dimensions/positions and overlay reset on focus leaving cards.
- Native keyboard Tab and pointer hover visually verified. A focus-state screenshot and a full pointer-hover composition were captured. Original rail geometry stays unchanged.
- Touch hover gating and reduced-motion branches checked by CSS inspection; no physical touch-device or OS reduced-motion emulation was performed.
- `git diff --check`: passed; existing line-ending normalization warnings only.

No new placeholders. Existing introductory copy remains forthcoming. No commit or push attempted. Delivery contains the full final repository directly at ZIP root, excludes Git/cache/previous transfer artifacts, and is checked by CRC, exact inventory and every file SHA-256 against the final working tree.

Suggested commit: `Add project focus hover interaction`
