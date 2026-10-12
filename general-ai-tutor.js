(() => {
  'use strict';
  const cfg=window.LEARNCODE_AI_TUTOR;
  const root=document.getElementById('general-ai-tutor');
  if(!root||!cfg)return;
  const canonicalHome=!location.hash || location.hash==='#home';
  // This reusable widget is mounted on the homepage without disrupting lesson routing.
  root.hidden=!canonicalHome;
  window.addEventListener('hashchange',()=>{root.hidden=!!location.hash && location.hash!=='#home';});
  const allowed=new Set(['c','cpp','python','java','javascript','csharp']);
  const params=new URLSearchParams(location.search);
  const preview=cfg.enabled!==true && params.get('ai-preview')==='1';
  const active=cfg.enabled===true || preview;
  const lang=()=>{const v=document.getElementById('program-language')?.value||params.get('code')||'python';return allowed.has(v)?v:'python';};
  const uiLang=()=>{const v=document.getElementById('language')?.value||params.get('lang')||'en';return ['en','da','es','fr','de','pt','ar','ur','hi','zh'].includes(v)?v:'en';};
  const labels={c:'C',cpp:'C++',python:'Python',java:'Java',javascript:'JavaScript',csharp:'C#',other:'Other'};
  const state={history:[],widget:null,busy:false,ready:false};
  const el=(tag,attrs={},value='')=>{const n=document.createElement(tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);if(value)n.textContent=value;return n;};
  const heading=el('h2',{id:'general-ai-tutor-title'},'AI Programming Tutor');
  const intro=el('p',{},'Ask about programming concepts, paste a code sample, or request a hint. Supports any programming language. AI answers may be wrong and are not executed.');
  const note=el('p',{'class':'general-ai-note'},active?'AI Tutor beta: questions are sent to Cloudflare Workers AI. Do not share passwords, personal information or private student work.':'AI Tutor preview — public AI chat is not enabled. Lessons and quizzes remain free.');
  const row=el('div',{'class':'general-ai-row'});
  const language=el('select',{id:'general-ai-language','aria-label':'Programming language'});
  for(const [value,label] of Object.entries(labels)){const option=el('option',{value},label);language.append(option);}
  language.value=lang();
  const other=el('input',{id:'general-ai-other','aria-label':'Other programming language',maxlength:'40',placeholder:'e.g. Rust, Go, Kotlin'});
  other.hidden=true;
  language.addEventListener('change',()=>{other.hidden=language.value!=='other';});
  const level=el('select',{id:'general-ai-level','aria-label':'Explanation level'});
  for(const [v,t] of Object.entries({beginner:'Beginner',intermediate:'Intermediate',advanced:'Advanced'}))level.append(el('option',{value:v},t));
  const mode=el('select',{id:'general-ai-mode','aria-label':'Type of help'});
  for(const [v,t] of Object.entries({ask:'Ask a question',explain:'Explain a concept',hint:'Give a hint',debug:'Debug code',review:'Review code'}))mode.append(el('option',{value:v},t));
  const log=el('div',{id:'general-ai-messages','class':'general-ai-messages',role:'log','aria-live':'polite','aria-label':'Conversation'});
  const form=el('form',{id:'general-ai-form'});
  const question=el('textarea',{id:'general-ai-question',rows:'3',maxlength:'900',minlength:'3',required:'',placeholder:'What would you like to understand?'});
  const code=el('textarea',{id:'general-ai-code',rows:'5',maxlength:'2500',placeholder:'Optional code to explain, review or debug',spellcheck:'false',dir:'ltr'});
  const controls=el('div',{'class':'general-ai-controls'});
  const submit=el('button',{type:'submit'},'Ask AI Tutor');
  const clear=el('button',{type:'button'},'Clear conversation');
  const status=el('p',{id:'general-ai-status',role:'status','aria-live':'polite'},'');
  const captcha=el('div',{id:'general-ai-turnstile'});
  const testBox=el('div',{id:'general-ai-preview'});
  if(preview){testBox.append(el('label',{for:'general-ai-test-key'},'Private tester key (64 characters)'));testBox.append(el('input',{id:'general-ai-test-key',type:'password',maxlength:'64',autocomplete:'off'}));}
  row.append(language,other,mode,level);controls.append(submit,clear);
  form.append(el('label',{for:'general-ai-question'},'Your programming question'),question,el('label',{for:'general-ai-code'},'Optional source code'),code,testBox,captcha,controls);
  root.append(heading,intro,note,row,log,form,status,el('p',{},'Review the '+ 'Privacy Policy before asking AI; no answers are verified by a compiler.'));
  root.lastElementChild.append(' ',el('a',{href:'/privacy.html#ai-tutor'},'Privacy Policy'));
  const append=(role,text,codeLanguage)=>{
    const message=el('article',{'class':'general-ai-message '+role});
    const title=el('p',{'class':'general-ai-speaker'},role==='assistant'?'AI Tutor':'You');
    const content=el('div',{'class':'general-ai-answer'});
    if(role==='assistant'&&window.LearnCodeTutorMarkdown){window.LearnCodeTutorMarkdown.render(content,text,{language:codeLanguage});}
    else content.textContent=text;
    message.append(title,content);log.append(message);log.scrollTop=log.scrollHeight;
  };
  clear.addEventListener('click',()=>{state.history=[];log.replaceChildren();status.textContent='Conversation cleared from this browser session.';});
  if(!active){submit.disabled=true;question.disabled=true;code.disabled=true;mode.disabled=true;language.disabled=true;other.disabled=true;return;}
  let endpoint;
  try{endpoint=new URL(cfg.apiUrl);if(endpoint.protocol!=='https:'||endpoint.pathname!=='/api/tutor'||endpoint.username||endpoint.password||endpoint.search||endpoint.hash)throw Error('Unsafe backend URL');}
  catch{status.textContent='AI Tutor is not configured yet.';submit.disabled=true;return;}
  submit.disabled=true;
  window.onGeneralAiTurnstileLoad=()=>{
    if(!window.turnstile)return;
    try{state.widget=window.turnstile.render('#general-ai-turnstile',{sitekey:cfg.turnstileSiteKey,action:'ai-tutor',theme:'auto','error-callback':()=>{status.textContent='Human verification failed. Refresh to retry.';}});
      state.ready=true;submit.disabled=false;status.textContent='Complete Cloudflare verification to ask AI.';
    }catch{status.textContent='Could not start human verification.';}
  };
  const script=el('script',{src:'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onGeneralAiTurnstileLoad&render=explicit',async:'',defer:''});
  script.onerror=()=>{status.textContent='Verification service could not load.';};
  document.head.append(script);
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(state.busy||!state.ready)return;
    const q=question.value.trim(),source=code.value,chosen=language.value==='other'?other.value.trim():labels[language.value];
    if(q.length<3||q.length>900||source.length>2500||!chosen||!(/^[A-Za-z][A-Za-z0-9 +#._-]{0,39}$/).test(chosen)){status.textContent='Check the question, code length and language.';return;}
    const token=window.turnstile?.getResponse(state.widget);
    if(!token){status.textContent='Please complete human verification first.';return;}
    const testKey=preview?document.getElementById('general-ai-test-key')?.value.trim():'';
    if(preview&&!/^[a-f0-9]{64}$/i.test(testKey)){status.textContent='Enter the private 64-character tester key.';return;}
    state.busy=true;submit.disabled=true;status.textContent='Preparing an answer…';
    const prior=state.history.slice(-6);
    try{
      const headers={'Content-Type':'application/json'};
      if(preview)headers['X-AI-Test-Token']=testKey;
      const response=await fetch(endpoint.href,{method:'POST',headers,cache:'no-store',body:JSON.stringify({lessonId:'general-programming',language:chosen,interfaceLanguage:uiLang(),action:mode.value,question:q,code:source,level:level.value,history:prior,turnstileToken:token})});
      const payload=await response.json();
      if(!response.ok)throw Error(response.status===429?'Tutor usage limit reached. Try again later.':typeof payload.error==='string'?payload.error:'AI Tutor unavailable.');
      const answer=String(payload.answer||'');if(!answer)throw Error('No answer was returned.');
      append('user',q);append('assistant',answer,chosen);
      state.history=[...prior,{role:'user',content:q.slice(0,400)},{role:'assistant',content:answer.slice(0,400)}].slice(-6);
      question.value='';status.textContent='AI answer received. Verify code and explanations before use.';
    }catch(e){status.textContent=e.message||'AI Tutor request failed.';}
    finally{window.turnstile?.reset(state.widget);state.busy=false;submit.disabled=false;}
  });
})();
