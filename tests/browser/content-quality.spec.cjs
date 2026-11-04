const {test,expect}=require('@playwright/test');
const {getTracks}=require('../../learning-paths-core.js');

test('worked lessons remain readable without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 const page=await context.newPage();
 await page.goto('http://127.0.0.1:4173/');
 await expect(page.getByRole('heading',{name:'Try a first lesson: count passing scores'})).toBeVisible();
 await page.getByRole('link',{name:'Python counting workshop'}).click();
 await expect(page.getByRole('heading',{name:'Worked workshop: count scores without losing your total'})).toBeVisible();
 await page.getByText('Explanation and repair',{exact:true}).click();
 await expect(page.getByText('The counter resets for each score.',{exact:false})).toBeVisible();
 await page.goto('http://127.0.0.1:4173/learning-paths.html');
 for(const track of getTracks()){
  const card=page.locator('#track-list article').filter({has:page.getByRole('heading',{name:track.label,exact:true})});
  for(const step of track.steps)await expect(card.getByRole('link',{name:step.title,exact:true})).toHaveAttribute('href',step.href);
 }
 await context.close();
});

test('course rendering keeps the worked lesson and paths still track progress',async({page})=>{
 await page.goto('/');
 await expect(page.locator('#program-language')).toBeVisible();
 await expect(page.getByRole('heading',{name:'Try a first lesson: count passing scores'})).toBeVisible();
 await page.goto('/learning-paths.html');
 await page.locator('[data-track="python"]').click();
 await expect(page.locator('#journey')).toBeVisible();
 await page.locator('[data-step="intro"]').click();
 await expect(page.locator('#progress-label')).toHaveText('1 of 5 milestones marked complete');
 await page.reload();
 await expect(page.locator('#progress-label')).toHaveText('1 of 5 milestones marked complete');
});

test('Python counting workshop traces boundaries and rejects invalid scores',async({page})=>{
 await page.goto('/learn-python-programming.html');
 await expect(page.locator('#score-counter-form')).toBeVisible();
 await page.setViewportSize({width:375,height:812});
 for(const field of ['#score-list','#pass-mark','#score-counter-form button']){
  const bounds=await page.locator(field).boundingBox();
  expect(bounds.x+bounds.width).toBeLessThanOrEqual(375);
 }
 await page.locator('#score-counter-form').getByRole('button',{name:'Trace scores'}).click();
 await expect(page.locator('#score-counter-result')).toHaveText('4 scores processed; 2 meet the pass mark of 50.');
 await expect(page.locator('#score-counter-trace tbody tr')).toHaveCount(4);
 await expect(page.locator('#score-counter-trace tbody tr').nth(1)).toContainText('50');
 await expect(page.locator('#score-counter-trace tbody tr').nth(1)).toContainText('Yes');
 await expect(page.locator('#score-counter-trace tbody tr').nth(1).locator('td').nth(2)).toHaveText('1');

 await page.locator('#pass-mark').fill('70');
 await page.locator('#score-counter-form').getByRole('button',{name:'Trace scores'}).click();
 await expect(page.locator('#score-counter-result')).toHaveText('4 scores processed; 1 meet the pass mark of 70.');

 await page.locator('#score-list').fill('');
 await page.locator('#score-counter-form').getByRole('button',{name:'Trace scores'}).click();
 await expect(page.locator('#score-counter-result')).toHaveText('No scores to process. The count remains 0.');
 await expect(page.locator('#score-counter-trace table')).toHaveCount(0);

 await page.locator('#score-list').fill('42, not-a-number');
 await page.locator('#score-counter-form').getByRole('button',{name:'Trace scores'}).click();
 await expect(page.locator('#score-counter-error')).toHaveText('Enter only finite numbers, separated by commas.');
 await expect(page.locator('#score-counter-trace table')).toHaveCount(0);
});
