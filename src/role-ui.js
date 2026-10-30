import { escape as e, media, video, bindMediaPlayback } from './components.js';
import { surface, headerPlate, button, roleIcon, mediaFrame, carouselArrow, indexTabs } from './ui.js';
import { iconAssets } from './ui-icons.js';

export function roleCard(role) {
  const glyph=iconAssets[role.id]?.includes('/roles/')?roleIcon(role.id):'';
  return surface(`<div class="role-card__heading"><span class="role-card__icon" aria-hidden="true">${glyph}</span>${headerPlate(role.title,{level:3,className:'role-card__header'})}</div><p class="role-card__description">${e(role.subtitle)}</p>${button('View role',{href:'#games/roles/'+role.id,arrowHousing:true,className:'role-card__cta',attributes:{'aria-label':'View '+role.title+' role'}})}`,{tag:'article',accent:true,className:'role-card'});
}

export function roleDetailPanel(title,content,{className=''}={}) {
  return surface(`${headerPlate(title)}<div class="role-detail-panel__body">${content}</div>`,{accent:true,className:'role-detail-panel '+className});
}

export function roleOverviewDialog(item) {
  const content=`<header class="roles-overview-dialog__header"><h2 id="roles-overview-dialog-title">Roles overview</h2>${button('Close overview',{compact:true,attributes:{'data-role-overview-close':'true'}})}</header><div class="roles-overview-player">${mediaFrame(video(item,'Roles overview').replace('class="video-start"','class="video-start ui-btn"'),{label:'Roles overview video',className:'project-media-panel'})}</div>`;
  return `<dialog class="roles-overview-dialog" id="roles-overview-dialog" aria-labelledby="roles-overview-dialog-title">${surface(content,{className:'roles-overview-dialog__surface'})}</dialog>`;
}

export function rolePractice(items=[]) {
  const available=items.filter(item=>item?.src);
  const controls=carouselArrow('previous',{label:'Previous practice example',disabled:available.length<2,attributes:{'data-practice-direction':-1}})+carouselArrow('next',{label:'Next practice example',disabled:available.length<2,attributes:{'data-practice-direction':1}});
  const first=available[0];
  const content=first?['video','embed'].includes(first.type)?video(first,'Practice example'):media(first,'Practice example'):`<div class="role-media-pending"><span aria-hidden="true">//</span><strong>Practice evidence forthcoming</strong><p>Real examples and captions will be added.</p></div>`;
  return roleDetailPanel('In Practice',`<div class="role-practice" data-role-practice data-items="${e(JSON.stringify(available))}">${mediaFrame(`<div class="role-practice__media">${content}</div>`,{label:'Role practice evidence',className:'project-media-panel',controls})}<div class="role-practice__footer">${available.length?indexTabs(available.map((_,i)=>({label:String(i+1),active:i===0})),{label:'Practice example index'}).replaceAll('data-ui-index','data-practice-index'):''}<p class="role-practice__caption" aria-live="polite" aria-atomic="true">${e(first?.caption||(!first?'Evidence and caption forthcoming.':''))}</p></div></div>`,{className:'practice-section'});
}

export function roleCaseStudyCard(study) {
  const copy=study?`<div class="role-case-study-card__media">${media(study.heroMedia,'Case study cover')}</div><div class="role-case-study-card__copy"><p class="eyebrow">Featured Case Study</p><h2>${e(study.title)}</h2><p>${e(study.summary||'Case study summary forthcoming.')}</p></div>${button('View case study',{href:'#games/case-studies/'+study.id,arrowHousing:true})}`:`<div class="role-case-study-card__copy"><p class="eyebrow">Featured Case Study</p><h2>Featured case study forthcoming</h2><p>A related case study will be linked when selected.</p></div>${button('View case study',{disabled:true,arrowHousing:true})}`;
  return surface(copy,{accent:true,className:'role-case-study-card'+(study?'':' role-case-study-card--pending')});
}

export function bindRoleUI(root) {
  const opener=root.querySelector('[data-role-overview]'),dialog=root.querySelector('#roles-overview-dialog');
  if(opener&&dialog){
    const slot=dialog.querySelector('.roles-overview-player'),initialMarkup=slot.innerHTML;
    opener.addEventListener('click',()=>{dialog.showModal();slot.querySelector('.video-start')?.click();dialog.querySelector('[data-role-overview-close]').focus();});
    dialog.querySelector('[data-role-overview-close]').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();});
    dialog.addEventListener('close',()=>{slot.querySelectorAll('video').forEach(player=>player.pause());slot.innerHTML=initialMarkup;bindMediaPlayback(slot);if(opener.isConnected)opener.focus({preventScroll:true});});
  }
  root.querySelectorAll('[data-role-practice]').forEach(node=>{
    const items=JSON.parse(node.dataset.items);let current=0;
    // Initial media playback is already bound by bindComponents(). Later selections need binding.
    function show(index){
      if(!items.length)return;
      const next=(index+items.length)%items.length;
      if(next===current)return;
      current=next;
      node.querySelectorAll('video').forEach(player=>player.pause());
      const item=items[current],slot=node.querySelector('.role-practice__media');
      slot.innerHTML=['video','embed'].includes(item.type)?video(item,'Practice example'):media(item,'Practice example');
      node.querySelector('.role-practice__caption').textContent=item.caption||`Example ${current+1} of ${items.length}`;
      node.querySelectorAll('[data-practice-index]').forEach((tab,i)=>tab.setAttribute('aria-pressed',String(i===current)));
      const active=node.querySelector('[data-practice-index][aria-pressed="true"]'),track=active?.parentElement;
      if(track){const a=active.getBoundingClientRect(),r=track.getBoundingClientRect();track.scrollLeft+=Math.min(0,a.left-r.left)+Math.max(0,a.right-r.right);}
      bindMediaPlayback(slot);
    }
    node.addEventListener('click',event=>{const b=event.target.closest('button');if(!b)return;if(b.hasAttribute('data-practice-direction'))show(current+Number(b.dataset.practiceDirection));if(b.hasAttribute('data-practice-index'))show(Number(b.dataset.practiceIndex));});
    node.addEventListener('keydown',event=>{if(event.altKey||event.ctrlKey||event.metaKey||event.target.closest('video,iframe,input,textarea,select,[contenteditable]')||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const fromIndex=event.target.closest('[data-practice-index]');show(event.key==='Home'?0:event.key==='End'?items.length-1:current+(event.key==='ArrowRight'?1:-1));if(fromIndex)node.querySelector('[data-practice-index][aria-pressed="true"]')?.focus({preventScroll:true});});
  });
}
