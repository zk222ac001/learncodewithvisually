const { test, expect } = require('@playwright/test');

test('custom values keep source, memory, output and lifetime in sync', async ({ page }) => {
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto('/pointers-3d.html');
  await page.locator('#initial').fill('5'); await page.locator('#write').fill('12'); await page.locator('#call').fill('42');
  await page.getByRole('button', { name: 'Apply & restart' }).click();
  await expect(page.locator('#source')).toContainText('int value = 5;');
  for (let i = 0; i < 4; i++) await page.locator('#next').click();
  await expect(page.locator('#memory-text')).toContainText('target → value');
  await expect(page.locator('#memory-text')).toContainText('value: 12');
  await page.locator('#next').click();
  await expect(page.locator('#source .executing')).toHaveText('    *target = 42;');
  await expect(page.locator('#world .memory-block b')).toHaveText('42');
  await page.locator('#previous').click();
  await expect(page.locator('#world .memory-block b')).toHaveText('12');
  for (let i = 0; i < 4; i++) await page.locator('#next').click();
  await expect(page.locator('#output')).toHaveText('value = 42\n');
  await expect(page.locator('#world .memory-block')).toHaveClass(/ended/);
  await expect(page.locator('#next')).toBeDisabled();
  await page.locator('#reset').click();
  await expect(page.locator('#output')).toContainText('No output');
  expect(errors).toEqual([]);
});

test('allocation release and failure are represented without unsafe reads', async ({ page }) => {
  await page.goto('/pointers-3d.html');
  await page.locator('#scenario').selectOption('allocation');
  await page.getByRole('button', { name: 'Apply & restart' }).click();
  await page.locator('#next').click();
  await expect(page.locator('#memory-text')).toContainText('Uninitialized');
  for (let i = 0; i < 7; i++) await page.locator('#next').click();
  await expect(page.locator('#memory-text')).toContainText('Dangling');
  await expect(page.locator('#world .ended')).toHaveCount(3);
  await expect(page.locator('#output')).toContainText('60');
  await page.locator('#failure').check();
  await page.getByRole('button', { name: 'Apply & restart' }).click();
  for (let i = 0; i < 4; i++) await page.locator('#next').click();
  await expect(page.locator('#world .memory-block')).toHaveCount(0);
  await expect(page.locator('#output')).toContainText('Allocation failed');
});

test('playback pauses, restarts and stops at the end', async ({ page }) => {
  await page.clock.install(); await page.goto('/pointers-3d.html');
  await page.locator('#play').click(); await page.clock.fastForward(1500);
  await expect(page.locator('#step-count')).toContainText('Step 1 /');
  await page.locator('#play').click(); await page.clock.fastForward(5000);
  await expect(page.locator('#step-count')).toContainText('Step 1 /');
  await page.locator('#play').click();
  for (let i = 0; i < 7; i++) await page.clock.fastForward(1500);
  await expect(page.locator('#play')).toBeDisabled();
  await page.locator('#reset').click(); await page.clock.fastForward(5000);
  await expect(page.locator('#step-count')).toContainText('Step 0 /');
});

test('mobile and reduced motion offer flat accessible view and local-only loading', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const external = []; page.on('request', req => { if (!req.url().startsWith('http://127.0.0.1')) external.push(req.url()); });
  await page.goto('/pointers-3d.html');
  await expect(page.locator('#view')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#rotate')).toBeDisabled();
  await page.locator('#view').click();
  await expect(page.locator('#rotate')).toBeEnabled();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(external).toEqual([]);
  await page.screenshot({ path: 'test-results/pointers-3d-mobile.png', fullPage: true });
});

test('pilot is linked from the existing C lesson', async ({ page }) => {
  await page.goto('/index.html?lang=en&code=c#pointers');
  await expect(page.locator('a.pointer-lab-cta')).toHaveCount(2);
  await expect(page.locator('.pointer-lab-banner a')).toHaveCSS('background-color', 'rgb(33, 90, 215)');
  await page.locator('.pointer-lab-banner a').click();
  await expect(page).toHaveTitle(/3D Memory & References Lab/);
  await page.locator('#next').click(); await page.locator('#next').click(); await page.locator('#next').click();
  await page.screenshot({ path: 'test-results/pointers-3d-desktop.png', fullPage: true });
});
