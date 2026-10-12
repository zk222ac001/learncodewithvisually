/* Small, dependency-free Markdown subset rendered with safe DOM nodes.
   Never evaluate response HTML or attach model-generated URLs/handlers. */
(() => {
  'use strict';
  const keywords = new Set(('auto break case catch class const continue def delete do else enum except export extends false False finally float for from function if import in int interface lambda let long namespace new null None nullptr package pass private protected public raise return short static struct super switch this throw throws true True try typedef using var void volatile while yield async await default virtual override final template typename include printf print console System string bool double char size_t').split(' '));
  const tokenPattern = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b)/g;
  const inlinePattern = /\*\*([^*\n]+?)\*\*|\x60([^\x60\n]+)\x60/g;
  const fencePattern = /^\s*\x60{3}([a-zA-Z0-9+#._-]{0,30})\s*$/;
  const headingPattern = /^\s*(#{1,3})\s+(.+)$/;
  const listPattern = /^\s*(?:([-*])|(\d+)[.)])\s+(.+)$/;
  const doc = () => document;
  function node(tag, className, label) {
    const n=doc().createElement(tag);
    if(className)n.className=className;
    if(label!==undefined)n.textContent=label;
    return n;
  }
  function inline(parent,text) {
    inlinePattern.lastIndex=0;
    let last=0,match;
    while((match=inlinePattern.exec(text))!==null){
      if(match.index>last)parent.append(doc().createTextNode(text.slice(last,match.index)));
      const child=match[1]!==undefined?node('strong','',match[1]):node('code','general-ai-inline-code',match[2]);
      parent.append(child);last=inlinePattern.lastIndex;
    }
    if(last<text.length)parent.append(doc().createTextNode(text.slice(last)));
  }
  function highlighted(parent,code) {
    tokenPattern.lastIndex=0;let last=0,match;
    while((match=tokenPattern.exec(code))!==null){
      if(match.index>last)parent.append(doc().createTextNode(code.slice(last,match.index)));
      const word=match[0];
      let cls='';
      if(/^(?:["'])/.test(word))cls='string';
      else if(word.startsWith('//')||word.startsWith('#')||word.startsWith('/*'))cls='comment';
      else if(/^\d/.test(word))cls='number';
      else if(keywords.has(word))cls='keyword';
      if(cls)parent.append(node('span','general-ai-token-'+cls,word));
      else parent.append(doc().createTextNode(word));
      last=tokenPattern.lastIndex;
    }
    if(last<code.length)parent.append(doc().createTextNode(code.slice(last)));
  }
  function codeBlock(parent,contents,language) {
    const source=contents.join('\n');
    const wrap=node('div','general-ai-codeblock');
    const top=node('div','general-ai-codebar');
    const label=node('span','',language||'Code');
    const copy=node('button','general-ai-copy','Copy code');
    copy.type='button';copy.setAttribute('aria-label','Copy code');
    copy.addEventListener('click',async()=>{
      try{
        await navigator.clipboard.writeText(source);
        copy.textContent='Copied';
      }catch{copy.textContent='Copy unavailable';}
    });
    top.append(label,copy);
    const pre=node('pre');
    const code=node('code');
    code.setAttribute('data-language',(language||'code').slice(0,30));
    highlighted(code,source);
    pre.append(code);wrap.append(top,pre);parent.append(wrap);
  }
  const isBlockStart=line=>fencePattern.test(line)||headingPattern.test(line)||listPattern.test(line);
  function render(container,raw,{language=''}={}) {
    const text=String(raw||'').slice(0,4000);
    const lines=text.replace(/\r\n?/g,'\n').split('\n');
    const out=doc().createDocumentFragment();
    for(let i=0;i<lines.length;){
      let line=lines[i];
      if(!line.trim()){i++;continue;}
      const fence=line.match(fencePattern);
      if(fence){
        i++;const contents=[];
        while(i<lines.length&&!fencePattern.test(lines[i]))contents.push(lines[i++]);
        if(i<lines.length)i++;
        codeBlock(out,contents,fence[1]||language);continue;
      }
      const head=line.match(headingPattern);
      if(head){
        const h=node('h'+Math.min(4,head[1].length+2));
        inline(h,head[2]);out.append(h);i++;continue;
      }
      const list=line.match(listPattern);
      if(list){
        const ordered=Boolean(list[2]);const block=node(ordered?'ol':'ul');
        while(i<lines.length){
          const m=lines[i].match(listPattern);
          if(!m||Boolean(m[2])!==ordered)break;
          const item=node('li');inline(item,m[3]);block.append(item);i++;
        }
        out.append(block);continue;
      }
      const paragraph=[];
      while(i<lines.length && lines[i].trim() && (paragraph.length===0 || !isBlockStart(lines[i]))) paragraph.push(lines[i++].trim());
      const p=node('p');inline(p,paragraph.join(' '));out.append(p);
    }
    container.replaceChildren(out);
  }
  window.LearnCodeTutorMarkdown=Object.freeze({render});
})();