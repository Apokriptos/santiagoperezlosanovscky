import { Projects, Roles, CaseStudies } from './data.js';
export function resolveRoute(hash) {
  let parts;
  try { parts = decodeURIComponent(hash.replace(/^#\/?/, '')).split('/').filter(Boolean); }
  catch { return { branch: 'invalid' }; }
  if (!parts.length) return { branch: 'root' };
  if (parts[0] === 'books' && parts.length === 1) return { branch: 'books' };
  if (parts[0] !== 'games') return { branch: 'invalid' };
  const [, section = '', id, stepId] = parts;
  const route = { branch: 'games', section, id, stepId };
  if (['', 'about', 'cv', 'contact'].includes(section)) return parts.length <= 2 ? route : { branch: 'invalid' };
  const items = { projects: Projects, roles: Roles, 'case-studies': CaseStudies }[section];
  if (!items || parts.length > (section === 'case-studies' ? 4 : 3)) return { branch: 'invalid' };
  if (!id) return route;
  route.item = items.find(item => item.id === id);
  if (!route.item) return { branch: 'invalid' };
  if (stepId) { route.step = route.item.steps.find(step => step.id === stepId); if (!route.step) return { branch: 'invalid' }; }
  return route;
}
