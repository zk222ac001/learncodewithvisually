import test from 'node:test';
import assert from 'node:assert/strict';
import { handleRequest, validateInput, buildPrompt } from '../src/index.mjs';
const origin='https://learncodevisually.com';
const question={lessonId:'c-for-loop',step:2,action:'explain',question:'',turnstileToken:'human-token'};
function make(method='POST',body=question,headers={}) {
  return new Request('https://ai.example.workers.dev/api/tutor',{
    method,headers:{Origin:origin,'Content-Type':'application/json',...headers},
    ...(method==='POST'?{body:JSON.stringify(body)}:{})
  });
}
test('validate lesson and step; reject untrusted additions',()=>{
  assert.deepEqual(validateInput(question),question);
  assert.equal(validateInput({...question,step:9}),null);
  assert.equal(validateInput({...question,lessonId:'secret'}),null);
  assert.equal(validateInput({...question,admin:true}),null);
  assert.equal(validateInput({...question,action:'ask',question:'a'.repeat(281)}),null);
  assert.match(buildPrompt('explain',4),/condition 4 <= 3 is false/);
});
test('fail closed without credentials or AI binding',async()=>{
  const res=await handleRequest(make(),{AI_ENABLED:'false'});
  assert.equal(res.status,503);
  assert.equal(res.headers.get('access-control-allow-origin'),origin);
});
test('reject cross-origin requests even if backend is enabled',async()=>{
  const res=await handleRequest(make('POST',question,{Origin:'https://malicious.example'}),{AI_ENABLED:'true'});
  assert.equal(res.status,403);
  assert.equal(res.headers.get('access-control-allow-origin'),null);
});
test('reject invalid data and enforce quotas before inference',async()=>{
  const env={AI_ENABLED:'true',AI:{run:async()=>({response:'should not run'})},TURNSTILE_SECRET:'server-secret',RATE_LIMITER:{limit:async()=>({success:false})}};
  assert.equal((await handleRequest(make('POST',{...question,step:8}),env)).status,400);
  assert.equal((await handleRequest(make('POST',question,{'CF-Connecting-IP':'192.0.2.1'}),env)).status,429);
});
test('verify challenge before inference and return only model text',async()=>{
  let called=0;
  const env={AI_ENABLED:'true',ALLOWED_ORIGIN:origin,AI:{run:async(_model,settings)=>{called++;assert.equal(settings.messages.length,2);return {response:'At step 2, the loop prints 2.'}}},TURNSTILE_SECRET:'server-secret',RATE_LIMITER:{limit:async()=>({success:true})}};
  const fakeFetch=async(_url,opts)=>{
    assert.match(String(opts.body),/secret=server-secret/);
    return new Response(JSON.stringify({success:true,hostname:'learncodevisually.com',action:'ai-tutor'}),{status:200});
  };
  const res=await handleRequest(make('POST',question,{'CF-Connecting-IP':'192.0.2.1'}),env,fakeFetch);
  assert.equal(res.status,200);
  assert.equal((await res.json()).answer,'At step 2, the loop prints 2.');
  assert.equal(called,1);
});
test('reject challenge for a different domain',async()=>{
  const env={AI_ENABLED:'true',AI:{run:async()=>{throw Error('must not run')}},TURNSTILE_SECRET:'server-secret',RATE_LIMITER:{limit:async()=>({success:true})}};
  const fetchFake=async()=>new Response(JSON.stringify({success:true,hostname:'evil.example',action:'ai-tutor'}));
  const res=await handleRequest(make('POST',question,{'CF-Connecting-IP':'192.0.2.1'}),env,fetchFake);
  assert.equal(res.status,403);
});
