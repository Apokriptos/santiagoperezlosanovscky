import {escape as e,media} from './components.js';
import {pageTitle,surface,headerPlate,mediaFrame,button} from './ui.js';

export function caseStudyStepRail(study,step) {
  const base='#games/case-studies/'+study.id;
  return `<nav class="case-study-step-rail case-study-step-rail__track step-nav" aria-label="Case study steps">${study.steps.map((item,i)=>`<a href="${e(base+'/'+item.id)}" class="case-study-step-rail__item"${item.id===step.id?' aria-current="step"':''} aria-label="${e(String(item.number??i+1).padStart(2,'0')+' '+item.title)}"><span class="case-study-step-rail__marker" aria-hidden="true"></span><span class="step-number case-study-step-rail__number">${e(String(item.number??i+1).padStart(2,'0'))}</span><span class="step-label case-study-step-rail__label">${e(item.title)}</span></a>`).join('')}</nav>`;
}

export function caseStudyStepPanel(step) {
  const paragraphs=Array.isArray(step.body)?step.body:step.body?.trim()?step.body.split(/\n\s*\n/):[];
  const body=paragraphs.length?paragraphs.map(text=>`<p>${e(text)}</p>`).join(''):'<p class="case-study-content-pending">Step explanation coming soon.</p>';
  const points=step.keyPoints?.length?`<section class="case-study-step-panel__key-points"><h4>Key points</h4><ul>${step.keyPoints.map(point=>`<li>${e(point)}</li>`).join('')}</ul></section>`:'';
  return surface(`${headerPlate('Step Explanation',{level:3})}<div class="case-study-step-panel__body">${body}${points}</div>`,{className:'case-study-step-panel'});
}

export function caseStudyStep(study,step) {
  const index=study.steps.indexOf(step),number=String(step.number??index+1).padStart(2,'0');
  const evidence=step.evidenceImage?.src?step.evidenceImage:(step.media||[]).find(item=>item?.src&&!['video','embed'].includes(item.type));
  const visual=evidence?media(evidence,'Case study evidence'):'<div class="case-study-evidence-pending"><strong>Evidence coming soon.</strong><p>A real supporting image will be added here.</p></div>';
  const header=`<header class="case-study-header"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="#games">Games</a><span>/</span><a href="#games/case-studies">Case Studies</a><span>/</span><span>${e(study.title)}</span></nav>${pageTitle(study.title)}<p class="case-study-disciplines">${e(study.disciplines?.join(' · ')||study.subtitle)}</p></header>`;
  const content=`${headerPlate(number+' '+step.title,{className:'case-study-step-shell__header'})}<div class="case-study-step-shell__content"><div class="evidence">${mediaFrame(visual,{label:'Step evidence',className:'project-media-panel case-study-evidence-panel',accent:false})}</div>${caseStudyStepPanel(step)}</div><footer class="case-study-step-shell__footer">${button('Case cover',{href:'#games/case-studies/'+study.id,compact:true,className:'case-cover-link'})}${caseStudyStepRail(study,step)}</footer>`;
  return `<div class="case-step-layout">${header}${surface(content,{accent:true,className:'case-study-step-shell'})}</div>`;
}
