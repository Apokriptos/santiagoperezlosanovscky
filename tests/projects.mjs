import assert from 'node:assert/strict';
import { Projects } from '../src/data.js';
import { renderPage } from '../src/pages.js';
import { resolveRoute } from '../src/router.js';
import { projectCard, projectSelector, projectDetailPanel } from '../src/project-ui.js';
const index=renderPage(resolveRoute('#games/projects'));
assert.equal((index.match(/data-project-card=/g)||[]).length,Projects.length);
assert.ok(!index.includes('video-start')&&!index.includes('carousel-count')&&!index.includes('Watch overview'));
for(const project of Projects){
 const card=projectCard(project);
 assert.equal((card.match(/<a /g)||[]).length,1);
 assert.ok(!card.includes('<button'));
 assert.ok(card.includes(project.categories.join(' · ')));
 const page=renderPage(resolveRoute('#games/projects/'+project.id));
 assert.ok(page.includes('project-detail-panel'));
 assert.ok(page.includes('ui-header-plate'));
 assert.ok(page.includes('ui-carousel-arrow--prev'));
 assert.ok(!page.includes('gallery-thumbnails')&&!page.includes('gallery-count'));
 assert.ok(page.includes(project.buildUrl.replaceAll('&','&amp;')));
}
assert.ok(projectCard({...Projects[0],title:'<unsafe>'}).includes('&lt;unsafe&gt;'));
assert.equal((projectSelector([...Projects,{...Projects[0],id:'fourth'}]).match(/data-project-card=/g)||[]).length,4);
assert.ok(projectDetailPanel('A & B','<p>Trusted slot</p>').includes('A &amp; B'));
console.log('Projects contracts: shared cards/panels, dynamic counts, semantic single links, safe labels, actual category/build data and approved removals passed.');
