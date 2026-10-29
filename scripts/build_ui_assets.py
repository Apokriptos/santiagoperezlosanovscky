"""Build the asset-only SVG pack and its standalone review sheet. No live UI edits."""
from pathlib import Path
import json
from html import escape

ROOT = Path(__file__).resolve().parents[1]
roles = {
 'technical-game-design': ('Technical Game Design', '<path d="M7 7h10c2 0 3 1.5 3.5 3.5l1.3 6.5c.4 2-1.7 3.2-3.1 1.8L16 16H8l-2.7 2.8c-1.4 1.4-3.5.2-3.1-1.8l1.3-6.5C4 8.5 5 7 7 7Z"/><path d="M7 10v5m-2.5-2.5h5"/><circle cx="15.5" cy="11" r=".8" fill="currentColor" stroke="none"/><circle cx="18" cy="13.5" r=".8" fill="currentColor" stroke="none"/>'),
 'level-design': ('Level Design', '<path d="m12 2 9 5v10l-9 5-9-5V7Zm-9 5 9 5 9-5M12 12v10"/>'),
 'gameplay-development': ('Gameplay Development', '<path d="m4 3 3 1 10 10-3 3L4 7Zm12 13 5 5M12 18l6-6M20 3l-3 1-4 4 3 3 4-4ZM8 13l-5 5 3 3 5-5M3 21l3-3"/>'),
 'creative-leadership': ('Creative Leadership', '<circle cx="12" cy="5.5" r="2.5"/><circle cx="4.8" cy="8" r="1.8"/><circle cx="19.2" cy="8" r="1.8"/><path d="M7 21v-5a5 5 0 0 1 10 0v5ZM2 20v-4a3.5 3.5 0 0 1 3.5-3.5M22 20v-4a3.5 3.5 0 0 0-3.5-3.5"/>'),
 'technical-animation': ('Technical Animation', '<circle cx="15" cy="3.5" r="2" fill="currentColor" stroke="none"/><path d="m8 8 4-2 4 5 4-2M12 6l-2 7 5 3-1 6M10 13l-3 6H3M8 8l-3 4"/>'),
 'product-ownership': ('Product Ownership', '<path d="M8 4H3v18h18V4h-5"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M7 10h6M7 14h4m2 4 2 2 5-5"/>'),
}
# Arrow/download/info/folder paths normalize the existing projectIcon vocabulary.
# Navigation aliases share the same files rather than creating duplicate glyphs.
actions = {
 'arrow-right': ('Arrow right / Next', '<path d="M4 12h16m-6-6 6 6-6 6"/>'),
 'arrow-left': ('Arrow left / Previous', '<path d="M20 12H4m6-6-6 6 6 6"/>'),
 'play': ('Play', '<path d="m7 4 13 8-13 8Z" fill="currentColor" stroke="none"/>'),
 'download': ('Download', '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>'),
 'external-link': ('External link', '<path d="M14 3h7v7M21 3 10 14M10 4H4v16h16v-6"/>'),
 'info': ('Information', '<path d="M12 11v6m0-11v1M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0"/>'),
 'folder': ('Folder / generic provider destination', '<path d="M3 7V4h6l3 3h9v13H3Z"/>'),
}

def svg(body, role=False):
    color = ' color="#fff9ed"' if role else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"{color}>{body}</svg>\n'

entries = []
for family, collection in [('roles', roles), ('actions', actions)]:
    for key, (label, body) in collection.items():
        prefix = 'ui_role_icon_' if family == 'roles' else 'ui_action_'
        path = ROOT / 'assets/ui' / family / f'{prefix}{key}.svg'
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(svg(body, family == 'roles'), encoding='utf-8')
        entries.append({'id': key, 'family': family, 'label': label, 'path': path.relative_to(ROOT).as_posix(), 'viewBox': '0 0 24 24'})
index = {'version': 1, 'viewBox': '0 0 24 24', 'strokeWidth': 2.25, 'entries': entries,
         'aliases': {'previous': 'arrow-left', 'next': 'arrow-right', 'controller': 'technical-game-design', 'gamepad': 'technical-game-design'},
         'usage': 'Inline SVG inherits CSS color. External img does not inherit host CSS color; roles have a cream fallback. Use inline SVG or CSS mask for themeable actions.'}
