# Individual operator — public AI Tutor release checklist

**Status: review pending. No public activation has been performed.**

LearnCodeVisually is operated personally by an individual under the public-facing name LearnCodeVisuallyTeam. The public project name does not itself establish the legal identity of a data controller, and this repository must not guess or expose personal identity/address details.

## Verified in repository
- Public frontend feature flag is disabled, and the default Worker config sets `AI_ENABLED=false`.
- The Worker enforces 25 globally shared inference reservations per UTC day and 5 requests per 60 seconds per IP, plus Cloudflare Turnstile.
- AI questions, optional code, language, explanation level and shortened conversation history are processed by Cloudflare Workers AI; no arbitrary learner code is run by the site.
- The project provides an email for privacy enquiries and the ordinary tutorials remain available without AI.

## Human verification required before public launch
- [ ] Operator approves legally required individual-controller identity and contact disclosures; do not publish private contact/address data without explicit consent.
- [ ] Review lawful basis, vendor terms, processor/subprocessor arrangements, privacy rights, retention/deletion and Cloudflare service diagnostics for the real account.
- [ ] Review appropriate notices and access design for a worldwide audience including younger learners.
- [ ] Verify actual non-sensitive AI answers in C, C++, Python, Java, JavaScript and C# across beginner, hints, debugging and code review. Unit tests only verify routing.
- [ ] Confirm account usage/billing and rate-limit behavior in production; do not assume the shared request cap is an account spending cap.
- [ ] Verify temporary `AI_TEST_MODE` and `AI_TEST_TOKEN` are absent in the production Worker; retain `TURNSTILE_SECRET` and all required bindings.
- [ ] Confirm GitHub `ai-tutor-public` environment restricts deployments to `main`, and determine whether a required reviewer/wait timer will be added.
- [ ] Authorize a separate backend activation and frontend publishing step, retaining tested rollback.

See `PUBLIC_BETA_ACTIVATION_RUNBOOK.md`. Merging this checklist or the supporting public website wording **does not activate public AI**.
