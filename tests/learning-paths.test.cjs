const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {getTracks,getTrack,progressId,summarize}=require('../learning-paths-core.js');
const {createProgressStore}=require('../learning-core.js');
function storage(){const data=new Map();return {getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)};}
test('seven paths reference only existing lessons and valid programming languages',()=>{
 const tracks=getTracks(),ids=tracks.map(t=>t.id);
 assert.deepEqual(ids,['python','c','cpp','javascript','java','csharp','data-structures']);
 assert.equal(new Set(ids).size,ids.length);
 const allowed=new Set(['python','c','cpp','javascript','java','csharp']);
 for(const track of tracks){
  assert.ok(track.steps.length>=3);
  assert.equal(new Set(track.steps.map(x=>x.id)).size,track.steps.length);
  for(const step of track.steps){
   const url=new URL(step.href,'https://learncodevisually.com');
   assert.equal(url.origin,'https://learncodevisually.com');
   const filename=url.pathname.slice(1)||'index.html';
   assert.ok(fs.existsSync(filename),'missing local lesson: '+filename);
   if(track.id!=='data-structures'&&url.pathname==='/index.html')assert.ok(allowed.has(url.searchParams.get('code')));
  }
 }
 assert.equal(getTrack('unknown'),null);
});
test('path progress survives reload and remains independent between tracks',()=>{
 const disk=storage(),store=createProgressStore(()=>disk);
 const c=getTrack('c'),python=getTrack('python');
 const key=progressId(c.id,c.steps[0].id);
 assert.equal(summarize(c,store).completed,0);
 store.complete(key);
 assert.equal(summarize(c,createProgressStore(()=>disk)).completed,1);
 assert.equal(summarize(python,store).completed,0);
 assert.equal(summarize(c,store).next.id,c.steps[1].id);
 for(const step of c.steps)store.complete(progressId('c',step.id));
 assert.equal(summarize(c,store).percent,100);
 assert.equal(summarize(c,store).next,null);
});
test('homepage links to accessible learning hub, preserves site configuration',()=>{
 const index=fs.readFileSync('index.html','utf8');
 const hub=fs.readFileSync('learning-paths.html','utf8');
 const client=fs.readFileSync('learning-paths.js','utf8');
 assert.match(index,/href="\/learning-paths\.html"/);
 assert.match(hub,/id="track-list"/);
 assert.match(hub,/id="journey-progress"/);
 assert.match(hub,/href="https:\/\/learncodevisually.com\/learning-paths.html"/);
 assert.match(client,/textContent/);
 assert.doesNotMatch(client,/\beval\s*\(|innerHTML\s*=\s*.*description|new Function/);
 assert.doesNotMatch(hub,/ADMIN_STATS_TOKEN|API_TOKEN/);
});
