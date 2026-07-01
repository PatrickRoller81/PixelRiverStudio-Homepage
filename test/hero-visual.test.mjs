// TDD/DoD checks for the hero key-visual (two-state comparison) + mockup sheen.
// Runs against built _site/ (npm test builds first).
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

// ── Hero split + decorative ───────────────────────────────────
test('hero is split into copy + visual columns', () => {
  const html = index();
  assert.ok(html.includes('class="hero-copy"'), 'hero-copy column missing');
  assert.ok(/class="hero-visual"/.test(html), 'hero-visual column missing');
});

test('hero visual is decorative (aria-hidden)', () => {
  const html = index();
  assert.match(html, /class="hero-visual"[^>]*aria-hidden="true"/, 'hero-visual must be aria-hidden');
});

// ── Two-state comparison (Heute vs. Automatisiert) ────────────
test('hero visual is a before/after comparison with two lanes', () => {
  const html = index();
  assert.ok(html.includes('hv-compare'), 'hv-compare wrapper missing');
  assert.ok(html.includes('hv-lane--now'), '"Heute" lane missing');
  assert.ok(html.includes('hv-lane--auto'), '"Automatisiert" lane missing');
});

test('comparison shows the time payoff (time gained)', () => {
  const html = index();
  assert.ok(html.includes('hv-payoff'), 'time payoff element missing');
  assert.match(html, /Std\s*\/?\s*Woche|Min\s*\/?\s*Woche/, 'no time metric in hero visual');
});

// ── Mockup polish kept ────────────────────────────────────────
test('both mockups still carry the sheen sweep', () => {
  const html = index();
  const sheen = html.match(/device-sheen/g) || [];
  assert.ok(sheen.length >= 2, `expected >=2 device-sheen, found ${sheen.length}`);
});

test('phone mockup clips the sheen (no mobile h-overflow)', () => {
  const html = index();
  // the translateX sheen must be clipped by its device → pa-phone needs overflow:hidden
  assert.match(html, /\.pa-phone\s*\{[^}]*overflow:\s*hidden/, 'pa-phone must clip the sheen');
});

// ── CSS contract ──────────────────────────────────────────────
test('CSS defines the hero comparison + sheen motion and respects reduced-motion', () => {
  const c = css();
  assert.ok(c.includes('.hero-visual'), 'hero-visual styles missing');
  assert.ok(c.includes('.hv-compare'), 'hv-compare styles missing');
  assert.ok(c.includes('.hv-lane'), 'hv-lane styles missing');
  assert.ok(/@keyframes\s+sheenSweep/.test(c), 'sheenSweep keyframe missing');
  const rm = c.slice(c.indexOf('prefers-reduced-motion'));
  assert.ok(rm.includes('hero-visual') || rm.includes('hv-'), 'reduced-motion must cover hero visual');
});
