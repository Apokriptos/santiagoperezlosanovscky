import { config, navigation, Projects, Roles, CaseStudies } from './data.js';
import { resolveRoute } from './router.js';
import { gamesShell } from './shell.js';
import { escape as e, bindComponents } from './components.js';
import { renderPage } from './pages.js';
const app=document.querySelector('#app');
let initial=true;
function render() {
  document.querySelectorAll('video').forEach(v=>v.pause());
  const r=resolveRoute(location.hash);
  if (r.branch==='root') app.innerHTML='<main id="main" class="branch-selector"><a href="#games"><span>GAMES</span><span class="branch-arrow" aria-hidden="true">↗</span></a><a href="#books"><span>BOOKS</span><span class="branch-arrow" aria-hidden="true">↗</span></a></main>';
  else if (r.branch==='books') app.innerHTML='<main id="main" class="books" tabindex="-1"><h1>BOOKS</h1><p>Coming later.</p><a href="#">Return to branch selector</a></main>';
  else if (r.branch==='invalid') app.innerHTML='<main id="main" class="books" tabindex="-1"><h1>Page not found</h1><a href="#games">Games overview</a><a href="#">Branch selector</a></main>';
  else {
    const data={projects:Projects,roles:Roles,'case-studies':CaseStudies}[r.section];
    const context=data ? {title:r.section.replaceAll('-',' ').toUpperCase(),items:[{title:'Overview',href:`#games/${r.section}`,active:!r.id},...data.map(i=>({title:i.title,href:`#games/${r.section}/${i.id}`,active:r.id===i.id}))]} : null;
    const left=`<a class="identity" href="#">${e(config.name)}</a><p class="rail-label">GAMES</p><nav class="primary-nav" aria-label="Games">${navigation.map(n=>`<a href="${n.href}" ${n.id===r.section ? 'aria-current="page"' : ''}>${n.title}</a>`).join('')}</nav><a class="studio-link" href="${e(config.studioUrl)}" target="_blank" rel="noopener noreferrer">AOBSCURA GAMES ↗</a>`;
    app.innerHTML=gamesShell({left,main:renderPage(r)},context);
    document.querySelector('#menu-toggle').addEventListener('click',event=>{
      const open=event.currentTarget.getAttribute('aria-expanded')!=='true';
      event.currentTarget.setAttribute('aria-expanded',String(open)); document.querySelector('.games-shell').classList.toggle('menu-open',open);
    });
    document.querySelector('#context-select')?.addEventListener('change',event=>location.hash=event.target.value);
    document.querySelector('.games-shell').classList.toggle('debug',new URLSearchParams(location.search).has('debug'));
    bindComponents(app);
  }
  document.title=`${r.item?.title || navigation.find(n=>n.id===r.section)?.title || (r.branch==='books' ? 'Books' : 'Portfolio')} — ${config.name}`;
  if (!initial) { document.querySelector('#main')?.focus({preventScroll:true}); window.scrollTo(0,0); }
  initial=false;
}
window.addEventListener('hashchange',()=>{
  // Local in-page anchors are handled without confusing the portfolio router.
  if (['#projects-video','#roles-video','#main'].includes(location.hash)) return;
  render();
});
// Scroll links should preserve URL route state and work after refresh/back/forward.
document.addEventListener('click',event=>{
  const a=event.target.closest('a');
  if(a && ['#projects-video','#roles-video','#main'].includes(a.getAttribute('href'))) {
    const target=document.querySelector(a.getAttribute('href'));
    if(target) {event.preventDefault();target.scrollIntoView();target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}
  }
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape' && document.querySelector('.menu-open')) {
    document.querySelector('.games-shell').classList.remove('menu-open');
    const button=document.querySelector('#menu-toggle');button.setAttribute('aria-expanded','false');button.focus();
  }
});
render();
