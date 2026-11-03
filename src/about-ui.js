import { escape as e, assetUrl } from './components.js';
import { surface, headerPlate, carouselArrow } from './ui.js';

const mark = paths => `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
const symbols = {
 focus:mark('<circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="3"/><path d="M16 2v6m0 16v6M2 16h6m16 0h6"/>'),
 currently:mark('<path d="m2 11 14-7 14 7-14 7Zm5 3v9q9 7 18 0v-9M30 11v12"/>'),
 location:mark('<path d="M25 13c0 7-9 16-9 16S7 20 7 13a9 9 0 1 1 18 0Z"/><circle cx="16" cy="13" r="3"/>'),
 language:mark('<path d="M3 5h20v15H12l-6 5v-5H3Zm23 5h3v17h-6l-5-4h-3"/><path d="M8 11h1m4 0h1m4 0h1"/>')
};
export function aboutComposition(a,name,portrait) {
 const plate=(label,cls='')=>headerPlate(label,{className:cls});
 const fact=(label,key)=>surface(`${plate(label)}<div class="about-fact-copy">${symbols[key]}<p>${e(a[key])}</p></div>`,{accent:true,className:'about-fact'});
 const photo=portrait?.src?`<img src="${e(assetUrl(portrait.src))}" alt="${e(portrait.alt||'Portrait of '+name)}" decoding="async">`:`<div class="about-portrait-pending" role="img" aria-label="Portrait placeholder; final photograph to be supplied"><span aria-hidden="true">//</span><small>Portrait</small></div>`;
 const entries=a.trajectory||[];
 const career=entries.length?`<div class="trajectory-carousel" data-trajectory role="region" aria-roledescription="carousel" aria-label="Professional trajectory">
  ${carouselArrow('previous',{label:'Previous career entries',attributes:{'data-career-direction':-1,'aria-controls':'career-track'}})}
  <ol id="career-track" class="trajectory-track" tabindex="0" aria-label="Career entries; use Left and Right arrow keys">${entries.map((t,i)=>`<li class="trajectory-card" aria-label="${i+1} of ${entries.length}"><div><p class="trajectory-date">${e(t.date)}</p><h3>${e(t.title)}</h3><p class="trajectory-description">${e(t.body)}</p></div></li>`).join('')}</ol>
  ${carouselArrow('next',{label:'Next career entries',attributes:{'data-career-direction':1,'aria-controls':'career-track'}})}
  <nav class="trajectory-positions" aria-label="Career carousel positions"></nav><p class="visually-hidden trajectory-announcement" aria-live="polite" aria-atomic="true"></p>
 </div>`:'<p class="about-career-empty">Professional trajectory forthcoming.</p>';
 return `<div class="about-profile"><div class="about-photo">${surface(photo,{className:'about-portrait-frame',accent:true})}</div><div class="about-profile-copy">
 ${surface(`${plate(name,'about-name')}<p class="about-positioning">${e(a.positioning)}</p><p class="about-biography">${e(a.biography)}</p>`,{accent:true,className:'about-identity'})}
 <div class="about-highlights">${fact('FOCUS','focus')}${fact('CURRENTLY','currently')}</div></div></div>
 ${surface(`<div class="about-band-heading">${plate('TRAJECTORY')}<span>Selected professional experience</span></div>${career}`,{className:'about-trajectory'})}
 ${surface(`<div class="about-skills">${plate('SKILLS')}<ul class="about-skill-chips">${(a.skills||[]).map(s=>`<li><span>${e(s)}</span></li>`).join('')}</ul></div><div class="about-metadata"><p>${symbols.location}<span>${e(a.location)}</span></p>${(a.languages||[]).map(l=>`<p>${symbols.language}<span>${e(l)}</span></p>`).join('')}</div>`,{accent:true,className:'about-capabilities'})}`;
}

export function bindAboutUI(root) {
 const carousel=root.querySelector('[data-trajectory]');if(!carousel)return;
 const track=carousel.querySelector('.trajectory-track'),cards=[...track.children],positions=carousel.querySelector('.trajectory-positions'),status=carousel.querySelector('.trajectory-announcement');
 const previous=carousel.querySelector('[data-career-direction="-1"]'),next=carousel.querySelector('[data-career-direction="1"]');
 let index=0,max=0,positionCount=0,frame=0,motion=0;
 const reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
 const step=()=>cards[1]?cards[1].offsetLeft-cards[0].offsetLeft:cards[0].getBoundingClientRect().width;
 function sync() {
  const stride=step();max=Math.max(0,cards.length-Math.max(1,Math.round((track.clientWidth+parseFloat(getComputedStyle(track).gap))/stride)));
  index=Math.max(0,Math.min(max,Math.round(track.scrollLeft/stride)));
  if(positionCount!==max+1){positions.innerHTML=Array.from({length:max+1},(_,i)=>`<button type="button" data-career-position="${i}" aria-label="Show career entries starting at ${i+1}" aria-controls="career-track"><span></span></button>`).join('');positionCount=max+1;}
  previous.disabled=index===0;next.disabled=index===max;
  positions.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
  const text=`Career entries ${index+1}–${Math.min(cards.length,index+cards.length-max)} of ${cards.length}`;
  if(status.textContent!==text)status.textContent=text;
 }
 function cancelMotion(){cancelAnimationFrame(motion);motion=0;track.style.scrollSnapType='';}
 function move(to){
  cancelMotion();sync();const target=Math.max(0,Math.min(max,to))*step(),start=track.scrollLeft;
  if(reduced()){track.scrollTo({left:target,behavior:'instant'});sync();return;}
  track.style.scrollSnapType='none';const began=performance.now();
  const animate=now=>{const t=Math.min(1,(now-began)/180);track.scrollLeft=start+(target-start)*(1-(1-t)**3);if(t<1)motion=requestAnimationFrame(animate);else{cancelMotion();sync();}};
  motion=requestAnimationFrame(animate);
 }
 previous.addEventListener('click',()=>move(index-1));next.addEventListener('click',()=>move(index+1));
 positions.addEventListener('click',event=>{const b=event.target.closest('[data-career-position]');if(b)move(Number(b.dataset.careerPosition));});
 track.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();move(event.key==='Home'?0:event.key==='End'?max:index+(event.key==='ArrowRight'?1:-1));});
 track.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(sync);},{passive:true});
 track.addEventListener('pointerdown',cancelMotion,{passive:true});track.addEventListener('wheel',cancelMotion,{passive:true});
 const observer=new ResizeObserver(()=>{const saved=index;cancelMotion();sync();track.scrollTo({left:Math.min(saved,max)*step(),behavior:'instant'});sync();});observer.observe(track);
 // Disconnect when route rendering replaces the component; avoid retained observers.
 const lifecycle=new MutationObserver(()=>{if(!carousel.isConnected){observer.disconnect();lifecycle.disconnect();cancelAnimationFrame(frame);cancelMotion();}});lifecycle.observe(root,{childList:true,subtree:true});sync();
}
