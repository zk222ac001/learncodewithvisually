# Public AI Tutor beta — approval and rollback plan

**Status: prepared, NOT activated.** The website and Cloudflare Worker in `main` retain public AI flags off.

## Safeguards
- Cloudflare Workers Free; application quota **25 inference reservations per UTC day, shared globally**.
- Rate limiter **5 requests in 60 seconds per IP**; Turnstile hostname/action verification; validated input and length limits.
- No public release is authorized by merging this plan.
- Private test credentials `AI_TEST_MODE` and `AI_TEST_TOKEN` must be removed before public activation.
- Never include secrets in GitHub files, workflow logs, screenshots or browser configuration.

## Prelaunch approvals
1. Review actual generated answers in **C, C++, Python, Java, JavaScript, C#** and at least one extra language. Include hint, debug and review modes. Automated language-routing tests do not substitute for this.
2. Review the privacy notice and identify the actual legal controller, relevant Cloudflare terms, retention, student/minor access, and notices. Obtain any required approvals.
3. In authenticated Cloudflare dashboard confirm Workers Free, current billing/usage, Turnstile allowed hostname and service security. Verify no unwanted account-paid services.
4. Remove private tester variables and make sure public AI remains disabled while confirming `/health` returns `enabled:false,ready:true`.
5. Review the release candidates using `node scripts/ai-tutor-beta-release.cjs public /tmp/ai-beta-public` and `node scripts/ai-tutor-beta-release.cjs rollback /tmp/ai-beta-rollback`. These **generate local files only** and do not deploy.
6. Require explicit approval for each change, and capture expected commit SHA for production.

## Controlled activation (requires separate approval)
1. Enable the **Worker backend first** using a reviewed production deployment from the approved release candidate; do not alter quota, rate limits or Turnstile secrets.
2. Confirm `/health` reports `enabled:true,ready:true`, then publish the **frontend-enabled** release under change control. Until the frontend is enabled the general public should see a disabled Tutor.
3. Test one real public request without private tester credentials. Verify 403 invalid origin/challenge and 429 budget or rate-limit failures in controlled tests, without exhausting users' daily allowance.
4. Observe Cloudflare Workers AI Neurons and quota. Keep public usage at 25 shared requests/day initially; assess access demand before changing it.

## Emergency rollback
1. Restore frontend `enabled:false` immediately (so users cannot submit through the public UI).
2. Restore Worker `AI_ENABLED:false` via a reviewed deployment; verify `/health` reports `enabled:false,ready:true`.
3. Verify real public POST requests are rejected, inspect errors and audit the deployment history. Keep other unrelated website features available.

## Important note
Existing `.github/workflows/deploy-ai-tutor-manual.yml` is intentionally a **private-only** workflow: it refuses `AI_ENABLED:true` and cannot launch the public service. Do not bypass this protection or run an unreviewed Wrangler command. The release generation script is a *reviewable preparation aid*, not a production release workflow.
