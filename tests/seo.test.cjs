const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

test('homepage keeps AdSense verification and loads the interactive course', () => {
  const html = read('index.html');
  assert.match(html, /name="google-adsense-account" content="ca-pub-[0-9]+"/);
  assert.match(html, /course\.js\?v=22/);
  assert.match(html, /id="content"/);
  assert.match(html, /rel="canonical" href="https:\/\/learncodevisually\.com\/"/);
  assert.match(html, /application\/ld\+json/);
});
test('guides provide unique titles, descriptive content and functioning local routes', () => {
  const pages = ['learn-c-programming.html', 'learn-python-programming.html', 'learn-data-structures.html'];
  const titles = new Set();
  for (const file of pages) {
    const html = read(file);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title, file);
    assert.ok(!titles.has(title), 'duplicate title: ' + title);
    titles.add(title);
    assert.match(html, new RegExp('rel="canonical" href="https://learncodevisually.com/' + file + '"'));
    assert.match(html, /<h1>Learn /);
    assert.match(html, /class="cta"/);
    assert.match(html, /href="\/index\.html\?lang=en&amp;code=|href="\/datastrukturer\.html\?lang=en&amp;code=/);
  }
});
test('every sitemap URL resolves to an existing canonical HTML file', () => {
  const sitemap = read('sitemap.xml');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x => x[1]);
  assert.equal(urls.length, 14);
  assert.equal(new Set(urls).size, urls.length);
  for (const value of urls) {
    const url = new URL(value);
    assert.equal(url.origin, 'https://learncodevisually.com');
    const file = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
    assert.ok(fs.existsSync(path.join(root, file)), 'missing sitemap page: ' + file);
    assert.match(read(file), new RegExp('rel="canonical" href="' + value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"'));
  }
  assert.doesNotMatch(sitemap, /c-formatting\.html/);
});

test('global learning site defaults to English while keeping translated course options', () => {
  const homepage = read('index.html');
  const course = read('course.js');
  const formatting = read('formatting.html');
  assert.match(homepage, /<html lang="en">/);
  assert.match(homepage, /Skip to content/);
  assert.match(course, /let language='en';/);
  assert.match(course, /localStorage\.getItem\('ds-language'\)/);
  assert.match(course, /const urlLang=/);
  assert.match(formatting, /<html lang="en">/);
});

test('four focused C tutorials contain independent descriptions and interactive models', () => {
  const guides = ['c-for-loop-visualization.html','arrays-in-c-visualization.html','pointers-in-c-visualization.html','functions-in-c-visualization.html'];
  const kinds = ['loop', 'array', 'pointer', 'function'];
  const titles = new Set();
  for (let i=0; i<guides.length; i++) {
    const html=read(guides[i]);
    const title=html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title && !titles.has(title), 'Missing/duplicate title: '+guides[i]);
    titles.add(title);
    assert.match(html, new RegExp('rel="canonical" href="https://learncodevisually.com/'+guides[i]+'"'));
    assert.ok(html.includes('data-visualizer="'+kinds[i]+'"'));
    assert.ok(html.includes('<script src="/visual-lessons.js" defer>'));
    assert.ok(html.includes('aria-live="polite"'));
    assert.ok(html.includes('application/ld+json'));
    assert.ok(html.includes('href="/index.html?lang=en&amp;code=c#'));
    assert.ok(html.includes('<ol>') && html.includes('<details>'), 'Missing exercises or answer explanations: '+guides[i]);
    assert.ok(read('index.html').includes('href="/'+guides[i]+'"'));
    assert.ok(read('learn-c-programming.html').includes('href="/'+guides[i]+'"'));
  }
  const script=read('visual-lessons.js');
  assert.match(script, /replaceChildren/);
  assert.doesNotMatch(script, /eval\s*\(/);
  assert.doesNotMatch(script, /fetch\s*\(/);
});


test('homepage SEO uses the exact publicly rendered title and truthful product description', () => {
  const html=read('index.html'),js=read('course.js'),data=read('course-data.js');
  const title="Learn Programming Visually — Free Interactive Coding Lessons";
  assert.ok(html.includes('<title>'+title+'</title>'));
  assert.ok(html.includes('<h1>'+title+'</h1>'));
  assert.ok(html.includes('<meta property="og:title" content="'+title+'">'));
  assert.match(html, /<meta name="description" content="Learn programming visually with free interactive coding lessons/);
  assert.match(html, /<meta property="og:description" content="Learn programming visually with free interactive coding lessons/);
  assert.match(html, /"@type":"WebSite"/);
  assert.match(js, /const SITE_TITLE='Learn Programming Visually/);
  assert.match(js, /module<0\?SITE_TITLE/);
  assert.match(data, /"intro": "Learn to code step by step with interactive visualizations/);
  assert.match(read('ai-tutor-config.js'), /enabled:\s*false/);
  assert.doesNotMatch(html, /AI Tutor/);
});
