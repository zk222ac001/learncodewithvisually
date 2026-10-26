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
