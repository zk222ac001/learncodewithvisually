const { test } = require('node:test');
const assert = require('node:assert/strict');
const { languages, build } = require('../memory-lab-core.js');
const I = require('../memory-lab-i18n.js');
const native = require('./native-program.cjs');

for (const [language, meta] of Object.entries(languages)) {
  test(`${language}: source output agrees with traces for every supported scenario`, { timeout: 180000 }, t => {
    const runtime = native.available(language);
    if (!runtime && process.env.REQUIRE_MEMORY_TOOLCHAINS) assert.fail(`${language} runtime is required in CI`);
    if (!runtime) t.diagnostic(`${language} execution unavailable locally; trace and translation assertions still run`);
    for (const scenario of meta.scenarios) {
      for (const custom of [{}, { initialValue: -7, writeValue: 0, callValue: 999 }]) {
        const m = build({ language, scenario, ...custom });
        assert.equal(m.states.at(-1).output, m.output);
        if (runtime) assert.equal(native.execute(language, m.code, runtime), m.output);
        for (const state of m.states) {
          assert.ok(state.line === null || (Number.isInteger(state.line) && state.line >= 0 && state.line < m.code.trimEnd().split('\n').length));
          for (const ref of state.refs) if (ref.target && ref.target !== 'dangling') assert.ok(state.cells.some(c => c.id === ref.target && c.live));
          for (const lang of Object.keys(I.locales)) {
            const text = I.t(lang, state.key, state.args);
            assert.ok(text.length > 10); assert.doesNotMatch(text, /undefined|\{\w+\}/);
          }
        }
        const sample = m.states.find(s => s.cells.length);
        sample.cells[0].value = 12345;
        assert.ok(m.states.filter(s => s !== sample).every(s => s.cells.every(c => c.value !== 12345)));
      }
    }
  });
}

test('managed references share before reassignment and separate afterward', () => {
  for (const language of ['python', 'java', 'javascript', 'csharp']) {
    const m = build({ language });
    const shared = m.states.find(s => s.key === 'object_mutate');
    assert.deepEqual(shared.refs.map(r => r.target), ['A', 'A']);
    assert.equal(shared.cells[0].value, 20);
    const rebound = m.states.find(s => s.key === 'object_rebind');
    assert.deepEqual(rebound.refs.map(r => r.target), ['A', 'B']);
    assert.deepEqual(rebound.cells.map(c => c.value), [20, 30]);
    assert.ok(m.states.at(-1).cells.every(c => c.live)); // Final snapshot, not a GC claim.
    assert.equal(m.output, '20 30\n');
  }
});

test('C++ ownership and C# ref semantics have different lifetime and alias behavior', () => {
  const cpp = build({ language: 'cpp', scenario: 'ownership' });
  const reset = cpp.states.find(s => s.key === 'owner_reset');
  assert.equal(reset.cells[0].live, false); assert.equal(reset.refs[0].target, null);
  const cs = build({ language: 'csharp', scenario: 'ref' });
  assert.ok(cs.code.includes('Replace(ref alias)'));
  const replaced = cs.states.find(s => s.key === 'cs_ref_write');
  assert.deepEqual(replaced.refs.map(r => r.target), ['A', 'B', 'B']);
  assert.equal(replaced.cells[0].value, 20);
});

test('translation coverage is complete and contains every UI and model key', () => {
  const expected = Object.keys(I.locales.en).sort();
  assert.equal(Object.keys(I.locales).length, 10);
  for (const [lang, values] of Object.entries(I.locales)) {
    assert.deepEqual(Object.keys(values).sort(), expected);
    for (const key of expected) assert.ok(values[key].trim(), `${lang}:${key}`);
    for (const code of Object.keys(languages)) assert.ok(I.t(lang, 'note_' + code));
  }
  const fs = require('node:fs');
  const html = fs.readFileSync(require.resolve('../pointers-3d.html'), 'utf8');
  for (const [, key] of html.matchAll(/data-(?:i18n|label)="([^"]+)"/g)) for (const lang of Object.keys(I.locales)) assert.ok(I.t(lang, key));
});

test('invalid configurations are rejected and forced C failure creates no objects', () => {
  for (const config of [{ language: 'ruby' }, { language: 'python', scenario: 'allocation' }, { language: 'cpp', failAllocation: true }, { initialValue: NaN }, { writeValue: 1.5 }, { callValue: 1000 }]) assert.throws(() => build(config), RangeError);
  const m = build({ language: 'c', scenario: 'allocation', failAllocation: true });
  assert.ok(m.states.every(s => s.cells.length === 0)); assert.equal(m.output, 'Allocation failed\n');
});
