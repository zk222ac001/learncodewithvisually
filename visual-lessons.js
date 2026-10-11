/* Deterministic, accessible teaching diagrams. No external requests or C execution. */
(() => {
  "use strict";
  const root = document.querySelector('[data-visualizer]');
  if (!root) return;
  const kind = root.dataset.visualizer;
  const stage = root.querySelector('[data-stage]');
  const status = root.querySelector('[data-status]');
  const buttons = Object.fromEntries([...root.querySelectorAll('button[data-action]')].map(b => [b.dataset.action, b]));
  const values = [10, 20, 30, 40, 50];
  let selected = 1;
  let step = 0;
  const maxStep = kind === 'loop' ? 4 : kind === 'pointer' || kind === 'function' ? 3 : 0;
  function node(parent, tag, value, className) {
    const el = document.createElement(tag);
    if (value !== undefined) el.textContent = String(value);
    if (className) el.className = className;
    parent.append(el);
    return el;
  }
  function redraw() {
    stage.replaceChildren();
    if (kind === 'loop') {
      const current = Math.min(step, 3);
      const box = node(stage, 'div', undefined, 'trace-box');
      node(box, 'strong', step === 4 ? 'Condition i <= 3 is false' : step === 0 ? 'About to check i <= 3' : 'Iteration ' + step + ' completed');
      node(box, 'p', 'Counter i: ' + (step === 0 ? 1 : step === 4 ? 4 : step));
      const output = node(box, 'div', undefined, 'trace-values');
      for (let i = 1; i <= 3; i++) node(output, 'span', String(i), i <= current ? 'trace-cell shown' : 'trace-cell');
      node(box, 'p', 'Output so far: ' + (current ? Array.from({length: current}, (_, i) => i + 1).join(', ') : '(none)'));
      status.textContent = step === 0 ? 'Initialization: i = 1. The first condition will be tested.' : step === 4 ? 'i = 4 makes 4 <= 3 false, so the loop terminates without printing 4.' : 'Iteration ' + step + ': i = ' + step + ' passed the condition and printed ' + step + '.';
    } else if (kind === 'array') {
      const row = node(stage, 'div', undefined, 'trace-values');
      values.forEach((value, index) => {
        const cell = node(row, 'div', undefined, index === selected ? 'array-cell selected' : 'array-cell');
        node(cell, 'span', 'index ' + index, 'cell-index');
        node(cell, 'strong', value);
      });
      status.textContent = 'scores[' + selected + '] = ' + values[selected] + '. Valid indexes: 0 through 4.';
    } else if (kind === 'pointer') {
      const diagram = node(stage, 'div', undefined, 'pointer-diagram');
      const pointer = node(diagram, 'div', undefined, 'memory-box');
      node(pointer, 'span', 'Pointer p');
      node(pointer, 'strong', step === 0 ? '(not yet initialized)' : '0x1000');
      const arrow = node(diagram, 'div', '→', 'memory-arrow');
      arrow.setAttribute('aria-hidden', 'true');
      const memory = node(diagram, 'div', undefined, 'memory-box');
      node(memory, 'span', 'Object x · example address 0x1000');
      node(memory, 'strong', step === 3 ? 24 : 12);
      const descriptions = [
        'First, x holds 12. The pointer p has not yet been initialized in this model.',
        'int *p = &x; stores the illustrative address 0x1000 in p.',
        'Dereferencing *p reads x, so *p evaluates to 12.',
        '*p = 24 writes through p; x now holds 24.'
      ];
      status.textContent = descriptions[step];
    } else if (kind === 'function') {
      const stack = node(stage, 'div', undefined, 'call-stack');
      const caller = node(stack, 'div', undefined, 'memory-box');
      node(caller, 'span', 'Caller: main()');
      node(caller, 'strong', step < 3 ? 'waiting for add(3, 4)' : 'result = 7');
      if (step === 1 || step === 2) {
        const called = node(stack, 'div', undefined, 'memory-box active');
        node(called, 'span', 'Callee: add()');
        node(called, 'strong', step === 1 ? 'a = 3, b = 4' : 'return a + b = 7');
      }
      const messages = [
        'main() reaches the call add(3, 4).',
        'add() starts with local parameters a = 3 and b = 4.',
        'add() calculates a + b and prepares to return 7.',
        'add() returns; main() stores result = 7 and can print it.'
      ];
      status.textContent = messages[step];
    }
    if (buttons.previous) buttons.previous.disabled = step === 0;
    if (buttons.next) buttons.next.disabled = step === maxStep;
  }
  root.addEventListener('click', event => {
    const button = event.target.closest('button[data-action]');
    if (!button || !root.contains(button)) return;
    const action = button.dataset.action;
    if (action === 'next') step = Math.min(maxStep, step + 1);
    if (action === 'previous') step = Math.max(0, step - 1);
    if (action === 'reset') {
      step = 0;
      selected = 1;
      values.splice(0, values.length, 10, 20, 30, 40, 50);
      const pick = root.querySelector('[data-index]');
      if (pick) pick.value = '1';
      const input = root.querySelector('[data-value]');
      if (input) input.value = '25';
    }
    if (action === 'set') {
      const input = root.querySelector('[data-value]');
      const parsed = Number(input?.value);
      if (!input || !input.value.trim() || !Number.isSafeInteger(parsed) || parsed < -99 || parsed > 99) {
        status.textContent = 'Enter a whole number from -99 to 99.';
        return;
      }
      values[selected] = parsed;
    }
    redraw();
  });
  const select = root.querySelector('[data-index]');
  if (select) select.addEventListener('change', () => {
    const next = Number(select.value);
    if (Number.isInteger(next) && next >= 0 && next < values.length) selected = next;
    redraw();
  });
  redraw();
})();
