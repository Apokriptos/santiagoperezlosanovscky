import { Projects, Roles, CaseStudies, config } from '../src/data.js';
const frame=document.querySelector('iframe'), report=document.querySelector('#report'), results=[];
const pause=()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
const assert=(condition,message)=>{if(!condition)throw new Error(message);};
const doc=()=>frame.contentDocument;
let loadId=0;
async function load(hash,width=1434,height=913,path='') {
  frame.width=width;frame.height=height;
  await new Promise(resolve=>{frame.onload=resolve;frame.src='/santiagoperezlosanovscky/'+path+'?qa='+ ++loadId +hash;});
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
const routes=['#games','#games/projects','#games/roles','#games/case-studies','#games/about','#games/cv','#games/contact',...Projects.map(p=>`#games/projects/${p.id}`),...Roles.map(r=>`#games/roles/${r.id}`),...CaseStudies.flatMap(c=>[`#games/case-studies/${c.id}`,...c.steps.map(s=>`#games/case-studies/${c.id}/${s.id}`)])];
try {
  await load('#games');
  assert(!doc().querySelector('.right-rail'),'Overview must not have a contextual rail');
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
    for(const video of doc().querySelectorAll('.video-frame')) {
      const box=video.getBoundingClientRect();assert(Math.abs(box.width/box.height-16/9)<.02,'Video aspect ratio '+hash);
    }
    noOverflow(hash);
  }
  results.push({test:'All desktop routes at 1434 × 913',routes:routes.length,withRail:[251,1049,134],withoutRail:[251,1183],overflow:false});
  for(const width of [320,360,390,768,1000,1200,1920]) {
    for(const hash of routes) {await load(hash,width);noOverflow(width+' '+hash);}
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
  await load('#games/projects',390);const select=doc().querySelector('#context-select');select.value='#games/projects/project-2';select.dispatchEvent(new frame.contentWindow.Event('change',{bubbles:true}));await pause();assert(doc().querySelector('h1').textContent==='Project 02','Context selector');
  results.push({test:'Mobile menu, Escape, contextual selector',passed:true});
  await load('#games/cv');assert(doc().querySelector('.cv-empty'),'PDF placeholder');assert(!doc().querySelector('object'),'No fake PDF');
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
