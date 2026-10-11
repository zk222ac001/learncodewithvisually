(() => {
  'use strict';
  const config = window.LEARNCODE_AI_TUTOR;
  const panel = document.getElementById('ai-tutor-panel');
  const stage = document.querySelector('[data-visualizer="loop"]');
  if (!panel || !stage || !config || !config.apiUrl || !config.turnstileSiteKey) return;
  let endpoint;
  try {
    endpoint = new URL(config.apiUrl);
    if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password ||
        endpoint.pathname !== '/api/tutor' || endpoint.search || endpoint.hash) return;
  } catch { return; }
  const status = document.getElementById('ai-tutor-status');
  const answer = document.getElementById('ai-tutor-answer');
  const form = document.getElementById('ai-tutor-form');
  const question = document.getElementById('ai-tutor-question');
  const buttons = [...panel.querySelectorAll('button')];
  let widgetId = null;
  let busy = false;
  // The visualizer's current step is read from rendered status; this is only
  // a hint to the server. Server-side trace remains authoritative.
  function currentStep() {
    const text = stage.querySelector('[data-status]')?.textContent || '';
    if (text.includes('terminates without printing 4')) return 4;
    const match = text.match(/Iteration (\d+):/);
    return match ? Math.max(0, Math.min(3, Number(match[1]))) : 0;
  }
  function setBusy(value) {
    busy = value;
    buttons.forEach(b => { b.disabled = value; });
  }
  async function ask(action, q = '') {
    if (busy || widgetId === null || !window.turnstile) return;
    const token = window.turnstile.getResponse(widgetId);
    if (!token) {
      status.textContent = 'Please complete human verification first.';
      return;
    }
    setBusy(true);
    answer.textContent = '';
    status.textContent = 'Preparing an explanation…';
    try {
      const response = await fetch(endpoint.href, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({
          lessonId: 'c-for-loop',
          step: currentStep(),
          action, question: q, turnstileToken: token
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'The AI Tutor is unavailable.');
      answer.textContent = typeof payload.answer === 'string' ? payload.answer : '';
      status.textContent = 'AI response generated. Verify its explanation with the visualizer.';
    } catch (error) {
      status.textContent = error.message || 'Could not contact the AI Tutor.';
    } finally {
      window.turnstile.reset(widgetId);
      setBusy(false);
    }
  }
  panel.querySelectorAll('button[data-tutor-action]').forEach(button => {
    button.addEventListener('click', () => ask(button.dataset.tutorAction));
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const q = question.value.trim();
    if (q.length >= 3 && q.length <= 280) ask('ask', q);
  });
  window.onLearnCodeTurnstileLoad = function() {
    if (!window.turnstile) return;
    widgetId = window.turnstile.render('#ai-tutor-turnstile', {
      sitekey: config.turnstileSiteKey,
      action: 'ai-tutor',
      theme: 'auto',
    });
  };
  // Only load the third-party challenge script if the tutor was intentionally configured.
  const script = document.createElement('script');
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onLearnCodeTurnstileLoad&render=explicit';
  script.async = true;
  script.defer = true;
  panel.hidden = false;
  document.head.append(script);
})();
