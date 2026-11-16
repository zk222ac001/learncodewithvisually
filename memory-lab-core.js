'use strict';
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./pointers-core.js'));
  else root.MemoryLab = factory(root.CodeVizPointers);
})(typeof window === 'undefined' ? globalThis : window, P => {
  const languages = { c: { label: 'C', file: 'memory.c', scenarios: ['alias', 'allocation'] }, cpp: { label: 'C++', file: 'memory.cpp', scenarios: ['alias', 'ownership'] }, python: { label: 'Python', file: 'memory.py', scenarios: ['objects'] }, java: { label: 'Java', file: 'Main.java', scenarios: ['objects'] }, javascript: { label: 'JavaScript', file: 'memory.js', scenarios: ['objects'] }, csharp: { label: 'C#', file: 'Program.cs', scenarios: ['objects', 'ref'] } };
  function build({ language = 'c', scenario, initialValue = 10, writeValue = 20, callValue = 30, failAllocation = false } = {}) {
    if (!Object.hasOwn(languages, language)) throw new RangeError('language');
    scenario ??= languages[language].scenarios[0];
    if (!languages[language].scenarios.includes(scenario)) throw new RangeError('scenario');
    for (const n of [initialValue, writeValue, callValue]) if (!Number.isInteger(n) || n < -999 || n > 999) throw new RangeError('values');
    if (typeof failAllocation !== 'boolean' || (failAllocation && scenario !== 'allocation')) throw new RangeError('failure');
    if (language === 'c') {
      const m = P.buildTrace({ scenario, initialValue, writeValue, callValue, failAllocation });
      return { ...m, states: m.states.map(s => ({ ...s, key: scenario === 'alias' ? 'c_' + s.phase : 'alloc_' + s.phase,
        args: { n: s.phase === 'initialize' ? (scenario === 'alias' ? initialValue : s.cells.filter(c => c.value !== null).at(-1)?.value) : s.phase === 'write' ? writeValue : callValue },
        refs: s.phase === 'ready' || s.phase === 'done' ? [] : [{ name: scenario === 'alias' ? 'p' : 'values', target: s.pointer === 'dangling' ? 'dangling' : s.pointer ? s.cells[0]?.label : null }, ...(s.helperPointer ? [{ name: 'target', target: 'value' }] : [])],
        cells: s.cells.map(c => ({ ...c, id: c.label })) })) };
    }
    const lines = [], states = [];
    let cells = [], refs = [], output = '';
    const add = text => { lines.push(text); return lines.length - 1; };
    const snap = (key, line = null, args = {}) => states.push({ key, phase: key, line, args, cells: cells.map(c => ({ ...c })), refs: refs.map(r => ({ ...r })), output });
    const cell = (id, value) => ({ id, label: id, value, live: true });
    snap('ready');
    if (language === 'cpp' && scenario === 'ownership') {
      add('#include <iostream>'); add('#include <memory>'); add('int main() {');
      let line = add(`    auto owner = std::make_unique<int>(${initialValue});`);
      cells = [cell('A', initialValue)]; refs = [{ name: 'owner', target: 'A' }]; snap('owner_create', line, { n: initialValue });
      line = add(`    *owner = ${writeValue};`); cells[0].value = writeValue; snap('owner_write', line, { n: writeValue });
      line = add('    std::cout << *owner << "\\n";'); output = writeValue + '\n'; snap('outputStep', line);
      line = add('    owner.reset();'); cells[0].live = false; cells[0].value = null; refs[0].target = null; snap('owner_reset', line);
      line = add('}'); refs = []; snap('cpp_done', line);
    } else if (language === 'cpp') {
      add('#include <iostream>'); add('void change(int& target) {'); const fn = add(`    target = ${callValue};`); add('}'); add('int main() {');
      let line = add(`    int value = ${initialValue};`); cells = [cell('value', initialValue)]; snap('create', line, { n: initialValue });
      line = add('    int& alias = value;'); refs = [{ name: 'alias', target: 'value' }]; snap('cpp_alias', line);
      line = add(`    alias = ${writeValue};`); cells[0].value = writeValue; snap('cpp_write', line, { n: writeValue });
      line = add('    change(alias);'); refs.push({ name: 'target', target: 'value' }); snap('cpp_call', line);
      cells[0].value = callValue; snap('cpp_write', fn, { n: callValue }); refs.pop(); snap('cpp_return', line);
      line = add('    std::cout << value << "\\n";'); output = callValue + '\n'; snap('outputStep', line);
      line = add('}'); cells[0].live = false; cells[0].value = null; refs = []; snap('cpp_done', line);
    } else {
      let snippets;
      const a = initialValue, b = writeValue, c = callValue;
      if (language === 'python') snippets = { before: ['class Box:', '    def __init__(self, value):', '        self.value = value', ''], create: `value = Box(${a})`, alias: 'alias = value', mutate: `alias.value = ${b}`, rebind: `alias = Box(${c})`, print: 'print(value.value, alias.value)', after: [] };
      if (language === 'javascript') snippets = { before: [], create: `const value = { value: ${a} };`, alias: 'let alias = value;', mutate: `alias.value = ${b};`, rebind: `alias = { value: ${c} };`, print: 'console.log(value.value, alias.value);', after: [] };
      if (language === 'java') snippets = { before: ['public class Main {', '    static class Box {', '        int value;', '        Box(int n) { value = n; }', '    }', '    public static void main(String[] args) {'], create: `        Box value = new Box(${a});`, alias: '        Box alias = value;', mutate: `        alias.value = ${b};`, rebind: `        alias = new Box(${c});`, print: '        System.out.println(value.value + " " + alias.value);', after: ['    }', '}'] };
      if (language === 'csharp') snippets = { before: ['using System;', 'class Box {', '    public int Value;', '    public Box(int n) { Value = n; }', '}', 'class Program {', ...(scenario === 'ref' ? ['    static void Replace(ref Box target) {', `        target = new Box(${c});`, '    }'] : []), '    static void Main() {'], create: `        Box value = new Box(${a});`, alias: '        Box alias = value;', mutate: `        alias.Value = ${b};`, rebind: scenario === 'ref' ? '        Replace(ref alias);' : `        alias = new Box(${c});`, print: '        Console.WriteLine(value.Value + " " + alias.Value);', after: ['    }', '}'] };
      snippets.before.forEach(add);
      let line = add(snippets.create); cells = [cell('A', a)]; refs = [{ name: 'value', target: 'A' }]; snap('create', line, { n: a });
      line = add(snippets.alias); refs.push({ name: 'alias', target: 'A' }); snap('object_alias', line);
      line = add(snippets.mutate); cells[0].value = b; snap('object_mutate', line, { n: b });
      line = add(snippets.rebind);
      if (scenario === 'ref') { refs.push({ name: 'target (ref alias)', target: 'A' }); snap('cs_ref_call', line); }
      cells.push(cell('B', c)); refs[1].target = 'B';
      if (scenario === 'ref') { refs[2].target = 'B'; snap('cs_ref_write', lines.findIndex(l => l.includes('target = new Box')), { n: c }); refs.pop(); snap('cs_ref_return', line); }
      else snap('object_rebind', line, { n: c });
      line = add(snippets.print); output = `${b} ${c}\n`; snap('outputStep', line);
      snippets.after.forEach(add); snap('managed_done', null);
    }
    return { code: lines.join('\n') + '\n', states, output };
  }
  return { languages, build };
});
