# Private deployment of general AI Tutor

This is an opt-in deployment of the merged all-language Cloudflare Worker. **It does not activate public AI.** Both the Worker `AI_ENABLED=false` and website `enabled:false` must remain in place.

## One-time GitHub configuration

1. Create an environment named `ai-tutor-private` in **GitHub > Settings > Environments**. For production protection, add required reviewers and restrict deployment to `main`.
2. Create an appropriately scoped Cloudflare API token with **Workers Scripts: Edit** and necessary permissions for existing Workers AI, rate-limit bindings and Durable Objects. Keep its value private.
3. Under **GitHub > Settings > Secrets and variables > Actions**, create repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Do not add them to Git files or public screenshots.
4. In Cloudflare, verify the existing `TURNSTILE_SECRET` secret is still present. Do not reveal its value.

## Deploy privately

In **GitHub > Actions**, choose **Deploy AI Tutor Worker (manual, private)**, then click **Run workflow** on `main`. Enter `DEPLOY_PRIVATE_AI_TUTOR` and approve the protected environment if prompted.

The workflow checks both public feature flags, runs Node and Worker tests, deploys from `workers/ai-tutor/wrangler.jsonc`, and verifies `/health` returns `enabled:false`, `release:"general-programming-v1"` and a general programming capability marker.

If anything fails, do **not** enable public AI. Review the workflow logs and Cloudflare deployment settings. The Worker may already have deployed if the last step fails; inspect its status before retrying.

## Private end-to-end test

1. On your own computer, use the private-preview steps in [README.md](README.md) to provision a random tester secret (`AI_TEST_TOKEN`) and temporary `AI_TEST_MODE=true`, without changing `AI_ENABLED`.
2. Open `https://learncodevisually.com/?ai-preview=1`, enter the private tester key, complete Turnstile, and test Python, C, C++, Java, JavaScript, C# and one additional language. Test a hint, code review and debugging request. Do not share keys or confidential example code.
3. Confirm the daily budget and rate-limit errors are handled. Inspect Workers AI usage and billing limits.
4. After testing, delete `AI_TEST_MODE` and `AI_TEST_TOKEN` and confirm `/health` still reports `enabled:false`.

**Privacy:** Review processor arrangements, rights, retention, student/minor access, and notices before public activation. Public deployment is a separate decision.

## If GitHub deployment credentials are not configured

Deploy manually from a trusted local clone using `git pull --ff-only origin main`, `cd workers/ai-tutor`, `npx wrangler login`, and `npx wrangler deploy --config wrangler.jsonc`. Confirm the Worker name and Cloudflare account before proceeding. The same health check and private-preview checks apply.
