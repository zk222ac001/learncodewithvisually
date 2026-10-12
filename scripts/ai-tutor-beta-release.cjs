#!/usr/bin/env node
'use strict';
// Build reviewable public and rollback configurations. This does NOT deploy or modify source.
const fs=require('node:fs');
const path=require('node:path');
function invariant(ok,message){if(!ok)throw Error('AI beta release guard: '+message);}
function readWorker(s){
 const data=JSON.parse(s);
 invariant(data.name==='learncodevisually-ai-tutor','unexpected Worker name');
 invariant(data.vars?.DAILY_AI_REQUEST_LIMIT==='25','shared daily limit must be 25');
 invariant(data.vars?.ALLOWED_ORIGIN==='https://learncodevisually.com','production origin changed');
 invariant(data.ratelimits?.some(r=>r.name==='RATE_LIMITER'&&r.simple?.limit===5&&r.simple?.period===60),'rate limit must be 5 requests/60 seconds');
 invariant(data.ai?.binding==='AI','AI binding missing');
 invariant(data.durable_objects?.bindings?.some(x=>x.name==='AI_BUDGET'&&x.class_name==='AiDailyBudget'),'daily budget binding missing');
 invariant(['true','false'].includes(data.vars.AI_ENABLED),'unrecognized enabled flag');
 return data;
}
function workerConfig(text,mode){
 invariant(['public','rollback'].includes(mode),'invalid release mode');
 const config=readWorker(text);
 config.vars.AI_ENABLED=mode==='public'?'true':'false';
 return JSON.stringify(config,null,2)+'\n';
}
function siteConfig(text,mode){
 invariant(['public','rollback'].includes(mode),'invalid release mode');
 invariant(/enabled:\s*(?:true|false)\b/.test(text),'missing frontend feature flag');
 invariant((text.match(/enabled:\s*(?:true|false)\b/g)||[]).length===1,'ambiguous frontend feature flag');
 invariant(text.includes('https://learncodevisually-ai-tutor.learncodevisually-zk222ac-2026.workers.dev/api/tutor'),'unexpected Tutor endpoint');
 invariant(text.includes('turnstileSiteKey:'),'Turnstile public site key missing');
 return text.replace(/enabled:\s*(?:true|false)\b/,'enabled: '+(mode==='public'?'true':'false'));
}
function build(mode,destination,root=path.resolve(__dirname,'..')){
 invariant(['public','rollback'].includes(mode),'expected public or rollback mode');
 invariant(typeof destination==='string'&&destination.length>1,'output directory required');
 const worker=workerConfig(fs.readFileSync(path.join(root,'workers/ai-tutor/wrangler.jsonc'),'utf8'),mode);
 const client=siteConfig(fs.readFileSync(path.join(root,'ai-tutor-config.js'),'utf8'),mode);
 const workerPath=path.join(destination,'worker','wrangler.jsonc');
 const clientPath=path.join(destination,'site','ai-tutor-config.js');
 fs.mkdirSync(path.dirname(workerPath),{recursive:true});
 fs.mkdirSync(path.dirname(clientPath),{recursive:true});
 fs.writeFileSync(workerPath,worker,{flag:'w'});
 fs.writeFileSync(clientPath,client,{flag:'w'});
 return {workerPath,clientPath};
}
if(require.main===module){
 try{
  const [mode,destination]=process.argv.slice(2);
  const result=build(mode,destination);
  console.log('Prepared '+mode+' AI Tutor configurations (NO DEPLOYMENT): '+JSON.stringify(result));
 }catch(e){console.error(String(e));process.exitCode=1;}
}
module.exports={workerConfig,siteConfig,build};
