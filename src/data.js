// Editorial placeholders are deliberately explicit: none are claims of completed work.
export const config = {
  name: 'Santiago Pérez Losanovscky',
  introduction: 'Professional introduction forthcoming. Explore the portfolio structure by area of work, project, or case study.',
  studioUrl: 'https://apokriptos.github.io/aobscuragames/',
  overviewVideos: { projects: null, roles: null, 'case-studies': null },
  portrait: null,
  // Overview is a curated window into Roles[], not a second role definition.
  overview: { featuredRoleIds: ['technical-game-design', 'level-design', 'creative-leadership'] },
  copy: {
    projects: 'Project introduction forthcoming.',
    roles: 'Explore the areas of work below. Selected experience will be added with the final content.',
    contact: 'Collaboration and opportunity information forthcoming.',
    opportunities: 'Availability and collaboration details forthcoming.',
    caseStudies: 'Deep dives into design problems, implementation, iteration, and outcomes. Case content forthcoming.',
  },
  cv: {
    url: 'documentation/cv-technical-game-designer.pdf',
    previewUrl: 'documentation/cv-technical-game-designer.html',
    source: 'documentation/CV — Technical Game Designer — Santiago Perez Losanovscky.docx',
    summary: 'Game and systems designer with 7+ years of professional experience across game design, level design, gameplay systems, mobile and VR production, product ownership, and design leadership.',
  },
  contact: { email: null, linkedin: null, github: 'https://github.com/Apokriptos' },
  about: {
    biography: 'Professional biography forthcoming.', focus: 'Focus statement forthcoming.',
    currently: 'Current work forthcoming.', trajectory: [], skills: [], location: null, languages: [],
  },
};
export const navigation = [
  ['', 'OVERVIEW'], ['projects', 'PROJECTS'], ['roles', 'ROLES'],
  ['case-studies', 'CASE STUDIES'], ['about', 'ABOUT ME'], ['cv', 'CV'], ['contact', 'CONTACT'],
].map(([id, title]) => ({ id, title, href: '#games' + (id ? '/' + id : '') }));
const placeholder = label => ({ src: null, alt: label, caption: 'Evidence and caption forthcoming.' });
export const Roles = [
  ['technical-game-design', 'Technical Game Design', 'Design and implementation of gameplay systems.'],
  ['level-design', 'Level Design', 'Spatial design, pacing, and player navigation.'],
  ['gameplay-development', 'Gameplay Development', 'Implementation of gameplay behavior and interactions.'],
  ['creative-leadership', 'Creative Leadership', 'Creative direction, collaboration, and design alignment.'],
  ['technical-animation', 'Technical Animation', 'In-engine state machines, blending, procedural and additive animation, retargeting, runtime character setup, and animation/gameplay integration.'],
].map(([id, title, subtitle]) => ({ id, title, subtitle,
  summary: 'Role and experience summary forthcoming.', experience: [],
  practiceMedia: [placeholder('Practice example 01'), placeholder('Practice example 02')],
  approach: ['Approach and implementation notes forthcoming.'], featuredCaseStudy: null,
}));
const projectSources = [
  { title: 'Hollow Graves', folder: 'hollow-graves', cover: 'MainPic.png', video: 'Hollowgravesshowcasenew.mp4', shots: ['ScreenShot00000.png', 'ScreenShot00002.png', 'ScreenShot00005.png'] },
  { title: 'Reditus Umbrae', folder: 'reditus-umbrae', cover: 'ScreenShot00001.png', video: 'Reditusumbraeshowcasenew.mp4', shots: ['ScreenShot00002.png', 'ScreenShot00004.png', 'ScreenShot00006.png'] },
  { title: 'Dreadwoods', folder: 'dreadwoods', cover: 'DW_SS11.png', video: 'Dreadwoods - Video - Final.mp4', shots: ['DW_SS2.png', 'DW_SS20.png', 'DW_SS24.png'] },
];
export const Projects = projectSources.map((source, i) => ({
  id: `project-${i + 1}`, title: source.title,
  subtitle: 'Project showcase', shortDescription: 'Project description forthcoming.',
  longDescription: 'Premise, scope, and contribution details will be supplied with the project content.',
  roles: [], tags: ['Content forthcoming'], thumbnail: `media/${source.folder}/${source.cover}`,
  heroMedia: { src: `media/${source.folder}/${source.cover}`, alt: `${source.title} — project artwork` },
  video: { src: `media/${source.folder}/${source.video}`, poster: `media/${source.folder}/${source.cover}` },
  gallery: source.shots.map((file, index) => ({ src: `media/${source.folder}/${file}`, alt: `${source.title} — screenshot ${index + 1}`, caption: 'Project screenshot. Detailed commentary forthcoming.' })),
  buildStatus: 'Build availability forthcoming.', buildUrl: null, buildProvider: null,
  buildNote: 'Evaluation and distribution terms forthcoming.', externalUrl: null, caseStudies: [],
}));
// Approved identities and structure; analytical content remains unwritten.
export const CaseStudies = [
  { id: 'case-1', title: 'Designing Investigation in Hollow Graves', projectIndex: 0,
    labels: ['Context', 'Design Problem', 'Investigation Loop', 'GhostSight', 'Clues & Feedback', 'Iteration', 'Outcome'] },
  { id: 'case-2', title: 'Frenzy & Combat in Reditus Umbrae', projectIndex: 1,
    labels: ['Step 01', 'Step 02'], structurePending: true },
  { id: 'case-3', title: 'Exploration in Dreadwoods', projectIndex: 2,
    labels: ['Steps forthcoming'], structurePending: true },
].map(({ id, title, projectIndex, labels, structurePending = false }) => ({
  id, title, subtitle: structurePending ? 'Structure and analysis forthcoming' : 'Analysis forthcoming',
  projectId: Projects[projectIndex].id, roleIds: [], heroMedia: { ...Projects[projectIndex].heroMedia }, structurePending,
  summary: 'Case summary forthcoming.', centralQuestion: 'The central design question will be supplied here.',
  contribution: ['Contribution and ownership details forthcoming.'],
  steps: labels.map((title, i) => ({ id: `step-${i + 1}`, number: i + 1,
    title, body: 'Reasoning, decisions, iteration, and outcomes forthcoming.',
    media: [placeholder('Evidence 01'), placeholder('Evidence 02')], captions: [],
  })),
}));
// Confirmed against Aobscura games.config.js (read-only reference).
Object.assign(Projects[0], { buildStatus: 'Playable build available.', buildProvider: 'Google Drive',
  buildUrl: 'https://drive.google.com/file/d/16a5fx6jZp_mfh7tM_XKza_Ro3E-bnU9-/view?usp=sharing' });
Object.assign(Projects[1], { buildStatus: 'Playable build available.', buildProvider: 'Google Drive',
  buildUrl: 'https://drive.google.com/file/d/1Zc0uigVurvcOhfjpLCnYv9G74CkCa6Nv/view?usp=drive_link' });
CaseStudies.forEach(c => Projects.find(p => p.id === c.projectId)?.caseStudies.push(c.id));
