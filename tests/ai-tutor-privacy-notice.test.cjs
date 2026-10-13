const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
test('public AI Tutor privacy notice accurately describes general request fields and non-execution',()=>{
 const notice=fs.readFileSync('privacy.html','utf8');
 for(const term of ['Optional AI Programming Tutor','selected programming language','preferred response language','selected explanation level','optional source code','six shortened recent conversation messages','Turnstile verification token','does not execute','younger learners','individual data controller'])assert.ok(notice.includes(term),term);
 const status=JSON.parse(fs.readFileSync('PUBLIC_AI_BETA_STATUS.json','utf8'));
 assert.match(notice,status.state==='public'?/AI Tutor public beta is available/i:/public AI Tutor is not yet activated/i);
 assert.match(notice,/Cloudflare-operated logs/);
 assert.match(notice,/zk222ac@gmail.com/);
});
