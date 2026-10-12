const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {siteConfig,workerConfig}=require('../scripts/ai-tutor-beta-release.cjs');
test('production release remains off in source, with strict rate caps',()=>{
 const w=JSON.parse(fs.readFileSync('workers/ai-tutor/wrangler.jsonc','utf8'));
 const f=fs.readFileSync('ai-tutor-config.js','utf8');
 assert.equal(w.vars.AI_ENABLED,'false');
 assert.equal(w.vars.DAILY_AI_REQUEST_LIMIT,'25');
 assert.equal(w.ratelimits.find(x=>x.name==='RATE_LIMITER').simple.limit,5);
 assert.match(f,/enabled:\s*false/);
 const status=JSON.parse(fs.readFileSync('PUBLIC_AI_BETA_STATUS.json','utf8'));
 assert.equal(status.state,'private');
 const active=JSON.parse(workerConfig(JSON.stringify(w),'public'));
 assert.equal(active.vars.AI_ENABLED,'true');
 assert.equal(active.vars.DAILY_AI_REQUEST_LIMIT,'25');
 assert.match(siteConfig(f,'public'),/enabled:\s*true/);
});
test('public deployment remains manually approved and rollback-capable',()=>{
 const s=fs.readFileSync('.github/workflows/ai-tutor-public-worker.yml','utf8');
 assert.match(s,/workflow_dispatch:/);
 assert.match(s,/environment: ai-tutor-public/);
 assert.match(s,/APPROVE_PUBLIC_AI_BETA/);
 assert.match(s,/ROLLBACK_PUBLIC_AI_BETA/);
 assert.match(s,/concurrency:/);
 assert.match(s,/ready===true/);
 assert.doesNotMatch(s,/on:\s*push:/);
});
