const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
const path=require('node:path');
const release=JSON.parse(fs.readFileSync(path.join(__dirname,'../../PUBLIC_AI_BETA_STATUS.json'),'utf8'));
if(!['private','public'].includes(release.state))throw Error('Unexpected beta state');
const publiclyEnabled=release.state==='public';
// The full course regression runs concurrently and exercises thousands of views.
// Allow these UI smoke checks time on resource-constrained CI runners.
test.setTimeout(120000);
test('general tutor respects reviewed public/private release state without external calls',async({page})=>{
  await page.route('https://challenges.cloudflare.com/**', route => route.abort());
  await page.goto('/index.html?lang=en&code=python');
  await page.locator('#general-ai-launcher').click();
  const tutor=page.locator('#general-ai-tutor');
  await expect(tutor).toBeVisible();
  await expect(tutor.getByRole('heading',{name:'CodeVizAI Programming Tutor'})).toBeVisible();
  await expect(page.locator('#general-ai-language')).toHaveValue('python');
  const langs=await page.locator('#general-ai-language option').evaluateAll(nodes=>nodes.map(n=>n.value));
  expect(langs).toEqual(['c','cpp','python','java','javascript','csharp','other']);
  if(publiclyEnabled){
    // Public launch must allow the form without requiring a private preview key.
    await expect(page.locator('#general-ai-language')).toBeEnabled();
    await expect(page.locator('#general-ai-mode')).toBeEnabled();
    await expect(page.locator('#general-ai-test-key')).toHaveCount(0);
  } else {
    // The private state remains read-only unless the explicit preview parameter is present.
    await expect(page.locator('#general-ai-form').getByRole('button',{name:'Ask AI Tutor',exact:true})).toBeDisabled();
    await expect(page.locator('#general-ai-language')).toBeDisabled();
    await expect(page.locator('#general-ai-mode')).toBeDisabled();
  }
  await page.goto('/index.html?lang=en&code=python&ai-preview=1');
 await page.locator('#general-ai-launcher').click();
  await expect(page.locator('#general-ai-language')).toBeEnabled();
  await expect(page.locator('#general-ai-test-key')).toHaveCount(publiclyEnabled?0:1);
  await page.getByRole('button',{name:'Close AI tutor'}).click();
  await page.locator('#program-language').selectOption('java');
  await page.locator('#general-ai-launcher').click();
  await expect(page.locator('#general-ai-tutor')).toBeVisible();
  await page.locator('#general-ai-language').selectOption('other');
  await expect(page.locator('#general-ai-other')).toBeVisible();
  await page.locator('#general-ai-language').selectOption('python');
  await expect(page.locator('#general-ai-other')).toBeHidden();
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('persistent tutor opens on lessons and restores focus without losing drafts',async({page})=>{
  await page.route('https://challenges.cloudflare.com/**',route=>route.abort());
  await page.goto('/index.html?lang=en&code=c#intro');
  const launcher=page.locator('#general-ai-launcher');
  await expect(page.locator('#general-ai-tutor')).toBeHidden();
  await launcher.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#general-ai-question')).toBeFocused();
  await page.locator('#general-ai-question').fill('Please explain variables');
  await page.keyboard.press('Escape');
  await expect(launcher).toBeFocused();
  await expect(launcher).toHaveAttribute('aria-expanded','false');
  await page.evaluate(()=>{location.hash='arrays';});
  await launcher.click();
  await expect(page.locator('#general-ai-question')).toHaveValue('Please explain variables');
  await expect(page).toHaveURL(/#arrays$/);
  await page.getByRole('button',{name:'Close AI tutor'}).click();
  await page.evaluate(()=>{location.hash='home';});
  await page.getByRole('button',{name:'Ask CodeVizAI',exact:true}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('tutor is available on formatting and data structures with a usable mobile panel',async({page})=>{
  await page.route('https://challenges.cloudflare.com/**',route=>route.abort());
  await page.setViewportSize({width:390,height:844});
  for(const route of ['/formatting.html','/c-formatting.html','/datastrukturer.html']){
    await page.goto(route);
    await page.locator('#general-ai-launcher').click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('button',{name:'Close AI tutor'})).toBeInViewport();
    expect(await page.locator('#general-ai-dialog').evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
    await page.getByRole('button',{name:'Close AI tutor'}).click();
    await expect(page.locator('#general-ai-launcher')).toBeFocused();
  }
});

test('safe Markdown formatting, code blocks and explanation level selector',async({page})=>{
 await page.goto('/index.html?lang=en&code=python&ai-preview=1');
 await page.locator('#general-ai-launcher').click();
 await expect(page.locator('#general-ai-level')).toHaveValue('beginner');
 await page.locator('#general-ai-level').selectOption('advanced');
 await expect(page.locator('#general-ai-level')).toHaveValue('advanced');
 await page.evaluate(()=>{
   const answer=['## Example','**Bold concept** with `inline`.','','1. First','2. Second','','```python','print("hi")','```','','<img src=x onerror="window.aiXss=1">'].join('\n');
   window.LearnCodeTutorMarkdown.render(document.querySelector('#general-ai-messages'),answer);
 });
 const answer=page.locator('#general-ai-messages');
 await expect(answer.locator('h4')).toHaveText('Example');
 await expect(answer.locator('strong')).toHaveText('Bold concept');
 await expect(answer.locator('ol li')).toHaveCount(2);
 await expect(answer.locator('pre code')).toContainText('print("hi")');
 await expect(answer.getByRole('button',{name:'Copy code'})).toBeVisible();
 expect(await page.evaluate(()=>window.aiXss)).toBeUndefined();
 await expect(answer.locator('img')).toHaveCount(0);
 await expect(answer).toContainText('<img src=x');
});

test('Markdown headings from H1 to H6 render safely and literal HTML stays inert',async({page})=>{
 await page.goto('/index.html?lang=en&code=python&ai-preview=1');
 await page.locator('#general-ai-launcher').click();
 await page.evaluate(()=>{
   const text=['# Level one','## Level two','### Level three','#### Key Characteristics','##### Level five','###### Level six','<img src=x onerror="window.markdownUnsafe=true">'].join('\n');
   window.LearnCodeTutorMarkdown.render(document.querySelector('#general-ai-messages'),text);
 });
 const area=page.locator('#general-ai-messages');
 await expect(area.locator('h3')).toHaveText('Level one');
 await expect(area.locator('h4')).toHaveText('Level two');
 await expect(area.locator('h5')).toHaveText('Level three');
 await expect(area.locator('h6')).toHaveCount(3);
 await expect(area).toContainText('Key Characteristics');
 await expect(area).not.toContainText('#### Key Characteristics');
 await expect(area.locator('img')).toHaveCount(0);
 expect(await page.evaluate(()=>window.markdownUnsafe)).toBeUndefined();
});


test('opening sends no AI request and answers survive closing the panel',async({page})=>{
 const requests=[];
 await page.route('https://challenges.cloudflare.com/**',route=>route.fulfill({contentType:'text/javascript',body:`
 window.turnstile={render:()=>1,getResponse:()=> 'test-token',reset:()=>{}};
 window.onGeneralAiTurnstileLoad();
 `}));
 await page.route('**/api/tutor',async route=>{
  requests.push(route.request().postDataJSON());
  await route.fulfill({contentType:'application/json',body:JSON.stringify({answer:'A variable stores a value.'})});
 });
 await page.goto('/index.html?lang=en&code=python&ai-preview=1#intro');
 await page.locator('#general-ai-launcher').click();
 expect(requests).toHaveLength(0);
 if(!publiclyEnabled)await page.locator('#general-ai-test-key').fill('a'.repeat(64));
 await page.locator('#general-ai-question').fill('What is a variable?');
 await page.locator('#general-ai-form').getByRole('button',{name:'Ask AI Tutor',exact:true}).click();
 await expect(page.locator('#general-ai-messages')).toContainText('A variable stores a value.');
 expect(requests).toHaveLength(1);
 expect(requests[0]).toMatchObject({question:'What is a variable?',language:'Python',lessonId:'general-programming'});
 await page.getByRole('button',{name:'Close AI tutor'}).click();
 await page.locator('#general-ai-launcher').click();
 await expect(page.locator('#general-ai-messages')).toContainText('A variable stores a value.');
 await page.locator('#general-ai-question').fill('Can you give an example?');
 await page.locator('#general-ai-form').getByRole('button',{name:'Ask AI Tutor',exact:true}).click();
 await expect(page.locator('.general-ai-message.assistant')).toHaveCount(2);
 expect(requests[1].history).toHaveLength(2);
 await page.getByRole('button',{name:'Clear conversation',exact:true}).click();
 await expect(page.locator('.general-ai-message')).toHaveCount(0);
});
