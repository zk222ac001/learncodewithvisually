const { test, expect } = require('@playwright/test');

test('C for-loop step visualization matches output and stops after final condition', async ({ page }) => {
  await page.goto('/c-for-loop-visualization.html');
  await expect(page).toHaveTitle(/C For Loop Visualization/);
  const demo=page.locator('[data-visualizer="loop"]');
  await expect(demo.locator('[data-status]')).toContainText('Initialization');
  for (let n=1; n<=3; n++) {
    await demo.getByRole('button', { name: 'Next step' }).click();
    await expect(demo.locator('[data-status]')).toContainText('printed '+n);
  }
  await demo.getByRole('button',{name:'Next step'}).click();
  await expect(demo.locator('[data-status]')).toContainText('terminates without printing 4');
  await expect(demo.getByRole('button',{name:'Next step'})).toBeDisabled();
  await demo.getByRole('button',{name:'Previous'}).click();
  await expect(demo.locator('[data-status]')).toContainText('printed 3');
  await demo.getByRole('button',{name:'Reset'}).click();
  await expect(demo.locator('[data-status]')).toContainText('Initialization');
});

test('C arrays read, write, reset and reject invalid new values', async ({ page }) => {
  await page.goto('/arrays-in-c-visualization.html');
  const demo=page.locator('[data-visualizer="array"]');
  await expect(demo.locator('[data-status]')).toContainText('scores[1] = 20');
  await demo.locator('[data-value]').fill('25');
  await demo.getByRole('button',{name:'Update selected element'}).click();
  await expect(demo.locator('[data-status]')).toContainText('scores[1] = 25');
  await demo.locator('[data-index]').selectOption('3');
  await expect(demo.locator('[data-status]')).toContainText('scores[3] = 40');
  await demo.locator('[data-value]').fill('101');
  await demo.getByRole('button',{name:'Update selected element'}).click();
  await expect(demo.locator('[data-status]')).toContainText('Enter a whole number');
  await demo.getByRole('button',{name:'Reset array'}).click();
  await expect(demo.locator('[data-status]')).toContainText('scores[1] = 20');
});

test('C pointers explain address and dereference; functions return to caller', async ({ page }) => {
  await page.goto('/pointers-in-c-visualization.html');
  const ptr=page.locator('[data-visualizer="pointer"]');
  for(let i=0;i<3;i++) await ptr.getByRole('button',{name:'Next step'}).click();
  await expect(ptr.locator('[data-status]')).toContainText('x now holds 24');
  await ptr.getByRole('button',{name:'Reset'}).click();
  await expect(ptr.locator('[data-status]')).toContainText('not yet been initialized');

  await page.goto('/functions-in-c-visualization.html');
  const fn=page.locator('[data-visualizer="function"]');
  for(let i=0;i<3;i++) await fn.getByRole('button',{name:'Next step'}).click();
  await expect(fn.locator('[data-status]')).toContainText('result = 7');
  await expect(fn.getByRole('button',{name:'Next step'})).toBeDisabled();
});

test('visual topic pages fit mobile without viewport overflow', async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  for (const route of ['/c-for-loop-visualization.html','/arrays-in-c-visualization.html','/pointers-in-c-visualization.html','/functions-in-c-visualization.html']) {
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await expect(page.locator('[data-visualizer] [data-status]')).toBeVisible();
  }
});

test('AI tutor preview appears only with explicit preview query parameter', async ({ page }) => {
  await page.goto('/c-for-loop-visualization.html');
  await expect(page.locator('#ai-tutor-panel')).toBeHidden();
  await page.goto('/c-for-loop-visualization.html?ai-preview=1');
  await expect(page.locator('#ai-tutor-panel')).toBeVisible();
  await expect(page.locator('#ai-tutor-preview-controls')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Explain this step' })).toBeVisible();
});

test('AI Tutor reports a clear message if Turnstile cannot load', async ({ page }) => {
  await page.route('https://challenges.cloudflare.com/**', route => route.abort());
  await page.goto('/c-for-loop-visualization.html?ai-preview=1');
  await page.getByRole('button', {name:'Explain this step'}).click();
  await expect(page.locator('#ai-tutor-status')).toContainText(/verification|Cloudflare/i);
});
