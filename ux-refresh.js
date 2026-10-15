/* Homepage presentation and local resume state; no network requests. */
(() => {
  'use strict';
  const key='codeviz-last-lesson-v1';
  const validHashes=new Set([...(window.COURSE_DATA?.topics||[]),'intro','data','control','module-loops','arrays','functions','pointers','oop','file-handling','exception-handling','unit-testing','switch','for-simulation','for-tutorial-title','for-quiz','for-practice']);
  let previous='';
  function refresh(){
    const state=window.courseState?.();
    if(!state)return;
    const code=document.getElementById('program-language')?.value||'python';
    const language=document.getElementById('language')?.value||'en';
    const content=document.getElementById('content');
    const signature=location.hash+'|'+code+'|'+language;
    const home=state.module<0;
    document.body.dataset.uxView=home?'home':'lesson';
    if(home){
      const nav=document.querySelector('#sidebar nav');
      if(nav&&!document.getElementById('ux-menu-toggle')){
        const toggle=document.createElement('button');toggle.type='button';toggle.id='ux-menu-toggle';toggle.lang='en';toggle.textContent='Course menu';
        nav.id='ux-course-menu';toggle.setAttribute('aria-controls',nav.id);toggle.setAttribute('aria-expanded','false');
        nav.parentElement.dataset.uxMenuOpen='false';
        toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.parentElement.dataset.uxMenuOpen=String(open);});
        nav.before(toggle);
      }

      if(nav&&!nav.querySelector('.ux-nav-more')){
        const links=[...nav.children].slice(5);
        const group=document.createElement('details');group.className='ux-nav-more';
        const summary=document.createElement('summary');summary.lang='en';summary.textContent='More topics & tools';
        group.append(summary,...links);nav.append(group);
      }
    }
    if(previous===signature&&content?.dataset.uxReady===signature)return;
    previous=signature;if(content)content.dataset.uxReady=signature;
    if(!home){
      const hash=location.hash.slice(1);
      if(validHashes.has(hash))try{localStorage.setItem(key,JSON.stringify({hash,code,language,title:document.querySelector('#content h1')?.textContent?.trim().slice(0,120)||hash}));}catch{}
      return;
    }
    let saved;try{saved=JSON.parse(localStorage.getItem(key));}catch{}
    if(!saved||!validHashes.has(saved.hash)||!Object.hasOwn(window.COURSE_DATA.programs,saved.code)||!Object.hasOwn(window.COURSE_DATA.locales,saved.language))return;
    const section=document.getElementById('ux-resume');if(!section)return;
    document.getElementById('ux-resume-label').textContent=String(saved.title||'Your previous lesson')+' · '+window.COURSE_DATA.programs[saved.code].label;
    document.getElementById('ux-resume-link').href='index.html?'+new URLSearchParams({lang:saved.language,code:saved.code})+'#'+saved.hash;
    section.hidden=false;
  }
  refresh();
  new MutationObserver(refresh).observe(document.getElementById('content'),{childList:true,subtree:true});
  window.addEventListener('hashchange',refresh);
})();
