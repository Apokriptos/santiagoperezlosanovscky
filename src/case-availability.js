import {config} from './data.js';

// A visible development/release-preview status, not an access-control gate.
export function applyCaseAvailability(root) {
  if(!config.caseStudies?.comingSoon)return;
  const label=config.caseStudies.label||'Coming soon!';
  const entries=[...root.querySelectorAll('a[href^="#games/case-studies"]')].filter(link=>!link.closest('.case-studies-page,.ui-case-study-rail'));
  entries.push(...root.querySelectorAll('.role-case-study-card button:disabled'));
  for(const entry of entries){
    entry.classList.add('is-coming-soon');entry.dataset.comingSoon='case-studies';
    entry.title=label+' Case Studies interface preview; not included in the first release.';
    if(!entry.querySelector('.coming-soon-label')){const badge=document.createElement('span');badge.className='coming-soon-label';badge.textContent=label;(entry.querySelector('.ui-btn__label')||entry).append(badge);}
  }
  const page=root.querySelector('.case-studies-page');
  if(page){
    const heading=page.querySelector('.case-study-header,.page-header');
    if(heading&&!heading.querySelector('.case-preview-status')){const notice=document.createElement('p');notice.className='case-preview-status';notice.textContent=label+' Interface preview.';notice.title='Case Studies are not included in the first release.';heading.append(notice);}
  }
}
