// Optional manual evaluation only. Run from a private terminal, not public CI.
import fs from 'node:fs/promises';
import {GENERAL_MAX_TOKENS,extractCompleteAnswer} from '../workers/ai-tutor/src/answer-quality.mjs';
import {GENERAL_SYSTEM_PROMPT, buildGeneralPrompt, validateGeneralInput} from '../workers/ai-tutor/src/general.mjs';

const cases=[
  {language:'C',action:'ask',level:'beginner',question:'What does int x=3; printf("%d", x++); print?',expect:'3; x becomes 4'},
  {language:'C++',action:'explain',level:'intermediate',question:'Explain why std::vector<int> v{1,2}; v.push_back(3); changes its size.',expect:'size 2 to 3, capacity distinct'},
  {language:'Python',action:'debug',level:'beginner',question:'Why does items=[1,2]; print(items[2]) fail?',expect:'IndexError and valid indices 0,1'},
  {language:'Java',action:'review',level:'intermediate',question:'Review String a = new String("hi"); if(a=="hi") System.out.println("same");',expect:'reference equality versus .equals'},
  {language:'JavaScript',action:'hint',level:'beginner',question:'Give one hint for a for(let i=0;i<3;i++) loop that prints 0,1,2.',expect:'one scaffolded hint, not full solution'},
  {language:'C#',action:'debug',level:'intermediate',question:'Why does int[] a={1,2}; Console.WriteLine(a[2]); fail?',expect:'IndexOutOfRangeException'},
  {language:'Rust',action:'ask',level:'beginner',question:'How is let mut x=1; different from let x=1;?',expect:'mutable and immutable bindings'},
];
const args=process.argv.slice(2);
const onlyCpp=args.includes('--only=cpp');
const modes=args.filter(x=>x==='--dry-run'||x==='--live');
if(modes.length!==1||args.length!==new Set(args).size||args.some(x=>!['--dry-run','--live','--only=cpp'].includes(x))){
  console.error('Usage: node scripts/codevizai-model-smoke.mjs (--dry-run | --live) [--only=cpp]');process.exit(2);
}
const live=modes[0]==='--live';
const selectedCases=onlyCpp?cases.filter(x=>x.language==='C++'):cases;
if(live && process.env.CODEVIZAI_QA_APPROVED!=='YES'){
  console.error('Set CODEVIZAI_QA_APPROVED=YES to explicitly authorize up to '+selectedCases.length+' model call(s).');process.exit(2);
}
if(live && (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_API_TOKEN)){
  console.error('Required local environment variables missing. Never commit keys.');process.exit(2);
}
const model='@cf/google/gemma-4-26b-a4b-it';
const url=live?'https://api.cloudflare.com/client/v4/accounts/'+encodeURIComponent(process.env.CLOUDFLARE_ACCOUNT_ID)+'/ai/run/'+model:'';
const report={type:live?'LIVE_NEEDS_HUMAN_REVIEW':'DRY_RUN_ONLY',model,results:[]};
for(const item of selectedCases){
  const payload=validateGeneralInput({lessonId:'general-programming',language:item.language,interfaceLanguage:'en',action:item.action,level:item.level,question:item.question,code:'',history:[],turnstileToken:'manual-evaluation'});
  if(!payload)throw Error('Fixture validation failed: '+item.language);
  const messages=[{role:'system',content:GENERAL_SYSTEM_PROMPT},{role:'user',content:buildGeneralPrompt(payload)}];
  const entry={language:item.language,action:item.action,level:item.level,expectedFacts:item.expect,result:'NOT_REVIEWED'};
  if(live){
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),30000);
    try{
      const response=await fetch(url,{method:'POST',headers:{Authorization:'Bearer '+process.env.CLOUDFLARE_API_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({messages,max_tokens:GENERAL_MAX_TOKENS,temperature:0.2,chat_template_kwargs:{enable_thinking:false}}),signal:controller.signal});
      const json=await response.json();
      if(!response.ok||json.success===false){entry.error='Cloudflare model request failed ('+response.status+').';}
      else{
        // Preserve the actual response, without clipping code at a fixed character count.
        entry.answer=String(json.result?.response??json.result?.choices?.[0]?.message?.content??'');
        entry.completionCheck=extractCompleteAnswer(json.result,true)?'STRUCTURALLY_COMPLETE':'INCOMPLETE_OR_TOO_LONG';
        if(!entry.answer)entry.error='Model returned no answer';
      }
    }catch{entry.error='Model request or timeout failed';}finally{clearTimeout(timeout);}
  }
  report.results.push(entry);
}
if(live){
  const filename=onlyCpp?'codevizai-local-model-qa-cpp-retest.json':'codevizai-local-model-qa.json';
  await fs.writeFile(filename,JSON.stringify(report,null,2)+'\n',{flag:'wx',mode:0o600});
  console.log('Private QA report saved locally to '+filename+'. Review each response manually. Do NOT commit it.');
}else{
  console.log('DRY RUN: '+selectedCases.length+' sanitized fixtures validated; no Cloudflare API calls made.');
}
