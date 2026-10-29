import { escape as e, assetUrl } from './components.js';
import { surface, button, headerPlate, carouselArrow, indexTabs } from './ui.js';

// Reusable entry card. One semantic link; the arrow housing is decorative.
export function projectCard(project,{selected=false,index=0}={}) {
  const image=project.cardMedia || project.heroMedia;
  const content=`<div class="project-card__media">${image?.src?`<img src="${e(assetUrl(image.src))}" alt="${e(image.alt||project.title)}" style="object-position:${e(project.cardPosition||'center')}" loading="lazy">`:'<span>Media forthcoming</span>'}</div><div class="project-card__title-band"><h2 class="project-card__title">${e(project.title)}</h2><span class="project-card__cta" aria-hidden="true">${button('View project',{iconOnly:true,iconName:'arrow-right'}).replace('<button','<span').replace('</button>','</span>').replace(' type="button"','').replace(' aria-label="View project"','')}</span></div><p class="project-card__categories">${e((project.categories||project.tags||[]).join(' · '))}</p>`;
  return `<a class="project-card${selected?' is-selected':''}${project.title.length>32?' project-card--long-title':''}" href="#games/projects/${e(project.id)}" data-project-card="${index}" aria-label="View ${e(project.title)}">${surface(content,{tag:'article',accent:true,className:'project-card__frame'})}</a>`;
}

export function projectDetailPanel(title,body,{className='',footer=''}={}) {
  return surface(`${headerPlate(title)}<div class="project-detail-panel__body">${body}</div>${footer?`<footer class="project-detail-panel__footer">${footer}</footer>`:''}`,{accent:true,className:`project-detail-panel ${className}`});
}

export function projectSelector(projects) {
  return `<section class="project-selector" data-project-selector aria-label="Project selection"><div class="projects-overview__grid">${projects.map((p,i)=>projectCard(p,{selected:i===0,index:i})).join('')}</div><div class="project-selector__arrows">${carouselArrow('previous',{label:'Previous project selection',disabled:projects.length<2,attributes:{'data-project-direction':-1}})}${carouselArrow('next',{label:'Next project selection',disabled:projects.length<2,attributes:{'data-project-direction':1}})}</div>${indexTabs(projects.map((p,i)=>({label:String(i+1),active:i===0})),{label:'Project selection index'})}<p class="project-selection-status" aria-live="polite" aria-atomic="true">${e(projects[0]?.title||'Projects forthcoming')}</p></section>`;
}

let selectionObservers=[];
export function bindProjectSelector(root) {
  selectionObservers.forEach(observer=>observer.disconnect());selectionObservers=[];
  root.querySelectorAll('[data-project-selector]').forEach(node=>{
    const cards=[...node.querySelectorAll('[data-project-card]')],tabs=[...node.querySelectorAll('[data-ui-index]')];let current=0;
    function show(index,reveal=false) {
      if(!cards.length)return;
      current=(index+cards.length)%cards.length;
      const desktop=matchMedia('(min-width:1001px)').matches,page=Math.floor(current/3);
      cards.forEach((card,i)=>{card.hidden=desktop&&Math.floor(i/3)!==page;card.classList.toggle('is-selected',i===current);});
      tabs.forEach((tab,i)=>tab.setAttribute('aria-pressed',String(i===current)));
      node.querySelector('.project-selection-status').textContent=cards[current].querySelector('h2').textContent;
      if(reveal&&!desktop)cards[current].scrollIntoView({block:'nearest',behavior:'instant'});
    }
    node.addEventListener('click',event=>{const b=event.target.closest('button');if(!b)return;if(b.hasAttribute('data-project-direction'))show(current+Number(b.dataset.projectDirection),true);if(b.hasAttribute('data-ui-index'))show(Number(b.dataset.uiIndex),true);});
    node.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();show(event.key==='Home'?0:event.key==='End'?cards.length-1:current+(event.key==='ArrowRight'?1:-1));});
    const observer=new ResizeObserver(()=>{if(!node.isConnected){observer.disconnect();return;}show(current);});observer.observe(node);selectionObservers.push(observer);show(0);
  });
}
