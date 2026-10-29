import { pageTitle, sectionTitle, surface, button, carouselArrow, indexTabs, mediaFrame } from './ui.js';
import { icon, roleIcon, iconAssets } from './ui-icons.js';
import { config, Projects, Roles, CaseStudies } from './data.js';
import { escape as e, link, external, media, video, tags, list, section, carousel, projectGallery, caseCarousel, placeholder, assetUrl } from './components.js';
const route = (family, id) => `#games/${family}${id ? '/' + id : ''}`;
const titleOf = (items, id) => items.find(i => i.id === id)?.title || id;
const heading = (title, subtitle = '', family = '') => `<header class="page-header"><nav class="breadcrumb" aria-label="Breadcrumb">${link('#games','Games')}${family ? `<span>/</span>${link(route(family),family.replaceAll('-',' '))}` : ''}<span>/</span><span>${e(title)}</span></nav><h1>${e(title)}</h1>${subtitle ? `<p class="subtitle">${e(subtitle)}</p>` : ''}</header>`;
const card = (item, family) => `<a class="panel" href="${route(family,item.id)}"><h3>${e(item.title)}</h3><p>${e(item.subtitle)}</p><span class="action">View ${family === 'roles' ? 'role' : 'case study'} →</span></a>`;
const projectSlide = project => `<article class="project-slide">${media(project.heroMedia || (project.thumbnail ? {src:project.thumbnail,alt:project.title} : null),project.title)}<div><p class="eyebrow">${e(project.subtitle)}</p><h3>${e(project.title)}</h3><p>${e(project.shortDescription)}</p>${tags(project.tags)}${link(route('projects',project.id),'View project →','action')}</div></article>`;
const gallery = (items, label) => carousel(items, item => `<figure>${media(item,label)}${item.caption ? `<figcaption>${e(item.caption)}</figcaption>` : ''}</figure>`,label);
const caseCTA = id => id ? link(route('case-studies',id),titleOf(CaseStudies,id)+' →','button') : '<p class="status">Featured case study forthcoming.</p>';
function overview() {
  const selectedRoles = config.overview?.featuredRoleIds
    ? config.overview.featuredRoleIds.map(id => Roles.find(role => role.id === id)).filter(Boolean)
    : Roles;
  const roles=selectedRoles.map(role=>surface(`<div class="overview-role-card__heading"><span class="overview-role-card__icon">${iconAssets[role.id]?roleIcon(role.id):''}</span><h3>${e(role.title)}</h3></div><p>${e(role.subtitle)}</p>${button('View role',{href:route('roles',role.id),compact:true,iconName:'arrow-right',className:'overview-role-card__cta'})}`,{tag:'article',accent:true,className:'overview-role-card'})).join('');
  const slides=Projects.map((project,i)=>`<div class="slide" role="group" aria-label="${i+1} of ${Projects.length}" ${i?'hidden':''}>${surface(`<article class="project-slide">${mediaFrame(media(project.heroMedia || (project.thumbnail?{src:project.thumbnail,alt:project.title}:null),project.title),{label:project.title,className:'ui-project-media-frame',accent:false})}<div class="project-showcase__info"><p class="eyebrow">${e(project.subtitle)}</p><h3>${e(project.title)}</h3><p>${e(project.shortDescription)}</p>${tags(project.tags)}${button('View project',{href:route('projects',project.id),iconName:'arrow-right'})}</div></article>`,{accent:true,className:'overview-project-showcase'})}</div>`).join('');
  const arrows=carouselArrow('previous',{label:'Previous featured projects',disabled:Projects.length<2,attributes:{'data-direction':-1}})+carouselArrow('next',{label:'Next featured projects',disabled:Projects.length<2,attributes:{'data-direction':1}});
  const index=indexTabs(Projects.map((_,i)=>({label:String(i+1),active:i===0})),{label:'Featured project index',className:'overview-project-index'}).replaceAll('data-ui-index','data-slide');
  return `<div class="overview-grid"><div class="overview-editorial">
  <header class="overview__header"><nav class="breadcrumb" aria-label="Breadcrumb">${link('#games','Games')}<span>/</span><span>Overview</span></nav>${pageTitle('Overview')}<div class="overview-intro"><p class="eyebrow">${e(config.name)}</p><p>${e(config.introduction)}</p></div></header>
  <section class="section overview-roles"><div class="section-heading">${sectionTitle('Roles')}${button('View all roles',{href:route('roles'),compact:true,iconName:'arrow-right'})}</div><div class="cards overview__roles-grid">${roles}</div></section>
  <section class="section overview-projects"><div class="section-heading">${sectionTitle('Projects')}${button('View all projects',{href:route('projects'),compact:true,iconName:'arrow-right'})}</div><section class="carousel overview-carousel" aria-label="featured projects" aria-roledescription="carousel"><div class="overview-showcase-slides">${slides||placeholder('Projects forthcoming')}</div>${arrows}<p class="overview-announcement visually-hidden" aria-live="polite" aria-atomic="true">${e(Projects[0]?.title||'Projects forthcoming')}</p>${index}</section></section></div>
  <aside class="overview-portrait portrait ui-identity-rail" aria-label="Identity composition">${config.portrait ? `<img src="${e(assetUrl(config.portrait.src))}" alt="${e(config.portrait.alt)}">` : `<div class="portrait-placeholder"><p class="eyebrow">Portrait / identity</p><div class="portrait-registration" aria-hidden="true"><span>+</span><span>+</span><span>+</span><span>+</span></div><div class="portrait-pending"><span class="print-slashes" aria-hidden="true">//</span><p>Portrait forthcoming</p></div><div class="portrait-caption"><p>${e(config.name)}</p><span class="eyebrow">Media forthcoming</span></div></div>`}</aside></div>`;
}
const emptyState = (title, body = 'Content forthcoming.') => `<div class="empty-state"><span class="empty-mark" aria-hidden="true">//</span><strong>${e(title)}</strong><p>${e(body)}</p></div>`;
const printSection = (title, body, cls = '') => `<section class="print-panel ${cls}"><h2>${e(title)}</h2>${body}</section>`;
const actions = body => `<div class="actions">${body}</div>`;
const splitIntro = (title, copy, family) => `<div class="split-intro"><div>${heading(title)}<p class="lead">${e(copy)}</p>${link(`#${family}-video`,'Watch overview ↓','button')}</div><section id="${family}-video" aria-label="${family} overview video">${video(config.overviewVideos[family],`${family === 'projects' ? 'Projects' : 'Roles'} overview`)}</section></div>`;

