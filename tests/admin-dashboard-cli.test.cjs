const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawn, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const script = path.resolve(__dirname, '../scripts/codevizai-admin-dashboard.mjs');
const token = 'a'.repeat(64); // Test fixture, never a production credential.
function fixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'codeviz-dashboard-'));
  const preload = path.join(dir, 'mock.mjs');
  fs.writeFileSync(preload, `
let calls = 0;
const realTimeout = globalThis.setTimeout;
globalThis.setTimeout = (callback, delay, ...args) => realTimeout(callback, delay === 60000 ? 15 : delay, ...args);
globalThis.fetch = async (url, options) => {
  if (new URL(url).pathname !== '/api/admin/usage' || options.headers.Authorization !== 'Bearer ' + 'a'.repeat(64)) throw Error('Unexpected request');
  calls++;
  if (calls === 2) return new Response('{}', {status:503});
  return Response.json({day:'2026-10-13', limit:25, reserved:calls, remaining:25-calls, enabled:true,
    history:[{day:'2026-10-13',reserved:calls,answered:1,failed:0,incomplete:0}]});
};`);
  return {dir, args:['--import', pathToFileURL(preload).href, script], env:{...process.env,CODEVIZAI_ADMIN_STATS_TOKEN:token}};
}
test('dashboard CLI creates a private snapshot and rejects unknown options', () => {
  const f=fixture();
  try {
    const ok=spawnSync(process.execPath,f.args,{cwd:f.dir,env:f.env,encoding:'utf8'});
    assert.equal(ok.status,0,ok.stderr);
    const html=fs.readFileSync(path.join(f.dir,'codevizai-admin-dashboard-local.html'),'utf8');
    assert.match(html,/Seven-day usage history/);
    assert.ok(!html.includes(token));
    const bad=spawnSync(process.execPath,[...f.args,'--unknown'],{cwd:f.dir,env:f.env,encoding:'utf8'});
    assert.equal(bad.status,2);
  } finally {fs.rmSync(f.dir,{recursive:true,force:true});}
});
test('watch regenerates snapshots and recovers after a transient fetch failure', {timeout:10000}, async () => {
  const f=fixture(); let child;
  try {
    child=spawn(process.execPath,[...f.args,'--watch'],{cwd:f.dir,env:f.env,stdio:['ignore','pipe','pipe']});
    let stdout='',stderr='';
    await new Promise((resolve,reject)=>{
      const timer=setTimeout(()=>{child.kill();reject(Error('No second snapshot: '+stdout+stderr));},5000);
      child.stderr.on('data',chunk=>{stderr+=chunk;});
      child.stdout.on('data',chunk=>{
        stdout+=chunk;
        if((stdout.match(/Updated local dashboard/g)||[]).length>=2) child.kill();
      });
      child.on('error',error=>{clearTimeout(timer);reject(error);});
      child.on('close',()=>{
        clearTimeout(timer);
        try {
          assert.ok((stdout.match(/Updated local dashboard/g)||[]).length>=2,stdout+stderr);
          assert.match(stderr,/Dashboard refresh failed: HTTP 503/);
          assert.match(fs.readFileSync(path.join(f.dir,'codevizai-admin-dashboard-local.html'),'utf8'),/AI reservations<\/span><strong>3<\/strong>/);
          assert.ok(!(stdout+stderr).includes(token));
          resolve();
        }catch(error){reject(error);}
      });
    });
  }finally{child?.kill();fs.rmSync(f.dir,{recursive:true,force:true});}
});
