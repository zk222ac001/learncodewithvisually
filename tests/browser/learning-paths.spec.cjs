const {test,expect}=require('@playwright/test');
test('learners can resume after reload without affecting another path',async({page})=>{
 await page.goto('/learning-paths.html');
 await expect(page.locator('[data-track]')).toHaveCount(7);
 await page.locator('[data-track="python"]').click();
 await page.locator('[data-step="intro"]').click();
 await expect(page.locator('#resume-learning')).toHaveAttribute('href','/index.html?lang=en&code=python#data');
 await page.goto('/learning-paths.html');
 await expect(page.locator('#journey-title')).toHaveText('Python learning path');
 await expect(page.locator('[data-step="intro"]')).toHaveAttribute('aria-pressed','true');
 await page.locator('[data-track="c"]').click();
 await expect(page.locator('[data-step="intro"]')).toHaveAttribute('aria-pressed','false');
 await page.locator('#resume-learning').click();
 await expect(page.locator('#program-language')).toHaveValue('c');
 await page.goto('/learning-paths.html?path=python');
 await page.setViewportSize({width:390,height:844});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('blocked storage retains session progress and reports its limitation',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw Error('blocked')}}));
 await page.goto('/learning-paths.html?path=python');
 await page.locator('[data-step="intro"]').click();
 await expect(page.locator('[data-step="intro"]')).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('#storage-status')).toContainText('unavailable');
});
