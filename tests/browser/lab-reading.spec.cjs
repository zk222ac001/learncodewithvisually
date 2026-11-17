const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
test('lab readings and links remain useful without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
 await page.goto('/');await page.getByRole('link',{name:'Browse Visual Programming Labs',exact:true}).click();await expect(page.locator('#lab-reading-title')).toBeVisible();await page.getByText('Worked Python example: changing a value versus changing a list',{exact:true}).click();await expect(page.locator('.lab-reading pre')).toContainText('scores[1] = 99');
 await page.goto('/pointers-3d.html');await expect(page.locator('#memory-reading-title')).toBeVisible();await page.getByText('Worked C example: update an integer through a pointer',{exact:true}).click();await expect(page.locator('.lab-reading pre')).toContainText('int *p = &score;');await page.goto('/about.html#language-coverage');await expect(page.locator('#language-coverage')).toContainText('English tutorial sections');await context.close();
});
for(const width of [390,1440])test('reading layout '+width,async({page})=>{
 await page.setViewportSize({width,height:1000});fs.mkdirSync('reading-previews',{recursive:true});
 for(const path of ['visual-labs.html','pointers-3d.html','learn-data-structures.html']){
  await page.goto('/'+path);const section=page.locator(path==='learn-data-structures.html'?'#stack-queue-workshop':'.lab-reading');if(path!=='learn-data-structures.html')await section.locator('details > summary').first().click();await expect(section).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await section.screenshot({path:'reading-previews/'+path+'-'+width+'.png'});
 }
});
