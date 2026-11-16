'use strict';
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./course-labs-content.js'));else root.CourseLabs=factory(root.CourseLabContent);})(typeof window==='undefined'?globalThis:window,C=>{
 const languages=['c','cpp','python','java','javascript','csharp'];
 const family=id=>id.startsWith('ds-')?'structures':id.startsWith('arrays')?'arrays':id.startsWith('functions')?'functions':id.startsWith('pointers')?'references':id.startsWith('oop')?'objects':id.startsWith('file-')?'files':id.startsWith('exception-')?'errors':id.startsWith('unit-')?'tests':['iteration','counter','sentinel','jump','increment','loops'].includes(id)?'loops':['decisions','relational','logic','truth','flowchart','selection','switch','ai','embedded'].includes(id)?'decisions':['formatting','escapes','formats','hello','run','io'].includes(id)?'io':'values';
 function build(id,language='python',sources){
  if(!C.ids.includes(id)||!languages.includes(language))throw new RangeError('Unknown topic or language');
  const code=(C.extra[id]||sources?.[id])?.[language];if(!code)throw new Error('Missing canonical source: '+id+'/'+language);
  let nodes=[],edges=[],focus=[],layout='grid';const states=[];
  const node=(name,value,status='live')=>({id:name,value:String(value),status});
  const set=(name,value,status='live')=>{const i=nodes.findIndex(n=>n.id===name);if(i<0)nodes.push(node(name,value,status));else nodes[i]=node(name,value,status);};
  const step=(action,detail='',anchor='',active=[])=>{const lines=code.split('\n');const line=anchor?lines.findIndex(s=>!/^\s*(\/\/|#(?!include)|\*)/.test(s)&&s.includes(anchor)):-1;states.push({action,detail,line:line<0?null:line,nodes:nodes.map(n=>({...n})),edges:edges.map(e=>[...e]),focus:[...active],layout});};
  const put=(name,value,action='assign',anchor=name)=>{set(name,value);step(action,`${name} = ${value}`,anchor,[name]);};
  const arr=(name,values)=>{nodes=values.map((v,i)=>node(`${name}[${i}]`,v));layout='row';};
  const arrayStep=(values,detail,action='create',anchor='values')=>{arr('values',values);step(action,detail,anchor);};
  const compare=(expr,result,anchor='if')=>{set(expr,result);step('compare',`${expr} → ${result}`,anchor,[expr]);};
  const call=(name,anchor=name)=>{set(name,'…');layout='stack';step('call',name,anchor,[name]);};
  const ret=(name,value,anchor='return')=>{set(name,value);step('return',`${name} → ${value}`,anchor,[name]);nodes=nodes.filter(n=>n.id!==name);};
  const leave=(name,anchor=name)=>{step('returnControl',name,anchor,[name]);nodes=nodes.filter(n=>n.id!==name);};
  step('ready');
  switch(id){
   case 'computers':put('number',6,'input');put('number * number',36,'calculate','number * number');break;
   case 'libraries':put('value',81);call('sqrt(81)','sqrt');ret('sqrt(81)',9,'sqrt');put('root',9,'assign');break;
   case 'ai':for(const temp of [12,20]){put('temperature',temp,'input');compare(`${temp} < 15`,temp<15);put('label',temp<15?'cold':'warm','branch','label');}break;
   case 'embedded':put('temperature',32,'input');compare('temperature >= 30',true,'30');put('fan','ON','branch','ON');break;
   case 'bigdata':arr('readings',[12,15,11,18]);step('create','readings = [12,15,11,18]','readings');let sum=0;[12,15,11,18].forEach((v,i)=>{sum+=v;put('total',sum,'calculate','total');});put('count',4);put('average',14,'calculate','average');break;
   case 'run':put('output[0]','CodeViz','emit','CodeViz');put('output[1]','Program ready','emit','Program ready');break;
   case 'hello':put('name','Ada');put('output','Hello, Ada!','format','Hello');break;
   case 'formatting':case 'formats':put('price',12.5);put('display','12.50','format','Price');break;
   case 'escapes':put('source','Hello\\nCodeViz\\n','format','Hello');nodes=[node('line[0]','Hello'),node('line[1]','CodeViz')];layout='stack';step('format','\\n → line[0], line[1]','Hello');break;
   case 'types':put('age',20);put('grade','A');step('types','age=20; grade=A','grade');break;
   case 'variables':put('first',3);put('second',8);put('temporary',3);put('first',8);put('second',3);break;
   case 'memory':put('score',10);put('score',15);break;
   case 'io':put('stdin',5,'input','number');put('number',5);put('number * 2',10,'calculate','number * 2');break;
   case 'decisions':put('score',72);compare('score >= 60',true,'60');put('result','pass','branch','pass');break;
   case 'arithmetic':put('width',4);put('height',7);put('width * height',28,'calculate','width * height');put('2 * (width + height)',22,'calculate','width + height');break;
   case 'precedence':put('4 * 2',8,'calculate','3 + 4');put('3 + 8',11,'calculate','3 + 4');nodes=[];put('3 + 4',7,'calculate','(3 + 4)');put('7 * 2',14,'calculate','(3 + 4)');break;
   case 'relational':put('first',7);put('second',5);compare('7 == 5',false,'==');compare('7 > 5',true,'>');break;
   case 'logic':put('year',2024);compare('2024 % 4 == 0',true,'2024');compare('2024 % 100 != 0',true,'100');put('leap',true,'branch','400');break;
   case 'truth':for(const a of [false,true])for(const b of [false,true]){nodes=[node('first',a),node('second',b)];put('AND',a&&b,'compare','first');}break;
   case 'algorithm':arr('values',[8,3,11,2,6]);put('smallest',8);for(const v of [3,11,2,6]){const min=Number(nodes.find(n=>n.id==='smallest').value);compare(`${v} < ${min}`,v<min);if(v<min)put('smallest',v);}break;
   case 'pseudocode':put('total',0);for(const v of [2,6,12])put('total',v,'calculate','total +=');break;
   case 'flowchart':layout='flow';put('number',9);compare('9 % 2 != 0',true,'% 2');put('result','odd','branch','odd');edges=[['number','9 % 2 != 0'],['9 % 2 != 0','result']];step('branch','9 → odd','odd',['result']);break;
   case 'selection':put('score',85);compare('score >= 90',false,'90');compare('score >= 80',true,'80');put('grade','B','branch','grade');break;
   case 'switch':put('choice',2);compare('choice == 1',false,'1');compare('choice == 2',true,'2');put('operation','Save','branch','Save');break;
   case 'assignment':put('balance',10);put('balance',15,'calculate','+=');break;
   case 'iteration':for(let i=1;i<=5;i++)put('number',i,'iterate','for');break;
   case 'counter':put('count',0);put('total',0);for(let i=1;i<=10;i++){set('number',i);set('count',i);set('total',i*(i+1)/2);step('iterate',`number=${i}; count=${i}; total=${i*(i+1)/2}`,'for',['number','total']);}break;
   case 'sentinel':arr('values',[3,4,0]);put('total',0);put('total',3,'calculate','total');put('total',7,'calculate','total');compare('value == 0',true,'== 0');step('stop','0','break');break;
   case 'jump':for(let i=1;i<=11;i++){put('number',i,'iterate','for');if(i===11){step('stop','number > 10','break');break;}if(i%3===0)step('skip',`number=${i}`,'continue');else set('output',(nodes.find(n=>n.id==='output')?.value||'')+' '+i);}break;
   case 'increment':put('counter',4);for(let n=5;n<=7;n++)put('counter',n,'calculate','counter');break;
   case 'loops':put('factorial',1);let product=1;for(let n=5;n>=1;n--){set('factor',n);product*=n;put('factorial',product,'iterate','factorial');}break;
   case 'arrays':arr('values',[4,8,2,10]);step('create','values = [4,8,2,10]','values');let total=0,max=4;for(const v of [4,8,2,10]){total+=v;max=Math.max(max,v);set('maximum',max);put('total',total,'iterate','total');}put('average',6,'calculate','Average');break;
   case 'arrays-simulation':case 'arrays-tutorial':arr('readings',[4,8,12,16,20]);step('create','readings = [4,8,12,16,20]','readings');if(id.endsWith('simulation'))put('readings[2]',99,'assign','[2]');let tally=0;for(let i=0;i<5;i++){tally+=Number(nodes.find(n=>n.id===`readings[${i}]`).value);if(id.endsWith('tutorial'))set('total',tally);step('visit',`index = ${i}`,'for',[`readings[${i}]`]);}break;
   case 'arrays-practice':for(const requested of [12,7]){arr('values',[4,8,12,16,20]);set('requested',requested);step('input',`requested=${requested}`,'requested');for(let i=0;i<5;i++){step('visit',`values[${i}] == ${requested}`,'for',[`values[${i}]`]);if([4,8,12,16,20][i]===requested){put('index',i,'return','return');break;}}if(requested===7)put('index',-1,'return','return');}break;
   case 'functions':call('average(8,12)','average');put('a',8);put('b',12);ret('average(8,12)',10);break;
   case 'functions-1':call('greet(Ada)','greet');put('name','Ada');put('output','Hello, Ada!','emit','Hello');leave('greet(Ada)','greet');break;
   case 'functions-2':step('define','add(a,b)','add');call('add(3,4)','add');put('a + b',7,'calculate','a + b');ret('add(3,4)',7);break;
   case 'functions-3':call('first()','first');call('second()','second');put('output','Second returns','emit','Second returns');leave('second()','second');put('output','First returns','emit','First returns');leave('first()','first');break;
   case 'functions-4':put('score',20);call('update(score)','update');put('score',100,'mutate','100');leave('update(score)','update');break;
   case 'functions-5':nodes=Array.from({length:6},(_,i)=>node(String(i+1),'?'));step('random','1 ≤ roll ≤ 6','roll');break;
   case 'functions-6':case 'functions-7':put(id.endsWith('6')?'long_lived':'outer.value',10);call('show()','show');put('local.value',5,'assign','5');put('output',5,'emit','Local');leave('show()','show');nodes=nodes.filter(n=>n.id!=='local.value');step('scope','local.value → ∅','show');break;
   case 'functions-8':for(let n=5;n>=1;n--)call(`factorial(${n})`,'factorial');step('base','n <= 1 → 1','return 1',['factorial(1)']);let factorial=1;for(let n=1;n<=5;n++){factorial*=n;ret(`factorial(${n})`,factorial);}put('result',120);break;
   default:detailModel();
  }
  function detailModel(){
   if(id.startsWith('pointers')){
    const raw=['c','cpp'].includes(language);
    if(['pointers','pointers-practice'].includes(id)){put('a',3);put('b',8);call('swap(a,b)','swap');set('a',8);set('b',3);step('mutate','a=8; b=3','swap',['a','b']);ret('swap(a,b)',true);if(id==='pointers-practice'){nodes=[node('x',5),node('y',5)];step('test','5 ↔ 5','5');step('guard',raw?'NULL':'null / None','swap');}return;}
    if(id==='pointers-simulation'){put('first',10);put('second',20);set('reference','first');edges=[['reference','first']];step('connect','reference → first','first',['reference','first']);set('reference','second');edges=[['reference','second']];step('connect','reference → second','second',['reference','second']);put('second',99,'mutate','99');return;}
    if(id==='pointers-4'||id==='pointers-5'){arr('values',id==='pointers-4'?[10,20,30]:language==='c'?['?','?','?']:[0,0,0]);step('create','values[0..2]','values');for(let i=0;i<3;i++){if(id==='pointers-5')put(`values[${i}]`,(i+1)*10,'assign','values');else step('visit',`values[${i}]`,'for',[`values[${i}]`]);}if(id==='pointers-5'){put('sum',60,'calculate','Sum');if(['c','cpp'].includes(language)){nodes=nodes.map(n=>n.id.startsWith('values')?{...n,status:'ended'}:n);step(language==='c'?'release':'cleanup','values',language==='c'?'free':'make_unique');}}return;}
    put('value',10);set('reference','value');edges=[['reference','value']];step('connect','reference → value','reference',['reference','value']);if(id==='pointers-2'){put('empty','∅');step('guard','empty → ∅','empty');}else{if(id==='pointers-3')call('update(value)','update');put('value',id==='pointers-3'?30:25,'mutate',id==='pointers-3'?'30':'25');if(id==='pointers-3')leave('update(value)','update');}return;
   }
   if(id.startsWith('oop')){
    layout='objects';
    if(id==='oop-1'){put('first.title','Dune','construct','Dune');put('second.title','Solaris','construct','Solaris');return;}
    if(id==='oop-2'){call('start()','start');call('_prepare()','prepare');leave('_prepare()','prepare');put('output','Started','emit','Started');leave('start()','start');return;}
    if(id==='oop-4'){call('Person(Ada)','Person');put('person.name','Ada','construct','Ada');return;}
    if(id==='oop-5'){nodes=[node('Animal','name'),node('Dog','Milo')];edges=[['Animal','Dog']];step(language==='c'?'compose':'inherit','Animal → Dog','Dog',['Dog']);return;}
    if(id==='oop-6'){nodes=[node('Dog','speak()'),node('Cat','speak()')];step('dispatch','Dog.speak() → Woof','speak',['Dog']);put('Dog','Woof','dispatch','Woof');step('dispatch','Cat.speak() → Meow','speak',['Cat']);put('Cat','Meow','dispatch','Meow');return;}
    if(id==='oop-protected'){nodes=[node('Base','score=42'),node('Derived','read_score()')];edges=[['Base','Derived']];step(language==='c'?'compose':'inherit','Base → Derived','42');step('access','score → 42','42',['Base']);return;}
    if(id==='oop-7'){put('account.name','Ada','construct','Ada');put('account.balance',100);step('access','get_balance() → 100','balance');return;}
    put('first.balance',100,'construct','100');if(id==='oop-practice')put('second.balance',100,'construct','100');
    const amount=id==='oop-public'?0:25;compare(`amount > 0 (${amount})`,amount>0,'amount');if(amount>0)put('first.balance',125,'mutate','deposit');if(id==='oop-private'){compare('amount > 0 (-10)',false,'amount');step('guard','balance = 125','deposit',['first.balance']);}step('access',`balance → ${amount>0?125:100}`,'balance',['first.balance']);return;
   }
   if(id.startsWith('file-handling')){
    layout='flow';const text=id==='file-handling'?'CodeViz notes':id==='file-handling-1'?'One line':['file-handling-2','file-handling-3'].includes(id)?'First line\nSecond line':id==='file-handling-4'?'Owned file contents':id==='file-handling-safety'?'Safe read':'Remember to practice.';
    if(id.endsWith('safety')){put('missing file','∅','open','missing');step('handle','missing file','Missing');}
    put('file','open','open','save');put('file',text,'writeFile','save');put('handle','closed','close','close');put('text',text,'readFile','read');edges=[['file','text']];step('readFile','file → text','read',['file','text']);if(id.endsWith('practice')||id.endsWith('-1')||id.endsWith('-2'))step('test','text == expected','text',['text']);set('file',text,'ended');step('cleanup','file','remove',['file']);return;
   }
   if(id.startsWith('exception-handling')){
    layout='flow';if(id.endsWith('-4')){for(const fail of [false,true]){nodes=[node('resource','open')];step('open',`fail=${fail}`,'resource');if(fail)step('error','fail=true','fail');set('resource','closed','ended');step('cleanup',`fail=${fail} → closed`,'closed',['resource']);}return;}
    if(id.endsWith('practice')){put('text','42','input','42');put('value',42,'calculate','42');}
    put(id.endsWith('-2')?'age':'text',id.endsWith('-2')?-4:'not-a-number','input',id.endsWith('-2')?'-4':'not-a-number');if(id.endsWith('-2'))call('validate_age(-4)','age');step('error',language==='c'?'status ≠ success':'error → caller',id.endsWith('-2')?'age':'not-a-number');put('handler','handled','handle','handled');if(id.endsWith('-3'))put('program','continues','resume','continues');return;
   }
   if(id.startsWith('unit-testing')){
    layout='row';
    if(id==='unit-testing-4'){put('stub_response','ready','stub','ready');put('service_status','OK','calculate','OK');step('test','actual == OK','OK');return;}
    let cases=id==='unit-testing'?[[4,true,true],[5,false,false],[0,true,true]]:id==='unit-testing-2'?[[ '3 + 4',7,7]]:id==='unit-testing-3'?[[6,12,12],[0,0,0],[-3,-6,-6]]:id==='unit-testing-5'?[[6,12,12],[0,0,0],[0,0,0],[6,12,12]]:id==='unit-testing-practice'?[[6,12,13],[6,12,12]]:[[6,12,12]];
    for(const [input,actual,expected] of cases){nodes=[node('input',input),node('expected',expected)];step('arrange',`input=${input}; expected=${expected}`,'expected');put('actual',actual,'act','double');step('test',`${actual} == ${expected} → ${actual===expected}`,id==='unit-testing'?'is_even':'assert',['expected','actual']);put('result',actual===expected?'PASS':'FAIL','assert','assert');}return;
   }
   if(id.startsWith('ds-')){
    if(id==='ds-array'){arr('numbers',[10,20,30,40]);step('create','numbers = [10,20,30,40]','numbers');step('visit','numbers[2] = 30','[2]',['numbers[2]']);arr('numbers',[5,10,20,30,40]);step('insert','insert(0,5)','insert',['numbers[0]']);return;}
    if(id==='ds-linked-list'){nodes=[node('node0',10),node('node1',20),node('node2',30)];edges=[['node0','node1'],['node1','node2']];layout='row';step('connect','head → 10 → 20 → 30','Node');if(language==='c'){nodes.push(node('node3',40));edges.push(['node2','node3']);step('connect','30 → 40','fourth',['node2','node3']);}for(let i=0;i<nodes.length;i++)step('visit',String((i+1)*10),'node',[`node${i}`]);return;}
    if(id==='ds-stack'){layout='stack';nodes=[node('0',10),node('1',20),node('2',30)];step('create','[10,20,30]','stack');for(const v of [40,50]){nodes.push(node(String(nodes.length),v));step('push',String(v),'push',[String(nodes.length-1)]);}for(const v of [50,40]){step('pop',String(v),'pop',[String(nodes.length-1)]);nodes.pop();step('after',`pop() → ${v}`,'pop');}return;}
    if(id==='ds-queue'){arr('queue',[10,20,30]);step('create','[10,20,30]','queue');arr('queue',[10,20,30,40]);step('enqueue','40','40',['queue[3]']);for(let i=0;i<(language==='python'?1:4);i++){arr('queue',[10,20,30,40].slice(i+1));step('dequeue',String([10,20,30,40][i]),'queue');}return;}
    if(id==='ds-tree'){layout='tree';nodes=['Kursus','Python','Robot','intro.py','agent.py','sensor.py'].map(n=>node(n,''));edges=[['Kursus','Python'],['Kursus','Robot'],['Python','intro.py'],['Python','agent.py'],['Robot','sensor.py']];for(const n of ['Kursus','Python','intro.py','agent.py','Robot','sensor.py'])step('visit',n,'visit',[n]);return;}
    if(id==='ds-graph'){layout='graph';nodes=['A','B','C','D','E'].map(n=>node(n,''));edges=[['A','B'],['A','C'],['B','D'],['C','D'],['C','E'],['D','E']];const seen=['A'];let queue=['A'];for(const n of ['A','B','C','D','E']){queue.shift();for(const neighbor of {A:['B','C'],B:['A','D'],C:['A','D','E'],D:['B','C','E'],E:['C','D']}[n])if(!seen.includes(neighbor)){seen.push(neighbor);queue.push(neighbor);}step('bfs',`${n}; queue=[${queue.join(',')}]`,'node',[n]);}return;}
    if(id==='ds-hash'){if(language==='python'){nodes=[node('name','Ali'),node('age',22),node('city','Roskilde')];step('create','{name:Ali, age:22, city:Roskilde}','student');step('lookup','name → Ali','name',['name']);put('age',23,'assign','23');}else{put('Bo',24);put('Ada',25);if(language==='c'){set('bucket[2]','Ada → Bo');edges=[['bucket[2]','Ada'],['Ada','Bo']];step('collision','hash(Bo)=hash(Ada)=2','hash',['bucket[2]']);step('lookup','Ada=25; Bo=24','buckets',['Ada','Bo']);}else{put('Bo',26,'assign','26');step('lookup','Bo=26; Ada=25','Bo',['Bo','Ada']);}}return;}
   }
   throw new Error('Missing model for '+id);
  }
  step('done');
  return {id,language,family:family(id),code,states,expected:C.outputs[id]?.[language]??null,stdin:C.stdin[id]||''};
 }
 return {build,family,languages};
});
