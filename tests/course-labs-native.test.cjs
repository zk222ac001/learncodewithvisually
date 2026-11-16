const test=require('node:test'),assert=require('node:assert/strict'),C=require('../course-labs-content.js'),{available,execute}=require('./native-program.cjs');
for(const language of ['c','cpp','python','java','javascript','csharp']){
 const version=available(language);
 if(process.env.REQUIRE_COURSE_TOOLCHAINS==='1')test(language+' toolchain is required',()=>assert.ok(version));
 test('extra course lab programs execute in '+language,{skip:!version},()=>{for(const [id,sources] of Object.entries(C.extra)){assert.equal(execute(language,sources[language],version),C.outputs[id][language],id+'/'+language);}});
}
