'use strict';
(()=>{
 const data=window.OOPGuideData,examples=window.OOPWorkshop;
 const pillars={encapsulation:'oop-3',abstraction:'oop-2',inheritance:'oop-5',polymorphism:'oop-6'};
 let previousTopic='',selected='single',position=-1,timer=null,playing=false,delay=1600,objectId=7;
 const stop=()=>{clearTimeout(timer);timer=null;playing=false;};
 let pauseView=()=>{};
 document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseView();});
 window.addEventListener('pagehide',stop);
 const labels={
 en:['Playback speed','Active class','Related code','Output','Predict the next active class','Check prediction','Correct','Try again','Object ID (0–999)','Apply','Change the ID, then replay to see the new value.','Enter a whole number from 0 to 999.'],
 da:['Afspilningshastighed','Aktiv klasse','Tilhørende kode','Output','Forudsig den næste aktive klasse','Tjek dit svar','Korrekt','Prøv igen','Objekt-ID (0–999)','Anvend','Skift ID, og afspil igen for at se den nye værdi.','Indtast et heltal fra 0 til 999.'],
 es:['Velocidad','Clase activa','Código relacionado','Salida','Predice la siguiente clase activa','Comprobar','Correcto','Inténtalo de nuevo','ID del objeto (0–999)','Aplicar','Cambia el ID y reproduce para ver el nuevo valor.','Introduce un entero entre 0 y 999.'],
 fr:['Vitesse de lecture','Classe active','Code associé','Sortie','Prédisez la prochaine classe active','Vérifier','Correct','Réessayez','Identifiant (0–999)','Appliquer','Modifiez l’identifiant puis relancez pour voir la nouvelle valeur.','Saisissez un entier de 0 à 999.'],
 de:['Abspielgeschwindigkeit','Aktive Klasse','Zugehöriger Code','Ausgabe','Welche Klasse ist als Nächstes aktiv?','Prüfen','Richtig','Erneut versuchen','Objekt-ID (0–999)','Anwenden','Ändere die ID und starte erneut, um den neuen Wert zu sehen.','Gib eine ganze Zahl von 0 bis 999 ein.'],
 pt:['Velocidade','Classe ativa','Código relacionado','Saída','Preveja a próxima classe ativa','Verificar','Correto','Tente novamente','ID do objeto (0–999)','Aplicar','Altere o ID e reproduza para ver o novo valor.','Digite um inteiro de 0 a 999.'],
 ar:['سرعة التشغيل','الفئة النشطة','الكود المرتبط','المخرجات','توقع الفئة النشطة التالية','تحقق من الإجابة','صحيح','حاول مرة أخرى','معرّف الكائن (0–999)','تطبيق','غيّر المعرّف ثم أعد التشغيل لرؤية القيمة الجديدة.','أدخل عدداً صحيحاً من 0 إلى 999.'],
 ur:['چلانے کی رفتار','فعال کلاس','متعلقہ کوڈ','آؤٹ پٹ','اگلی فعال کلاس کا اندازہ لگائیں','جواب جانچیں','درست','دوبارہ کوشش کریں','آبجیکٹ کی شناخت (0–999)','لاگو کریں','شناخت تبدیل کریں، پھر نئی قدر دیکھنے کے لیے دوبارہ چلائیں۔','0 سے 999 تک صحیح عدد درج کریں۔'],
 hi:['प्लेबैक गति','सक्रिय क्लास','संबंधित कोड','आउटपुट','अगली सक्रिय क्लास का अनुमान लगाएँ','उत्तर जाँचें','सही','फिर प्रयास करें','ऑब्जेक्ट ID (0–999)','लागू करें','ID बदलें और नया मान देखने के लिए फिर चलाएँ।','0 से 999 तक पूर्णांक दर्ज करें।'],
 zh:['播放速度','活动类','相关代码','输出','预测下一个活动类','检查答案','正确','再试一次','对象 ID（0–999）','应用','更改 ID，然后重新播放以查看新值。','请输入 0 到 999 之间的整数。']
 };
 function currentExample(){
  if(selected!=='single'||objectId===7)return examples[selected];
  const base=examples.single,old='Sensor sensor(7);',code='Sensor sensor('+objectId+');';
  return {...base,code:base.code.replace(old,code),output:objectId+'\n42\n',trace:base.trace.map(step=>({...step,code:step.code.replace(old,code),output:step.output.replace(/^7\n/,objectId+'\n')}))};
 }
 const el=(tag,text,className)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;};
 const activePillar=topic=>topic==='oop-2'?'abstraction':['oop-5','oop-protected'].includes(topic)?'inheritance':topic==='oop-6'?'polymorphism':'encapsulation';
 function mount({language,codeLanguage,topic,onTopic}){
  stop();
  const host=document.getElementById('oop-guide');if(!host)return;host.hidden=!/^oop(?:-|$)/.test(topic);if(host.hidden){host.replaceChildren();previousTopic='';return;}
  const locale=Object.keys(data).find(key=>key===language)||'en',strings=data[locale],ui=labels[locale]||labels.en;
  const m=key=>window.MemoryLabI18n.t(locale,key), t=key=>window.CourseLabI18n.t(locale,key);
  const names={c:['prepare()','start()','getBalance(&first)','deposit(&first, 25)','deposit(&first, -10)'],cpp:['prepare()','start()','getBalance()','deposit(25)','deposit(-10)'],python:['_prepare()','start()','get_balance()','deposit(25)','deposit(-10)'],java:['prepare()','start()','getBalance()','deposit(25)','deposit(-10)'],javascript:['#prepare()','start()','getBalance()','deposit(25)','deposit(-10)'],csharp:['Prepare()','Start()','GetBalance()','Deposit(25)','Deposit(-10)']}[codeLanguage]||[];
  const lessonText=text=>['_prepare()','start()','get_balance()','deposit(25)','deposit(-10)'].reduce((result,name,i)=>result.replaceAll(name,names[i]||name),text);
  const oldOpen=host.querySelector('#oop-workshop')?.open;
  if(previousTopic!==topic){selected=topic==='oop-6'?'overriding':topic==='oop-protected'?'protected':'single';position=-1;}
  previousTopic=topic;
  host.replaceChildren();const heading=el('h3',strings.title);heading.id='oop-guide-title';host.setAttribute('aria-labelledby',heading.id);host.append(heading,el('p',strings.intro,'oop-intro'));host.dataset.theme=activePillar(topic);
  const foundations=el('details',undefined,'oop-foundations');foundations.open=['oop','oop-1','oop-4'].includes(topic);foundations.append(el('summary',strings.foundations),el('p',strings.foundationText));host.append(foundations);
  const nav=el('nav',undefined,'oop-pillars');nav.setAttribute('aria-label',strings.title);const active=activePillar(topic);
  for(const [i,[key,id]] of Object.entries(pillars).entries()){
   const link=el('a');link.href='visual-labs.html?lang='+encodeURIComponent(locale)+'&code='+encodeURIComponent(codeLanguage)+'&topic='+id;link.dataset.pillar=key;
   link.append(el('span',String(i+1).padStart(2,'0')),el('strong',strings[key]));if(key===active)link.setAttribute('aria-current','true');link.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();onTopic(id);document.querySelector(`[data-pillar="${key}"]`)?.focus({preventScroll:true});});nav.append(link);
  }host.append(nav);
  const article=el('article',undefined,'oop-article');article.dataset.pillarContent=active;article.append(el('h4',strings[active]));const content=strings.pillars[active];
  for(const key of ['meaning','why','example','mistake']){const section=el('div',undefined,'oop-'+key);section.append(el('h5',strings[key]),el('p',lessonText(content[key])));article.append(section);}
  const check=el('section',undefined,'oop-check');check.append(el('h5',strings.question),el('p',lessonText(content.question)));const answer=el('details');answer.append(el('summary',strings.answer),el('p',lessonText(content.answer)));check.append(answer);article.append(check);host.append(article);
  const workshop=el('details',undefined,'oop-workshop');workshop.id='oop-workshop';workshop.open=oldOpen??false;workshop.append(el('summary',strings.workshop),el('p',strings.workshopNote));
  const label=el('label',strings.choose);label.htmlFor='oop-scenario';const select=el('select');select.id='oop-scenario';for(const id of Object.keys(examples)){const option=el('option',strings.workshops[id].title);option.value=id;select.append(option);}select.value=selected;workshop.append(label,select);
  const stage=el('div',undefined,'oop-workshop-stage');workshop.append(stage);host.append(workshop);
  pauseView=()=>{if(playing){stop();if(stage.isConnected)render();}};
  workshop.addEventListener('toggle',()=>{if(!workshop.open)pauseView();});
  function schedule(){clearTimeout(timer);if(playing)timer=setTimeout(()=>{if(!stage.isConnected||document.hidden||!workshop.open){stop();return;}position++;if(position>=currentExample().trace.length-1)stop();render();schedule();},delay);}
  function render(){
   const example=currentExample(),words=strings.workshops[selected];stage.replaceChildren(el('h4',words.title),el('p',words.explanation));
   const legend=el('div',undefined,'oop-legend');[1,2,3].forEach((key,i)=>legend.append(el('span',ui[key],'oop-key-'+i)));stage.append(legend);
   if(selected==='single'){
    const form=el('form',undefined,'oop-input');const label=el('label',ui[8]);label.htmlFor='oop-object-id';const input=el('input');input.id='oop-object-id';input.type='number';input.min='0';input.max='999';input.step='1';input.required=true;input.value=String(objectId);const apply=el('button',ui[9]);apply.type='submit';const hint=el('p',ui[10]);hint.id='oop-input-hint';input.setAttribute('aria-describedby',hint.id);form.append(label,input,apply,hint);form.onsubmit=event=>{event.preventDefault();const n=input.valueAsNumber;if(!Number.isInteger(n)||n<0||n>999){input.setCustomValidity(ui[11]);input.reportValidity();return;}stop();objectId=n;position=-1;render();document.getElementById('oop-object-id')?.focus({preventScroll:true});};input.oninput=()=>input.setCustomValidity('');stage.append(form);
   }
   const state=position>=0?example.trace[position]:null,diagram=el('div',undefined,'oop-diagram');diagram.setAttribute('aria-hidden','true');const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 600 390');svg.setAttribute('preserveAspectRatio','none');const defs=document.createElementNS(ns,'defs'),marker=document.createElementNS(ns,'marker');marker.id='oop-arrow';for(const [key,val] of Object.entries({viewBox:'0 0 10 10',refX:'9',refY:'5',markerWidth:'5',markerHeight:'5',orient:'auto'}))marker.setAttribute(key,val);const path=document.createElementNS(ns,'path');path.setAttribute('d','M 0 0 L 10 5 L 0 10 z');path.setAttribute('fill','#5376ab');marker.append(path);defs.append(marker);svg.append(defs);
   const points=example.positions.map(([x,y])=>[30+x*195,20+y*130]);
   for(const [from,to] of example.edges){const [x1,y1]=points[from],[x2,y2]=points[to],line=document.createElementNS(ns,'line');for(const [key,val] of Object.entries({x1:x1+75,y1:y1,x2:x2+75,y2:y2+76}))line.setAttribute(key,String(val));line.setAttribute('marker-end','url(#oop-arrow)');if(state?.active.includes(from)&&state?.active.includes(to))line.classList.add('is-active');svg.append(line);}
   diagram.append(svg);example.nodes.forEach((name,i)=>{const [x,y]=points[i],card=el('div',name,'oop-class');card.dataset.kind=example.edges.some(edge=>edge[0]===i)?'derived':'base';card.classList.toggle('is-active',!!state?.active.includes(i));card.style.left=(x/6)+'%';card.style.top=(y/3.9)+'%';if(state?.active.includes(i)){const mark=el('span','●');mark.setAttribute('aria-hidden','true');card.append(mark);}diagram.append(card);});stage.append(diagram);
   const relation=el('details',undefined,'oop-relations');relation.append(el('summary',t('state')));const list=el('ul');for(const [i,name] of example.nodes.entries())list.append(el('li',name+(state?.active.includes(i)?' · '+t('active'):'')));for(const [from,to] of example.edges){const item=el('li',example.nodes[from]+' → '+example.nodes[to]);item.dir='ltr';list.append(item);}relation.append(list);stage.append(relation);
   const status=el('div',undefined,'oop-trace');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.append(el('strong',m('step')+' '+(position+1)+' / '+example.trace.length));const expression=el('code',state?.code||strings.trace);expression.dir=state?'ltr':'auto';status.append(expression);stage.append(status);
   const progress=el('progress');progress.max=example.trace.length;progress.value=position+1;progress.setAttribute('aria-label',m('step'));progress.className='oop-progress';stage.append(progress);
   const controls=el('div',undefined,'oop-controls');for(const [id,key,fn,disabled] of [['oop-prev','previous',()=>position--,position<0],['oop-next','next',()=>position++,position===example.trace.length-1],['oop-reset','restart',()=>position=-1,position<0]]){const b=el('button',m(key));b.id=id;b.type='button';b.disabled=disabled;b.addEventListener('click',()=>{stop();fn();render();const replacement=document.getElementById(id);if(replacement&&!replacement.disabled)replacement.focus({preventScroll:true});else (position<0?document.getElementById('oop-next'):document.getElementById('oop-reset'))?.focus({preventScroll:true});});controls.append(b);}const play=el('button',m(playing?'pause':'play'));play.id='oop-play';play.type='button';play.setAttribute('aria-pressed',String(playing));play.onclick=()=>{if(playing)stop();else{if(position>=example.trace.length-1)position=-1;playing=true;}render();schedule();document.getElementById('oop-play')?.focus({preventScroll:true});};controls.prepend(play);
   const speedLabel=el('label',ui[0]);speedLabel.htmlFor='oop-speed';const speed=el('select');speed.id='oop-speed';for(const value of [0.5,1,2]){const option=el('option',value+'×');option.value=String(1600/value);speed.append(option);}speed.value=String(delay);speed.onchange=()=>{delay=Number(speed.value);schedule();};controls.append(speedLabel,speed);stage.append(controls);
   if(position<example.trace.length-1){const quiz=el('details',undefined,'oop-predict');quiz.append(el('summary',ui[4]));quiz.addEventListener('toggle',()=>{if(quiz.open&&playing){stop();play.textContent=m('play');play.setAttribute('aria-pressed','false');}});const choices=el('div');const feedback=el('p');feedback.setAttribute('role','status');for(const [i,name] of example.nodes.entries()){const choice=el('button',name);choice.type='button';choice.onclick=()=>{const correct=example.trace[position+1].active.includes(i);feedback.textContent=(correct?ui[6]:ui[7])+(correct?' · '+example.trace[position+1].code:'');feedback.className=correct?'oop-correct':'oop-retry';};choices.append(choice);}quiz.append(choices,feedback);stage.append(quiz);}

   const codeHeading=el('h5',m('source')+' · C++17'),code=el('pre');code.id='oop-code';code.dir='ltr';code.tabIndex=0;for(const line of example.code.split('\n')){const span=el('span',line||' ');if(state&&line.includes(state.code)&&!line.trimStart().startsWith('//'))span.className='oop-related';code.append(span);}stage.append(codeHeading,code);
   const download=el('button',m('download')+' · '+selected+'.cpp');download.type='button';download.id='oop-download';download.onclick=()=>{const url=URL.createObjectURL(new Blob([example.code],{type:'text/plain;charset=utf-8'})),a=el('a');a.href=url;a.download=selected+'.cpp';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);};stage.append(download);
   const output=el('pre',state?.output||m('noOutput'));output.id='oop-output';output.dir='ltr';stage.append(el('h5',m('output')),output);
  }
  select.onchange=()=>{stop();selected=Object.keys(examples).find(key=>key===select.value)||'single';position=-1;render();};render();
  const sources=el('details',undefined,'oop-sources');sources.append(el('summary',strings.further));const links=[['PΛWΛN · The Four Pillars of C++ OOP','https://medium.com/@pawan2505/the-four-pillars-of-c-object-oriented-programming-oop-9435cf2844c8'],['C++ working draft · virtual functions','https://eel.is/c++draft/class.virtual'],['C++ working draft · multiple base classes','https://eel.is/c++draft/class.mi'],['C++ working draft · access control','https://eel.is/c++draft/class.access']];for(const [name,url] of links){const p=el('p'),a=el('a',name);a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.lang='en';p.append(a);sources.append(p);}host.append(sources);
 }
 window.OOPGuide={mount};
})();
