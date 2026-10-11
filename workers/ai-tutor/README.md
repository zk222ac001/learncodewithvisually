# LearnCodeVisually AI Tutor (Cloudflare Workers AI)

This directory contains an independently deployable Cloudflare Worker for the
**C For Loop** tutor. It does not run Ollama on GitHub Pages.

## Safety defaults

- Public AI inference is **disabled by default** (`AI_ENABLED=false`).
- The Worker accepts exactly one configured browser Origin.
- Only the allowlisted `c-for-loop` lesson, steps 0–4, and short questions are accepted.
- The C program and step summaries are created on the **server**, not sent by the browser.
- Every AI request requires a successful server-side Cloudflare Turnstile token
  check (including expected hostname and action) and a rate-limiter binding.
- Rate limits are approximate and local to a Cloudflare location. They are **not**
  a reliable global spending cap. Before inviting large audiences, enforce a
  strict account spending limit/monitoring and consider Durable Objects for
  centralized daily budgets. Do not log student prompts.
- No code is compiled or executed. The deterministic course visualizer remains
  the only source of execution-trace truth.

## Set up your account (deployment is NOT automatic)

1. Create/sign in to a Cloudflare account.
2. Create a Turnstile widget for **learncodevisually.com**. Note the public
   site key and private secret key. Configure it for the actual frontend hostname.
3. On your own machine: `cd workers/ai-tutor`, then
   `npx --yes wrangler@latest login`.
4. Securely configure the Turnstile secret:
   `npx --yes wrangler@latest secret put TURNSTILE_SECRET`.
   Paste the secret when prompted. **Never commit it to Git.**
5. Review your budget and the `wrangler.jsonc` model and rate limits.
   Update `AI_ENABLED` to `"true"` **only** after Turnstile and the
   production endpoint are configured. Deploy:
   `npx --yes wrangler@latest deploy`.
6. Test the health endpoint at the generated `workers.dev` URL.
7. Set the public `apiUrl` and public `turnstileSiteKey` in the root
   `ai-tutor-config.js`. This explicitly enables the "AI Tutor" section on
   the existing C loop page; review the frontend change and deploy via GitHub Pages.
8. Verify the real browser, Turnstile widget, quota responses, and mobile layout
   before allowing general student traffic. Do **not** expose an Ollama port.

Notes: `wrangler dev` with Workers AI accesses Cloudflare-hosted inference and
may consume a quota or incur charges; unit tests under `npm test` use mocks
and do not call an external model.

## API

`GET /health` returns a non-sensitive status.
`POST /api/tutor` from the configured origin:

```json
{
  "lessonId": "c-for-loop",
  "step": 2,
  "action": "explain",
  "question": "",
  "turnstileToken": "<fresh browser Turnstile token>"
}
```

Actions: `explain`, `hint`, `ask`. For `ask`, `question` must be 3–280
characters. For other actions, question is empty.

## Design limitations

This is an initial, narrow educational MVP, not a general code compiler, an
autonomous agent, or a fully scaled public AI offering. Cloudflare Workers AI
model output is probabilistic and must be evaluated with student questions.
The sample rate limiter is not globally synchronized; consider more robust
account-level quotas and monitoring before opening worldwide access.

Official docs:
- https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/
- https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
