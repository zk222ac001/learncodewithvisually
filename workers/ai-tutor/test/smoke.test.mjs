import test from 'node:test';
import assert from 'node:assert/strict';
import { handleSmoke } from '../smoke-test.mjs';
const home='http://127.0.0.1:8787';
function req(path, method='GET', origin) {
  const headers = origin ? { Origin: origin } : {};
  return new Request(home + path, { method, headers });
}
test('local smoke form describes its limitations', async () => {
  const response = await handleSmoke(req('/'), {});
  assert.equal(response.status, 200);
  const body = await response.text();
  assert.match(body, /Run one AI test/);
  assert.match(body, /local-only/);
});
test('reject cross-origin and remote requests without invoking AI', async () => {
  let calls=0;
  const env={AI:{run:async()=>{calls++;return {response:'unused'}}}};
  assert.equal((await handleSmoke(req('/run-test','POST','https://evil.example'),env)).status,403);
  assert.equal((await handleSmoke(new Request('https://example.org/run-test',{method:'POST',headers:{Origin:home}}),env)).status,403);
  assert.equal((await handleSmoke(req('/run-test','GET',home),env)).status,404);
  assert.equal(calls,0);
});
test('serve model result as escaped HTML',async()=>{
  let called=0;
  const env={AI:{run:async(model,opts)=>{
    called++;assert.equal(model,'@cf/google/gemma-4-26b-a4b-it');
    assert.match(opts.messages[1].content,/condition 4 <= 3 is false/);
    return {choices:[{message:{content:'Loop stops at 4. <script>alert(1)</script>'}}]};
  }}};
  const r=await handleSmoke(req('/run-test','POST',home),env);
  const body=await r.text();
  assert.equal(r.status,200);assert.equal(called,1);
  assert.match(body,/&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.doesNotMatch(body,/<script>alert\(1\)<\/script>/);
  assert.match(body,/Expected:/);
});
test('fail safely without model binding',async()=>{
  const r=await handleSmoke(req('/run-test','POST',home),{});
  assert.equal(r.status,503);
});
