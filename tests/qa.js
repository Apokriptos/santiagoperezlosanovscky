import { Projects, Roles, CaseStudies, config } from '../src/data.js';
const frame=document.querySelector('iframe'), report=document.querySelector('#report'), results=[];
const pause=()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
const assert=(condition,message)=>{if(!condition)throw new Error(message);};
const doc=()=>frame.contentDocument;
const caseMeasurements=[];
const desktopMeasurements=[];
let loadId=0;
async function load(hash,width=1434,height=913,path='') {
  frame.width=width;frame.height=height;
  const [file,query='']=path.split('?');
  await new Promise(resolve=>{frame.onload=resolve;frame.src='/santiagoperezlosanovscky/'+file+'?qa='+ ++loadId +(query?'&'+query:'')+hash;});
  // The stress fixture dynamically imports the app after preparing its records.
  // Its window load can precede that import; wait for actual rendered content.
  if (!doc().querySelector('#app > *')) await new Promise((resolve,reject)=>{
    const observer=new MutationObserver(()=>{
      if(doc().querySelector('#app > *')) {clearTimeout(timer);observer.disconnect();resolve();}
    });
    const timer=setTimeout(()=>{observer.disconnect();reject(new Error('App did not render '+hash));},5000);
    observer.observe(doc().querySelector('#app'),{childList:true});
  });
  await pause();
}
function geometry() {
  return [...doc().querySelector('.games-shell').children].filter(n=>getComputedStyle(n).display!=='none').filter(n=>!n.classList.contains('mobile-header')).map(n=>n.getBoundingClientRect().width);
}
function noOverflow(label) { const width=Number(frame.width);assert(doc().documentElement.scrollWidth<=width,`Overflow: ${label}; ${[...doc().querySelectorAll('main *')].filter(n=>n.getBoundingClientRect().right>width).map(n=>n.className).join(', ')}`);const main=doc().querySelector('main');assert(main.scrollWidth<=main.clientWidth,'Main horizontal overflow: '+label); }
function singleScreen(label) {
  const main=doc().querySelector('main'), box=main.getBoundingClientRect();
  assert(main.scrollHeight<=main.clientHeight,'Vertical content scroll: '+label+' '+main.scrollHeight+'/'+main.clientHeight);
  assert(doc().documentElement.scrollHeight<=Number(frame.height),'Document vertical scroll: '+label);
  for(const item of doc().querySelectorAll('.case-studies-page h1,.case-studies-page h2,.case-studies-page p,.case-studies-page li,.case-studies-page button,.case-studies-page a,.case-studies-page figcaption,.case-studies-page .media')) {
    if(!item.getClientRects().length) continue;
    const b=item.getBoundingClientRect();assert(b.top>=box.top-1 && b.bottom<=box.bottom+1,'Element outside desktop viewport: '+label+' '+item.textContent.trim());
    const panel=item.closest('.print-panel');
    if(panel){const p=panel.getBoundingClientRect();assert(b.top>=p.top-1 && b.bottom<=p.bottom+1,'Content exceeds panel: '+label+' '+item.textContent.trim());}
  }
  const rail=doc().querySelector('.step-nav');if(rail)assert(rail.getBoundingClientRect().bottom<=box.bottom,'Step rail below fold');
}
function desktopFrame(label) {
  const main=doc().querySelector('main'), bounds=main.getBoundingClientRect();
  assert(main.scrollHeight<=main.clientHeight,'Desktop content scroll: '+label+' '+main.scrollHeight+'/'+main.clientHeight);
  assert(doc().documentElement.scrollHeight<=913,'Desktop document scroll: '+label);
  assert(getComputedStyle(main).overflowY==='visible','Canonical main must not depend on scrolling: '+label);
  for(const item of doc().querySelectorAll('.page h1,.page h2,.page h3,.page p,.page li,.page button,.page a,.page figcaption,.page .media,.page .cta-strip,.page .carousel-controls')) {
    if(!item.getClientRects().length)continue;
    const b=item.getBoundingClientRect();assert(b.top>=bounds.top-1 && b.bottom<=bounds.bottom+1,'Below viewport: '+label+' '+item.textContent.trim());
    const panel=item.closest('.print-panel,.panel,.role-card');
    if(panel){const p=panel.getBoundingClientRect();assert(b.top>=p.top-1 && b.bottom<=p.bottom+1,'Outside panel: '+label+' '+item.textContent.trim());}
  }
  const cta=doc().querySelector('.roles-page.detail-page .cta-strip'), grid=doc().querySelector('.role-detail-grid');
  if(cta)assert(cta.getBoundingClientRect().top>=grid.getBoundingClientRect().bottom-1,'Featured case CTA overlaps role content');
  const about=doc().querySelector('.about-layout'), trajectory=doc().querySelector('.about-page > .print-panel');
  if(about)assert(trajectory.getBoundingClientRect().top>=about.getBoundingClientRect().bottom-1,'About regions overlap');
  const gallery=doc().querySelector('.project-gallery'), video=doc().querySelector('.project-video');
  if(gallery)assert(gallery.getBoundingClientRect().top>=video.getBoundingClientRect().bottom-1,'Project rows overlap');
  desktopMeasurements.push({route:label,result:'PASS',columns:geometry(),clientHeight:main.clientHeight,scrollHeight:main.scrollHeight,overflowY:getComputedStyle(main).overflowY});
}
const routes=['#games','#games/projects','#games/roles','#games/case-studies','#games/about','#games/cv','#games/contact',...Projects.map(p=>`#games/projects/${p.id}`),...Roles.map(r=>`#games/roles/${r.id}`),...CaseStudies.flatMap(c=>[`#games/case-studies/${c.id}`,...c.steps.map(s=>`#games/case-studies/${c.id}/${s.id}`)])];
try {
  await load('#games');
  assert(!doc().querySelector('.right-rail'),'Overview must not have a contextual rail');
  const portraitBounds=doc().querySelector('.overview-portrait').getBoundingClientRect();
  assert(Math.abs(portraitBounds.right-1434)<1 && Math.abs(portraitBounds.top)<1 && Math.abs(portraitBounds.bottom-913)<1,'Overview portrait fills top/right/bottom edges');
  const roleLinks=[...doc().querySelectorAll('.overview-roles .cards a')];
  assert(roleLinks.length===config.overview.featuredRoleIds.length,'Curated roles from config');
  for (const id of config.overview.featuredRoleIds) {
    assert(roleLinks.some(a=>a.getAttribute('href')===`#games/roles/${id}`),'Role destination '+id);
  }
  const overviewCarousel=doc().querySelector('.overview-projects .carousel');
  overviewCarousel.querySelector('[data-direction="1"]').click();
  assert(overviewCarousel.querySelector('.carousel-count').textContent===`2 / ${Projects.length}`,'Overview next');
  const projectLink=overviewCarousel.querySelector('.slide:not([hidden]) a');
  assert(projectLink.getAttribute('href')===`#games/projects/${Projects[1].id}`,'Overview selected project link');
  overviewCarousel.querySelector('[data-direction="-1"]').click();
  assert(overviewCarousel.querySelector('.carousel-count').textContent===`1 / ${Projects.length}`,'Overview previous');
  overviewCarousel.querySelector('[data-slide="2"]').click();
  assert(overviewCarousel.querySelector('.carousel-count').textContent===`3 / ${Projects.length}`,'Overview pagination');
  overviewCarousel.querySelector('button').dispatchEvent(new frame.contentWindow.KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true}));
  assert(overviewCarousel.querySelector('.carousel-count').textContent===`2 / ${Projects.length}`,'Overview keyboard');
  projectLink.click();await pause();assert(doc().querySelector('h1').textContent===Projects[1].title,'Overview project route');
  await load('#games');
  doc().querySelector('.overview-roles .cards a').click();await pause();
  assert(doc().querySelector('h1').textContent===Roles.find(r=>r.id===config.overview.featuredRoleIds[0]).title,'Overview role route');
  results.push({test:'Overview config-driven roles, role/project links, carousel arrows/pagination/keyboard, no contextual rail',passed:true});
  for(const hash of routes) {
    await load(hash);
    assert(doc().querySelector('h1'),'Missing heading '+hash);
    const expected=/^#games\/(projects|roles|case-studies)/.test(hash)?[251,1049,134]:[251,1183];
    assert(JSON.stringify(geometry())===JSON.stringify(expected),`Geometry ${hash}: ${geometry()}`);
    assert(doc().querySelector('.left-rail').getBoundingClientRect().height===913,'Left height');
    const right=doc().querySelector('.right-rail');if(right)assert(right.getBoundingClientRect().height===913,'Right height');
    const items={projects:Projects,roles:Roles,'case-studies':CaseStudies}[hash.split('/')[1]];
    if(items) {
      assert(right.querySelectorAll('a').length===items.length+1,'Contextual rail data count '+hash);
      assert(right.querySelectorAll('[aria-current="page"]').length===1,'One active contextual entry '+hash);
      assert(doc().querySelector('#context-select').options.length===items.length+1,'Mobile context data count '+hash);
    }
    if(hash.startsWith('#games/case-studies/')) {
      const parts=hash.split('/'), study=CaseStudies.find(c=>c.id===parts[2]);
      if(parts[3]) assert(doc().querySelectorAll('.step-nav a').length===study.steps.length,'Case step count '+hash);
      else assert(!doc().querySelector('.step-nav'),'No step rail on case cover '+hash);
    }
    if(hash.startsWith('#games/case-studies')) {
      singleScreen(hash);const main=doc().querySelector('main');
      caseMeasurements.push({route:hash,columns:geometry(),viewportHeight:main.clientHeight,scrollHeight:main.scrollHeight,timeline:!!doc().querySelector('.step-nav')});
    }
    if(!['#games/cv','#games/contact'].includes(hash)) desktopFrame(hash);
    for(const video of doc().querySelectorAll('.video-frame')) {
      const box=video.getBoundingClientRect();assert(Math.abs(box.width/box.height-16/9)<.02,'Video aspect ratio '+hash);
    }
    noOverflow(hash);
  }
  results.push({test:'All desktop routes at 1434 × 913',routes:routes.length,withRail:[251,1049,134],withoutRail:[251,1183],overflow:false});
  results.push({test:'Every Case Studies index, cover, and step fits one canonical viewport with no vertical scroll; step rail remains visible',passed:true,measurements:caseMeasurements});
  results.push({test:'Global desktop fit for every required Games page family and configured detail route',passed:true,measurements:desktopMeasurements});
  await load('#games/about',1434,913,'tests/stress.html?about=populated');desktopFrame('Populated About fixture');
  assert(getComputedStyle(doc().querySelector('.timeline')).display==='flex','Horizontal desktop trajectory');
  assert(getComputedStyle(doc().querySelector('.about-facts .print-panel:first-child ul')).display==='grid','Compact skills grid');
  await load('#games/case-studies');
  assert(doc().querySelectorAll('.case-index-card').length===CaseStudies.length,'Overview case cards from data');
  assert(doc().querySelector('.case-carousel-controls').hidden,'No redundant controls when current cases fit');
  const first=doc().querySelector('.case-index-card').getBoundingClientRect(), last=doc().querySelector('.case-index-card:last-child').getBoundingClientRect();
  const track=doc().querySelector('.case-track').getBoundingClientRect();assert(first.left>=track.left && last.right<=track.right+1,'All current cases simultaneously visible');
  await load('#games/case-studies',1434,913,'tests/stress.html?cases=7');
  singleScreen('Seven-case carousel');
  assert(doc().querySelectorAll('.case-index-card').length===7,'Arbitrary case count');
  const cases=doc().querySelector('.case-carousel');assert(!cases.querySelector('.case-carousel-controls').hidden,'Overflow cases have controls');
  cases.querySelector('[data-case-direction="1"]').click();assert(cases.querySelector('.case-carousel-count').textContent==='2 / 3','Case carousel next');
  cases.querySelector('[data-case-direction="-1"]').click();assert(cases.querySelector('.case-carousel-count').textContent==='1 / 3','Case carousel previous');
  cases.querySelector('[data-case-page="2"]').click();assert(cases.querySelector('.case-carousel-count').textContent==='3 / 3','Case pagination');
  cases.querySelector('.case-track').dispatchEvent(new frame.contentWindow.KeyboardEvent('keydown',{key:'Home',bubbles:true}));assert(cases.querySelector('.case-carousel-count').textContent==='1 / 3','Case keyboard');
  for(const count of [4,7,12]) {
    await load('#games/case-studies/case-1',1434,913,`tests/stress.html?steps=${count}`);singleScreen(count+'-step cover');
    assert(!doc().querySelector('.step-nav'),'Cover has no timeline');
    assert(doc().querySelectorAll('.coverage-list a').length===count,'Coverage count');
    await load(`#games/case-studies/case-1/stress-step-${count}`,1434,913,`tests/stress.html?steps=${count}`);singleScreen(count+'-step view');
    assert(doc().querySelectorAll('.step-nav a').length===count,'Timeline count');
    const active=doc().querySelector('.step-nav [aria-current="step"]'), rail=active.parentElement, a=active.getBoundingClientRect(), r=rail.getBoundingClientRect();
    assert(a.left>=r.left && a.right<=r.right,'Current timeline entry visible');
    if(count===12) assert(rail.scrollWidth>rail.clientWidth,'Large timeline scrolls only horizontally');
    active.focus();active.dispatchEvent(new frame.contentWindow.KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true}));
    assert(doc().activeElement===rail.querySelectorAll('a')[count-2],'Timeline keyboard focus');
  }
  for(const count of [1,2,3]) {await load('#games/case-studies/case-1/stress-step-1',1434,913,`tests/stress.html?evidence=${count}`);singleScreen(count+' evidence items');assert(doc().querySelectorAll('.evidence figure').length===count,'Evidence count');}
  results.push({test:'Multi-card overview carousel, seven-case pagination/keyboard, 4/7/12-step covers and visible timelines, 1/2/3 evidence layouts',passed:true});
  for(const width of [1001,1200]) {await load('#games/case-studies',width);singleScreen('Case index at '+width);}
  await load('#games/case-studies/case-1/step-1',1434,600);assert(doc().querySelector('main').scrollHeight>doc().querySelector('main').clientHeight,'Short-height accessibility fallback allows content flow');
  for(const width of [320,360,390,768,1000,1200,1920]) {
    for(const hash of routes) {await load(hash,width);noOverflow(width+' '+hash);if(width===1920 && !['#games/cv','#games/contact'].includes(hash))desktopFrame('1920px '+hash);}
    results.push({test:'Responsive routes',width,routes:routes.length,overflow:false});
  }
  for(const [family,items] of [['projects',Projects],['roles',Roles],['case-studies',CaseStudies]]) {
    await load(`#games/${family}`,1434,913,'tests/stress.html');
    assert(doc().querySelectorAll('.right-rail nav a').length===items.length+2,'Added record populates rail '+family);
    noOverflow('Long contextual labels '+family);
  }
  for(const width of [320,390,768,1000,1200,1434]) {
    await load('#games/case-studies/case-1/stress-step-12',width,913,'tests/stress.html');
    const stepNav=doc().querySelector('.step-nav');
    assert(stepNav.querySelectorAll('a').length===12,'Arbitrary 12-step navigation');
    assert(stepNav.querySelector('[aria-current="step"]').textContent.includes('12'),'Last step active');
    assert(stepNav.scrollWidth>stepNav.clientWidth,'Step navigation scrolls locally');
    const active=stepNav.querySelector('[aria-current="step"]').getBoundingClientRect(), rail=stepNav.getBoundingClientRect();
    assert(active.left>=rail.left && active.right<=rail.right,'Active step revealed on deep link');
    noOverflow('12 steps '+width);
  }
  results.push({test:'Additional project/role/case rail entries, long labels, and visible active entry in 12-step navigation at six widths',passed:true});
  await load('#games/projects');
  const carousel=doc().querySelector('.carousel');carousel.querySelector('[data-direction="1"]').click();
  assert(carousel.querySelector('.carousel-count').textContent==='2 / '+Projects.length,'Carousel next');
  carousel.querySelector('[data-direction="-1"]').click();assert(carousel.querySelector('.carousel-count').textContent==='1 / '+Projects.length,'Carousel previous');
  carousel.querySelector('[data-slide="2"]').click();assert(carousel.querySelector('.carousel-count').textContent==='3 / '+Projects.length,'Carousel pagination');
  carousel.querySelector('button').dispatchEvent(new frame.contentWindow.KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true}));
  assert(carousel.querySelector('.carousel-count').textContent==='2 / '+Projects.length,'Carousel keyboard');
  results.push({test:'Carousel next, previous, pagination, keyboard',passed:true});
  await load('#games/projects/project-1');const gallery=doc().querySelector('.carousel');gallery.querySelector('[data-direction="1"]').click();assert(gallery.querySelector('.carousel-count').textContent==='2 / 3','Gallery');
  results.push({test:'Project media gallery',passed:true});
  await load('#games/roles/technical-animation');assert(doc().body.textContent.includes('retargeting'),'Technical animation scope');
  await load('#games/case-studies/case-1');assert(!doc().querySelector('.step-nav'),'Cover step rail');
  doc().querySelector('a[href="#games/case-studies/case-1/step-1"]').click();await pause();
  assert(doc().querySelector('.step-nav [aria-current="step"]'),'Active step');
  results.push({test:'Case cover and generated step navigation',passed:true});
  await load('#games',390);const button=doc().querySelector('#menu-toggle');button.click();assert(button.getAttribute('aria-expanded')==='true','Menu open');
  doc().dispatchEvent(new frame.contentWindow.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert(button.getAttribute('aria-expanded')==='false','Escape');
  await load('#games/projects',390);const select=doc().querySelector('#context-select');select.value='#games/projects/project-2';select.dispatchEvent(new frame.contentWindow.Event('change',{bubbles:true}));await pause();assert(doc().querySelector('h1').textContent===Projects[1].title,'Context selector');
  results.push({test:'Mobile menu, Escape, contextual selector',passed:true});
  for (const project of Projects) {
    const paths=[project.heroMedia.src,...project.gallery.map(item=>item.src)];
    for(const path of paths) {
      const image=new Image();image.src=new URL('../'+path,import.meta.url).href;
      await image.decode();assert(image.naturalWidth>0,'Real image decoded '+path);
    }
    await load('#games/projects/'+project.id);
    const start=doc().querySelector('.video-start');assert(start,'Playable showcase '+project.title);
    start.click();const player=doc().querySelector('video');
    player.muted=true;
    await new Promise((resolve,reject)=>{
      if(player.readyState>=2)return resolve();
      const timer=setTimeout(()=>reject(new Error('Video decode timeout '+project.title)),15000);
      player.addEventListener('loadeddata',()=>{clearTimeout(timer);resolve();},{once:true});
      player.addEventListener('error',()=>{clearTimeout(timer);reject(new Error('Video failed '+project.title));},{once:true});
    });
    assert(player.videoWidth>0 && player.duration>0,'Video metadata '+project.title);player.pause();
  }
  results.push({test:'All three project covers and nine gallery images decode; all three showcase videos decode with valid duration and dimensions',passed:true});
  await load('#games/cv');assert(doc().querySelector('iframe.cv-document'),'Supplied CV preview integrated');assert(!doc().querySelector('.cv-empty'),'Real CV replaces placeholder');
  const previewResponse=await fetch(doc().querySelector('iframe.cv-document').src);assert(previewResponse.ok && (await previewResponse.text()).includes('PROFESSIONAL SUMMARY'),'Searchable document preview served');
  const pdf=doc().querySelector('a[download]').href, response=await fetch(pdf);assert(response.ok,'CV PDF served');assert(response.headers.get('Content-Type').includes('application/pdf'),'PDF MIME type');
  assert((await response.text()).startsWith('%PDF-'),'CV file is a PDF');
  assert(doc().querySelector('a[download]').href===pdf,'Download uses the same supplied PDF');
  await load('#games/contact');assert(doc().querySelector('a[href="https://github.com/Apokriptos"]'),'GitHub config link');assert(!doc().querySelector('form'),'No contact form');
  await load('#books');assert(doc().querySelector('h1').textContent==='BOOKS','Books');
  await load('');assert(doc().querySelectorAll('main a').length===2,'Root branches only');
  for(const width of [320,360,390,768,1000,1200,1434]) {await load('',width);noOverflow('Landing '+width);}
  results.push({test:'CV/contact states, configured links, Books and minimal root',passed:true});
  await load('#games/projects');doc().querySelector('.primary-nav a[href="#games/roles"]').click();await pause();
  assert(doc().querySelector('h1').textContent==='AREAS OF WORK','Navigation');
  frame.contentWindow.history.back();await new Promise(resolve=>setTimeout(resolve,100));assert(doc().querySelector('h1').textContent==='GAME PROJECTS','Back');
  frame.contentWindow.history.forward();await new Promise(resolve=>setTimeout(resolve,100));assert(doc().querySelector('h1').textContent==='AREAS OF WORK','Forward');
  await load('#games/roles');assert(doc().querySelector('h1').textContent==='AREAS OF WORK','Refresh-equivalent deep link');
  results.push({test:'Hash navigation, Back/Forward, fresh deep link under repository prefix',passed:true});
  await load('#games/projects');assert(JSON.stringify(geometry())==='[251,1049,134]','Final context geometry');
  await load('#games');assert(JSON.stringify(geometry())==='[251,1183]','Final overview geometry');
  results.push({test:'Final desktop geometry regression',passed:true});
  report.textContent=JSON.stringify({passed:true,results},null,2);
} catch(error) { report.textContent=JSON.stringify({passed:false,error:error.message,results},null,2);throw error; }
