# AI Tutor public beta — staged release runbook

**Public AI is OFF by default.** This branch adds the controlled rollout mechanisms only.

## Gate 0: Confirm public readiness before approval

1. Review real model results for C, C++, Python, Java, JavaScript, C# and one additional language, including debug, hint and code review. The passing unit tests mock model answers and do not establish real-world accuracy.
2. Finalize the Privacy Policy for a worldwide audience including school-age learners: clearly identify the responsible operator/controller as legally appropriate; check retention and data-processing terms for Cloudflare; explain what is sent to AI (question, code, language, history, Turnstile) and how people can raise concerns. Do not represent this as an approved legal notice without review.
3. Check Cloudflare account billing, quota and rate-limit protections. Workers Free is shown in the dashboard, and the app uses 25 globally shared inference reservations/day plus 5 requests per 60 seconds per IP; neither is a complete capacity/abuse guarantee.
4. **In Cloudflare Settings → Variables and Secrets, remove temporary `AI_TEST_MODE` and `AI_TEST_TOKEN`** before activating public access. Keep `TURNSTILE_SECRET`. Do not disclose secret values.
5. Protect GitHub environment `ai-tutor-public` with required reviewers and restrict to `main`. GitHub secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` must have least privilege.

## Gate 1: Activate the backend only

Only after Gates 0 are approved, manually trigger `AI Tutor public backend activation or rollback (manual)` on `main` using mode `public` and confirmation `APPROVE_PUBLIC_AI_BETA`. This is a **real production operation** and requires the GitHub environment review.

The workflow validates the 25/day shared allowance, 5/min/IP rate limit, Turnstile and Durable Object configuration, runs Node/Worker tests, deploys the generated backend configuration, and confirms `/health` reports `enabled:true,ready:true`.

**Do not use** the old private Worker deployment workflow after going public: it intentionally redeploys `AI_ENABLED:false`. That is a valid emergency disable, not a normal public deployment.

## Gate 2: Publish the website UI

The public website switch is a separate, reviewable code change. On a fresh branch based on `main`, run:

```bash
node scripts/ai-tutor-publish-site.cjs public
```

Review the diff for `ai-tutor-config.js`, `index.html` cache key and `PUBLIC_AI_BETA_STATUS.json`. Open a pull request and merge only after CI and reviewer approval. Verify GitHub Pages publishes the new revision. The public URL is `https://learncodevisually.com/`; `?ai-preview=1` is no longer needed.

Test one real public question without the private key, and verify normal Turnstile, access constraints and a clear quota-exhaustion message. Observe Workers AI usage after launch.

## Emergency rollback

1. Immediately deploy backend mode `rollback` via the **manual public Worker** workflow, confirmation `ROLLBACK_PUBLIC_AI_BETA` — backend refusal blocks inference even before website updates.
2. On a branch based on `main`, run `node scripts/ai-tutor-publish-site.cjs rollback`, open and merge the rollback PR, and wait for GitHub Pages deployment.
3. Verify `/health` returns `enabled:false,ready:true` and public AI POST is rejected. Leave tutorials and exercises online.

If the backend activation fails partway, run the rollback workflow and keep the frontend disabled.

**No public activation happens simply by merging this runbook or workflow.**
