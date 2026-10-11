// Run from a second terminal while the *isolated* Wrangler dev server is up.
const base = 'http://127.0.0.1:8788';
const health = await fetch(base + '/health');
if (!health.ok || !(await health.json()).isolated) throw new Error('Not the isolated test Worker. Stop.');
const response = await fetch(base + '/run-check', {
  method:'POST',
  headers: {'Origin':base, 'X-LCV-Local-Check':'1'},
});
const result = await response.json();
console.log(JSON.stringify(result,null,2));
if (!response.ok || !result.ok || result.granted !== 25 || result.refused !== 5 ||
    !result.nextUtcDayResets || !result.noAiInference || result.usesProductionBudget)
  process.exitCode = 1;
