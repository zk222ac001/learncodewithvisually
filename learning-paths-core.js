'use strict';
// Curated routes only: no user-supplied HTML or external account requirements.
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory();
  else root.CodeVizPaths=factory();
})(typeof window==='undefined'?globalThis:window,()=>{
 const beginner=[
  {id:'intro',title:'Get started with programming',description:'Explore computers, algorithms, and your first program.',hash:'intro'},
  {id:'data',title:'Variables and data types',description:'Understand how programs store and update values.',hash:'data'},
  {id:'control',title:'Decisions and conditions',description:'Trace if, else, comparisons, and Boolean expressions.',hash:'control'},
  {id:'loops',title:'Loops and iteration',description:'Follow repeated execution step by step.',hash:'module-loops'}
 ];
 const choices=[
  {id:'python',label:'Python',description:'An approachable language for scripting, automation, data, and AI.',color:'blue'},
  {id:'c',label:'C',description:'Understand how programs interact with memory and hardware.',color:'orange'},
  {id:'cpp',label:'C++',description:'Learn core programming concepts before exploring C++ in depth.',color:'violet'},
  {id:'javascript',label:'JavaScript',description:'Build a foundation for web programming and interactive software.',color:'yellow'},
  {id:'java',label:'Java',description:'Study variables, program flow, and repetition in Java.',color:'red'},
  {id:'csharp',label:'C#',description:'Learn foundational C# concepts through comparative examples.',color:'green'}
 ];
 const extras={
  python:[
   {id:'python-guide',title:'Python visual learning guide',description:'Read worked examples about loops and list indexing.',href:'/learn-python-programming.html'}
  ],
  c:[
   {id:'c-guide',title:'C programming guide',description:'Read a structured introduction to C and its foundations.',href:'/learn-c-programming.html'},
   {id:'c-loop',title:'Visualize a C for loop',description:'Control a step-by-step execution trace.',href:'/c-for-loop-visualization.html'},
   {id:'c-arrays',title:'Explore C arrays',description:'Select and update individual array elements.',href:'/arrays-in-c-visualization.html'},
   {id:'c-functions',title:'Trace C function calls',description:'Follow parameters, stack frames, and return values.',href:'/functions-in-c-visualization.html'},
   {id:'c-pointers',title:'Visualize C pointers',description:'Explore pointer references and memory updates.',href:'/pointers-in-c-visualization.html'}
  ]
 };
 function getTracks(){
  return [...choices.map(v=>({...v,steps:[
    ...beginner.map(step=>({...step,href:'/index.html?lang=en&code='+v.id+'#'+step.hash})),
    ...(extras[v.id]||[])
  ]})),{
    id:'data-structures',label:'Data Structures',color:'teal',
    description:'Learn how arrays and other structures organize information.',
    steps:[
     {id:'overview',title:'Understand data structures',description:'Read the introductory visual guide.',href:'/learn-data-structures.html'},
     {id:'structures',title:'Explore the illustrated lessons',description:'Study arrays, stacks, queues, and linked structures.',href:'/datastrukturer.html?lang=en&code=c'},
     {id:'array-demo',title:'Try an array visualizer',description:'Interact with an array in a concrete C example.',href:'/arrays-in-c-visualization.html'}
    ]
  }];
 }
 function getTrack(id){return getTracks().find(t=>t.id===id)||null;}
 function progressId(track,step){return 'learning-path/'+track+'/'+step;}
 function summarize(track,store){
  const steps=track.steps.map(s=>({...s,completed:store.get(progressId(track.id,s.id)).completed}));
  const completed=steps.filter(s=>s.completed).length;
  return {steps,completed,total:steps.length,percent:Math.round(100*completed/steps.length),
    next:steps.find(s=>!s.completed)||null};
 }
 return {getTracks,getTrack,progressId,summarize};
});
