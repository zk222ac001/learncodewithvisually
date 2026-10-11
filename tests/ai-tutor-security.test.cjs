const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = (file) => fs.readFileSync(path.resolve(__dirname, '..', file), 'utf8');

test('AI Tutor public connection stays disabled until explicitly approved', () => {
  const cfg = load('ai-tutor-config.js');
  assert.ok(cfg.includes("apiUrl: 'https://learncodevisually-ai-tutor.learncodevisually-zk222ac-2026.workers.dev/api/tutor'"));
  assert.ok(cfg.includes("turnstileSiteKey: '0x4AAAAAAFT61DFoIObxrqHQ'"));
  assert.ok(cfg.includes('enabled: false'));
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
  assert.ok(load('ai-tutor-config.js').includes('enabled: false'));
});
