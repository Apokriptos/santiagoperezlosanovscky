import assert from 'node:assert/strict';
import {CaseStudies,Projects,config} from '../src/data.js';
import {caseStudyStep} from '../src/case-ui.js';
import {resolveRoute} from '../src/router.js';
assert.equal(config.caseStudies.comingSoon,true);
for(const study of CaseStudies)for(const step of study.steps){
 const html=caseStudyStep(study,step);
 for(const name of ['case-study-step-shell','case-study-step-panel','case-study-step-rail'])assert.ok(html.includes(name));
 assert.equal((html.match(/class="evidence"/g)||[]).length,1);
 assert.ok(!html.includes('<figcaption')&&!html.includes('data-gallery-direction')&&!html.includes('step-question'));
 assert.ok(!html.includes('Evidence and caption forthcoming.')&&!html.includes('Reasoning, decisions, iteration, and outcomes forthcoming.'));
 assert.equal((html.match(/aria-current="step"/g)||[]).length,1);
 assert.equal(resolveRoute('#games/case-studies/'+study.id+'/'+step.id).branch,'games');
}
const fixture={...CaseStudies[0].steps[0],body:['Fixture paragraph one.','Fixture paragraph two.'],evidenceImage:{src:'https://example.com/unit-fixture.png',alt:'Unit fixture'},media:Projects[0].gallery.slice(0,3),keyPoints:['Fixture takeaway.']};
const html=caseStudyStep(CaseStudies[0],fixture);
assert.equal((html.match(/<img /g)||[]).length,1);
assert.ok(html.includes('Fixture paragraph one.')&&html.includes('Fixture takeaway.'));
console.log('Case chapter contracts: separate data-driven rails, single static evidence image, explanatory content/key points, removed legacy strips/captions and open preview routes passed.');
