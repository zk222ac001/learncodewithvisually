# CodeVizAI — private live-model quality evaluation

This does **not** enable the public Tutor, deploy a Worker, or modify its daily usage allowance. It tests the configured Gemma model directly from your own computer through Cloudflare's authenticated REST API, using the **same general teaching prompt**. It does **not** test the actual public HTTP endpoint, Turnstile, origin restrictions or the Durable Object budget.

## Dry run (no network calls)
```bash
node scripts/codevizai-model-smoke.mjs --dry-run
```

## Optional real evaluation — only when ready
Use a locally stored, least-privilege Cloudflare API token with permission to invoke Workers AI, plus your account ID. Never enter token values into GitHub issues, screenshots, commits or chat. The commands below presume these variables have already been configured securely in your terminal environment.

```bash
node scripts/codevizai-model-smoke.mjs --live
```

This command also requires the explicit local environment flag `CODEVIZAI_QA_APPROVED=YES`. It makes **up to seven** sequential inference requests and may consume Cloudflare Workers AI quota. It creates `codevizai-local-model-qa.json` with restrictive file permissions and refuses to overwrite an existing report. The report is excluded from Git. Keep it private and delete it when you no longer need it.

The questions are fixed, non-personal examples in C, C++, Python, Java, JavaScript, C# and Rust. Inspect the generated answers against the expected technical facts in `CODEVIZAI_LIVE_LANGUAGE_QA.md` and manually mark each case PASS or FAIL. The script deliberately marks every answer `NOT_REVIEWED`; successful HTTP requests are **not** proof of educational correctness.

Cloudflare API tokens may provide more account access than a QA task needs. Create a suitably scoped token, keep it outside the repository, and revoke it afterward if temporary.

## Limits and release gates

- The existing public Worker configuration remains `AI_ENABLED=false`.
- Direct REST API model calls **bypass** the application's 25/day request budget and 5/minute per-IP limiter. They still count toward Cloudflare's own applicable model usage. Run only seven questions as planned; do not use this for unlimited testing.
- Actual live answer review, privacy-controller disclosures, data-processing and retention review, Turnstile behavior, and protected rollout still remain separate release gates.
- This script is never invoked by GitHub Actions or deployed to Cloudflare. Its dry run checks input validation without a remote call.
