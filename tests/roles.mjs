import assert from 'node:assert/strict';
import { Roles, CaseStudies, Projects } from '../src/data.js';
import { resolveRoute } from '../src/router.js';
import { renderPage } from '../src/pages.js';
import { roleCard,rolePractice,roleCaseStudyCard,roleDetailPanel } from '../src/role-ui.js';
const ownership=Roles.find(role=>role.id==='product-ownership');
assert.ok(ownership);
assert.equal(ownership.subtitle,'Vision, planning, production, and cross-disciplinary coordination.');
assert.equal(resolveRoute('#games/roles/product-ownership').item,ownership);
const index=renderPage(resolveRoute('#games/roles'));
assert.equal((index.match(/role-card__heading/g)||[]).length,Roles.length);
for(const role of Roles){
 const card=roleCard(role);assert.equal((card.match(/<a /g)||[]).length,1);
 assert.ok(card.includes(role.id)&&card.includes('ui-role-icon')&&card.includes('ui-header-plate'));
 const page=renderPage(resolveRoute('#games/roles/'+role.id));
 for(const label of ['Role &amp; Experience','Selected Experience','In Practice','My Approach'])assert.ok(page.includes(label));
 assert.ok(page.includes(role.detailTitle||role.title));
}
const empty=rolePractice([{src:null,alt:'Planned evidence'}]);
assert.ok(empty.includes('Practice evidence forthcoming'));
assert.ok(!empty.includes('data-practice-index='));
assert.ok(empty.includes(' disabled'));
const practice=rolePractice(Projects[0].gallery.slice(0,4));
assert.equal((practice.match(/data-practice-index=/g)||[]).length,4);
assert.ok(practice.includes('ui-carousel-arrow--prev'));
assert.ok(roleCaseStudyCard(CaseStudies[0]).includes('#games/case-studies/'+CaseStudies[0].id));
assert.ok(roleCaseStudyCard(null).includes('disabled'));
assert.ok(roleDetailPanel('A & B','<p>Trusted content slot</p>').includes('A &amp; B'));
console.log('Roles contracts: approved sixth role, data-driven links/entry titles, shared panels/icons, real-media-only practice indices and safe forthcoming states passed.');
