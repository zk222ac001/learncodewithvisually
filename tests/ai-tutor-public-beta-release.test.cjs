const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {workerConfig,siteConfig}=require('../scripts/ai-tutor-beta-release.cjs');
const root=path.resolve(__dirname,'..');
const original=fs.readFileSync(path.join(root,'workers/ai-tutor/wrangler.jsonc'),'utf8');
const frontend=fs.readFileSync(path.join(root,'ai-tutor-config.js'),'utf8');
test('public candidate preserves quota, origin and binding while rollback disables inference',()=>{
 const live=JSON.parse(workerConfig(original,'public'));
 const off=JSON.parse(workerConfig(original,'rollback'));
 assert.equal(live.vars.AI_ENABLED,'true');
 assert.equal(off.vars.AI_ENABLED,'false');
 assert.equal(live.vars.DAILY_AI_REQUEST_LIMIT,'25');
 assert.equal(live.vars.ALLOWED_ORIGIN,'https://learncodevisually.com');
 assert.equal(live.ratelimits[0].simple.limit,5);
 assert.equal(live.ratelimits[0].simple.period,60);
 assert.deepEqual(live.ai,off.ai);
 assert.deepEqual(live.durable_objects,off.durable_objects);
 assert.match(siteConfig(frontend,'public'),/enabled:\s*true/);
 assert.match(siteConfig(frontend,'rollback'),/enabled:\s*false/);
 const status=JSON.parse(fs.readFileSync(path.join(root,'PUBLIC_AI_BETA_STATUS.json'),'utf8'));
 assert.ok(['private','public'].includes(status.state));
 assert.match(frontend,new RegExp('enabled:\\s*'+(status.state==='public'?'true':'false')));
 assert.equal(JSON.parse(original).vars.AI_ENABLED,'false');
});
test('release generator fails closed on changed limits, origin or bindings',()=>{
 for(const modification of [
  c=>{c.vars.DAILY_AI_REQUEST_LIMIT='100';},
  c=>{c.vars.ALLOWED_ORIGIN='https://evil.example';},
  c=>{c.ratelimits[0].simple.limit=50;},
  c=>{delete c.ai;},
  c=>{delete c.durable_objects;}
 ]){const v=JSON.parse(original);modification(v);assert.throws(()=>workerConfig(JSON.stringify(v),'public'),/release guard/);}
 assert.throws(()=>siteConfig('window.LEARNCODE_AI_TUTOR={enabled: false}','public'),/release guard/);
 assert.throws(()=>workerConfig(original,'nonsense'),/release guard/);
});
