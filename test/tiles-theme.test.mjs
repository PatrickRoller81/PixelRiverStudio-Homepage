// TDD/DoD checks for change `lift-theme-and-energize-tiles`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, '_site');
const read = (rel) => {
  const p = join(site, rel);
  assert.ok(existsSync(p), `built file missing: ${rel} — run \`npm run build\``);
  return readFileSync(p, 'utf8');
};
const index = () => read('index.html');
const css = () => read('assets/css/style.css');

// ── Energized tiles ───────────────────────────────────────────
test('tiles carry watermark numbers and accent tokens', () => {
  const html = index();
  const wm = html.match(/data-wm="/g) || [];
  assert.ok(wm.length >= 9, `expected >=9 data-wm tiles, found ${wm.length}`);
  assert.ok(html.includes('--accent:'), 'tiles missing per-tile --accent token');
});

test('CSS renders the watermark and lifts tiles off the canvas', () => {
  const c = css();
  assert.ok(c.includes('attr(data-wm)'), 'watermark content: attr(data-wm) missing');
  assert.match(c, /\.usp-item\s*\{[^}]*background:\s*var\(--surface\)/,
    'usp-item should sit on --surface (not --bg)');
});

test('tiles use the accent color and lift on hover', () => {
  const c = css();
  assert.match(c, /\.usp-num\s*\{[^}]*var\(--accent\)/, 'usp-num should use --accent');
  assert.match(c, /\.usp-item:hover\s*\{[^}]*translateY/, 'usp-item hover should lift (translateY)');
});

// ── Ambient depth ─────────────────────────────────────────────
test('page has an ambient depth layer instead of flat black', () => {
  const c = css();
  assert.ok(/body::before/.test(c), 'ambient body::before layer missing');
});

// ── Hero comparison stays untilted ────────────────────────────
test('hero comparison lanes are upright (no static tilt)', () => {
  const c = css();
  const m = c.match(/\.hv-lane\s*\{[^}]*\}/);
  assert.ok(m, 'hv-lane rule missing');
  assert.ok(!/rotate\(/.test(m[0]), 'hv-lane should not be rotated');
});
