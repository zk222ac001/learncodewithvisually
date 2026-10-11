import test from 'node:test';
import assert from 'node:assert/strict';
import { handleSmoke } from '../smoke-test.mjs';
const home='http://127.0.0.1:8787';
async function formRequest(origin) {
  const landing=await handleSmoke(new Request(home+'/'), {});
  const cookie=landing.headers.get('Set-Cookie').split(';')[0];
  const csrf=cookie.split('=')[1];
  const headers={Cookie:cookie,'Content-Type':'application/x-www-form-urlencoded',...(origin?{Origin:origin}:{})};
  return new Request(home+'/run-test',{method:'POST',headers,body:new URLSearchParams({csrf})});
}
test('localhost smoke form exposes a CSRF-protected submit control',async()=>{
  const response=await handleSmoke(new Request(home+'/'),{});
  assert.equal(response.status,200);
  assert.match(await response.text(),/Run one AI test/);
  assert.match(response.headers.get('Set-Cookie'),/SameSite=Strict/);
});
test('reject remote endpoints, cross-site requests, or missing form token',async()=>{
  let calls=0;const env={AI:{run:async()=>{calls++;return {response:'unused'}}}};
  assert.equal((await handleSmoke(await formRequest('https://evil.example'),env)).status,403);
  assert.equal((await handleSmoke(new Request('https://evil.example/run-test',{method:'POST'}),env)).status,403);
  assert.equal((await handleSmoke(new Request(home+'/run-test',{method:'POST'}),env)).status,403);
  assert.equal(calls,0);
});
test('valid same-origin form without Origin is allowed and model output is escaped',async()=>{
  let calls=0;const env={AI:{run:async(model,opts)=>{
    calls++;assert.equal(model,'@cf/google/gemma-4-26b-a4b-it');
    assert.match(opts.messages[1].content,/condition 4 <= 3 is false/);
    return {choices:[{message:{content:'Loop stops at 4. <script>alert(1)</script>'}}]};
  }}};
  const result=await handleSmoke(await formRequest(),env);
  const body=await result.text();
  assert.equal(result.status,200);assert.equal(calls,1);
  assert.match(body,/&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.doesNotMatch(body,/<script>alert\(1\)<\/script>/);
});
test('fail safely without AI binding',async()=>{
  const result=await handleSmoke(await formRequest(home),{});
  assert.equal(result.status,503);
});
