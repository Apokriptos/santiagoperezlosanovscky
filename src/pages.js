import { config, Projects, Roles, CaseStudies } from './data.js';
import { escape as e, link, external, media, video, tags, list, section, carousel, placeholder, assetUrl } from './components.js';
const route = (family, id) => `#games/${family}${id ? '/' + id : ''}`;
const titleOf = (items, id) => items.find(i => i.id === id)?.title || id;
const heading = (title, subtitle = '', family = '') => `<header class="page-header"><nav class="breadcrumb" aria-label="Breadcrumb">${link('#games','Games')}${family ? `<span>/</span>${link(route(family),family.replaceAll('-',' '))}` : ''}<span>/</span><span>${e(title)}</span></nav><h1>${e(title)}</h1>${subtitle ? `<p class="subtitle">${e(subtitle)}</p>` : ''}</header>`;
const card = (item, family) => `<a class="panel" href="${route(family,item.id)}"><h3>${e(item.title)}</h3><p>${e(item.subtitle)}</p><span class="action">View ${family === 'roles' ? 'role' : 'case study'} →</span></a>`;
const projectSlide = project => `<article class="project-slide">${media(project.heroMedia || (project.thumbnail ? {src:project.thumbnail,alt:project.title} : null),project.title)}<div><p class="eyebrow">Project placeholder</p><h3>${e(project.title)}</h3><p>${e(project.shortDescription)}</p>${tags(project.tags)}${link(route('projects',project.id),'View project →','action')}</div></article>`;
const gallery = (items, label) => carousel(items, item => `<figure>${media(item,label)}${item.caption ? `<figcaption>${e(item.caption)}</figcaption>` : ''}</figure>`,label);
const caseCTA = id => id ? link(route('case-studies',id),titleOf(CaseStudies,id)+' →','button') : '<p class="status">Featured case study forthcoming.</p>';
function overview() {
  return `<div class="overview-grid"><div>${heading('OVERVIEW')}<p>${e(config.introduction)}</p>
  <section class="section"><div class="section-heading"><h2>ROLES</h2>${link(route('roles'),'View all roles →')}</div><div class="cards">${Roles.map(r=>card(r,'roles')).join('')}</div></section>
  <section class="section"><div class="section-heading"><h2>PROJECTS</h2>${link(route('projects'),'View all projects →')}</div>${carousel(Projects,projectSlide,'featured projects')}</section></div>
  <aside class="portrait media" aria-label="Identity composition">${config.portrait ? `<img src="${e(assetUrl(config.portrait.src))}" alt="${e(config.portrait.alt)}">` : placeholder('Portrait / identity')}</aside></div>`;
}
function projects(project) {
  if (!project) return `${heading('GAME PROJECTS')}<div class="intro-grid"><div><p>Project introduction forthcoming.</p>${link('#projects-video','Watch overview ↓','button')}</div><div id="projects-video">${video(config.overviewVideos.projects,'Projects overview')}</div></div>${section('FEATURED PROJECT',carousel(Projects,projectSlide,'featured projects'))}`;
  return `${heading(project.title,project.subtitle,'projects')}<div class="project-grid"><section aria-label="Gameplay video">${video(project.video,'Gameplay')}</section><section class="panel"><h2>THE GAME</h2><p>${e(project.longDescription)}</p>${tags([...project.tags,...project.roles.map(id=>titleOf(Roles,id))])}${project.caseStudies.map(id=>caseCTA(id)).join('')}${project.externalUrl ? external(project.externalUrl,'Project website') : ''}</section><section aria-label="Project gallery">${gallery(project.gallery,'project images')}</section><section class="panel"><h2>PLAYABLE BUILD</h2><p>${e(project.buildStatus)}</p>${external(project.buildUrl,'Download build')}</section></div>`;
}
function roles(role) {
  if (!role) return `${heading('AREAS OF WORK')}<div class="intro-grid"><div><p>Explore the areas of work below. Selected experience will be added with the final content.</p>${link('#roles-video','Watch overview ↓','button')}</div><div id="roles-video">${video(config.overviewVideos.roles,'Roles overview')}</div></div>${section('MY ROLES',`<div class="cards">${Roles.map(r=>card(r,'roles')).join('')}</div>`)}`;
  return `${heading(role.title,role.subtitle,'roles')}${section('ROLE & EXPERIENCE',`<p class="prose">${e(role.summary)}</p>`)}${section('SELECTED EXPERIENCE',role.experience.length ? role.experience.map(x=>`<article class="panel"><h3>${e(x.title)}</h3><p>${e(x.body)}</p>${x.projectId ? link(route('projects',x.projectId),'View project →') : ''}</article>`).join('') : '<p class="status">Concrete project examples forthcoming.</p>')}${section('IN PRACTICE',gallery(role.practiceMedia,'practice media'))}${section('MY APPROACH',list(role.approach))}${section('FEATURED CASE STUDY',caseCTA(role.featuredCaseStudy))}`;
}
function cases(study, step) {
  if (!study) return `${heading('CASE STUDIES','Design reasoning, implementation, and evidence — content forthcoming.')}<div class="cards">${CaseStudies.map(c=>card(c,'case-studies')).join('')}</div>`;
  const base = route('case-studies',study.id);
  if (!step) return `${heading(study.title,study.subtitle,'case-studies')}${media(study.heroMedia,'Case study hero')}${tags(study.roleIds.map(id=>titleOf(Roles,id)))}<div class="two-columns"><div>${section('THE CASE',`<p>${e(study.summary)}</p>`)}${section('CENTRAL QUESTION',`<p>${e(study.centralQuestion)}</p>`)}</div><div>${section('MY CONTRIBUTION',list(study.contribution))}${section('WHAT THIS STUDY COVERS',`<ol>${study.steps.map(s=>`<li>${link(base+'/'+s.id,s.title)}</li>`).join('')}</ol>`)}</div></div>${study.steps.length ? link(base+'/'+study.steps[0].id,'Begin case study →','button') : '<p>Steps forthcoming.</p>'} ${study.projectId ? link(route('projects',study.projectId),'View project →','button') : ''}`;
  const index = study.steps.indexOf(step);
  return `${heading(study.title,'','case-studies')}<p>${link(base,'Case cover ←')}</p><p class="eyebrow">Step ${e(step.number ?? index + 1)} / ${study.steps.length}</p><h2>${e(step.title)}</h2><p class="prose">${e(step.body)}</p><div class="evidence">${step.media.map((item,i)=>`<figure>${media(item,'Evidence')}<figcaption>${e(step.captions?.[i] || item.caption || '')}</figcaption></figure>`).join('')}</div><nav class="step-nav" aria-label="Case study steps">${study.steps.map((s,i)=>`<a href="${base}/${s.id}" ${s.id===step.id ? 'aria-current="step"' : ''}>${e(s.number ?? i+1)} · ${e(s.title)}</a>`).join('')}</nav>`;
}
function about() {
  const a=config.about;
  return `${heading('ABOUT ME')}<div class="two-columns"><div>${config.portrait ? media(config.portrait,'Portrait') : `<div class="media portrait">${placeholder('Portrait')}</div>`}</div><div><p>${e(a.biography)}</p>${section('FOCUS',`<p>${e(a.focus)}</p>`)}${section('CURRENTLY',`<p>${e(a.currently)}</p>`)}</div></div>${section('TRAJECTORY',a.trajectory.length ? `<ol>${a.trajectory.map(t=>`<li><strong>${e(t.date)}</strong> ${e(t.title)}<p>${e(t.body)}</p></li>`).join('')}</ol>` : '<p class="status">Timeline forthcoming.</p>')}<div class="two-columns"><div>${section('SKILLS',list(a.skills))}</div><div>${section('LOCATION',`<p>${e(a.location || 'Location forthcoming.')}</p>`)}${section('LANGUAGES',list(a.languages))}</div></div>`;
}
function cv() {
  const url=assetUrl(config.cv.url);
  return `${heading('CV')}<div class="two-columns"><div><p>${e(config.cv.summary)}</p>${external(config.cv.url,'View CV')} ${external(config.cv.url,'Download PDF',true)}</div><div>${url ? `<object class="pdf-viewer" data="${e(url)}" type="application/pdf" aria-label="Curriculum vitae"><p>Your browser cannot embed this PDF. ${external(url,'Open CV')}</p></object>` : `<div class="cv-empty placeholder"><strong>CV document forthcoming</strong><span>A PDF viewer will appear here when the CV is supplied.</span></div>`}</div></div>`;
}
function contact() {
  const entries=[['Email',config.contact.email ? 'mailto:'+config.contact.email : null],['LinkedIn',assetUrl(config.contact.linkedin)],['GitHub',assetUrl(config.contact.github)],['Download CV',assetUrl(config.cv.url)]];
  return `${heading('CONTACT')}<p>Collaboration and opportunity information forthcoming.</p><div class="contact-links">${entries.map(([label,url])=>url ? `<a href="${e(url)}" ${label==='Download CV' ? 'download' : label!=='Email' ? 'target="_blank" rel="noopener noreferrer"' : ''}>${e(label)} <span aria-hidden="true">↗</span></a>` : `<div><span>${e(label)}</span><small>Forthcoming</small></div>`).join('')}</div>`;
}
export function renderPage(r) {
  return `<div class="page">${({'':overview,projects:()=>projects(r.item),roles:()=>roles(r.item),'case-studies':()=>cases(r.item,r.step),about,cv,contact}[r.section])()}</div>`;
}
