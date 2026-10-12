# LearnCodeVisually AI Tutor — Public Beta Readiness Checklist

Status: **Private preview only. Public activation is not authorized.**

## Code-level protections verified

- Worker checks exact origin `https://learncodevisually.com`.
- Cloudflare Turnstile challenge verification checks success, expected hostname and action.
- Rate limiter is configured in Wrangler at **5 requests per 60 seconds**, keyed by client IP in the Worker. This is not a global traffic cap.
- A single Durable Object reserves up to **25 AI inference attempts per UTC day shared by all users**, including private preview. Failed model calls after reservation can still consume the allowance. The budget is application-level and not an account spending limit.
- Request body size, question length, source-code length and recent message history are bounded and validated.
- Answers render into inert DOM nodes, with no model-provided HTML, script tags, links or remote assets.
- The Worker currently has `AI_ENABLED=false` and the website has `enabled:false` for the public.
- No arbitrary source code is compiled or executed by AI Tutor.

## What code and CI tests DO NOT prove

- Correctness and educational quality of actual generated answers in all supported programming languages, interface languages and explanation levels.
- Real-world accuracy of provider-generated code, including subtle language-specific edge cases.
- The current Cloudflare account's available quota, free allocation, billing settings, paid usage, or whether any other Workers AI apps share its allowance.
- An account-wide spending cap. The 25-request quota limits this application's inference attempts; per-request consumption can vary.
- Actual retention, processing agreements and legal notice completeness for public or underage users.
- Load testing, abusive distributed IP traffic behavior, actual Turnstile availability in all countries, and accessibility with assistive technology.

## Before public release

1. Ask a small non-sensitive sample of real questions in C, C++, Python, Java, JavaScript, C#, plus one other language; include hint, debugging, review and beginner/advanced levels. Review technical correctness manually. Use at most the permitted shared budget.
2. Confirm the **Cloudflare Workers AI Analytics / Usage** section reflects those requests. Separately review account billing, available allowance, paid usage and any applicable account-level cost controls in the authenticated dashboard.
3. Verify the configured Turnstile widget allows the production hostname and does not silently fail for genuine users. Test rejected/expired challenges and the 429 rate and daily-limit responses.
4. Review the site's privacy notice for the general-purpose AI workflow: question, optional code, response language, explanation level and shortened history sent to Cloudflare; confirm controller identity, Cloudflare data-processing terms, logs, retention, and appropriate notices or consent for the intended audience.
5. Remove temporary `AI_TEST_MODE` and `AI_TEST_TOKEN` from Cloudflare when private testing ends. They should not remain in a worldwide public launch.
6. Only after separate public-launch approval, implement a dedicated public rollout workflow with explicit rollback and keep strict quotas. **Do not modify either public flag as part of the private deployment workflow.**

## Deployment

The heading parser fix is frontend-only and deploys with GitHub Pages. This change does not require a Cloudflare Worker redeployment. The private deployment workflow continues to require `AI_ENABLED=false`.

## Important

Unit tests for language routing, validation, rate limiting and budgets use simulated Cloudflare bindings and model responses. Treat passing tests as evidence of code behavior, not real model performance or actual spending.
