// Private local dashboard; bearer token stays exclusively in Node.
import fs from 'node:fs/promises';
const endpoint=process.env.CODEVIZAI_WORKER_URL || 'https://learncodevisually-ai-tutor.learncodevisually-zk222ac-2026.workers.dev';
const token=process.env.CODEVIZAI_ADMIN_STATS_TOKEN;
const args=process.argv.slice(2);
const watch=args.includes('--watch');
if(args.some(arg=>arg!=='--watch')||!/^https:\/\//.test(endpoint)||!/^[a-f0-9]{64}$/i.test(token||'')){
 console.error('Set CODEVIZAI_ADMIN_STATS_TOKEN (64 hex). Usage: node scripts/codevizai-admin-dashboard.mjs [--watch]');
 process.exit(2);
}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const validMetric=v=>v===null||(Number.isSafeInteger(v)&&v>=0);
async function snapshot(){
 const response=await fetch(new URL('/api/admin/usage',endpoint),{headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(12000)});
 if(!response.ok)throw Error('HTTP '+response.status);
 const data=await response.json();
 if(!/^\d{4}-\d{2}-\d{2}$/.test(data.day)||!Number.isSafeInteger(data.limit)||data.limit<=0||
    !Number.isSafeInteger(data.reserved)||!Number.isSafeInteger(data.remaining)||
    data.reserved<0||data.remaining!==data.limit-data.reserved)throw Error('Invalid analytics response');
 const history=Array.isArray(data.history)?data.history:[];
 if(history.length>7||history.some(row=>!/^\d{4}-\d{2}-\d{2}$/.test(row.day)||
   !['reserved','answered','failed','incomplete'].every(k=>validMetric(row[k]))))throw Error('Invalid usage history');
 const percent=Math.min(100,Math.round(data.reserved/data.limit*100));
 const rows=history.map(r=>'<tr><td>'+esc(r.day)+'</td>'+
 ['reserved','answered','failed','incomplete'].map(k=>'<td>'+(r[k]===null?'Not collected':r[k])+'</td>').join('')+'</tr>').join('');
 const html=['<!doctype html><html lang="en"><meta charset="utf-8"><meta http-equiv="refresh" content="60">',
 '<meta name="viewport" content="width=device-width,initial-scale=1"><title>CodeVizAI — Private Usage Dashboard</title>',
 '<style>body{font:16px system-ui;background:#f3f6fc;color:#142440;max-width:900px;margin:5vh auto;padding:20px}',
 'section{background:white;border:1px solid #dde4ef;border-radius:18px;padding:26px}h1{margin-top:0}',
 '.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:16px}',
 'article{background:#eef3ff;padding:20px;border-radius:14px}strong{display:block;font-size:2.4rem}',
 'progress{width:100%;height:22px}small{color:#53647b}table{width:100%;border-collapse:collapse}',
 'th,td{text-align:left;border-bottom:1px solid #dae3f1;padding:9px;font-size:.9rem}.scroll{overflow-x:auto}</style>',
 '<section><h1>CodeVizAI — Private Dashboard</h1><p>UTC day: '+esc(data.day)+'</p>',
 '<div class="grid"><article><span>AI reservations</span><strong>'+data.reserved+'</strong></article>',
 '<article><span>Remaining today</span><strong>'+data.remaining+'</strong></article>',
 '<article><span>Daily limit</span><strong>'+data.limit+'</strong></article></div>',
 '<h2>Daily AI allowance</h2><progress max="100" value="'+percent+'"></progress><p>'+percent+'% reserved</p>',
 '<p>Public Worker: '+(data.enabled?'Enabled':'Disabled')+'</p>',
 '<h2>Seven-day usage history (UTC)</h2><div class="scroll"><table><thead><tr><th>Day</th>',
 '<th>Reserved</th><th>Answered</th><th>Model failed</th><th>Incomplete</th></tr></thead>',
 '<tbody>'+rows+'</tbody></table></div>',
 '<p><small>Older days without collection show “Not collected”. Counts are aggregate reservations and inference outcomes, not unique visitors. A validation, rate-limit or quota rejection is not counted as a model failure.</small></p>',
 '<p><small>Snapshot '+esc(new Date().toISOString())+'. Browser reloads the local file every minute; use --watch to regenerate it automatically. No admin token or learner content is embedded.</small></p></section></html>'
 ].join('');
 const filename='codevizai-admin-dashboard-local.html';
 await fs.writeFile(filename+'.tmp',html,{mode:0o600});
 await fs.rename(filename+'.tmp',filename);
 console.log('Updated local dashboard: '+filename);
}
try{
 await snapshot();
 if(watch){
  console.log('Refreshing local dashboard every 60 seconds. Ctrl+C to stop.');
  while(true){
    await new Promise(resolve=>setTimeout(resolve,60000));
    try{await snapshot();}catch(e){console.error('Dashboard refresh failed: '+e.message);}
  }
 }
}catch(e){console.error('Unable to read private analytics: '+e.message);process.exitCode=1;}
