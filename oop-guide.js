'use strict';
(()=>{
 const data=window.OOPGuideData,examples=window.OOPWorkshop;
 const pillars={encapsulation:'oop-3',abstraction:'oop-2',inheritance:'oop-5',polymorphism:'oop-6'};
 let previousTopic='',selected='single',position=-1;
 const el=(tag,text,className)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;};
 const activePillar=topic=>topic==='oop-2'?'abstraction':['oop-5','oop-protected'].includes(topic)?'inheritance':topic==='oop-6'?'polymorphism':'encapsulation';
 function mount({language,codeLanguage,topic,onTopic}){
  const host=document.getElementById('oop-guide');if(!host)return;host.hidden=!/^oop(?:-|$)/.test(topic);if(host.hidden){host.replaceChildren();previousTopic='';return;}
  const locale=Object.keys(data).find(key=>key===language)||'en',strings=data[locale];
  const m=key=>window.MemoryLabI18n.t(locale,key), t=key=>window.CourseLabI18n.t(locale,key);
  const oldOpen=host.querySelector('#oop-workshop')?.open;
  if(previousTopic!==topic){selected=topic==='oop-6'?'overriding':topic==='oop-protected'?'protected':'single';position=-1;}
  previousTopic=topic;
  host.replaceChildren();const heading=el('h3',strings.title);heading.id='oop-guide-title';host.setAttribute('aria-labelledby',heading.id);host.append(heading,el('p',strings.intro,'oop-intro'));
  const foundations=el('details',undefined,'oop-foundations');foundations.open=['oop','oop-1','oop-4'].includes(topic);foundations.append(el('summary',strings.foundations),el('p',strings.foundationText));host.append(foundations);
  const nav=el('nav',undefined,'oop-pillars');nav.setAttribute('aria-label',strings.title);const active=activePillar(topic);
  for(const [i,[key,id]] of Object.entries(pillars).entries()){
   const link=el('a');link.href='visual-labs.html?lang='+encodeURIComponent(locale)+'&code='+encodeURIComponent(codeLanguage)+'&topic='+id;link.dataset.pillar=key;
   link.append(el('span',String(i+1).padStart(2,'0')),el('strong',strings[key]));if(key===active)link.setAttribute('aria-current','true');link.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();onTopic(id);document.querySelector(`[data-pillar="${key}"]`)?.focus({preventScroll:true});});nav.append(link);
  }host.append(nav);
  const article=el('article',undefined,'oop-article');article.dataset.pillarContent=active;article.append(el('h4',strings[active]));const content=strings.pillars[active];
  for(const key of ['meaning','why','example','mistake']){const section=el('div',undefined,'oop-'+key);section.append(el('h5',strings[key]),el('p',content[key]));article.append(section);}
  const check=el('section',undefined,'oop-check');check.append(el('h5',strings.question),el('p',content.question));const answer=el('details');answer.append(el('summary',strings.answer),el('p',content.answer));check.append(answer);article.append(check);host.append(article);
  const workshop=el('details',undefined,'oop-workshop');workshop.id='oop-workshop';workshop.open=oldOpen??false;workshop.append(el('summary',strings.workshop),el('p',strings.workshopNote));
  const label=el('label',strings.choose);label.htmlFor='oop-scenario';const select=el('select');select.id='oop-scenario';for(const id of Object.keys(examples)){const option=el('option',strings.workshops[id].title);option.value=id;select.append(option);}select.value=selected;workshop.append(label,select);
  const stage=el('div',undefined,'oop-workshop-stage');workshop.append(stage);host.append(workshop);
  function render(){
   const example=examples[selected],words=strings.workshops[selected];stage.replaceChildren(el('h4',words.title),el('p',words.explanation));
   const state=position>=0?example.trace[position]:null,diagram=el('div',undefined,'oop-diagram');diagram.setAttribute('aria-hidden','true');const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 600 390');svg.setAttribute('preserveAspectRatio','none');const defs=document.createElementNS(ns,'defs'),marker=document.createElementNS(ns,'marker');marker.id='oop-arrow';for(const [key,val] of Object.entries({viewBox:'0 0 10 10',refX:'9',refY:'5',markerWidth:'5',markerHeight:'5',orient:'auto'}))marker.setAttribute(key,val);const path=document.createElementNS(ns,'path');path.setAttribute('d','M 0 0 L 10 5 L 0 10 z');path.setAttribute('fill','#5376ab');marker.append(path);defs.append(marker);svg.append(defs);
   const points=example.positions.map(([x,y])=>[30+x*195,20+y*130]);
   for(const [from,to] of example.edges){const [x1,y1]=points[from],[x2,y2]=points[to],line=document.createElementNS(ns,'line');for(const [key,val] of Object.entries({x1:x1+75,y1:y1,x2:x2+75,y2:y2+76}))line.setAttribute(key,String(val));line.setAttribute('marker-end','url(#oop-arrow)');svg.append(line);}
   diagram.append(svg);example.nodes.forEach((name,i)=>{const [x,y]=points[i],card=el('div',name,'oop-class');card.classList.toggle('is-active',!!state?.active.includes(i));card.style.left=(x/6)+'%';card.style.top=(y/3.9)+'%';if(state?.active.includes(i)){const mark=el('span','●');mark.setAttribute('aria-hidden','true');card.append(mark);}diagram.append(card);});stage.append(diagram);
   const relation=el('details',undefined,'oop-relations');relation.append(el('summary',t('state')));const list=el('ul');for(const [i,name] of example.nodes.entries())list.append(el('li',name+(state?.active.includes(i)?' · '+t('active'):'')));for(const [from,to] of example.edges){const item=el('li',example.nodes[from]+' → '+example.nodes[to]);item.dir='ltr';list.append(item);}relation.append(list);stage.append(relation);
   const status=el('div',undefined,'oop-trace');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.append(el('strong',m('step')+' '+(position+1)+' / '+example.trace.length));const expression=el('code',state?.code||strings.trace);expression.dir=state?'ltr':'auto';status.append(expression);stage.append(status);
   const controls=el('div',undefined,'oop-controls');for(const [id,key,fn,disabled] of [['oop-prev','previous',()=>position--,position<0],['oop-next','next',()=>position++,position===example.trace.length-1],['oop-reset','restart',()=>position=-1,position<0]]){const b=el('button',m(key));b.id=id;b.type='button';b.disabled=disabled;b.addEventListener('click',()=>{fn();render();const replacement=document.getElementById(id);if(replacement&&!replacement.disabled)replacement.focus({preventScroll:true});else (position<0?document.getElementById('oop-next'):document.getElementById('oop-reset'))?.focus({preventScroll:true});});controls.append(b);}stage.append(controls);
   const codeHeading=el('h5',m('source')+' · C++17'),code=el('pre');code.id='oop-code';code.dir='ltr';code.tabIndex=0;for(const line of example.code.split('\n')){const span=el('span',line||' ');if(state&&line.includes(state.code)&&!line.trimStart().startsWith('//'))span.className='oop-related';code.append(span);}stage.append(codeHeading,code);
   const download=el('button',m('download')+' · '+selected+'.cpp');download.type='button';download.id='oop-download';download.onclick=()=>{const url=URL.createObjectURL(new Blob([example.code],{type:'text/plain;charset=utf-8'})),a=el('a');a.href=url;a.download=selected+'.cpp';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);};stage.append(download);
   const output=el('pre',state?.output||m('noOutput'));output.id='oop-output';output.dir='ltr';stage.append(el('h5',m('output')),output);
  }
  select.onchange=()=>{selected=Object.keys(examples).find(key=>key===select.value)||'single';position=-1;render();};render();
  const sources=el('details',undefined,'oop-sources');sources.append(el('summary',strings.further));const links=[['PΛWΛN · The Four Pillars of C++ OOP','https://medium.com/@pawan2505/the-four-pillars-of-c-object-oriented-programming-oop-9435cf2844c8'],['C++ working draft · virtual functions','https://eel.is/c++draft/class.virtual'],['C++ working draft · multiple base classes','https://eel.is/c++draft/class.mi'],['C++ working draft · access control','https://eel.is/c++draft/class.access']];for(const [name,url] of links){const p=el('p'),a=el('a',name);a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.lang='en';p.append(a);sources.append(p);}host.append(sources);
 }
 window.OOPGuide={mount};
})();
