'use strict';
(()=>{
 const I=window.CourseLabI18n;
 const ds=['ds-array','ds-linked-list','ds-stack','ds-queue','ds-tree','ds-graph','ds-hash'];
 const canonical=(keys,value,fallback)=>keys.find(key=>key===value)||fallback;
 function mount({language='en',codeLanguage='python',chapter}={}){
  language=canonical(Object.keys(I.locales),language,'en');codeLanguage=canonical(['c','cpp','python','java','javascript','csharp'],codeLanguage,'python');
  const suffix='?lang='+encodeURIComponent(language)+'&code='+encodeURIComponent(codeLanguage);
  function link(id,label){const a=document.createElement('a');a.className='course-lab-link';a.href='visual-labs.html'+suffix+(id?'&topic='+encodeURIComponent(id):'');a.textContent=label+' →';return a;}
  function insert(target,id){if(!target||target.querySelector(':scope > .course-lab-callout'))return;const box=document.createElement('div');box.className='course-lab-callout';box.append(link(id,'3D · '+I.t(language,'open')));const heading=target.querySelector(':scope > h1,:scope > h2,:scope > h3,:scope > h4');if(heading)heading.after(box);else target.prepend(box);}
  if(Number.isInteger(chapter)){if(ds[chapter])insert(document.getElementById('content'),ds[chapter]);return;}
  const ids=[...Object.keys(window.LESSON_ASSIGNMENTS||{}),'escapes','formats'];for(const id of ids)insert(document.getElementById(id),id);
  const hero=document.querySelector('.ux-hero-copy');if(hero&&!hero.querySelector('.course-lab-hub')){const a=link(null,'3D · '+I.t(language,'title'));a.classList.add('course-lab-hub');hero.querySelector('.ux-actions')?.after(a);}
 }
 window.CourseLabLinks={mount};
})();
