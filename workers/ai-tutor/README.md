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
7. The public `apiUrl` and public `turnstileSiteKey` are wired into the root
   `ai-tutor-config.js`, but `enabled: false` keeps the AI Tutor interface hidden.
   Change that flag to `true` only after the Worker is securely configured,
   successful live Turnstile and AI-model tests are completed, and usage
   budgets are approved. Deploy the frontend through GitHub Pages.
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

## Private end-to-end preview (only after reviewing deployment)

Production stays disabled at both layers (`AI_ENABLED=false`, website `enabled:false`).
Do not modify those flags for preview.

1. Pull the tested `main` branch locally and run `npx wrangler deploy` from
   `workers/ai-tutor`. This deploys the new private gate but leaves AI disabled.
2. On your own computer, generate a random hexadecimal 32-byte test credential:
   `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.
   Keep it private. Never commit or share screenshots of the value.
3. Run `npx wrangler secret put AI_TEST_TOKEN`, paste that 64-character test
   credential into the Wrangler secret prompt.
4. Run `npx wrangler secret put AI_TEST_MODE` and enter exactly `true`.
   Note: `wrangler secret put` deploys a new Worker version immediately.
5. In your own browser, open
   `https://learncodevisually.com/c-for-loop-visualization.html?ai-preview=1`
   and enter that credential into the private-preview test field.
6. Complete Turnstile if requested. Try Explain step, Hint, and Ask AI.
   If the model returns inaccurate code output, record the error as a bug.
7. When done, immediately run `npx wrangler secret delete AI_TEST_MODE`
   and `npx wrangler secret delete AI_TEST_TOKEN`. Confirm `/health`
   still displays `{"status":"ok","enabled":false}`.
   The public AI Tutor panel remains hidden.

Security: The temporary tester credential is 256-bit random, checked by the
Worker before Turnstile verification and AI inference, and is sent in a
CORS-controlled request header only when you explicitly open `?ai-preview=1`.
The preview key remains in your browser input field for this session only;
it is never stored in GitHub, URLs, or localStorage. Never reuse it.
Turnstile challenges must originate from your configured public website hostname.
The public AI endpoint remains closed while this temporary gate is active.

Cloudflare Worker rate limits are approximate and not a global budget.
A private preview isn't a launch-ready cost control. Keep usage small.

## AI Tutor 2.0: shared daily budget (release candidate)

The existing public switch stays `AI_ENABLED=false`; the frontend remains
`enabled:false`. A merge or redeployment alone does **not** activate public AI.

A SQLite-backed Durable Object named `AiDailyBudget` uses transactional
state to reserve **up to 25 inference attempts per UTC day** across all users.
After 25 reservations, the API returns 429. Durable Object failure returns 503.
Attempts that reach the model consume a reservation even if inference fails.
No learner prompts or IPs are stored in the shared counter.

This is a **request allowance, not a spending guarantee**: model pricing and
token usage affect costs. Keep an account-level billing budget and alerts,
monitor Workers AI usage, and review Cloudflare's current free/paid limits.

Before enabling the beta:
1. Merge only after CI and manual review.
2. Update local `main` and redeploy `workers/ai-tutor` with Wrangler.
3. Confirm the Durable Object migration/binding succeeds and AI_ENABLED=false.
4. Verify health still returns `{"status":"ok","enabled":false}`.
5. Evaluate multiple student questions, feedback and rate-limit behavior.
6. Decide explicit activation separately after confirming Cloudflare billing.
7. If issues arise, disable AI immediately and investigate before re-enabling.

The private smoke-test Wrangler config remains separate and unchanged.
