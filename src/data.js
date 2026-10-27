// Editorial placeholders are deliberately explicit: none are claims of completed work.
export const config = {
  name: 'Santiago Pérez Losanovscky',
  introduction: 'Professional introduction forthcoming. Explore the portfolio structure by area of work, project, or case study.',
  studioUrl: 'https://apokriptos.github.io/aobscuragames/',
  overviewVideos: { projects: null, roles: null },
  portrait: null,
  // Overview is a curated window into Roles[], not a second role definition.
  overview: { featuredRoleIds: ['technical-game-design', 'level-design', 'creative-leadership'] },
  cv: { url: null, summary: 'Profile and CV summary forthcoming.' },
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
export const Projects = Array.from({ length: 3 }, (_, i) => ({
  id: `project-${i + 1}`, title: `Project ${String(i + 1).padStart(2, '0')}`,
  subtitle: 'Project placeholder', shortDescription: 'Project description forthcoming.',
  longDescription: 'Premise, scope, and contribution details will be supplied with the project content.',
  roles: [], tags: ['Content forthcoming'], thumbnail: null, heroMedia: null, video: null,
  gallery: [placeholder('Project media 01'), placeholder('Project media 02'), placeholder('Project media 03')],
  buildStatus: 'Build availability forthcoming.', buildUrl: null, externalUrl: null, caseStudies: [],
}));
export const CaseStudies = [
  { id: 'case-1', title: 'Case Study 01', count: 4 },
  { id: 'case-2', title: 'Case Study 02', count: 2 },
].map(({ id, title, count }, index) => ({
  id, title, subtitle: 'Case study placeholder', projectId: Projects[index].id, roleIds: [], heroMedia: null,
  summary: 'Case summary forthcoming.', centralQuestion: 'The central design question will be supplied here.',
  contribution: ['Contribution and ownership details forthcoming.'],
  steps: Array.from({ length: count }, (_, i) => ({ id: `step-${i + 1}`, number: i + 1,
    title: `Step ${String(i + 1).padStart(2, '0')}`, body: 'Reasoning, decisions, iteration, and outcomes forthcoming.',
    media: [placeholder('Evidence 01'), placeholder('Evidence 02')], captions: [],
  })),
}));
CaseStudies.forEach(c => Projects.find(p => p.id === c.projectId)?.caseStudies.push(c.id));
