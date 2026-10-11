const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

test('homepage keeps AdSense verification and loads the interactive course', () => {
  const html = read('index.html');
  assert.match(html, /name="google-adsense-account" content="ca-pub-[0-9]+"/);
  assert.match(html, /course\.js\?v=21/);
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
  assert.equal(urls.length, 10);
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
  assert.match(course, /get\('ds-language'\)/);
  assert.match(course, /const urlLang=/);
  assert.match(formatting, /<html lang="en">/);
});