const projectIcon = name => icon(name,{className:'project-ui-icon'});
function projects(project) {
  if (!project) return `${splitIntro('GAME PROJECTS',config.copy.projects,'projects')}
    ${section('FEATURED PROJECT',carousel(Projects,projectSlide,'featured projects'))}`;
  const related=project.caseStudies.map(id=>CaseStudies.find(study=>study.id===id)).filter(Boolean);
  const metadata=(project.metadata || []).filter(item=>item.value);
  return `${heading(project.title,'','projects').replace('</header>',`<div class="project-header-details"><p class="subtitle">${e(project.subtitle)}</p>${metadata.length?`<ul class="project-metadata" aria-label="Project information">${metadata.map(item=>`<li><span>${e(item.label)}</span> ${e(item.value)}</li>`).join('')}</ul>`:''}</div></header>`)}
    <div class="project-grid">
      <section class="project-video" aria-label="Gameplay video">${video(project.video,'Gameplay')}</section>
      ${printSection('THE GAME',`${project.decorativeArt?`<img class="project-decoration" src="${e(assetUrl(project.decorativeArt.src))}" alt="" aria-hidden="true">`:''}<div class="project-prose">${(project.description || [project.longDescription]).map(text=>`<p>${e(text)}</p>`).join('')}</div>
        ${related.length?`<div class="project-case-actions">${related.map(study=>`<a class="button project-case-link" href="${route('case-studies',study.id)}"><span>${e(study.title)}</span>${projectIcon('arrow-right')}</a>`).join('')}</div>`:''}`,'project-description')}
      <section class="project-gallery print-panel" aria-label="Project gallery">${projectGallery(project.gallery)}</section>
      ${printSection('PLAYABLE BUILD',`<div class="build-overview"><div class="build-primary"><p class="build-status">${project.buildUrl?`Open the current build of ${e(project.title)} for private evaluation.`:e(project.buildStatus)}</p>${external(project.buildUrl,'Download build').replace('Download build',projectIcon('download')+'<span>Download build</span>')}</div><dl class="build-metadata">${project.buildProvider?`<div>${projectIcon('folder')}<dt>Provider</dt><dd>${e(project.buildProvider)}</dd></div>`:''}${project.buildUrl?`<div>${projectIcon('info')}<dt>Access</dt><dd>Private evaluation</dd></div>`:''}</dl></div>
        ${project.buildUrl?`<div class="distribution-note"><p><strong>Evaluation build — not for redistribution.</strong></p><p>${e(project.buildNote)}</p></div>`:''}`,'build-panel').replace('<h2>PLAYABLE BUILD</h2>',`<h2>${projectIcon('controller')}<span>PLAYABLE BUILD</span></h2>`)}
    </div>`;
}

