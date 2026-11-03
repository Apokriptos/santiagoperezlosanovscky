import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {config,Roles,CaseStudies} from '../src/data.js';
import {profileContent} from '../src/profile-content.js';
assert.deepEqual(config.about,profileContent.about);
assert.equal(config.copy.roles,profileContent.rolesIntro);
assert.equal(config.about.trajectory.length,8);
assert.equal(config.about.skills.length,10);
assert.equal(new Set(Roles.map(r=>r.accentColor)).size,6);
const luminance=hex=>hex.match(/[a-f0-9]{2}/gi).map(n=>parseInt(n,16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4).reduce((sum,n,i)=>sum+n*[.2126,.7152,.0722][i],0);
for(const role of Roles){
 assert.ok((luminance('fff9ed')+.05)/(luminance(role.accentColor)+.05)>=3,'Cream icon contrast '+role.id);
 assert.equal(role.summary,profileContent.roles[role.id].summary);
 assert.ok(role.experience.length>=3&&role.approach.length>=4);
 assert.ok(!/forthcoming|Do not |Use Hollow Graves \/|Use Reditus Umbrae \//.test(JSON.stringify(profileContent.roles[role.id])));
 if(role.featuredCaseStudy)assert.ok(CaseStudies.some(c=>c.id===role.featuredCaseStudy));
 assert.ok(role.practiceMedia.every(m=>!m.src),'No fabricated professional evidence');
}
const data=readFileSync(new URL('../src/data.js',import.meta.url),'utf8');
assert.equal((data.match(/applyProfileContent\(config, Roles\)/g)||[]).length,1);
assert.ok(!/^import /m.test(readFileSync(new URL('../src/profile-content.js',import.meta.url),'utf8')));
console.log('Supplied profile content, stable identities, six accents, single initialization, no circular imports or invented evidence passed.');
