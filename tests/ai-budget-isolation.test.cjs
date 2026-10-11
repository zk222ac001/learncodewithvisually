const { test } = require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const file=(name)=>fs.readFileSync(path.join(__dirname,'..',name),'utf8');

test('daily budget smoke test is isolated and has no AI binding',()=>{
  const production=JSON.parse(file('workers/ai-tutor/wrangler.jsonc'));
  const smoke=JSON.parse(file('workers/ai-tutor/wrangler.budget-smoke.jsonc'));
  assert.notEqual(smoke.name,production.name);
  assert.equal(smoke.workers_dev,false);
  assert.equal(smoke.ai,undefined);
  assert.deepEqual(smoke.durable_objects.bindings,[{name:'AI_BUDGET',class_name:'AiDailyBudget'}]);
  assert.deepEqual(smoke.migrations,[{tag:'v1',new_sqlite_classes:['AiDailyBudget']}]);
  assert.equal(production.vars.AI_ENABLED,'false');
});
test('test implementation uses fresh object, concurrent reservations and a next-day reset',()=>{
  const smoke=file('workers/ai-tutor/src/budget-smoke.mjs');
  assert.match(smoke,/url\.origin !== ORIGIN/);
  assert.match(smoke,/getByName\('budget-smoke-' \+ crypto\.randomUUID\(\)\)/);
  assert.match(smoke,/Promise\.all/);
  assert.match(smoke,/length:30/);
  assert.match(smoke,/reserve\('2030-01-01',25\)/);
  assert.match(smoke,/reserve\('2030-01-02',25\)/);
  assert.doesNotMatch(smoke,/env\.AI\.run/);
});
