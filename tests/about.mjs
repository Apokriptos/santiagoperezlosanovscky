import assert from 'node:assert/strict';
import {aboutComposition} from '../src/about-ui.js';
import {config} from '../src/data.js';
const html=aboutComposition(config.about,config.name,null);
assert.ok(html.includes('bridging creative intent with implementation.'));
assert.ok(html.includes('Portrait placeholder; final photograph to be supplied'));
assert.ok(!html.includes('MEDIA FORTHCOMING'));
assert.equal((html.match(/class="trajectory-card"/g)||[]).length,config.about.trajectory.length);
assert.deepEqual(config.about.trajectory.map(t=>[t.title,t.role,t.date]),[
 ['AOBSCURA GAMES','Creative Director','Nov 2021–Present'],
 ['IMAGE CAMPUS','Professor — Game Design','Apr 2022–Present'],
 ['ACONCAGUA GAMES','Product Owner / Lead Game Designer','May 2022–Sep 2024'],
 ['PIXOWL — MATCH ISLAND','Game Designer / Level Designer','Sep 2020–Jan 2022'],
 ['VR HEALTH','Lead Game Designer','Oct 2020–Jun 2021'],
 ['INDEPENDENT GAME STUDIO','Lead Game Designer / Producer','Jan 2019–Sep 2020'],
 ['COTO CICSA','Game Designer','Apr 2019–Nov 2019'],
 ['INDEPENDENT AUTHOR','Author & Writer','2009–Present']
]);
assert.ok(!/Hollow Graves|Drill to the Rend|Reditus Umbrae|Dreadwoods/.test(JSON.stringify(config.about.trajectory)));
const fixture={...config.about,trajectory:Array.from({length:11},(_,i)=>({date:'Fixture '+i,title:'<script>bad</script>',role:'Role & context',body:'User & supplied text'})),skills:['<tag>']};
const dynamic=aboutComposition(fixture,'Safe <name>',{src:'assets/example.png',alt:'Supplied photograph'});
assert.equal((dynamic.match(/class="trajectory-card"/g)||[]).length,11);
assert.ok(dynamic.includes('Role &amp; context'));
assert.ok(dynamic.includes('&lt;script&gt;bad&lt;/script&gt;'));
assert.ok(dynamic.includes('User &amp; supplied text'));
assert.ok(dynamic.includes('&lt;tag&gt;'));
assert.ok(dynamic.includes('alt="Supplied photograph"'));
assert.ok(!dynamic.includes('Portrait placeholder'));
assert.ok(!aboutComposition({...config.about,trajectory:[]},config.name,null).includes('data-trajectory'));
console.log('About: concise profile, configurable photo, escaped content, arbitrary career count and empty state passed.');
