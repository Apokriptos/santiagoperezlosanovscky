import { contextRail } from './ui.js';
export function gamesShell(content, context = null) {
  return `<div class="games-shell ${context ? 'has-context' : ''}">
    <header class="mobile-header"><a class="identity" href="#">Santiago Pérez Losanovscky</a><button id="menu-toggle" aria-expanded="false" aria-controls="left-rail">Menu</button></header>
    <aside class="left-rail" id="left-rail">${content.left}</aside>
    <main id="main" class="main-content" tabindex="-1">${context ? `<label class="context-selector">${context.title}<select id="context-select" aria-label="${context.title}">${context.items.map(i => `<option value="${i.href}" ${i.active ? 'selected' : ''}>${i.title}</option>`).join('')}</select></label>` : ''}${content.main}</main>
    ${context ? contextRail({...context,kind:context.kind || 'generic',legacy:true}) : ''}
  </div>`;
}
