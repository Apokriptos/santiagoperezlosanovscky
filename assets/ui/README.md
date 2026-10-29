# UI SVG pack · Pass 01

This folder contains six role icons and seven action icons. These are reusable assets, not an implementation of the approved screens. `asset-index.json` is the canonical lookup table. Pass 02 adds `src/ui-icons.js`, generated from that index, and the shared renderers in `src/ui.js`. Existing role icon holders and project action glyphs now use the approved files without duplicating SVG paths.

- ViewBox: `0 0 24 24` for all 13 icons.
- Stroke family: 2.25 units, round caps/joins; filled play triangle and small filled controller/runner details where appropriate.
- Role fallback color: cream `#fff9ed`, intended for a black icon plate.
- Actions: `currentColor` throughout.
- Recommended role display sizes: 24–48px. Review includes 16/24/32/48/64px. Actions are reviewed at 16/24/32/48px on black, cream and red.
- Geometry is original project work or normalized from the existing inline helper; no branded/proprietary UI or third-party icon library was copied.

## Canonical reuse

`previous` uses `ui_action_arrow-left.svg`; `next` uses `ui_action_arrow-right.svg`. Generic controller/gamepad usage can reuse `ui_role_icon_technical-game-design.svg` with the host color. Do not create duplicate previous/next/controller files. Folder is a neutral destination symbol, not a provider logo.

Use inline SVG for CSS color inheritance. When inline, ordinary CSS `color` overrides a role's cream presentation fallback. External SVG loaded with `<img>` does **not** inherit color from the surrounding page; roles work as cream images on black, while themeable action icons should be inlined or used as CSS masks.

```css
.ui-icon {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background: currentColor;
  mask: var(--ui-icon-url) center / contain no-repeat;
}
```

Keep icon-only controls labeled with `aria-label`. Decorative inline SVGs or mask spans should be `aria-hidden="true"`; decorative `<img>` icons need empty alt text. Role titles and action labels remain real HTML text.

No special renderer, package, icon font, gradient, embedded bitmap, script or external dependency is required.

## Review / maintenance

- `../../ASSET_MANIFEST.md` lists canonical assets, existing sources and aliases.
- `../../ASSET_ARTWORK_NEEDED.md` lists authored art and real evidence still needed.
- Open `docs/ui-asset-preview.html` from the repository root for the offline review sheet.
- Run `python scripts/build_ui_assets.py` from the root to regenerate this pack and the review sheet.
- Run `python scripts/verify_ui_assets.py` for structural checks.

Simple double slashes, halftone dots, corners, shadows and all ordinary UI frames remain code geometry. No decorative raster pack or fake portfolio evidence was created.

## Pass 02 runtime helpers

Import `icon`, `roleIcon` or `iconAsset` from `src/ui-icons.js`, or use their re-exports from `src/ui.js`. `icon('download')` returns a decorative CSS-mask span with `aria-hidden`; callers retain visible labels or accessible button names. `roleIcon('product-ownership')` is available without adding a role route. `iconAsset('next')` resolves the same canonical file as `arrow-right`. Unknown names throw to expose naming mistakes.

`styles/ui-tokens.css` supplies shared values and `styles/ui-primitives.css` supplies mask sizing/color plus opt-in tactile primitives. Load both with existing styles. The generator now produces the runtime path lookup as well as the SVGs/index/review sheet; it never embeds or duplicates SVG path data in production JS.
