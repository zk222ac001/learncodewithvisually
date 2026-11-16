const { test, expect } = require('@playwright/test');
const M = require('../../memory-lab-core.js');
const I = require('../../memory-lab-i18n.js');

for (const locale of Object.keys(I.locales)) {
  test(`${locale}: every programming language has translated controls, accurate steps and preserved links`, async ({ page }) => {
    test.setTimeout(180000);
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    if (['ar', 'ur', 'da'].includes(locale)) await page.setViewportSize({ width: 390, height: 844 });
    for (const [language, meta] of Object.entries(M.languages)) {
      await page.goto(`/pointers-3d.html?lang=${locale}&code=${language}`);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('html')).toHaveAttribute('dir', ['ar', 'ur'].includes(locale) ? 'rtl' : 'ltr');
      await expect(page.locator('#language-note')).toHaveText(I.t(locale, 'note_' + language));
      await expect(page.locator('#play')).toHaveText(I.t(locale, 'play'));
      await expect(page.locator('#back')).toHaveAttribute('href', `index.html?lang=${locale}&code=${language}#pointers`);
      await expect(page.locator('#source').locator('..')).toHaveAttribute('dir', 'ltr');
      for (const scenario of meta.scenarios) {
        await page.locator('#scenario').selectOption(scenario);
        const model = M.build({ language, scenario });
        for (const [index, state] of model.states.entries()) {
          await expect(page.locator('#explanation')).toHaveText(I.t(locale, state.key, state.args));
          if (state.line !== null) await expect(page.locator('#source .executing')).toHaveText(model.code.trimEnd().split('\n')[state.line]);
          if (index < model.states.length - 1) await page.locator('#next').click();
        }
        await expect(page.locator('#output')).toHaveText(model.output);
        await expect(page.locator('#play')).toBeDisabled();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
      // Downloads must contain this language's full source and the correct compiler filename.
      const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
      expect(download.suggestedFilename()).toBe(meta.file);
      const stream = await download.createReadStream(); const chunks = [];
      for await (const chunk of stream) chunks.push(chunk);
      expect(Buffer.concat(chunks).toString()).toBe(M.build({ language, scenario: meta.scenarios.at(-1) }).code);
    }
    expect(errors).toEqual([]);
  });
}

test('course entry is translated for all locales and carries both selections', async ({ page }) => {
  test.setTimeout(180000);
  for (const locale of Object.keys(I.locales)) {
    for (const code of Object.keys(M.languages)) {
      await page.goto(`/index.html?lang=${locale}&code=${code}#pointers`);
      const banner = page.locator('.pointer-lab-banner');
      await expect(banner).toHaveAttribute('lang', locale);
      await expect(banner.locator('a')).toHaveText(I.t(locale, 'openLab'));
      await expect(banner.locator('a')).toHaveAttribute('href', `pointers-3d.html?lang=${locale}&code=${code}`);
    }
  }
  await page.locator('.pointer-lab-banner a').click();
  await expect(page.locator('#code-language')).toHaveValue('csharp');
  await expect(page.locator('#website-language')).toHaveValue('zh');
  await page.locator('#back').click();
  await expect(page).toHaveURL(/lang=zh&code=csharp#pointers/);
});

test('switching locale preserves current step and switching code resets safely', async ({ page }) => {
  await page.clock.install();
  await page.goto('/pointers-3d.html?lang=en&code=python');
  await page.locator('#next').click();
  await page.locator('#play').click();
  await page.locator('#website-language').selectOption('da');
  await page.clock.fastForward(5000);
  await expect(page.locator('#step-count')).toContainText('Trin 1 /');
  await expect(page.locator('#play')).toHaveText('Afspil');
  await page.locator('#code-language').selectOption('cpp');
  await expect(page.locator('#step-count')).toContainText('Trin 0 /');
  await expect(page.locator('#source')).toContainText('int& alias');
  await page.reload();
  await expect(page.locator('#website-language')).toHaveValue('da');
  await expect(page.locator('#code-language')).toHaveValue('cpp');
  await page.locator('#initial').fill('');
  await page.locator('#settings button[type=submit]').click();
  await expect(page.locator('#settings-status')).toHaveText(I.t('da', 'invalid'));
  await page.goto('/pointers-3d.html?lang=unknown&code=unknown');
  await expect(page.locator('#code-language')).toHaveValue('c');
  await expect(page.locator('#website-language')).toHaveValue('en');
});

test('visual review captures desktop and translated mobile views', async ({ page }) => {
  for (const [locale, code, width] of [['en', 'cpp', 1280], ['da', 'python', 390], ['ar', 'csharp', 390], ['ur', 'java', 390]]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`/pointers-3d.html?lang=${locale}&code=${code}`);
    for (let i = 0; i < 4; i++) await page.locator('#next').click();
    await page.screenshot({ path: `memory-lab-previews/${locale}-${code}.png`, fullPage: true });
  }
});
