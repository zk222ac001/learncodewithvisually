'use strict';
(() => {
  const { paths, languages, summary, lessonURL } = window.CodeVizPaths;
  const store = window.CodeVizLearning.createProgressStore();
  const $ = id => document.getElementById(id);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const locales = ['en', 'da', 'es', 'fr', 'de', 'pt', 'ar', 'ur', 'hi', 'zh'];
  function preference(key, fallback) { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } }
  const query = new URLSearchParams(location.search);
  const requestedLocale = query.get('lang') || preference('ds-language', 'en');
  const locale = locales.includes(requestedLocale) ? requestedLocale : 'en';
  const requestedCode = query.get('code') || preference('ds-code', 'python');
  let exampleLanguage = Object.hasOwn(languages, requestedCode) ? requestedCode : 'python';
  const find = id => paths.find(path => path.id === id);
  let active = find(location.hash.slice(1)) || find(preference('codeviz-active-path-v1', '')) || find(exampleLanguage);
  function storageStatus() {
    $('save-status').textContent = store.isPersistent() ? 'Progress is saved in this browser.' : 'Browser storage is unavailable. Changes will only last while this page is open.';
  }
  function draw() {
    $('path-cards').innerHTML = paths.map(path => {
      const s = summary(path, store);
      return `<article class="path-card ${path === active ? 'selected' : ''}"><span class="path-symbol" aria-hidden="true">${esc(path.id === 'data-structures' ? '{ }' : path.title)}</span><h3>${esc(path.title)}</h3><p>${esc(path.description)}</p><label>${s.completed} / ${s.total} milestones<progress max="${s.total}" value="${s.completed}" aria-label="${esc(path.title)} progress"></progress></label><a href="#${path.id}" data-path="${path.id}" ${path === active ? 'aria-current="true"' : ''}>${s.completed ? 'Continue path' : 'Explore path'} →</a></article>`;
    }).join('');
    const s = summary(active, store);
    $('resume-title').textContent = s.next ? `${active.title} · ${s.next.title}` : `${active.title} path complete`;
    $('resume-description').textContent = s.next ? `${s.completed} of ${s.total} milestones complete. Continue with the first unfinished lesson.` : 'Well done! Review a lesson or choose another path.';
    $('resume-link').textContent = s.next ? (s.completed ? 'Resume learning →' : 'Start learning →') : 'Review path →';
    $('resume-link').href = s.next ? lessonURL(active, s.next, locale, exampleLanguage) : '#path-detail';
    $('path-detail').innerHTML = `<div class="detail-heading"><div><p class="eyebrow">YOUR ROADMAP · ${s.completed} / ${s.total} COMPLETE</p><h2 id="path-title">${esc(active.title)} learning path</h2></div><span class="badge">${Math.round(s.completed / s.total * 100)}%</span></div>${active.id === 'data-structures' ? `<label class="language-select">Example language <select id="example-language">${Object.entries(languages).map(([id, label]) => `<option value="${id}" ${id === exampleLanguage ? 'selected' : ''}>${esc(label)}</option>`).join('')}</select></label>` : ''}<ol class="milestones">${active.milestones.map((m, index) => {
      const entry = store.get(m.progressId);
      return `<li class="${entry.completed ? 'complete' : ''}"><span class="step" aria-hidden="true">${entry.completed ? '✓' : index + 1}</span><div><h3><a href="${esc(lessonURL(active, m, locale, exampleLanguage))}">${esc(m.title)} →</a></h3><p>${esc(m.description)}</p>${entry.best ? `<p class="quiz-score">Best quiz: ${entry.best.score}/${entry.best.total}</p>` : ''}<label class="completion"><input type="checkbox" data-milestone="${m.id}" ${entry.completed ? 'checked' : ''}> ${entry.completed ? 'Completed' : 'Mark complete'}<span class="sr-only">: ${esc(m.title)}</span></label></div></li>`;
    }).join('')}</ol><p class="future">More advanced milestones will be added as the course grows.</p>`;
    storageStatus();
  }
  document.addEventListener('change', event => {
    if (event.target.id === 'example-language') { exampleLanguage = event.target.value; draw(); $('example-language').focus(); return; }
    const id = event.target.dataset.milestone;
    const milestone = active.milestones.find(m => m.id === id);
    if (!milestone) return;
    store.complete(milestone.progressId, event.target.checked);
    draw();
    document.querySelector(`[data-milestone="${milestone.id}"]`).focus();
  });
  function selectPath(id, focus = false) {
    if (!find(id)) return;
    active = find(id);
    try { localStorage.setItem('codeviz-active-path-v1', active.id); } catch {}
    draw();
    if (focus) $('path-detail').focus();
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-path]');
    if (!link) return;
    event.preventDefault();
    history.pushState(null, '', '#' + link.dataset.path);
    selectPath(link.dataset.path, true);
  });
  window.addEventListener('hashchange', () => selectPath(location.hash.slice(1)));
  window.addEventListener('pageshow', () => draw());
  window.addEventListener('storage', () => draw());
  selectPath(active.id);
})();
