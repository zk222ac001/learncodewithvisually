const {test,expect}=require('@playwright/test');
// The full course regression runs concurrently and exercises thousands of views.
// Allow these UI smoke checks time on resource-constrained CI runners.
test.setTimeout(120000);
test('general tutor supports six languages and safe disabled beta without external calls',async({page})=>{
  await page.goto('/index.html?lang=en&code=python');
  const tutor=page.locator('#general-ai-tutor');
  await expect(tutor).toBeVisible();
  await expect(tutor.getByRole('heading',{name:'AI Programming Tutor'})).toBeVisible();
  await expect(page.locator('#general-ai-language')).toHaveValue('python');
  const langs=await page.locator('#general-ai-language option').evaluateAll(nodes=>nodes.map(n=>n.value));
  expect(langs).toEqual(['c','cpp','python','java','javascript','csharp','other']);
  await expect(page.getByRole('button',{name:'Ask AI Tutor'})).toBeDisabled();
  // Public AI is disabled, so the tutor form is intentionally read-only.
  await expect(page.locator('#general-ai-language')).toBeDisabled();
  await expect(page.locator('#general-ai-mode')).toBeDisabled();
  // Preview mode enables selection without enabling public inference.
  await page.route('https://challenges.cloudflare.com/**', route => route.abort());
  await page.goto('/index.html?lang=en&code=python&ai-preview=1');
  await expect(page.locator('#general-ai-language')).toBeEnabled();
  await page.locator('#program-language').selectOption('java');
  await expect(page.locator('#general-ai-tutor')).toBeVisible();
  await page.locator('#general-ai-language').selectOption('other');
  await expect(page.locator('#general-ai-other')).toBeVisible();
  await page.locator('#general-ai-language').selectOption('python');
  await expect(page.locator('#general-ai-other')).toBeHidden();
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('general tutor is scoped to homepage rather than obstructing module navigation',async({page})=>{
  await page.goto('/index.html?lang=en&code=c#intro');
  await expect(page.locator('#general-ai-tutor')).toBeHidden();
  await page.goto('/index.html?lang=en&code=cpp');
  await expect(page.locator('#general-ai-tutor')).toBeVisible();
  await page.locator('a[href*="#intro"]').first().click();
  await expect(page.locator('#general-ai-tutor')).toBeHidden();
});
