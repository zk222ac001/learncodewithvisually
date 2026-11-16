'use strict';
(() => {
  const $ = id => document.getElementById(id), M = window.MemoryLab, I = window.MemoryLabI18n;
  const escape = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const url = new URL(location.href);
  const selectKey = (catalog, value, fallback) => Object.keys(catalog).find(key => key === value) || fallback;
  let language = selectKey(M.languages, url.searchParams.get('code'), 'c');
  let locale = selectKey(I.locales, url.searchParams.get('lang'), 'en');
  let config = { language, scenario: M.languages[language].scenarios[0] }, trace = M.build(config), position = 0, timer = null;
  let flat = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t = (key, args) => I.t(locale, key, args);
  const options = (select, values) => { $(select).replaceChildren(...values.map(([value, label]) => { const o = document.createElement('option'); o.value = value; o.textContent = label; return o; })); };
  options('code-language', Object.entries(M.languages).map(([key, meta]) => [key, meta.label]));
  options('website-language', Object.entries(I.names));
  function translatedText(node, text) {
    node.replaceChildren(...text.split(/(C\+\+|C#)/g).map(part => {
      if (!['C++', 'C#'].includes(part)) return document.createTextNode(part);
      const isolated = document.createElement('bdi'); isolated.dir = 'ltr'; isolated.textContent = part; return isolated;
    }));
  }
  function pause() { clearTimeout(timer); timer = null; $('play').textContent = t('play'); }
  function camera() {
    $('viewport').classList.toggle('flat', flat);
    $('view').setAttribute('aria-pressed', String(flat)); $('view').textContent = t(flat ? 'three' : 'flat');
    for (const id of ['rotate', 'tilt', 'zoom']) $(id).disabled = flat;
    $('world').style.transform = `rotateX(${$('tilt').value}deg) rotateY(${$('rotate').value}deg) scale(${$('zoom').value / 100})`;
  }
  function translate() {
    pause();
    document.documentElement.lang = locale; document.documentElement.dir = ['ar', 'ur'].includes(locale) ? 'rtl' : 'ltr';
    document.title = t('title') + ' | LearnCodeVisually';
    document.querySelectorAll('[data-i18n]').forEach(node => { translatedText(node, t(node.dataset.i18n)); });
    document.querySelectorAll('[data-label]').forEach(node => { node.setAttribute('aria-label', t(node.dataset.label)); });
    translatedText($('language-note'), t('note_' + language));
    $('code-language').value = language; $('website-language').value = locale;
    options('scenario', M.languages[language].scenarios.map(key => [key, t(key)])); $('scenario').value = config.scenario;
    $('source-language').textContent = M.languages[language].label;
    $('back').href = `index.html?lang=${encodeURIComponent(locale)}&code=${encodeURIComponent(language)}#pointers`;
    $('home').href = `index.html?lang=${encodeURIComponent(locale)}&code=${encodeURIComponent(language)}`; $('home').setAttribute('aria-label', t('home'));
    $('provider').href = 'https://onecompiler.com/' + encodeURIComponent(language);
    url.searchParams.set('lang', locale); url.searchParams.set('code', language); history.replaceState(null, '', url);
    $('settings-status').textContent = ''; $('copy-status').textContent = '';
    camera(); fields(); draw();
  }
  function fields() {
    const allocation = config.scenario === 'allocation';
    $('values').hidden = allocation; $('failure-label').hidden = !allocation;
    $('call-label').hidden = config.scenario === 'ownership';
    for (const id of ['initial', 'write', 'call']) $(id).disabled = allocation || (id === 'call' && config.scenario === 'ownership');
    $('failure').checked = !!config.failAllocation;
  }
  function draw() {
    const state = trace.states[position];
    $('source').innerHTML = trace.code.trimEnd().split('\n').map((line, i) => `<span class="code-line${i === state.line ? ' executing' : ''}"${i === state.line ? ' aria-current="step"' : ''}>${escape(line) || ' '}</span>`).join('');
    $('step-count').textContent = t('step') + ' ';
    const count = document.createElement('bdi'); count.dir = 'ltr'; count.textContent = `${position} / ${trace.states.length - 1}`; $('step-count').append(count);
    $('phase').textContent = `${t('step')} ${position}`;
    translatedText($('explanation'), t(config.failAllocation && state.key === 'alloc_allocate' ? 'disclaimer' : state.key, state.args));
    $('output').textContent = state.output || t('noOutput');
    $('progress').max = trace.states.length - 1; $('progress').value = position;
    $('previous').disabled = position === 0; $('next').disabled = position === trace.states.length - 1; $('play').disabled = position === trace.states.length - 1;
    const cellText = cell => !cell.live ? t('ended') : cell.value === null ? t('unknown') : String(cell.value);
    const targetText = target => target === 'dangling' ? t('dangling') : target || t('none');
    $('world').innerHTML = `<div class="pointer-row">${state.refs.map(ref => `<div class="pointer"><bdi>${escape(ref.name)}</bdi><br><bdi>→ ${escape(targetText(ref.target))}</bdi></div>`).join('')}</div><div class="object-row">${state.cells.map(cell => `<div class="memory-block ${cell.live ? '' : 'ended'}"><small><bdi>${escape(cell.label)}</bdi></small><b>${cell.live && cell.value !== null ? escape(cell.value) : '—'}</b><small dir="auto">${escape(cell.live ? cell.value === null ? t('unknown') : t('live') : t('ended'))}</small></div>`).join('')}</div>${state.cells.length ? '' : `<p class="empty" dir="auto">${escape(t('none'))}</p>`}`;
    const text = [...state.refs.map(ref => `${ref.name} → ${targetText(ref.target)}`), ...state.cells.map(cell => `${cell.label}: ${cellText(cell)}`)];
    $('memory-text').replaceChildren(...(text.length ? text : [t('none')]).map(value => { const p = document.createElement('p'); const bdi = document.createElement('bdi'); bdi.textContent = value; p.append(bdi); return p; }));
    if (position === trace.states.length - 1) pause();
  }
  function schedule() { timer = setTimeout(() => { position++; draw(); if (position < trace.states.length - 1) schedule(); }, Number($('speed').value)); }
  $('play').addEventListener('click', () => { if (timer !== null) pause(); else { $('play').textContent = t('pause'); schedule(); } });
  $('next').addEventListener('click', () => { pause(); position = Math.min(position + 1, trace.states.length - 1); draw(); });
  $('previous').addEventListener('click', () => { pause(); position = Math.max(position - 1, 0); draw(); });
  $('reset').addEventListener('click', () => { pause(); position = 0; draw(); });
  $('speed').addEventListener('change', () => { if (timer !== null) { pause(); $('play').textContent = t('pause'); schedule(); } });
  $('website-language').addEventListener('change', () => { pause(); locale = selectKey(I.locales, $('website-language').value, 'en'); translate(); });
  $('code-language').addEventListener('change', () => {
    pause(); language = selectKey(M.languages, $('code-language').value, 'c'); config = { ...config, language, scenario: M.languages[language].scenarios[0], failAllocation: false };
    trace = M.build(config); position = 0; translate();
  });
  $('scenario').addEventListener('change', () => { pause(); config = { ...config, scenario: $('scenario').value, failAllocation: false }; trace = M.build(config); position = 0; fields(); draw(); $('settings-status').textContent = ''; });
  $('settings').addEventListener('submit', event => {
    event.preventDefault(); pause();
    const nextConfig = { ...config, failAllocation: config.scenario === 'allocation' && $('failure').checked };
    for (const [id, key] of [['initial', 'initialValue'], ['write', 'writeValue'], ['call', 'callValue']]) {
      if (!$(id).disabled) {
        const value = Number($(id).value);
        if ($(id).value.trim() === '' || !Number.isInteger(value) || value < -999 || value > 999) { $('settings-status').textContent = t('invalid'); $(id).focus(); return; }
        nextConfig[key] = value;
      }
    }
    trace = M.build(nextConfig); config = nextConfig; position = 0; draw(); $('settings-status').textContent = t('updated');
  });
  $('view').addEventListener('click', () => { flat = !flat; camera(); });
  for (const id of ['rotate', 'tilt', 'zoom']) $(id).addEventListener('input', camera);
  $('camera-reset').addEventListener('click', () => { $('rotate').value = -12; $('tilt').value = 18; $('zoom').value = 90; camera(); });
  $('copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText(trace.code); $('copy-status').textContent = t('copied'); } catch { $('copy-status').textContent = t('copyFailed'); } });
  $('download').addEventListener('click', () => { const blobURL = URL.createObjectURL(new Blob([trace.code], { type: 'text/plain;charset=utf-8' })); const a = document.createElement('a'); a.href = blobURL; a.download = M.languages[language].file; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(blobURL), 1000); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); }); window.addEventListener('pagehide', pause);
  translate();
})();
