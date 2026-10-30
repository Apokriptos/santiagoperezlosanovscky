# Roles functionality and visual polish

Scoped to the current Roles screens. Palette, artwork, typography, rails, balanced right panels, full-width practice frame and overview dialog are retained.

- View role links have distinct accessible names identifying their destination.
- Selecting the current practice example preserves its player and playback state.
- Arrow/Home/End navigation from practice indices moves focus with selection. Modified shortcuts and editable/native player controls retain their normal behavior.
- Examples without captions receive a numbered announcement.
- Unavailable arrows are subdued; selected indices gain an inset marker.
- Selected Experience and Role & Experience use consistent heading scale and interior spacing. Long prose wraps safely. Cards have a restrained red icon/CTA hover cue without moving their geometry.

Changed: `src/role-ui.js`, `styles/roles.css`, `tests/roles-browser.html`, `tests/roles-browser-results.json`, and this report. No data/config or assets changed. Missing reel, role copy and evidence remain forthcoming. Case Studies availability is unchanged.

Validation: `node tests/verify.mjs`; Roles browser suite at 1434, 1920, 768, 390 and 320px, including all six entries, configured media, modal reset/focus, playback preservation and index focus; visual preview; `git diff --check`. Full portfolio results from the preceding iteration remain in `tests/browser-results.json`; this scoped pass uses the updated Roles suite.

The complete repository ZIP is verified against the final working tree by CRC, inventory and every file SHA-256. Git metadata, caches and previous transfer artifacts are excluded.

Suggested commit: `Polish Roles controls, accessibility and panel spacing`
