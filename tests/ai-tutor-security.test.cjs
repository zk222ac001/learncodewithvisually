const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = (file) => fs.readFileSync(path.resolve(__dirname, '..', file), 'utf8');

test('AI Tutor public connection follows approved release state and keeps private secrets out', () => {
  const cfg = load('ai-tutor-config.js');
  assert.ok(cfg.includes("apiUrl: 'https://learncodevisually-ai-tutor.learncodevisually-zk222ac-2026.workers.dev/api/tutor'"));
  assert.ok(cfg.includes("turnstileSiteKey: '0x4AAAAAAFT61DFoIObxrqHQ'"));
  const status=JSON.parse(load('PUBLIC_AI_BETA_STATUS.json'));
  assert.ok(['private','public'].includes(status.state));
  assert.match(cfg,new RegExp('enabled:\\s*'+(status.state==='public'?'true':'false')));
  assert.doesNotMatch(cfg, /^\s*(?:const\s+)?TURNSTILE_SECRET\s*[:=]/m, 'Public config must not assign private secrets');
  assert.ok(load('ai-tutor.js').includes('config.enabled !== true'));
  assert.ok(load('c-for-loop-visualization.html').includes('id="ai-tutor-panel" hidden'));
  assert.ok(load('workers/ai-tutor/wrangler.jsonc').includes('"AI_ENABLED": "false"'));
});

test('AI Tutor client renders generated answers as text only', () => {
  const client = load('ai-tutor.js');
  assert.ok(client.includes('answer.textContent'));
  assert.ok(!client.includes('innerHTML ='));
});

test('private browser preview is gated by an explicit URL parameter and test key', () => {
  const client=load('ai-tutor.js');
  const html=load('c-for-loop-visualization.html');
  assert.ok(client.includes("get('ai-preview') === '1'"));
  assert.ok(client.includes("headers['X-AI-Test-Token'] = testKey"));
  assert.ok(html.includes('id="ai-tutor-preview-controls" hidden'));
  assert.ok(html.includes('type="password" autocomplete="off"'));
  const status=JSON.parse(load('PUBLIC_AI_BETA_STATUS.json'));
  assert.match(load('ai-tutor-config.js'),new RegExp('enabled:\\s*'+(status.state==='public'?'true':'false')));
});

test('public beta privacy disclosures describe optional AI and providers', () => {
  const privacy = load('privacy.html');
  const terms = load('terms.html');
  const lesson = load('c-for-loop-visualization.html');
  assert.match(privacy,/GitHub Pages/);
  assert.match(privacy,/Cloudflare Workers AI/);
  assert.match(privacy,/question, selected programming language.*optional source code.*separate C for-loop lesson/s);
  assert.match(privacy,/does not deliberately write questions, code, AI answers or IP addresses/);
  assert.match(privacy,/retention, access and deletion configurations/);
  assert.match(terms,/Optional AI Tutor beta/);
  assert.match(lesson,/privacy\.html#ai-tutor/);
});
test('public AI preflight excludes private tester header',()=>{
  const source=load('workers/ai-tutor/src/index.mjs');
  assert.match(source,/env\.AI_ENABLED === 'true' \? 'Content-Type'/);
  assert.match(load('workers/ai-tutor/wrangler.jsonc'),/"AI_ENABLED": "false"/);
});

test('public project name and contact appear across information pages',()=>{
 for(const file of ['about.html','contact.html','privacy.html','terms.html']){
  const content=load(file);
  assert.match(content,/LearnCodeVisuallyTeam/);
  assert.match(content,/mailto:zk222ac@gmail.com/);
 }
 assert.match(load('privacy.html'),/legal identity of the data controller/);
 assert.match(load('workers/ai-tutor/wrangler.jsonc'),/"AI_ENABLED": "false"/);
});
