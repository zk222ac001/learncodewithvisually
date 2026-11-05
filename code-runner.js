'use strict';
(() => {
const ORIGIN='https://onecompiler.com';
const LANGUAGES={c:'c',cpp:'cpp',python:'python',java:'java',javascript:'javascript',csharp:'csharp'};
let dialog,opener;
const element=(tag,text)=>{const node=document.createElement(tag);if(text)node.textContent=text;return node;};
window.CodeRunner={open({language,codeLanguage,filename,code,stdin='',label}){
 if(!Object.hasOwn(LANGUAGES,codeLanguage))return;
 if(dialog)dialog.close();
 opener=document.activeElement;
 const u=k=>window.ModuleOne.ui(language,k);
 const current=element('dialog');dialog=current;current.className='runner-dialog';current.id='code-runner';current.lang='en';current.setAttribute('aria-labelledby','runner-title');
 const heading=element('div');heading.className='runner-heading';
 const title=element('h2','Run example · '+label);title.id='runner-title';
 const close=element('button',u('close')+' ×');close.type='button';close.dataset.runnerClose='';close.autofocus=true;
 heading.append(title,close);
 const notice=element('p','This preview stays in your browser. Copy the code, then open OneCompiler in a new tab and paste it there. Opening the provider shares connection information; its cookies and privacy policy apply. Do not paste personal information, passwords or private student work.');
 const policy=element('a','OneCompiler privacy policy');policy.href=ORIGIN+'/privacy-policy';policy.target='_blank';policy.rel='noopener noreferrer';
 const controls=element('div');controls.className='controls';
 const status=element('p');status.dataset.runnerStatus='';status.setAttribute('role','status');
 const copy=element('button',u('copy'));copy.type='button';copy.dataset.runnerCopy='';
 copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(code);status.textContent='Code copied. Paste it only into an editor you choose.';}catch{status.textContent='Copy unavailable. Select and copy the code below.';}});
 const link=element('a','Open OneCompiler ↗');link.href=ORIGIN+'/'+LANGUAGES[codeLanguage];link.target='_blank';link.rel='noopener noreferrer';link.className='button';link.dataset.runnerExternal='';
 controls.append(copy,link);
 const pre=element('pre');pre.dir='ltr';pre.append(element('code',code));
 current.append(heading,notice,policy,controls,status,element('h3',filename||'Example code'),pre);
 if(stdin){const details=element('details');details.append(element('summary','Example input — copy separately if needed'),element('pre',stdin));current.append(details);}
 current.append(element('p','You can also use the lesson download button and run the example locally. No code is executed in this preview.'));
 const previousFocus=opener;
 close.addEventListener('click',()=>current.close());
 current.addEventListener('close',()=>{current.remove();if(dialog===current)dialog=null;previousFocus?.focus();},{once:true});
 document.body.append(current);current.showModal();
}};
})();
