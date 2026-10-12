const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
test('general AI tutor is integrated without public activation or secret exposure',()=>{
 const page=read('index.html'),client=read('general-ai-tutor.js'),cfg=read('ai-tutor-config.js');
 assert.match(page,/id="general-ai-tutor"/);assert.match(page,/general-ai-tutor\.js/);
 assert.match(client,/data\.answer|payload\.answer/);assert.match(client,/\.textContent/);
 assert.doesNotMatch(client,/\.innerHTML\s*=/);
 assert.match(cfg,/enabled:\s*false/);
 assert.match(read('workers/ai-tutor/wrangler.jsonc'),/"AI_ENABLED": "false"/);
 assert.match(read('workers/ai-tutor/src/index.mjs'),/validateGeneralInput/);
 assert.match(read('workers/ai-tutor/src/general.mjs'),/const permitted/);
});
