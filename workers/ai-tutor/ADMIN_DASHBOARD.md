# CodeVizAI — private operations dashboard (v1)

**Status: not deployed.** This feature requires a protected Cloudflare Worker deployment and a new Worker secret. Merging the PR does **not** automatically expose a dashboard or redeploy the public Worker.

## What it measures

The dashboard reads the **existing globally shared Durable Object reservation counter**. It shows the current UTC day, reserved AI request slots, daily limit (25), remaining slots, and whether public AI is enabled. It does **not** claim to measure successful responses, unique visitors, errors or costs. It neither collects prompts nor stores additional IP addresses.

## Set up a private admin token

1. Generate a 32-byte cryptographically random token (64 hexadecimal characters), e.g. locally in PowerShell: `$token = -join (1..32 | ForEach-Object { '{0:x2}' -f (Get-Random -Minimum 0 -Maximum 256) })`. Prefer a cryptographic random generator for real production use, such as Node `require('node:crypto').randomBytes(32).toString('hex')`.
2. Store it in Cloudflare Worker production **secrets** as `ADMIN_STATS_TOKEN` and, separately, in a **local environment variable** `CODEVIZAI_ADMIN_STATS_TOKEN` when using the dashboard.
3. Never add the value to `wrangler.jsonc`, GitHub Issues, tracked files, screenshots or chat.

## Roll out safely

Before deployment, run `npm test` plus the Worker unit tests. Deploy using the approved public Worker release process, preserving `AI_ENABLED=true`, `AI_BUDGET`, `RATE_LIMITER`, `TURNSTILE_SECRET`, `ALLOWED_ORIGIN` and `DAILY_AI_REQUEST_LIMIT=25`. **Do not run the private deployment workflow**, which would turn public AI off. Verify the /health endpoint remains enabled and ready.

Untrusted or unauthorized GET requests to `/api/admin/usage` must return 401. A valid request with the token returns only aggregate counts and must not return CORS headers. This is a bearer token, so anyone who gets it can read the aggregate count; rotate it if exposed. Apply additional Cloudflare access protection if desired.

## Generate a private HTML snapshot on your own computer

Set the local environment variable `CODEVIZAI_ADMIN_STATS_TOKEN` to the secret and run:

```bash
node scripts/codevizai-admin-dashboard.mjs
```

Open `codevizai-admin-dashboard-local.html` locally. It is excluded from Git. Refresh by rerunning the command; there is no automatic polling or remote administration in v1.

## Planned future features

Aggregated, privacy-respecting error counters, optional anonymized response feedback, and Cloudflare billing insights need separate implementation. They are not represented as live data here. Finalize the individual operator/privacy notice before further expanding tracking.

## V2: bounded seven-day aggregate history and local refresh

V2 is proposed code, not yet deployed. The Durable Object stores a rolling seven-day aggregate of reservation attempts, successful model responses, incomplete output and model exceptions. It retains no IP address, question, code, user identifier or individual event log. Earlier dates before v2 collection appear as **Not collected**; they cannot be reconstructed reliably. Today’s existing reservation counter is preserved when v2 starts.

To refresh the private dashboard automatically, use `node scripts/codevizai-admin-dashboard.mjs --watch` in the terminal that holds `CODEVIZAI_ADMIN_STATS_TOKEN`. Keep that terminal running. The local HTML file reloads every 60 seconds; the token remains only in the Node process environment, never in HTML. Stop with Ctrl+C. This does not create a remotely accessible dashboard.

Failure totals cover model exceptions and incomplete generated replies **after quota reservation**. They do not measure Turnstile, input-validation, rate-limit or quota denials; model inference exceptions are not personally attributable. This is operational telemetry, not billing data or a visitor counter.

Run the automated tests and protected public Worker deployment only after review; **never** use the private workflow because it disables the public Tutor.

## Confirm automatic refresh on your computer

Run `node scripts/codevizai-admin-dashboard.mjs --watch` from the repository after pulling the argument-validation fix. The existing admin token stays in your local environment; do not paste it into chat. The terminal should print `Updated local dashboard` immediately and again after 60 seconds. Check that the HTML snapshot timestamp changes too. A browser reload alone only rereads the saved file and does not prove that new statistics were fetched.

Keep the Node process running and the computer awake. A transient request failure is logged and the next refresh is retried; the displayed file remains the last successful snapshot, so check its timestamp. This local watch mode is not unattended cloud monitoring and sends no failure alerts.

The CLI regression tests run the real command with synthetic responses. They verify initial snapshot creation, repeated refresh, recovery after HTTP 503, rejection of unknown options and absence of the token in output. These tests do not prove a process is running on your computer or validate live authenticated metrics.
