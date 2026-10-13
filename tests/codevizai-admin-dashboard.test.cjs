const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {webcrypto}=require('node:crypto');
if(!globalThis.crypto)globalThis.crypto=webcrypto;
const URL='https://learncodevisually-ai-tutor.example.workers.dev/api/admin/usage';
const TOKEN='a'.repeat(64);
test('admin dashboard source never exposes admin credentials',()=>{
 const src=fs.readFileSync('scripts/codevizai-admin-dashboard.mjs','utf8');
 assert.match(src,/process\.env\.CODEVIZAI_ADMIN_STATS_TOKEN/);
 assert.doesNotMatch(src,/localStorage|sessionStorage|window\.LEARN/);
 assert.match(fs.readFileSync('.gitignore','utf8'),/codevizai-admin-dashboard-local\.html/);
});
test('admin usage requires a strong token and returns no CORS headers',async()=>{
 const {handleRequest}=await import('../workers/ai-tutor/src/index.mjs');
 const env={ADMIN_STATS_TOKEN:TOKEN,DAILY_AI_REQUEST_LIMIT:'25',AI_ENABLED:'true',
  AI_BUDGET:{getByName(){return {stats:async()=>({reserved:4})}}}};
 const bad=await handleRequest(new Request(URL,{headers:{Authorization:'Bearer '+'b'.repeat(64)}}),env);
 assert.equal(bad.status,401);
 assert.equal(bad.headers.get('access-control-allow-origin'),null);
 const good=await handleRequest(new Request(URL,{headers:{Authorization:'Bearer '+TOKEN}}),env);
 assert.equal(good.status,200);
 assert.equal(good.headers.get('access-control-allow-origin'),null);
 const data=await good.json();
 assert.equal(data.limit,25);
 assert.equal(data.reserved,4);
 assert.equal(data.remaining,21);
 assert.equal(data.metric,'inference reservations');
 assert.equal(JSON.stringify(data).includes(TOKEN),false);
});
test('admin usage rejects disabled or missing token configuration',async()=>{
 const {handleRequest}=await import('../workers/ai-tutor/src/index.mjs');
 const r=await handleRequest(new Request(URL,{headers:{Authorization:'Bearer '+TOKEN}}),{ADMIN_STATS_TOKEN:''});
 assert.equal(r.status,401);
});