function roleCard(role) {
  return `<a class="role-card print-panel" href="${route('roles',role.id)}"><div class="role-card-media" aria-hidden="true">${iconAssets[role.id]?.includes('/roles/') ? roleIcon(role.id) : '+'}</div><div><h3>${e(role.title)}</h3><p>${e(role.subtitle)}</p><span class="action">View role →</span></div></a>`;
}
function roles(role) {
  if (!role) return `${splitIntro('AREAS OF WORK',config.copy.roles,'roles')}${section('MY ROLES',`<div class="role-cards">${Roles.map(roleCard).join('')}</div>`)}`;
  const experience = role.experience.length
    ? `<ul class="experience-list">${role.experience.map(x=>`<li><h3>${e(x.title)}</h3><p>${e(x.body)}</p>${x.projectId ? link(route('projects',x.projectId),'View project →','action') : ''}</li>`).join('')}</ul>`
    : emptyState('Selected experience forthcoming','Concrete project examples will be supplied here.');
  return `${heading(role.title,role.subtitle,'roles')}
    <div class="role-detail-grid">
      ${printSection('ROLE & EXPERIENCE',`<p class="lead">${e(role.summary)}</p>`,'role-summary')}
      ${printSection('SELECTED EXPERIENCE',experience)}
      <section class="practice-section"><h2>IN PRACTICE</h2>${gallery(role.practiceMedia,'practice media')}</section>
      ${printSection('MY APPROACH',list(role.approach),'approach-panel')}
    </div>
    <section class="cta-strip"><div><p class="eyebrow">FEATURED CASE STUDY</p>${role.featuredCaseStudy ? `<h3>${e(titleOf(CaseStudies,role.featuredCaseStudy))}</h3>` : '<p class="status">Featured case study forthcoming.</p>'}</div>${role.featuredCaseStudy ? link(route('case-studies',role.featuredCaseStudy),'View case study →','button') : '<span class="cta-pending" aria-hidden="true">//</span>'}</section>`;
}

