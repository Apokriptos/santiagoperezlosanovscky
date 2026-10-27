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
  return `<div class="media video-frame">${src ? `<button class="video-start" data-src="${escape(src)}" data-kind="${item.type === 'embed' ? 'embed' : 'video'}" data-label="${escape(label)}" data-captions="${escape(assetUrl(item.captions))}" data-poster="${escape(assetUrl(item.poster))}">▶ Play ${escape(label)}</button>` : placeholder(`${label} — video`)}</div>`;
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
export function bindComponents(root) {
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
}
