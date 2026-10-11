# Test the daily AI quota safely — no AI model calls

This tests the **real Durable Object quota implementation**, including
30 concurrent reservations and a simulated next UTC day. It uses a
**separate local-only Wrangler config** with no AI binding, so this
test cannot use Gemma or spend Workers AI neurons. It does not touch
the production counter, URL, Worker secrets, or 25 requests/day allowance.

## Instructions (Windows / VS Code)

Close any older Wrangler dev server with `Ctrl+C`.

1. Update your local repo from the approved and merged `main` branch:

   ```cmd
   cd C:\Users\ZUKH\learncodewithvisually
   git status --short
   git switch main
   git pull --ff-only origin main
   cd workers\ai-tutor
   ```

   If `git status --short` lists changed files, STOP before switching.

2. In the FIRST terminal, start the isolated test server:

   ```cmd
   npx wrangler dev --config wrangler.budget-smoke.jsonc --local --ip 127.0.0.1 --port 8788
   ```

   Wait for `Ready on http://127.0.0.1:8788`. Leave it open.

3. In a SECOND VS Code terminal:

   ```cmd
   cd C:\Users\ZUKH\learncodewithvisually\workers\ai-tutor
   node test\run-budget-smoke.mjs
   ```

Expected JSON:

```json
{"ok":true,"requests":30,"granted":25,"refused":5,
 "nextUtcDayResets":true,"noAiInference":true,"usesProductionBudget":false}
```

The test makes a fresh **local** Durable Object each time.
It tests reservation accounting and reset, but **not** end-to-end
Turnstile/model routing, not deployed counter storage, and not actual billing.

Stop the FIRST terminal with `Ctrl+C` when finished.

**Never** run `wrangler deploy --config wrangler.budget-smoke.jsonc`:
this file is a local diagnostic and is not designed to be internet-facing.

Production stays `AI_ENABLED=false` and the website remains
`enabled:false`. You do not need to recreate any tester secrets.