function caseIndexCard(study) {
  return `<article class="case-index-card print-panel">${media(study.heroMedia,'Case study hero')}
    <div class="case-index-copy"><p class="eyebrow">${e(study.subtitle)}</p><h2>${e(study.title)}</h2>
    ${study.projectId ? link(route('projects',study.projectId),titleOf(Projects,study.projectId),'project-reference') : ''}
    ${study.roleIds.length ? tags(study.roleIds.map(id=>titleOf(Roles,id))) : ''}<p>${e(study.summary)}</p>
    ${link(route('case-studies',study.id),'View case study →','button')}</div></article>`;
}
function cases(study, step) {
  if (!study) return `<div class="case-index-layout">${heading('CASE STUDIES','Design reasoning · Implementation · Evidence')}
    <section class="case-index-intro print-panel"><div><h2>DESIGN IN PRACTICE</h2><p>${e(config.copy.caseStudies)}</p>
      <button data-case-overview ${config.overviewVideos['case-studies']?.src ? '' : 'disabled'}>${config.overviewVideos['case-studies']?.src ? 'Watch overview →' : 'Overview video forthcoming'}</button></div>
      <div class="case-overview-video">${video(config.overviewVideos['case-studies'],'Case Studies overview')}</div></section>
    <section class="featured-case-section"><h2>FEATURED CASE STUDIES</h2>${caseCarousel(CaseStudies,caseIndexCard)}</section></div>`;
  const base = route('case-studies',study.id);
  if (!step) return `<div class="case-cover-layout">${heading(study.title,study.roleIds.map(id=>titleOf(Roles,id)).join(' · ') || study.subtitle,'case-studies')}
    <div class="case-hero">${media(study.heroMedia,'Case study hero')}</div>
    <div class="case-cover-grid">
      ${printSection('THE CASE',`<p>${e(study.summary)}</p>`)}
      ${printSection('CENTRAL QUESTION',`<blockquote>${e(study.centralQuestion)}</blockquote>`,'question-panel')}
      ${printSection('MY CONTRIBUTION',list(study.contribution))}
      ${printSection('WHAT THIS STUDY COVERS',study.steps.length ? `<ol class="coverage-list">${study.steps.map(s=>`<li>${link(base+'/'+s.id,s.title)}</li>`).join('')}</ol>` : emptyState('Steps forthcoming'))}
    </div>
    ${actions((study.steps.length ? link(base+'/'+study.steps[0].id,'Begin case study →','button button-primary') : '')+' '+(study.projectId ? link(route('projects',study.projectId),'View project →','button') : ''))}</div>`;
  const index = study.steps.indexOf(step);
  const previous = study.steps[index-1], next = study.steps[index+1];
  return `<div class="case-step-layout">${heading(study.title,'','case-studies')}<div class="case-step-content">
    <section class="step-prose print-panel"><div class="step-heading"><span class="eyebrow">${e(String(step.number ?? index + 1).padStart(2,'0'))}</span><h2 class="step-title">${e(step.title)}</h2></div>
      <p class="step-question">${e(step.question || study.centralQuestion)}</p><p class="lead">${e(step.body)}</p></section>
    <div class="evidence" data-evidence-count="${step.media.length}">${step.media.map((item,i)=>`<figure>${media(item,'Evidence')}<figcaption>${e(step.captions?.[i] || item.caption || '')}</figcaption></figure>`).join('')}</div>
    <div class="step-actions">${link(previous ? base+'/'+previous.id : base,previous ? '← Previous step' : '← Case cover','action')}${next ? link(base+'/'+next.id,'Next step →','action') : link(base,'Case cover →','action')}</div>
    </div><nav class="step-nav" aria-label="Case study steps">${study.steps.map((s,i)=>`<a href="${base}/${s.id}" ${s.id===step.id ? 'aria-current="step"' : ''}><span class="step-number">${e(String(s.number ?? i+1).padStart(2,'0'))}</span><span class="step-label">${e(s.title)}</span></a>`).join('')}</nav></div>`;
}

