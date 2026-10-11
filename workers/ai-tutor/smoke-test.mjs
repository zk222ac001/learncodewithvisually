import { buildPrompt } from './src/index.mjs';

const MODEL = '@cf/google/gemma-4-26b-a4b-it';
const LOCAL_ORIGIN = 'http://127.0.0.1:8787';
const securityHeaders = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
};
const html = (body, status=200) => new Response(body, {
  status, headers: { ...securityHeaders, 'Content-Type': 'text/html; charset=utf-8' },
});
const escapeHtml = (v) => String(v).replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
);
const page = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>LearnCodeVisually local AI model test</title>
<style>body{font:16px/1.65 system-ui,sans-serif;max-width:720px;margin:5vh auto;padding:0 18px;color:#18314d}
main{border:1px solid #d6e0ec;padding:24px;border-radius:14px}button,a{display:inline-block;padding:11px 16px;border:1px solid #235bd4;border-radius:8px;background:#235bd4;color:white;font:inherit;text-decoration:none;cursor:pointer}
pre{overflow:auto;white-space:pre-wrap;background:#edf3fd;padding:18px;border-radius:8px}small{color:#526579}</style></head>
<body><main><h1>AI Tutor: local Gemma 4 test</h1>
<p><strong>Model:</strong> ${MODEL}</p>
<p><small>This is a temporary local-only test. It does not enable the public AI Tutor or require a Turnstile token.</small></p>
${body}</main></body></html>`;

function modelAnswer(response) {
  const text = typeof response?.choices?.[0]?.message?.content === 'string'
    ? response.choices[0].message.content
    : response?.response;
  return typeof text === 'string' ? text.trim().slice(0, 3000) : '';
}

export async function handleSmoke(request, env) {
  const url = new URL(request.url);
  if (url.origin !== LOCAL_ORIGIN) return html('Local test only.', 403);
  if (url.pathname === '/' && request.method === 'GET') {
    // Protect the local form with a short-lived, same-site double-submit token.
    // No reliance on Origin being populated for browser form navigations.
    const csrf = crypto.randomUUID();
    const response = html(page(`<p>Click once to ask Gemma 4 why the C loop prints 1, 2, 3 but not 4.</p>
<form method="POST" action="/run-test">
<input type="hidden" name="csrf" value="${csrf}">
<button type="submit">Run one AI test</button></form>
<p><small>Workers AI may use your Cloudflare inference allowance even during local testing.</small></p>`));
    response.headers.set('Set-Cookie', `lcv_smoke_csrf=${csrf}; Path=/; HttpOnly; SameSite=Strict; Max-Age=600`);
    return response;
  }
  if (url.pathname !== '/run-test' || request.method !== 'POST') return html('Not found.', 404);
  // Reject explicitly cross-site requests, but tolerate a missing/null Origin:
  // some browsers send null for navigations with Referrer-Policy: no-referrer.
  const origin = request.headers.get('Origin');
  const fetchSite = request.headers.get('Sec-Fetch-Site');
  if ((origin && origin !== 'null' && origin !== LOCAL_ORIGIN) ||
      (fetchSite && fetchSite !== 'same-origin' && fetchSite !== 'none')) {
    return html('Invalid origin.', 403);
  }
  const cookie = request.headers.get('Cookie') || '';
  const cookieToken = /(?:^|;\\s*)lcv_smoke_csrf=([a-f0-9-]{36})(?:;|$)/.exec(cookie)?.[1];
  if (!cookieToken) return html('Invalid or expired local form. Return to the test page.', 403);
  if (!/^application\\/x-www-form-urlencoded(?:\\s*;|$)/i.test(request.headers.get('Content-Type') || '')) {
    return html('Invalid form type.', 415);
  }
  const length = Number(request.headers.get('Content-Length') || 0);
  if (length > 1024) return html('Invalid form size.', 413);
  let submittedToken;
  try { submittedToken = (await request.formData()).get('csrf'); }
  catch { return html('Invalid form.', 400); }
  if (typeof submittedToken !== 'string' || submittedToken !== cookieToken) {
    return html('Invalid local form. Return to the test page.', 403);
  }
  if (!env.AI || typeof env.AI.run !== 'function') {
    return html(page('<p>AI binding unavailable. Check the local smoke config.</p>'), 503);
  }
  try {
    const result = await env.AI.run(MODEL, {
      messages: [
        { role: 'system', content: 'You are a careful introductory C tutor. Use only the trusted code state. Be concise.' },
        { role: 'user', content: buildPrompt('explain', 4) },
      ],
      max_tokens: 350,
      temperature: 0.2,
      chat_template_kwargs: { enable_thinking: false },
    });
    const answer = modelAnswer(result);
    if (!answer) return html(page('<p>The model returned no readable answer.</p><a href="/">Try again</a>'), 502);
    return html(page(`<h2>Gemma 4 response</h2><pre>${escapeHtml(answer)}</pre>
<p><strong>Expected:</strong> After printing 3, the update makes i = 4. The condition 4 &lt;= 3 is false; 4 is not printed.</p><a href="/">Back to local test</a>`));
  } catch {
    // Do not render internal errors or secrets into the browser.
    return html(page('<p>The model request failed. Check the Wrangler terminal for a diagnostic.</p><a href="/">Go back</a>'), 502);
  }
}
export default { fetch: handleSmoke };
