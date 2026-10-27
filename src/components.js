export const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const root = new URL('../', import.meta.url);
export function assetUrl(value) {
  if (!value) return '';
  try { const url = new URL(value, root); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; }
  catch { return ''; }
}
export const link = (href, label, cls = '') => `<a class="${cls}" href="${escape(href)}">${escape(label)}</a>`;
export function external(value, label, download = false) {
  const href = assetUrl(value);
  return href ? `<a class="button" href="${escape(href)}" ${download ? 'download' : 'target="_blank" rel="noopener noreferrer"'}>${escape(label)}${download ? '' : ' ↗'}</a>` : `<button disabled>${escape(label)} — forthcoming</button>`;
}
export const placeholder = label => `<div class="placeholder"><strong>${escape(label)}</strong><span>Media forthcoming</span></div>`;
export function media(item, label = 'Media') {
  const src = assetUrl(item?.src);
  return `<div class="media">${src ? `<img src="${escape(src)}" alt="${escape(item.alt || label)}" loading="lazy">` : placeholder(item?.alt || label)}</div>`;
}
export function video(item, label) {
  const src = assetUrl(item?.src);
  return `<div class="media video-frame">${item?.poster ? `<img class="video-poster" src="${escape(assetUrl(item.poster))}" alt="${escape(label)} video poster">` : ''}${src ? `<button class="video-start" data-src="${escape(src)}" data-kind="${item.type === 'embed' ? 'embed' : 'video'}" data-label="${escape(label)}" data-captions="${escape(assetUrl(item.captions))}" data-poster="${escape(assetUrl(item.poster))}">▶ Play ${escape(label)}</button>` : placeholder(`${label} — video`)}</div>`;
}
export const tags = values => `<ul class="tags">${values.map(v => `<li>${escape(v)}</li>`).join('')}</ul>`;
export const list = (values, empty = 'Content forthcoming.') => values.length ? `<ul>${values.map(v => `<li>${escape(v)}</li>`).join('')}</ul>` : `<p class="status">${escape(empty)}</p>`;
export const section = (title, body) => `<section class="section"><h2>${escape(title)}</h2>${body}</section>`;
export function carousel(items, render, label) {
  return `<section class="carousel" aria-label="${escape(label)}" aria-roledescription="carousel">
    ${items.length ? items.map((item, i) => `<div class="slide" role="group" aria-label="${i + 1} of ${items.length}" ${i ? 'hidden' : ''}>${render(item)}</div>`).join('') : placeholder('Gallery')}
    <div class="carousel-controls"><button data-direction="-1" aria-label="Previous ${escape(label)}" ${items.length < 2 ? 'disabled' : ''}>←</button>
    <span class="carousel-count" aria-live="polite" aria-atomic="true">${items.length ? `1 / ${items.length}` : 'No media yet'}</span>
    <button data-direction="1" aria-label="Next ${escape(label)}" ${items.length < 2 ? 'disabled' : ''}>→</button>
    <div class="pagination">${items.map((_, i) => `<button data-slide="${i}" aria-label="Show ${escape(label)} ${i + 1}" aria-pressed="${!i}">${i + 1}</button>`).join('')}</div></div></section>`;
}
export function caseCarousel(items, render) {
  return `<section class="case-carousel" aria-label="Featured case studies" aria-roledescription="carousel">
    <div class="case-track" tabindex="0" aria-label="Case study panels">${items.length ? items.map(render).join('') : placeholder('Case studies forthcoming')}</div>
    <div class="case-carousel-controls" hidden><button data-case-direction="-1" aria-label="Previous case studies">←</button><span class="case-carousel-count" aria-live="polite" aria-atomic="true"></span><button data-case-direction="1" aria-label="Next case studies">→</button><div class="case-pagination"></div></div>
  </section>`;
}
let caseObserver;
export function bindComponents(root) {
  caseObserver?.disconnect();
  root.querySelectorAll('.case-carousel').forEach(node => {
    const track=node.querySelector('.case-track'), cards=[...track.querySelectorAll('.case-index-card')];
    const controls=node.querySelector('.case-carousel-controls'), pagination=node.querySelector('.case-pagination');
    let current=0, visible=1, pages=1;
    function announce() {
      node.querySelector('.case-carousel-count').textContent=`${current+1} / ${pages}`;
      pagination.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===current)));
      controls.querySelector('[data-case-direction="-1"]').disabled=current===0;
      controls.querySelector('[data-case-direction="1"]').disabled=current===pages-1;
    }
    function update() {
      const itemWidth=cards[0]?.getBoundingClientRect().width || track.clientWidth;
      const gap=parseFloat(getComputedStyle(track).columnGap) || 16;
      track.scrollLeft=current*visible*(itemWidth+gap);announce();
    }
    function resize() {
      visible=Math.max(1,Math.min(cards.length || 1,3,Math.floor((track.clientWidth+16)/296)));
      track.style.setProperty('--case-visible',String(visible));
      pages=Math.max(1,Math.ceil(cards.length/visible)); current=Math.min(current,pages-1);
      controls.hidden=pages<=1;
      pagination.replaceChildren(...Array.from({length:pages},(_,i)=>{
        const button=document.createElement('button');button.textContent=String(i+1);button.dataset.casePage=String(i);
        button.setAttribute('aria-label',`Show case study page ${i+1}`);return button;
      }));update();
    }
    node.addEventListener('click',event=>{
      const button=event.target.closest('button');if(!button)return;
      if(button.hasAttribute('data-case-page'))current=Number(button.dataset.casePage);
      if(button.hasAttribute('data-case-direction'))current=Math.max(0,Math.min(pages-1,current+Number(button.dataset.caseDirection)));
      update();
    });
    node.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      event.preventDefault();current=event.key==='Home'?0:event.key==='End'?pages-1:Math.max(0,Math.min(pages-1,current+(event.key==='ArrowRight'?1:-1)));update();
    });
    track.addEventListener('scroll',()=>{
      const stride=visible*((cards[0]?.getBoundingClientRect().width || track.clientWidth)+16);
      current=track.scrollLeft+track.clientWidth>=track.scrollWidth-1 ? pages-1 : Math.max(0,Math.min(pages-1,Math.round(track.scrollLeft/stride)));
      announce();
    });
    caseObserver=new ResizeObserver(resize);caseObserver.observe(track);resize();
  });
  root.querySelector('[data-case-overview]')?.addEventListener('click',()=>root.querySelector('.case-overview-video .video-start')?.click());
  root.querySelectorAll('.carousel').forEach(node => {
    let current = 0;
    const slides = [...node.querySelectorAll(':scope > .slide')];
    function show(index) {
      if (!slides.length) return;
      current = (index + slides.length) % slides.length;
      slides.forEach((s,i) => { s.hidden = i !== current; if (s.hidden) s.querySelectorAll('video').forEach(v => v.pause()); });
      node.querySelector('.carousel-count').textContent = `${current + 1} / ${slides.length}`;
      node.querySelectorAll('[data-slide]').forEach((b,i) => b.setAttribute('aria-pressed', String(i === current)));
    }
    node.addEventListener('click', event => {
      const button = event.target.closest('button'); if (!button) return;
      if (button.hasAttribute('data-direction')) show(current + Number(button.dataset.direction));
      if (button.hasAttribute('data-slide')) show(Number(button.dataset.slide));
    });
    node.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight'].includes(event.key) || event.target.closest('video,iframe')) return;
      event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1));
    });
  });
  root.querySelectorAll('img').forEach(img => img.addEventListener('error', () => { img.parentElement.innerHTML = placeholder('Image unavailable'); }, {once:true}));
  root.querySelectorAll('.video-start').forEach(button => button.addEventListener('click', () => {
    const player = document.createElement(button.dataset.kind === 'embed' ? 'iframe' : 'video');
    if (player.tagName === 'VIDEO') {
      player.controls = true; player.playsInline = true; player.preload = 'metadata';
      if (button.dataset.poster) player.poster = button.dataset.poster;
      if (button.dataset.captions) { const track=document.createElement('track'); track.kind='captions'; track.srclang='en'; track.label='English'; track.src=button.dataset.captions; player.append(track); }
      player.addEventListener('error', () => { player.parentElement.innerHTML=placeholder('Video unavailable'); }, {once:true});
    } else { player.title=button.dataset.label; player.allowFullscreen=true; player.allow='fullscreen; picture-in-picture'; }
    player.setAttribute('aria-label',button.dataset.label); player.src=button.dataset.src;
    button.parentElement.replaceChildren(player); player.focus();
  }));
  // A direct link to a late step must reveal its active entry in the local rail,
  // without scrolling the page or assuming a particular number of steps.
  const activeStep = root.querySelector('.step-nav [aria-current="step"]');
  if (activeStep) {
    const rail = activeStep.parentElement;
    rail.scrollLeft += activeStep.getBoundingClientRect().left - rail.getBoundingClientRect().left
      - (rail.clientWidth - activeStep.offsetWidth) / 2;
  }
  root.querySelector('.step-nav')?.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    const links=[...event.currentTarget.querySelectorAll('a')], index=links.indexOf(event.target);
    if(index<0)return;event.preventDefault();
    const next=event.key==='Home'?0:event.key==='End'?links.length-1:Math.max(0,Math.min(links.length-1,index+(event.key==='ArrowRight'?1:-1)));
    links[next].focus({preventScroll:true});
    const rail=event.currentTarget;
    rail.scrollLeft+=links[next].getBoundingClientRect().left-rail.getBoundingClientRect().left-(rail.clientWidth-links[next].offsetWidth)/2;
  });
}
