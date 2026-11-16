'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const escape = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let config = {}, trace = window.CodeVizPointers.buildTrace(), position = 0, timer = null;
  let flat = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phaseNames = { ready: 'Start with a prediction', initialize: 'Give the object a value', address: 'Store the address, not a copy of the integer', write: 'Write through the pointer', call: 'Copy the address into the parameter', 'function-write': 'Two pointers, one integer', return: 'The parameter’s lifetime ends', output: 'Read and print the result', done: 'The program has finished', allocate: 'Request storage', check: 'Check before dereferencing', sum: 'Read initialized elements', free: 'Release the storage', clear: 'Clear the owner pointer', failure: 'Handle allocation failure' };
  function pause() { clearTimeout(timer); timer = null; $('play').textContent = 'Play'; }
  function camera() {
    $('viewport').classList.toggle('flat', flat);
    $('view').setAttribute('aria-pressed', String(flat));
    $('view').textContent = flat ? 'Enable 3D view' : 'Flat view';
    for (const id of ['rotate', 'tilt', 'zoom']) $(id).disabled = flat;
    $('world').style.transform = `rotateX(${$('tilt').value}deg) rotateY(${$('rotate').value}deg) scale(${$('zoom').value / 100})`;
  }
  function draw() {
    const state = trace.states[position];
    $('source').innerHTML = trace.code.trimEnd().split('\n').map((line, i) => `<span class="code-line${i === state.line ? ' executing' : ''}"${i === state.line ? ' aria-current="step"' : ''}>${escape(line) || ' '}</span>`).join('');
    $('step-count').textContent = `STEP ${position} / ${trace.states.length - 1}`;
    $('phase').textContent = phaseNames[state.phase];
    $('explanation').textContent = state.message;
    $('output').textContent = state.output || '(no output yet)';
    $('progress').max = trace.states.length - 1; $('progress').value = position;
    $('previous').disabled = position === 0; $('next').disabled = position === trace.states.length - 1;
    $('play').disabled = position === trace.states.length - 1;
    const ended = state.phase === 'done';
    const target = ended ? 'Pointer lifetime ended' : state.pointer === 'dangling' ? 'Dangling — do not dereference' : state.pointer || 'No active target';
    const cellText = cell => !cell.live ? 'Lifetime ended' : cell.value === null ? 'Uninitialized' : String(cell.value);
    const pointerName = config.scenario === 'allocation' ? 'values' : 'p';
    $('world').innerHTML = `<div class="pointer-row"><div class="pointer">${pointerName}<br>${escape(target)}</div>${state.helperPointer ? '<div class="pointer">target (copy)<br>&amp;value</div>' : ''}</div><div class="connection">${state.pointer && state.pointer !== 'dangling' ? '↓ <small>' + (state.helperPointer ? 'both point to value' : 'points to first object') + '</small>' : '<small>No usable connection</small>'}</div><div class="object-row">${state.cells.map(cell => `<div class="memory-block ${cell.live ? '' : 'ended'}"><small>${escape(cell.label)}</small><b>${cell.live && cell.value !== null ? escape(cell.value) : '—'}</b><small>${cell.live ? cell.value === null ? 'uninitialized' : 'live integer' : 'lifetime ended'}</small></div>`).join('')}</div>${state.cells.length ? '' : '<p class="empty">No object created yet</p>'}`;
    $('memory-text').textContent = `${pointerName}: ${target}. ${state.helperPointer ? 'Function parameter target: &value (a copied address). ' : ''}${state.cells.map(cell => `${cell.label}: ${cellText(cell)}.`).join(' ') || 'No object created.'}`;
    if (position === trace.states.length - 1) pause();
  }
  function schedule() {
    timer = setTimeout(() => {
      position++; draw();
      if (position < trace.states.length - 1) schedule();
    }, Number($('speed').value));
  }
  $('play').addEventListener('click', () => { if (timer !== null) pause(); else { $('play').textContent = 'Pause'; schedule(); } });
  $('next').addEventListener('click', () => { pause(); position = Math.min(position + 1, trace.states.length - 1); draw(); });
  $('previous').addEventListener('click', () => { pause(); position = Math.max(position - 1, 0); draw(); });
  $('reset').addEventListener('click', () => { pause(); position = 0; draw(); });
  $('speed').addEventListener('change', () => { if (timer !== null) { pause(); $('play').textContent = 'Pause'; schedule(); } });
  $('scenario').addEventListener('change', () => {
    pause();
    const allocation = $('scenario').value === 'allocation';
    $('values').hidden = allocation; $('failure-label').hidden = !allocation;
    for (const id of ['initial', 'write', 'call']) $(id).disabled = allocation;
    $('settings-status').textContent = 'Choose settings, then Apply & restart to load this program.';
  });
  $('settings').addEventListener('submit', event => {
    event.preventDefault(); pause();
    const allocation = $('scenario').value === 'allocation';
    const nextConfig = { scenario: $('scenario').value, failAllocation: allocation && $('failure').checked };
    if (!allocation) Object.assign(nextConfig, { initialValue: Number($('initial').value), writeValue: Number($('write').value), callValue: Number($('call').value) });
    try { const nextTrace = window.CodeVizPointers.buildTrace(nextConfig); config = nextConfig; trace = nextTrace; position = 0; draw(); $('settings-status').textContent = 'Program updated. Ready to explore.'; }
    catch (error) { $('settings-status').textContent = error.message; }
  });
  $('view').addEventListener('click', () => { flat = !flat; camera(); });
  for (const id of ['rotate', 'tilt', 'zoom']) $(id).addEventListener('input', camera);
  $('camera-reset').addEventListener('click', () => { $('rotate').value = -12; $('tilt').value = 18; $('zoom').value = 90; camera(); });
  $('copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText(trace.code); $('copy-status').textContent = 'C source copied.'; } catch { $('copy-status').textContent = 'Copy unavailable. Select the source code or download the C file.'; } });
  $('download').addEventListener('click', () => { const url = URL.createObjectURL(new Blob([trace.code], { type: 'text/plain' })); const a = document.createElement('a'); a.href = url; a.download = 'pointers-3d.c'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  window.addEventListener('pagehide', pause);
  camera(); draw();
})();
