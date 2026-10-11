'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const native = require('./native-program.cjs');
const { executeBatch } = require('./native-batch.cjs');

const context = { window: {} };
vm.runInNewContext(fs.readFileSync('assignments-data.js', 'utf8'), context);
vm.runInNewContext(fs.readFileSync('assignment-solutions.js', 'utf8'), context);

const assignments = context.window.LESSON_ASSIGNMENTS;
const solutions = context.window.LESSON_ASSIGNMENT_SOLUTIONS;
const languages = ['c', 'cpp', 'python', 'java', 'javascript', 'csharp'];

test('every course assignment has a complete solution in every supported language', () => {
  assert.equal(Object.keys(solutions).length, Object.keys(assignments).length);
  assert.deepEqual(Object.keys(solutions).sort(), Object.keys(assignments).sort());
  for (const [id, byLanguage] of Object.entries(solutions)) {
    assert.deepEqual(Object.keys(byLanguage).sort(), [...languages].sort(), `${id} languages`);
    for (const language of languages) {
      const code = byLanguage[language];
      assert.equal(typeof code, 'string', `${id}/${language} code`);
      assert.ok(code.trim(), `${id}/${language} is not empty`);
      assert.doesNotMatch(code, /TODO|implement the assignment/i, `${id}/${language} is a placeholder`);
    }
  }
});

test('representative solutions address the task-specific operations', () => {
  for (const language of languages) {
    assert.ok(solutions.formatting[language].includes('12.5'));
    assert.ok(solutions['arrays-practice'][language].length > 50);
    assert.ok(solutions['pointers-5'][language].length > 50);
    assert.ok(solutions['file-handling-safety'][language].length > 50);
    assert.ok(solutions['unit-testing-4'][language].length > 50);
  }
});

const outputs = require('./fixtures/assignment-outputs.json');
test('native output fixtures cover every solution and language', () => {
  assert.deepEqual(Object.keys(outputs).sort(), Object.keys(assignments).sort());
  for (const id of Object.keys(assignments)) assert.deepEqual(Object.keys(outputs[id]).sort(), [...languages].sort(), id);
});
for (const language of languages) {
  test(`assignment solutions native: ${language} (84 programs)`, { timeout: 600000 }, subtest => {
    const version = native.available(language);
    if (!version) return subtest.skip(`${language} compiler/runtime unavailable`);
    const entries = Object.keys(assignments).map(id => ({ id, code: solutions[id][language], stdin: assignments[id].stdin }));
    executeBatch(language, entries, version, (entry, output) => {
      const expected = outputs[entry.id][language];
      if (typeof expected === 'string') assert.equal(output, expected, `${entry.id}/${language}`);
      else assert.match(output, new RegExp(expected.pattern), `${entry.id}/${language}`);
    });
  });
}

test('stdin solution processes the supplied number instead of printing a fixed result', () => {
  const version = native.available('javascript');
  assert.equal(native.execute('javascript', solutions.io.javascript, version, { stdin: '7\n' }), 'Input: 7\nDouble: 14\n');
});
