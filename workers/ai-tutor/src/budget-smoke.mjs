// Local-only budget validation. NEVER deploy this isolated smoke-test Worker.
// No Workers AI binding exists in its Wrangler config; no inference is possible.
import { AiDailyBudget } from './worker.mjs';
export { AiDailyBudget };

const ORIGIN = 'http://127.0.0.1:8788';
const json = (value, status=200) => new Response(JSON.stringify(value), {
  status,
  headers: {
    'Content-Type':'application/json; charset=utf-8',
    'Cache-Control':'no-store',
    'X-Content-Type-Options':'nosniff',
  },
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // This page is deliberately unusable on any public hostname.
    if (url.origin !== ORIGIN) return json({error:'Local-only test'},403);
    if (url.pathname === '/health' && request.method === 'GET')
      return json({status:'ready',isolated:true,aiBinding:false});
    if (url.pathname !== '/run-check' || request.method !== 'POST')
      return json({error:'Not found'},404);

    // Prevent an unrelated website from making the localhost test run.
    if (request.headers.get('Origin') !== ORIGIN ||
        request.headers.get('X-LCV-Local-Check') !== '1' ||
        request.headers.get('Sec-Fetch-Site') === 'cross-site')
      return json({error:'Local test authorization failed'},403);

    try {
      if (!env.AI_BUDGET) return json({error:'Missing isolated budget binding'},503);
      // Each test uses a fresh Durable Object, never the production namespace.
      // Concurrent requests verify the atomic 25-credit cap.
      const stub = env.AI_BUDGET.getByName('budget-smoke-' + crypto.randomUUID());
      const outcomes = await Promise.all(
        Array.from({length:30}, () => stub.reserve('2030-01-01',25))
      );
      const granted = outcomes.filter(x => x?.granted === true).length;
      const refused = outcomes.filter(x => x?.granted === false).length;
      const nextDay = await stub.reserve('2030-01-02',25);
      const ok = granted === 25 && refused === 5 && nextDay?.granted === true;
      return json({ok,requests:30,granted,refused,nextUtcDayResets:nextDay?.granted===true,
        noAiInference:true,usesProductionBudget:false}, ok?200:500);
    } catch {
      return json({error:'Isolated budget test failed. Check Wrangler output.'},500);
    }
  },
};
