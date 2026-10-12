const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('public beta signpost links to working feedback route',()=>{
 const home=read('index.html'),css=read('course.css'),contact=read('contact.html');
 assert.match(home,/Public beta · October 2026/);
 assert.match(home,/class="beta-banner"/);
 assert.match(home,/href="\/contact\.html"/);
 assert.match(css,/\.beta-banner\{/);
 assert.match(contact,/https:\/\/github\.com\/zk222ac001\/learncodewithvisually\/issues\/new/);
 assert.doesNotMatch(contact,/zk222ac001\/datastrukturer\/issues/);
});
test('beta keeps important release guardrails',()=>{
 const home=read('index.html'),config=read('ai-tutor-config.js');
 assert.match(home,/name="google-adsense-account"/);
 assert.doesNotMatch(home,/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/);
 const marker=JSON.parse(read('PUBLIC_AI_BETA_STATUS.json'));
 assert.ok(['private','public'].includes(marker.state));
 assert.equal(marker.shared_ai_requests_per_utc_day,25);
 assert.equal(marker.per_ip_requests_per_60_seconds,5);
 assert.match(config,new RegExp('enabled:\\s*'+(marker.state==='public'?'true':'false')));
 assert.equal(read('CNAME').trim(),'learncodevisually.com');
 assert.match(read('robots.txt'),/https:\/\/learncodevisually\.com\/sitemap\.xml/);
 assert.match(read('BETA_RELEASE.md'),/Public Beta 1/);
});
