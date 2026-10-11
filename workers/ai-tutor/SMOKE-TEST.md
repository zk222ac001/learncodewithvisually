# Local-only Gemma 4 smoke test

This is a **separate Wrangler dev-only Worker**. It does not touch your
deployed `learncodevisually-ai-tutor` Worker, does not switch on public AI,
and does not need the private Turnstile secret.

## Windows 11 — run once

Open a VS Code terminal in the existing repository:

```cmd
cd C:\Users\ZUKH\learncodewithvisually
git pull origin main
cd workers\ai-tutor
npx wrangler dev --config wrangler.smoke.jsonc --ip 127.0.0.1 --port 8787
```

Keep that terminal open. Open **http://127.0.0.1:8787/** in a browser
**on the same computer**, and click **Run one AI test**. The page will
display Gemma's real answer and the expected C-loop result.

To stop the local test, press **Ctrl+C** in that terminal.

**Never use `wrangler deploy -c wrangler.smoke.jsonc`**. That config
explicitly sets `workers_dev: false`, and the code rejects requests
that are not for local 127.0.0.1, but it is not intended for hosting.

**Costs:** Cloudflare Workers AI calls are remote even when Worker code
runs locally. The test consumes Workers AI inference allowance and can
incur charges if the account exceeds its free allowance. Check your
Cloudflare usage/billing dashboard before and after.

The live site stays unchanged, its AI panel remains `enabled: false`,
and the production Worker still has `AI_ENABLED=false`.
