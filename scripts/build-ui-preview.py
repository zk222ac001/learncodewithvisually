from pathlib import Path
import re,json,base64
root=Path(__file__).resolve().parents[1]
def bundle(name):
 s=(root/name).read_text()
 def css(m):
  f=root/m.group(1).split('?')[0].lstrip('/')
  return '<style>'+f.read_text()+'</style>' if f.exists() else ''
 s=re.sub(r'<link rel="stylesheet" href="([^"]+)"\s*/?>',css,s)
 scripts=[]
 def js(m):
  f=root/m.group(1).split('?')[0].lstrip('/')
  code=f.read_text()
  if f.name=='ai-tutor-config.js':code=code.replace('enabled: true','enabled: false')
  scripts.append('<script>'+code.replace('</script','<\\/script')+'</script>')
  return ''
 s=re.sub(r'<script src="([^"]+)"[^>]*></script>',js,s)
 interception='''<script>
 document.addEventListener('click',event=>{
  const a=event.target.closest('a[href]');if(!a)return;
  const href=a.getAttribute('href');
  if(href.startsWith('#'))return;
  event.preventDefault();event.stopImmediatePropagation();
  if(href.includes('c-for-loop-visualization.html'))parent.postMessage({previewPage:'lesson'},'*');
  else if(href==='/'||href.startsWith('index.html')||href.startsWith('/index.html')){
   if(document.body.classList.contains('ux-lesson'))parent.postMessage({previewPage:'home'},'*');
   else location.hash=href.includes('#')?href.split('#')[1]:'home';
  }else alert('This two-screen design preview keeps you here. Use the repository branch to test the complete website.');
 },true);
 </script>'''
 ending='''<script>
 const panel=document.getElementById('ai-tutor-panel');
 if(panel){panel.hidden=false;panel.querySelectorAll('button,input,textarea').forEach(el=>el.disabled=true);document.getElementById('ai-tutor-status').textContent='AI replies are disabled in this offline design preview.';}
 if(window.CodeRunner)window.CodeRunner.open=()=>alert('The external code editor is disabled in this offline preview.');
 </script>'''
 s=s.replace('</body>',interception+''.join(scripts)+ending+'</body>')
 return base64.b64encode(s.encode()).decode()
parts={k:bundle(v) for k,v in {'home':'index.html','lesson':'c-for-loop-visualization.html'}.items()}
html='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CodeVizAI — UI review preview</title><style>*{box-sizing:border-box}body{margin:0;background:#e3e9f2;font:14px system-ui;color:#172c46}header{padding:12px 18px;background:#12243c;color:#fff;display:flex;align-items:center;gap:10px;flex-wrap:wrap}header strong{margin-right:12px}button{padding:9px 14px;border:1px solid #62758e;border-radius:7px;background:#203b5e;color:white;cursor:pointer}button[aria-pressed=true]{background:#fff;color:#172c46}p{margin:0;font-size:12px;opacity:.85}.frame-wrap{height:calc(100dvh - 106px);min-height:500px;display:flex;justify-content:center;padding:10px}iframe{height:100%;width:100%;border:0;background:white;box-shadow:0 8px 30px #10213520}footer{padding:0 18px 10px;font-size:12px}a{color:#1749a9}@media(max-width:700px){.frame-wrap{height:calc(100dvh - 160px);padding:4px}header{padding:10px}header strong{width:100%}}</style></head><body><header><strong>CodeVizAI · Design review</strong><button id="home" aria-pressed="true">Homepage</button><button id="lesson" aria-pressed="false">C loop lesson</button><button id="mobile" aria-pressed="false">Mobile width</button><p>Offline preview · AI replies disabled · live website unchanged</p></header><div class="frame-wrap"><iframe id="preview" title="Interactive design preview" sandbox="allow-scripts allow-same-origin allow-modals allow-downloads"></iframe></div><footer>Review layout, menu, tutor panel and loop controls. <a href="https://github.com/zk222ac001/learncodewithvisually/pull/44" target="_blank" rel="noopener">Open draft PR #44</a></footer><script>
const pages=__PAGES__;const frame=document.getElementById('preview');
function show(name){frame.srcdoc=new TextDecoder().decode(Uint8Array.from(atob(pages[name]),c=>c.charCodeAt(0)));for(const key of ['home','lesson'])document.getElementById(key).setAttribute('aria-pressed',String(key===name));}
for(const key of ['home','lesson'])document.getElementById(key).onclick=()=>show(key);
document.getElementById('mobile').onclick=function(){const on=this.getAttribute('aria-pressed')!=='true';this.setAttribute('aria-pressed',String(on));frame.style.maxWidth=on?'390px':'none';};
window.addEventListener('message',event=>{if(event.source===frame.contentWindow&&['home','lesson'].includes(event.data?.previewPage))show(event.data.previewPage);});show('home');
</script></body></html>'''.replace('__PAGES__',json.dumps(parts))
(root/'ui-previews').mkdir(exist_ok=True)
(root/'ui-previews/CodeVizAI-UI-Preview.html').write_text(html)
print('Created preview:',len(html),'bytes')
