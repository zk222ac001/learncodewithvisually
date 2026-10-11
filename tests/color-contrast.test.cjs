const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const css = fs.readFileSync(path.resolve(__dirname, '..', 'course.css'), 'utf8');

function luminance(hex) {
  const channels = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
  const linear = channels.map(c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}
function contrast(a, b) {
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
test('number labels on white lesson cards meet normal-text WCAG AA contrast', () => {
  const match = css.match(/\.card \.number\{[^}]*color:(#[0-9a-f]{6})/i);
  assert.ok(match, 'Card number color rule exists');
  const ratio = contrast(match[1], '#ffffff');
  assert.ok(ratio >= 4.5, 'Card number contrast was '+ratio.toFixed(2)+':1; minimum 4.5:1');
});
