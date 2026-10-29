import { escape as e, media, video, bindMediaPlayback } from './components.js';
import { surface, headerPlate, button, roleIcon, mediaFrame, carouselArrow, indexTabs } from './ui.js';
import { iconAssets } from './ui-icons.js';

export function roleCard(role) {
  const glyph=iconAssets[role.id]?.includes('/roles/')?roleIcon(role.id):'';
  return surface(`<div class="role-card__heading"><span class="role-card__icon" aria-hidden="true">${glyph}</span>${headerPlate(role.title,{level:3,className:'role-card__header'})}</div><p class="role-card__description">${e(role.subtitle)}</p>${button('View role',{href:'#games/roles/'+role.id,arrowHousing:true,className:'role-card__cta'})}`,{tag:'article',accent:true,className:'role-card'});
}

export function roleDetailPanel(title,content,{className=''}={}) {
  return surface(`${headerPlate(title)}<div class="role-detail-panel__body">${content}</div>`,{accent:true,className:'role-detail-panel '+className});
}

export function rolePractice(items=[]) {
  const available=items.filter(item=>item?.src);
  const controls=carouselArrow('previous',{label:'Previous practice example',disabled:available.length<2,attributes:{'data-practice-direction':-1}})+carouselArrow('next',{label:'Next practice example',disabled:available.length<2,attributes:{'data-practice-direction':1}});
  const first=available[0];
  const content=first?['video','embed'].includes(first.type)?video(first,'Practice example'):media(first,'Practice example'):`<div class="role-media-pending"><span aria-hidden="true">//</span><strong>Practice evidence forthcoming</strong><p>Real examples and captions will be added.</p></div>`;
  return roleDetailPanel('In Practice',`<div class="role-practice" data-role-practice data-items="${e(JSON.stringify(available))}">${mediaFrame(`<div class="role-practice__media">${content}</div>`,{label:'Role practice evidence',className:'project-media-panel',controls})}${available.length?indexTabs(available.map((_,i)=>({label:String(i+1),active:i===0})),{label:'Practice example index'}).replaceAll('data-ui-index','data-practice-index'):''}<p class="role-practice__caption" aria-live="polite" aria-atomic="true">${e(first?.caption||(!first?'Evidence and caption forthcoming.':''))}</p></div>`,{className:'practice-section'});
}

export function roleCaseStudyCard(study) {
  const copy=study?`<div class="role-case-study-card__media">${media(study.heroMedia,'Case study cover')}</div><div class="role-case-study-card__copy"><p class="eyebrow">Featured Case Study</p><h2>${e(study.title)}</h2><p>${e(study.summary||'Case study summary forthcoming.')}</p></div>${button('View case study',{href:'#games/case-studies/'+study.id,arrowHousing:true})}`:`<div class="role-case-study-card__copy"><p class="eyebrow">Featured Case Study</p><h2>Featured case study forthcoming</h2><p>A related case study will be linked when selected.</p></div>${button('View case study',{disabled:true,arrowHousing:true})}`;
  return surface(copy,{accent:true,className:'role-case-study-card'+(study?'':' role-case-study-card--pending')});
}

export function bindRoleUI(root) {
  root.querySelector('[data-role-overview]')?.addEventListener('click',()=>root.querySelector('.roles-overview-video .video-start')?.click());
  root.querySelectorAll('[data-role-practice]').forEach(node=>{
    const items=JSON.parse(node.dataset.items);let current=0;
    // Initial media playback is already bound by bindComponents(). Later selections need binding.
    function show(index){
      if(!items.length)return;current=(index+items.length)%items.length;
      node.querySelectorAll('video').forEach(player=>player.pause());
      const item=items[current],slot=node.querySelector('.role-practice__media');
      slot.innerHTML=['video','embed'].includes(item.type)?video(item,'Practice example'):media(item,'Practice example');
      node.querySelector('.role-practice__caption').textContent=item.caption||'';
      node.querySelectorAll('[data-practice-index]').forEach((tab,i)=>tab.setAttribute('aria-pressed',String(i===current)));
      bindMediaPlayback(slot);
    }
    node.addEventListener('click',event=>{const b=event.target.closest('button');if(!b)return;if(b.hasAttribute('data-practice-direction'))show(current+Number(b.dataset.practiceDirection));if(b.hasAttribute('data-practice-index'))show(Number(b.dataset.practiceIndex));});
    node.addEventListener('keydown',event=>{if(event.target.closest('video,iframe')||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();show(event.key==='Home'?0:event.key==='End'?items.length-1:current+(event.key==='ArrowRight'?1:-1));});
  });
}
