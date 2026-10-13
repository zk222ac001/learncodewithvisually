const { test } = require('node:test');
const assert = require('node:assert/strict');
const { paths, summary, lessonURL } = require('../learning-paths-data');
const { createProgressStore } = require('../learning-core');
test('seven paths have unique milestones and resume survives reload without changing quiz results', () => {
  let data = '{}'; const storage = { getItem: () => data, setItem: (_, value) => { data = value; } };
  const store = createProgressStore(() => storage);
  assert.equal(paths.length, 7);
  for (const path of paths) assert.equal(new Set(path.milestones.map(m => m.id)).size, path.milestones.length);
  const c = paths.find(p => p.id === 'c'), python = paths.find(p => p.id === 'python');
  store.recordQuiz('functions-c-en-v1', { score: 2, total: 3, complete: true });
  store.complete(c.milestones[0].progressId);
  const restored = createProgressStore(() => storage);
  assert.equal(summary(c, restored).next.id, 'data');
  assert.equal(summary(python, restored).completed, 0);
  assert.equal(restored.get('functions-c-en-v1').best.score, 2);
  c.milestones.forEach(m => restored.complete(m.progressId));
  assert.equal(summary(c, restored).next, null);
  restored.complete(c.milestones[0].progressId, false);
  assert.equal(summary(c, restored).next.id, 'intro');
});
test('lesson URLs preserve language and address each data structure chapter', () => {
  const ds = paths.find(p => p.id === 'data-structures');
  ds.milestones.forEach((m, chapter) => {
    const url = new URL(lessonURL(ds, m, 'da', 'cpp'), 'https://example.test');
    assert.equal(url.searchParams.get('chapter'), String(chapter));
    assert.equal(url.searchParams.get('lang'), 'da');
    assert.equal(url.searchParams.get('code'), 'cpp');
  });
});
