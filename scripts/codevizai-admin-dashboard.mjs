// Run locally only. Credentials remain in environment variables, never in output.
import fs from 'node:fs/promises';
const endpoint=process.env.CODEVIZAI_WORKER_URL ||
 'https://learncodevisually-ai-tutor.learncodevisually-zk222ac-2026.workers.dev';
const token=process.env.CODEVIZAI_ADMIN_STATS_TOKEN;
if(!/^https:\/\//.test(endpoint)||!/^[a-f0-9]{64}$/i.test(token||'')){
 console.error('Set CODEVIZAI_ADMIN_STATS_TOKEN (64 hex) and optionally CODEVIZAI_WORKER_URL (https).');
 process.exit(2);
}
let data;
try{
 const response=await fetch(new URL('/api/admin/usage',endpoint),{
   headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(12000)
 });
 if(!response.ok)throw Error('HTTP '+response.status);
 data=await response.json();
 if(!/^\d{4}-\d{2}-\d{2}$/.test(data.day)||
   !Number.isSafeInteger(data.limit)||!Number.isSafeInteger(data.reserved)||
   !Number.isSafeInteger(data.remaining))throw Error('Invalid analytics response');
}catch(e){console.error('Unable to read private analytics:',e.message);process.exit(1);}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const percent=Math.min(100,Math.round((data.reserved/data.limit)*100));
const html=`<!doctype html><html lang="en"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>CodeVizAI — Private Usage Dashboard</title>
<style>body{font:16px system-ui;background:#f3f6fc;color:#142440;max-width:850px;margin:5vh auto;padding:20px}
section{background:white;border:1px solid #dde4ef;border-radius:18px;padding:26px}h1{margin-top:0}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:16px}
article{background:#eef3ff;padding:20px;border-radius:14px}strong{display:block;font-size:2.4rem}
progress{width:100%;height:22px}small{color:#53647b}</style>
<section><h1>CodeVizAI — Private Dashboard</h1><p>UTC day: ${esc(data.day)}</p>
<div class="grid"><article><span>AI reservations</span><strong>${data.reserved}</strong></article>
<article><span>Remaining today</span><strong>${data.remaining}</strong></article>
<article><span>Daily limit</span><strong>${data.limit}</strong></article></div>
<h2>Daily AI allowance</h2><progress max="100" value="${percent}"></progress><p>${percent}% reserved</p>
<p>Public Worker: ${data.enabled?'Enabled':'Disabled'}</p>
<small>Snapshot at ${esc(new Date().toISOString())}. Reservations include attempts that may not have produced a usable answer. This dashboard does not record personal information, IP addresses, prompts, or student submissions.</small>
</section></html>`;
const filename='codevizai-admin-dashboard-local.html';
await fs.writeFile(filename,html,{mode:0o600});
console.log('Saved local dashboard to '+filename+'. Do not publish this file.');
