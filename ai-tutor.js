(() => {
  'use strict';
  const config = window.LEARNCODE_AI_TUTOR;
  const panel = document.getElementById('ai-tutor-panel');
  const stage = document.querySelector('[data-visualizer="loop"]');
  const privatePreview = new URLSearchParams(window.location.search).get('ai-preview') === '1';
  if (!panel || !stage || !config || (config.enabled !== true && !privatePreview) ||
      !config.apiUrl || !config.turnstileSiteKey) return;
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
  const previewControls = document.getElementById('ai-tutor-preview-controls');
  const previewKey = document.getElementById('ai-tutor-preview-key');
  if (privatePreview && previewControls) previewControls.hidden = false;
  const buttons = [...panel.querySelectorAll('button')];
  let widgetId = null;
  let busy = false;
  // The visualizer's current step is read from rendered status; this is only
  // a hint to the server. Server-side trace remains authoritative.
  function currentStep() {
    const text = document.querySelector('[data-visualizer="loop"] [data-status]')?.textContent || '';
    if (text.includes('terminates without printing 4')) return 4;
    const match = text.match(/Iteration (\d+):/);
    return match ? Math.max(0, Math.min(3, Number(match[1]))) : 0;
  }
  function setBusy(value) {
    busy = value;
    buttons.forEach(b => { b.disabled = value; });
  }
  async function ask(action, q = '') {
    if (busy) return;
    if (widgetId === null || !window.turnstile) {
      status.textContent = 'Human verification is not ready. Please allow Cloudflare Turnstile, disable blocking extensions for this site, then refresh.';
      return;
    }
    const token = window.turnstile.getResponse(widgetId);
    if (!token) {
      status.textContent = 'Please complete human verification first.';
      return;
    }
    const testKey = privatePreview ? (previewKey?.value.trim() || '') : '';
    if (privatePreview && !/^[a-f0-9]{64}$/i.test(testKey)) {
      status.textContent = 'Enter your 64-character temporary test key before continuing.';
      return;
    }
    setBusy(true);
    answer.textContent = '';
    status.textContent = 'Preparing an explanation…';
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (privatePreview) headers['X-AI-Test-Token'] = testKey;
      const response = await fetch(endpoint.href, {
        method: 'POST',
        headers,
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
    try {
      widgetId = window.turnstile.render('#ai-tutor-turnstile', {
        sitekey: config.turnstileSiteKey,
        action: 'ai-tutor',
        theme: 'auto',
        'error-callback': () => { status.textContent = 'Cloudflare verification failed. Refresh this page and try again.'; },
        'expired-callback': () => { status.textContent = 'Human verification expired. Please verify again.'; },
      });
      status.textContent = 'Complete Cloudflare verification below before asking AI.';
    } catch {
      status.textContent = 'Could not initialize Cloudflare verification. Refresh and check your browser blockers.';
    }
  };
  // Only load the third-party challenge script if the tutor was intentionally configured.
  const script = document.createElement('script');
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onLearnCodeTurnstileLoad&render=explicit';
  script.async = true;
  script.defer = true;
  script.onerror = () => { status.textContent = 'Cloudflare verification script could not load. Check extensions or network filtering, then refresh.'; };
  status.textContent = 'Loading Cloudflare human verification…';
  panel.hidden = false;
  document.head.append(script);
})();