(ROOT / 'assets/ui/asset-index.json').write_text(json.dumps(index, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
role_cards = []
for key, (label, body) in roles.items():
    sizes = ''.join(f'<div class="sample"><span class="plate" style="--size:{size}px">{svg(body, True)}</span><small>{size}px</small></div>' for size in [16,24,32,48,64])
    role_cards.append(f'<article><h2>{escape(label)}</h2><div class="sizes">{sizes}</div><code>ui_role_icon_{key}.svg</code></article>')
action_cards = []
for key, (label, body) in actions.items():
    samples = ''.join(f'<div class="sample"><span class="action-plate {theme}" style="--size:{size}px">{svg(body)}</span><small>{size}px</small></div>' for theme,size in [('ink',16),('ink',24),('paper',32),('red',48)])
    action_cards.append(f'<article><h2>{escape(label)}</h2><div class="sizes">{samples}</div><code>ui_action_{key}.svg</code></article>')
html = '''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Reusable UI vector pack — review sheet</title>
<style>
:root {color-scheme:light;--paper:#fff9ed;--ink:#191918;--red:#bc1118}*{box-sizing:border-box}body{margin:0;padding:32px;background:#f1eadc;color:var(--ink);font:15px/1.5 Arial,sans-serif}main{max-width:1400px;margin:auto}header{border-bottom:3px solid var(--ink);padding-bottom:18px;margin-bottom:24px}h1{font-size:30px;margin:0 0 8px}header p{margin:4px 0}.flag{display:inline-block;background:var(--ink);color:var(--paper);padding:3px 9px;font-size:12px;font-weight:700;letter-spacing:.08em}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin:16px 0 28px}article{border:1px solid #b1a48f;background:var(--paper);padding:18px;min-width:0}h2{font-size:16px;margin:0 0 14px}.sizes{display:flex;align-items:center;justify-content:space-between;gap:10px}.sample{display:flex;flex-direction:column;align-items:center;gap:6px}.plate,.action-plate{display:grid;place-items:center;width:calc(var(--size) + 16px);height:calc(var(--size) + 16px);background:var(--ink);color:var(--paper)}svg{display:block;width:var(--size);height:var(--size)}.paper{background:#eee4d2;color:var(--ink)}.red{background:var(--red);color:var(--paper)}code{display:block;margin-top:16px;font-size:10px;overflow-wrap:anywhere;color:#5b5144}small{font-size:10px}h3{margin:28px 0 8px;font-size:20px}aside{padding:18px;border-left:4px solid var(--red);background:var(--paper)}p{max-width:95ch}@media(max-width:900px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:600px){body{padding:16px}.grid{grid-template-columns:1fr}}
</style><main><header><span class="flag">ASSET PASS 01 · REVIEW ONLY</span><h1>Reusable role and action SVGs</h1><p>Six role glyphs · seven action glyphs · 24 × 24 viewBox · 2.25-unit strokes</p><p>Standalone asset review. No portfolio screen, route, hierarchy or professional content has been implemented or changed.</p></header>
<h3 id="role-icons">Role icons · cream on black · 16 / 24 / 32 / 48 / 64px</h3><section class="grid">ROLE_CARDS</section>
<h3 id="action-icons">Functional icons · currentColor on ink, paper and red</h3><section class="grid">ACTION_CARDS</section>
<aside><strong>Reuse rules</strong><p>Previous = arrow-left. Next = arrow-right. Controller/gamepad = Technical Game Design glyph with the host color. Folder is a neutral destination glyph, not a provider logo. No branded symbols or raster imagery are embedded.</p><p>All panels, plates, buttons, markers, slash shapes and simple halftone patterns remain component geometry. No additional decorative vector asset is justified in this pass.</p></aside></main></html>'''.replace('ROLE_CARDS',''.join(role_cards)).replace('ACTION_CARDS',''.join(action_cards))
(ROOT / 'docs/ui-asset-preview.html').write_text(html + '\n', encoding='utf-8')
# Runtime lookup is generated from the same index. SVG geometry stays in its files.
runtime = "// Generated by scripts/build_ui_assets.py from assets/ui/asset-index.json.\n"
runtime += "import { escape } from './html.js';\n"
runtime += "export const iconAssets = Object.freeze(" + json.dumps({e['id']:e['path'] for e in entries},indent=2) + ");\n"
runtime += "export const iconAliases = Object.freeze(" + json.dumps(index['aliases'],indent=2) + ");\n"
runtime += r'''const assetRoot = new URL('../', import.meta.url);
export function iconAsset(name) {
  const id = String(name).replace(/^(ui_role_icon_|ui_action_)/,'').replace(/\.svg$/,'');
  const key = iconAliases[id] || id;
  if (!Object.hasOwn(iconAssets,key)) throw new RangeError('Unknown UI icon: '+name);
  return new URL(iconAssets[key],assetRoot).href;
}
export function icon(name, { className = '' } = {}) {
  return `<span class="ui-icon ${escape(className)}" style="--ui-icon-url:url(&quot;${escape(iconAsset(name))}&quot;)" aria-hidden="true"></span>`;
}
export function roleIcon(roleId, options = {}) {
  if (!Object.hasOwn(iconAssets,roleId) || !iconAssets[roleId].includes('/roles/')) throw new RangeError('Unknown role icon: '+roleId);
  return icon(roleId,{className:'ui-role-icon '+(options.className || '')});
}
'''
(ROOT/'src/ui-icons.js').write_text(runtime,encoding='utf-8')
print(f'Built {len(entries)} SVGs, index, review sheet and runtime lookup')

if __name__ == '__main__':
    pass
