import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolveRoute } from '../src/router.js';
import { config, Projects, Roles, CaseStudies } from '../src/data.js';
import { renderPage } from '../src/pages.js';
const valid=['','#games','#books','#games/about','#games/cv','#games/contact'];
for (const [family,items] of [['projects',Projects],['roles',Roles],['case-studies',CaseStudies]]) {
  valid.push(`#games/${family}`);
  for(const item of items) {
    valid.push(`#games/${family}/${item.id}`);
    for(const step of item.steps || []) valid.push(`#games/${family}/${item.id}/${step.id}`);
  }
}
for(const hash of valid) { const r=resolveRoute(hash); assert.notEqual(r.branch,'invalid',hash); if(r.branch==='games') assert.ok(renderPage(r).includes('<h1>')); }
for(const hash of ['#other','#games/missing','#games/roles/missing','#games/projects/project-1/extra','#games/case-studies/case-1/missing','#games/about/extra','#%E0%A4%A']) assert.equal(resolveRoute(hash).branch,'invalid',hash);
// New records and arbitrary step counts must work without changing renderers/router.
const temporary={...CaseStudies[0],id:'temporary-case',steps:Array.from({length:11},(_,i)=>({id:`s${i}`,title:`Title ${i}`,body:'Test',media:[],captions:[]}))};
CaseStudies.push(temporary);
assert.equal(resolveRoute('#games/case-studies/temporary-case/s10').step.id,'s10');
assert.equal((renderPage(resolveRoute('#games/case-studies/temporary-case/s10')).match(/aria-current="step"/g)||[]).length,1);
assert.equal((renderPage(resolveRoute('#games/case-studies/temporary-case/s10')).match(/<a href="#games\/case-studies\/temporary-case\/s/g)||[]).length,11);
CaseStudies.pop();
const shell=await readFile(new URL('../styles/shell.css',import.meta.url),'utf8');
const pages=await readFile(new URL('../styles/pages.css',import.meta.url),'utf8');
assert.equal((shell.match(/--games-left-rail-width:\s*251px/g)||[]).length,1);
assert.equal((shell.match(/--games-context-rail-width:\s*134px/g)||[]).length,1);
assert.ok(!/--games-(left|context)-rail-width/.test(pages));
for (const file of ['games-visual.css','overview.css']) {
  const css=await readFile(new URL('../styles/'+file,import.meta.url),'utf8');
  assert.ok(!/--games-(left|context)-rail-width\s*:/.test(css),file+' must not own rail dimensions');
  assert.ok(!/references\//.test(css),file+' must not use screen mockups');
}
const selectedRole=Roles.find(r=>r.id===config.overview.featuredRoleIds[0]);
const originalTitle=selectedRole.title;
selectedRole.title='Data-driven role title';
assert.ok(renderPage(resolveRoute('#games')).includes('Data-driven role title'));
selectedRole.title=originalTitle;
Projects.push({...Projects[0],id:'extra-project',title:'Extra project'});
assert.ok(renderPage(resolveRoute('#games')).includes('Extra project'));
assert.ok(renderPage(resolveRoute('#games')).includes('1 / 4'));
Projects.pop();
console.log(`${valid.length} valid routes, invalid routes, dynamic 11-step case, and shell ownership checks passed.`);
