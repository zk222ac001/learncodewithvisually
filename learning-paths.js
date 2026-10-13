'use strict';
(()=>{
 const tracks=window.CodeVizPaths.getTracks();
 const store=window.CodeVizLearning.createProgressStore();
 const list=document.getElementById('track-list');
 const panel=document.getElementById('journey');
 const cards=()=>tracks.map(t=>{const p=window.CodeVizPaths.summarize(t,store);return '<button class="track-card" type="button" data-track="'+t.id+'" aria-pressed="'+String(active===t.id)+'"><span class="track-icon">'+t.label.slice(0,2)+'</span><strong>'+t.label+'</strong><small>'+t.description+'</small><span class="track-meta">'+p.completed+'/'+p.total+' milestones complete →</span></button>';}).join('');
 let active=new URLSearchParams(location.search).get('path');
 if(!tracks.some(t=>t.id===active))active=null;
 function render(){
  list.innerHTML=cards();
  panel.hidden=!active;
  if(!active)return;
  const track=window.CodeVizPaths.getTrack(active),summary=window.CodeVizPaths.summarize(track,store);
  document.getElementById('journey-title').textContent=track.label+' learning path';
  document.getElementById('journey-description').textContent=track.description;
  document.getElementById('progress-label').textContent=summary.completed+' of '+summary.total+' milestones marked complete';
  document.getElementById('progress-percent').textContent=summary.percent+'%';
  document.getElementById('journey-progress').value=summary.percent;
  document.getElementById('milestone-list').replaceChildren(...summary.steps.map((s,i)=>{
   const row=document.createElement('article');row.className='milestone'+(s.completed?' done':'');
   const num=document.createElement('span');num.className='milestone-number';num.textContent=String(i+1).padStart(2,'0');
   const details=document.createElement('div');
   const title=document.createElement('h3');title.textContent=s.title;
   const description=document.createElement('p');description.textContent=s.description;
   const link=document.createElement('a');link.className='lesson-link';link.href=s.href;link.textContent='Open existing lesson →';
   details.append(title,description,link);
   const button=document.createElement('button');button.type='button';button.className='complete-btn';
   button.dataset.step=s.id;button.setAttribute('aria-pressed',String(s.completed));
   button.textContent=s.completed?'✓ Completed':'Mark complete';
   row.append(num,details,button);return row;
  }));
 }
 list.addEventListener('click',e=>{const btn=e.target.closest('[data-track]');if(!btn)return;active=btn.dataset.track;const url=new URL(location.href);url.searchParams.set('path',active);history.replaceState(null,'',url);render();panel.scrollIntoView({behavior:'smooth',block:'start'});});
 document.getElementById('milestone-list').addEventListener('click',e=>{
  const btn=e.target.closest('[data-step]');if(!btn||!active)return;
  const key=window.CodeVizPaths.progressId(active,btn.dataset.step);
  store.complete(key,!store.get(key).completed);
  render();
 });
 document.getElementById('reset-progress').addEventListener('click',()=>{
  if(!active||!window.confirm('Reset the completion marks for this learning path on this device?'))return;
  for(const step of window.CodeVizPaths.getTrack(active).steps)store.complete(window.CodeVizPaths.progressId(active,step.id),false);
  render();
 });
 render();
})();
