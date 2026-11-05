const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
function dom(){
 const nodes=[];
 class Element {
  constructor(tag){this.tagName=tag;this.children=[];this.events={};this.dataset={};this.textContent='';nodes.push(this);}
  append(...items){this.children.push(...items);}
  setAttribute(k,v){this[k]=v;}
  addEventListener(k,fn){this.events[k]=fn;}
  querySelectorAll(){return [];}
  focus(){this.focused=true;}
  showModal(){this.open=true;}
  close(){this.open=false;this.events.close?.();}
  remove(){this.removed=true;}
 }
 const document={createElement:tag=>new Element(tag),body:new Element('body'),head:new Element('head'),activeElement:new Element('button')};
 return {document,nodes,Element};
}
test('opening runner keeps example and stdin local; external navigation contains neither',async()=>{
 const {document,nodes}=dom();let copied=null;
 const context={document,navigator:{clipboard:{writeText:async s=>{copied=s;}}},window:{ModuleOne:{ui:(_,k)=>k}}};
 vm.runInNewContext(fs.readFileSync('code-runner.js','utf8'),context);
 const source='<img src=https://example.invalid/leak>secret sample';
 context.window.CodeRunner.open({language:'en',codeLanguage:'python',filename:'example.py',code:source,stdin:'private input',label:'Python'});
 assert.equal(nodes.filter(n=>['iframe','script'].includes(n.tagName)).length,0);
 assert.equal(document.head.children.length,0);
 const external=nodes.find(n=>n.dataset.runnerExternal!==undefined);
 assert.equal(external.href,'https://onecompiler.com/python');
 assert.equal(external.rel,'noopener noreferrer');
 assert.equal(external.target,'_blank');
 assert.equal(nodes.find(n=>n.tagName==='code').textContent,source);
 assert.equal(nodes.some(n=>n.innerHTML),false);
 await nodes.find(n=>n.dataset.runnerCopy!==undefined).events.click();
 assert.equal(copied,source);
 assert.equal(nodes.find(n=>n.tagName==='dialog').open,true);
 nodes.find(n=>n.dataset.runnerClose!==undefined).events.click();
 assert.equal(nodes.find(n=>n.tagName==='dialog').removed,true);
 assert.equal(document.activeElement.focused,true);
});
test('loop tutor does not connect to Turnstile until an explicit verification click',()=>{
 const {document,nodes,Element}=dom();
 const ids={};for(const id of ['ai-tutor-panel','ai-tutor-status','ai-tutor-answer','ai-tutor-form','ai-tutor-question','ai-tutor-preview-controls','ai-tutor-preview-key','ai-tutor-beta-note'])ids[id]=new Element('div');
 document.getElementById=id=>ids[id];document.querySelector=()=>new Element('div');
 const window={LEARNCODE_AI_TUTOR:{enabled:true,apiUrl:'https://example.invalid/api/tutor',turnstileSiteKey:'public-site-key'},location:{search:''}};
 vm.runInNewContext(fs.readFileSync('ai-tutor.js','utf8'),{document,window,URL,URLSearchParams});
 assert.equal(document.head.children.length,0);
 const start=nodes.find(n=>n.id==='ai-tutor-start-verification');assert.ok(start);
 start.events.click();
 assert.equal(document.head.children.length,1);
 assert.match(document.head.children[0].src,/^https:\/\/challenges\.cloudflare\.com\//);
 assert.equal(start.disabled,true);
});
