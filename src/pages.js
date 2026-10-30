import { caseStudyStep } from './case-ui.js';
import { roleCard, roleDetailPanel, rolePractice, roleCaseStudyCard, roleOverviewDialog } from './role-ui.js';
import { projectSelector, projectDetailPanel } from './project-ui.js';
import { pageTitle, sectionTitle, surface, button, headerPlate, carouselArrow, indexTabs, mediaFrame } from './ui.js';
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
  const banner=config.overview?.authorBanner;
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
  <aside class="overview-portrait portrait ui-identity-rail${banner?' overview-portrait--banner':''}" aria-label="Identity composition">${banner ? `<img src="${e(assetUrl(banner.src))}" alt="${e(banner.alt)}" width="${e(banner.width)}" height="${e(banner.height)}" decoding="async">` : config.portrait ? `<img src="${e(assetUrl(config.portrait.src))}" alt="${e(config.portrait.alt)}">` : `<div class="portrait-placeholder"><p class="eyebrow">Portrait / identity</p><div class="portrait-registration" aria-hidden="true"><span>+</span><span>+</span><span>+</span><span>+</span></div><div class="portrait-pending"><span class="print-slashes" aria-hidden="true">//</span><p>Portrait forthcoming</p></div><div class="portrait-caption"><p>${e(config.name)}</p><span class="eyebrow">Media forthcoming</span></div></div>`}</aside></div>`;
}
const emptyState = (title, body = 'Content forthcoming.') => `<div class="empty-state"><span class="empty-mark" aria-hidden="true">//</span><strong>${e(title)}</strong><p>${e(body)}</p></div>`;
const printSection = (title, body, cls = '') => `<section class="print-panel ${cls}"><h2>${e(title)}</h2>${body}</section>`;
const actions = body => `<div class="actions">${body}</div>`;
const splitIntro = (title, copy, family) => `<div class="split-intro"><div>${heading(title)}<p class="lead">${e(copy)}</p>${link(`#${family}-video`,'Watch overview ↓','button')}</div><section id="${family}-video" aria-label="${family} overview video">${video(config.overviewVideos[family],`${family === 'projects' ? 'Projects' : 'Roles'} overview`)}</section></div>`;

const projectIcon = name => icon(name,{className:'project-ui-icon'});
function projects(project) {
  const projectHeader=(title,detail=false)=>`<header class="projects-header"><nav class="breadcrumb" aria-label="Breadcrumb">${link('#games','Games')}<span>/</span>${detail?`${link(route('projects'),'Projects')}<span>/</span>`:''}<span>${e(detail?title:'Projects')}</span></nav>${pageTitle(title,{slash:!detail})}${detail?'':`<p>${e(config.copy.projects)}</p>`}</header>`;
  if (!project) return `${projectHeader('GAME PROJECTS')}${projectSelector(Projects)}`;
  const related=project.caseStudies.map(id=>CaseStudies.find(study=>study.id===id)).filter(Boolean);
  const prose=`<div class="project-prose">${(project.description||[project.longDescription]).map(text=>`<p>${e(text)}</p>`).join('')}</div>`;
  const caseActions=related.length?`<div class="project-case-actions">${related.map(study=>button(study.title,{href:route('case-studies',study.id),arrowHousing:true,className:'project-case-link'})).join('')}</div>`:'';
  const build=`<div class="build-overview"><p class="project-detail-panel__status">${icon('controller')}<span>${e(project.buildStatus)}</span></p>${button('Download build',{href:project.buildUrl,disabled:!project.buildUrl,variant:'primary',iconName:'download',arrowHousing:true,className:'project-build-link',attributes:project.buildUrl?{'data-external-build':'true'}:{}}).replace('data-external-build="true"','target="_blank" rel="noopener noreferrer"')}${project.buildProvider?`<p class="project-provider">${icon('folder')}<span>${e(project.buildProvider)}</span></p>`:''}</div>`;
  const note=project.buildNote?`<div class="distribution-note">${icon('info')}<p>${project.buildUrl?'<strong>Evaluation build — not for redistribution.</strong> ':''}${e(project.buildNote)}</p></div>`:'';
  return `${projectHeader(project.title,true)}<div class="project-grid">
    <section class="project-video" aria-label="Gameplay video">${mediaFrame(video(project.video,'Gameplay').replace('class="video-start"','class="video-start ui-btn"'),{label:project.title+' gameplay',className:'project-media-panel ui-project-media-frame'})}</section>
    ${projectDetailPanel('The Game',prose+caseActions,{className:'project-description'})}
    <section class="project-gallery" aria-label="Project gallery">${projectGallery(project.gallery)}</section>
    ${projectDetailPanel('Playable Build',build,{className:'build-panel',footer:note})}
  </div>`;
}

function roles(role) {
  const roleHeader=(title,detail=false)=>`<header class="roles-header"><nav class="breadcrumb" aria-label="Breadcrumb">${link('#games','Games')}<span>/</span>${detail?`${link(route('roles'),'Roles')}<span>/</span>`:''}<span>${e(detail?title:'Areas of work')}</span></nav>${pageTitle(title)}${detail?`<p class="roles-positioning">${e(role.positioning||role.subtitle)}</p>`:`<p>${e(config.copy.roles)}</p>${button('Watch overview',{iconName:'play',attributes:{'data-role-overview':'true','aria-haspopup':'dialog','aria-controls':'roles-overview-dialog'}})}`}</header>`;
  if(!role) return `<div class="roles-overview-header">${roleHeader('AREAS OF WORK')}</div><section class="roles-overview-section">${sectionTitle('My Roles',{tone:'black'})}<div class="role-cards roles-overview__grid">${Roles.map(roleCard).join('')}</div></section>${roleOverviewDialog(config.overviewVideos.roles)}`;
  const experience=role.experience.length?`<ul class="role-detail-panel__list">${role.experience.map(item=>`<li><strong>${e(item.title)}</strong>${item.body?` — ${e(item.body)}`:''}${item.projectId?` ${link(route('projects',item.projectId),'View project','role-project-link')}`:''}</li>`).join('')}</ul>`:'<p class="role-content-pending">Selected experience forthcoming. Concrete project examples will be supplied here.</p>';
  const approach=`${role.approachIntro?`<p class="role-approach-intro">${e(role.approachIntro)}</p>`:''}<ul class="role-detail-panel__list">${role.approach.map(item=>typeof item==='string'?`<li>${e(item)}</li>`:`<li><strong>${e(item.title)}</strong>${item.body?` ${e(item.body)}`:''}</li>`).join('')}</ul>`;
  const study=CaseStudies.find(item=>item.id===role.featuredCaseStudy);
  return `${roleHeader(role.detailTitle||role.title,true)}<div class="role-detail-grid">${roleDetailPanel('My Approach',approach,{className:'approach-panel'})}${roleDetailPanel('Selected Experience',experience,{className:'selected-experience'})}${rolePractice(role.practiceMedia)}${roleDetailPanel('Role & Experience',`<p>${e(role.summary)}</p>`,{className:'role-summary'})}</div>${roleCaseStudyCard(study)}`;
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
  return caseStudyStep(study,step);
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
