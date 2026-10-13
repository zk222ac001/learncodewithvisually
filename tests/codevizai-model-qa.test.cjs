const {test}=require('node:test');
const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const fs=require('node:fs');
test('CodeVizAI offline QA validates fixtures without live inference',()=>{
 const text=execFileSync(process.execPath,['scripts/codevizai-model-smoke.mjs','--dry-run'],{encoding:'utf8',env:{PATH:process.env.PATH}});
 assert.match(text,/DRY RUN: 7 sanitized fixtures validated/);
 assert.equal(fs.existsSync('codevizai-local-model-qa.json'),false);
});
test('local QA artifacts are excluded from source control',()=>{
 const ig=fs.readFileSync('.gitignore','utf8');
 assert.match(ig,/codevizai-local-model-qa\.json/);
 assert.match(ig,/\.env/);
});

test('one-language C++ dry run does not call Cloudflare',()=>{
 const output=execFileSync(process.execPath,['scripts/codevizai-model-smoke.mjs','--dry-run','--only=cpp'],{encoding:'utf8',env:{PATH:process.env.PATH}});
 assert.match(output,/DRY RUN: 1 sanitized fixtures validated/);
 assert.equal(fs.existsSync('codevizai-local-model-qa-cpp-retest.json'),false);
});
