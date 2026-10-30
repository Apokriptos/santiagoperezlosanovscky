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
for(const hash of valid) { const r=resolveRoute(hash); assert.notEqual(r.branch,'invalid',hash); if(r.branch==='games') assert.ok(renderPage(r).match(/<h1(?:\s|>)/)); }
for(const hash of ['#other','#games/missing','#games/roles/missing','#games/projects/project-1/extra','#games/case-studies/case-1/missing','#games/about/extra','#%E0%A4%A']) assert.equal(resolveRoute(hash).branch,'invalid',hash);
// New records and arbitrary step counts must work without changing renderers/router.
const temporary={...CaseStudies[0],id:'temporary-case',steps:Array.from({length:12},(_,i)=>({id:`s${i}`,title:`Title ${i}`,body:'Test',media:[],captions:[]}))};
CaseStudies.push(temporary);
assert.equal(resolveRoute('#games/case-studies/temporary-case/s10').step.id,'s10');
assert.equal((renderPage(resolveRoute('#games/case-studies/temporary-case/s10')).match(/aria-current="step"/g)||[]).length,1);
assert.equal((renderPage(resolveRoute('#games/case-studies/temporary-case/s10')).match(/<a href="#games\/case-studies\/temporary-case\/s/g)||[]).length,12);
CaseStudies.pop();
const shell=await readFile(new URL('../styles/shell.css',import.meta.url),'utf8');
const pages=await readFile(new URL('../styles/pages.css',import.meta.url),'utf8');
assert.equal((shell.match(/--games-left-rail-width:\s*251px/g)||[]).length,1);
assert.equal((shell.match(/--games-context-rail-width:\s*134px/g)||[]).length,1);
assert.ok(!/--games-(left|context)-rail-width/.test(pages));
for (const file of ['games-visual.css','overview.css','publication.css','case-studies.css','desktop-fit.css']) {
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
assert.ok(renderPage(resolveRoute('#games')).includes('data-slide="3"'));
Projects.pop();
// Configured links must be real actions; missing files remain deliberate empty states.
const previousCv=config.cv.url;
const previousPreview=config.cv.previewUrl;
config.cv.previewUrl=null;
config.cv.url='https://example.com/test-cv.pdf';
const cv=renderPage(resolveRoute('#games/cv'));
assert.ok(cv.includes('<object class="pdf-viewer"'));
assert.ok(cv.includes('download'));
assert.ok(!cv.includes('class="cv-empty"'));
config.cv.url=null;
assert.ok(renderPage(resolveRoute('#games/cv')).includes('class="cv-empty"'));
config.cv.url=previousCv;
config.cv.previewUrl=previousPreview;
const previousBuild=Projects[0].buildUrl;
Projects[0].buildUrl='https://example.com/test-build';
assert.ok(renderPage(resolveRoute('#games/projects/'+Projects[0].id)).includes('href="https://example.com/test-build"'));
Projects[0].buildUrl=previousBuild;
const previousExperience=Roles[0].experience;
Roles[0].experience=[{title:'Test fixture experience',body:'Test fixture body',projectId:Projects[0].id}];
assert.ok(renderPage(resolveRoute('#games/roles/'+Roles[0].id)).includes('Test fixture experience'));
Roles[0].experience=previousExperience;
assert.ok(!renderPage(resolveRoute('#games/case-studies/case-1')).includes('class="step-nav"'));
assert.ok(renderPage(resolveRoute('#games/case-studies')).includes('class="case-carousel"'));
assert.ok(renderPage(resolveRoute('#games/case-studies/case-1/step-1')).includes('case-study-step-panel'));
assert.ok(!renderPage(resolveRoute('#games/case-studies/case-1/step-1')).includes('class="step-question"'));
assert.ok((await readFile(new URL('../'+config.cv.url,import.meta.url))).subarray(0,5).toString()==='%PDF-');
assert.ok((await readFile(new URL('../'+config.cv.source,import.meta.url))).length>0);
assert.ok((await readFile(new URL('../'+config.cv.previewUrl,import.meta.url),'utf8')).includes('PROFESSIONAL SUMMARY'));
console.log(`${valid.length} valid routes, invalid routes, dynamic 12-step case, configured document/build/experience states, and shell ownership checks passed.`);

// Every configured project media reference must resolve to a real repository file.
for (const project of Projects) {
  for (const path of [project.thumbnail,project.heroMedia.src,project.video.src,project.video.poster,...project.gallery.map(item=>item.src)]) {
    assert.ok((await readFile(new URL('../'+path,import.meta.url))).length>0, 'Missing project media: '+path);
  }
}
console.log('All configured project media files exist.');

assert.deepEqual(CaseStudies[0].steps.map(step=>step.title), ['Context','Design Problem','Investigation Loop','GhostSight','Clues & Feedback','Iteration','Outcome']);
assert.equal(CaseStudies.length,3);
for (const study of CaseStudies) {
  const project=Projects.find(p=>p.id===study.projectId);
  assert.equal(study.heroMedia.src, project.heroMedia.src);
  assert.ok(project.caseStudies.includes(study.id));
  assert.ok(study.steps.every(step=>step.media.every(item=>item.src===null)), 'Analytical evidence remains unwritten');
}
console.log('Approved case identities, relationships, seven-step sequence and evidence placeholders passed.');

assert.equal(Projects[1].buildUrl,'https://drive.google.com/drive/folders/1db4vGlSh1NJghHg6os328QoY0oEfYDyK?usp=sharing');
for (const project of Projects) {
 const html=renderPage(resolveRoute('#games/projects/'+project.id));
 assert.ok(html.includes('data-project-gallery'));
 assert.equal((html.match(/data-gallery-index=/g)||[]).length,project.gallery.length);
 assert.ok(!html.includes('class="tags"'));
 assert.ok(project.description.every(paragraph=>html.includes(paragraph.replaceAll('&','&amp;'))));
}
console.log('Project Detail prose, numbered gallery generation and current Reditus folder checks passed.');

await import('./ui-foundation.mjs');
await import('./projects.mjs');
await import('./roles.mjs');
await import('./cases.mjs');