function about() {
  const a=config.about;
  return `${heading('ABOUT ME')}
    <div class="about-layout"><div class="about-portrait">${media(config.portrait,'Portrait')}</div><div>
      ${printSection(config.name,`<p class="lead">${e(a.biography)}</p>`,'biography-panel')}
      <div class="about-focus">${printSection('FOCUS',`<p>${e(a.focus)}</p>`)}${printSection('CURRENTLY',`<p>${e(a.currently)}</p>`)}</div>
    </div></div>
    ${printSection('TRAJECTORY',a.trajectory.length ? `<ol class="timeline">${a.trajectory.map(t=>`<li><strong>${e(t.date)}</strong><h3>${e(t.title)}</h3><p>${e(t.body)}</p></li>`).join('')}</ol>` : emptyState('Timeline forthcoming','Professional trajectory details will be supplied here.'))}
    <div class="about-facts">${printSection('SKILLS',list(a.skills))}${printSection('LOCATION',`<p>${e(a.location || 'Location forthcoming.')}</p>`)}${printSection('LANGUAGES',list(a.languages))}</div>`;
}

function cv() {
  const url=assetUrl(config.cv.url);
  const preview=assetUrl(config.cv.previewUrl);
  return `${heading('CV')}
    <div class="cv-layout"><section class="document-stage" aria-label="CV document viewer">
      <div class="document-toolbar"><span>CURRICULUM VITAE</span><span>${preview ? 'DOCUMENT PREVIEW' : 'PDF'}</span></div>
      ${url ? (preview ? `<iframe class="pdf-viewer cv-document" src="${e(preview)}" title="Curriculum vitae document" loading="eager"></iframe>` : `<object class="pdf-viewer" data="${e(url)}" type="application/pdf" aria-label="Curriculum vitae"><p>Your browser cannot embed this PDF. ${external(url,'Open CV')}</p></object>`) : `<div class="cv-empty"><div class="document-sheet"><span class="print-slashes" aria-hidden="true">//</span><strong>CV document forthcoming</strong><p>A PDF viewer will appear here when the CV is supplied.</p></div></div>`}
    </section><aside class="cv-profile print-panel"><p class="eyebrow">PROFILE</p><h2>${e(config.name)}</h2><p>${e(config.cv.summary)}</p>
      ${actions(external(config.cv.url,'View CV')+external(config.cv.url,'Download PDF',true))}
      <p class="distribution-note">${url ? 'Use the actions above if your browser cannot display the document.' : 'CV file forthcoming.'}</p>
    </aside></div>`;
}

function contact() {
  const entries=[['Email',config.contact.email ? 'mailto:'+config.contact.email : null,'@'],['LinkedIn',assetUrl(config.contact.linkedin),'in'],['GitHub',assetUrl(config.contact.github),'GH'],['Download CV',assetUrl(config.cv.url),'PDF']];
  return `${heading('CONTACT')}<p class="lead contact-intro">${e(config.copy.contact)}</p>
    <div class="destination-grid">${entries.map(([label,url,icon])=>{
      const contents=`<span class="destination-icon" aria-hidden="true">${icon}</span><span><strong>${e(label)}</strong><small>${url ? (label==='Download CV' ? 'Download PDF' : 'Open destination') : 'Forthcoming'}</small></span><span class="destination-arrow" aria-hidden="true">${url ? '↗' : '—'}</span>`;
      return url ? `<a class="destination-card" href="${e(url)}" ${label==='Download CV' ? 'download' : label!=='Email' ? 'target="_blank" rel="noopener noreferrer"' : ''}>${contents}</a>` : `<div class="destination-card unavailable" aria-disabled="true">${contents}</div>`;
    }).join('')}</div>
    ${printSection('COLLABORATION & OPPORTUNITIES',`<p>${e(config.copy.opportunities)}</p>`,'collaboration-panel')}`;
}
export function renderPage(r) {
  const pageClass = r.section === '' ? 'overview-page' : `publication-page ${r.section}-page ${r.item ? 'detail-page' : 'index-page'}${r.step ? ' case-step-page' : ''}`;
  return `<div class="page ${pageClass}">${({'':overview,projects:()=>projects(r.item),roles:()=>roles(r.item),'case-studies':()=>cases(r.item,r.step),about,cv,contact}[r.section])()}</div>`;
}
