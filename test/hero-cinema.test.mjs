// TDD/DoD checks for hero-timegain-cinema (erzaehlter 12s-Loop im Key-Visual).
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

// ── Narrative markup ──────────────────────────────────────────
test('shared trigger moment starts the story', () => {
  const html = index();
  assert.ok(html.includes('hvc-trigger'), 'hvc-trigger element missing');
  assert.match(html, /Montag[^<]*08:00/, 'trigger must name the shared moment');
});

test('manual lane has a counting clock stack (>= 4 values)', () => {
  const html = index();
  const ticks = html.match(/hvc-t\b/g) || [];
  assert.ok(ticks.length >= 4, `expected >= 4 clock ticks, found ${ticks.length}`);
  assert.ok(html.includes('3:00'), 'final manual time 3:00 missing');
});

test('automation lane shows an early-done resting state', () => {
  const html = index();
  assert.ok(html.includes('hvc-done'), 'hvc-done state missing');
  assert.match(html, /erledigt/, 'done wording missing');
});

test('payoff includes the yearly projection', () => {
  const html = index();
  assert.match(html, /16\s*Arbeitstage/, 'yearly projection (≈16 Arbeitstage) missing');
  assert.ok(html.includes('hv-payoff'), 'hv-payoff skeleton must stay');
});

// ── CSS contract ──────────────────────────────────────────────
test('cinema animations exist and share one 12s master duration', () => {
  const c = css();
  const kf = c.match(/@keyframes\s+hvc[A-Za-z]+/g) || [];
  assert.ok(kf.length >= 5, `expected >= 5 hvc keyframes, found ${kf.length}`);
  // every hvc animation shorthand must run on the 12s master clock
  const anims = c.match(/animation:\s*hvc[A-Za-z]+\s+[^;]+/g) || [];
  assert.ok(anims.length >= 5, `expected >= 5 hvc animation uses, found ${anims.length}`);
  for (const a of anims) {
    assert.match(a, /\b12s\b/, `animation not on 12s master clock: ${a}`);
    assert.match(a, /infinite/, `animation must loop: ${a}`);
  }
});

test('time-loss is orange (CI warning), payoff is green', () => {
  const c = css();
  assert.match(c, /\.hvc-clock--slow[^}]*var\(--orange\)/s, 'slow clock must warn in orange');
  assert.match(c, /\.hvc-payoff-year[^}]*var\(--green\)/s, 'yearly payoff must be green');
});

test('reduced-motion freezes the cinema into the readable end state', () => {
  const c = css();
  const rm = c.split('prefers-reduced-motion').slice(1).join(' ');
  assert.ok(/hvc/.test(rm), 'reduced-motion must cover hvc animations');
});
