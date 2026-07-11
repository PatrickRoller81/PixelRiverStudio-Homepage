// TDD/DoD checks for elevate-visual-polish (Hero-Entrance, Stagger-Reveal,
// Scroll-Progress, CI-Farbverlaeufe, reduced-motion coverage).
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

// ── Hero entrance ─────────────────────────────────────────────
test('hero entrance is staggered and JS-gated', () => {
  const c = css();
  assert.match(c, /@keyframes\s+heroRise/, 'heroRise keyframes missing');
  assert.match(c, /\.js\s+\.hero-copy/, 'hero entrance must only run with .js gate');
  assert.match(c, /animation-delay/, 'staggering via animation-delay missing');
});

// ── Scroll reveal coverage + stagger ──────────────────────────
test('scroll reveal covers the main sections (>= 10 targets)', () => {
  const html = index();
  const count = (html.match(/data-reveal/g) || []).length;
  assert.ok(count >= 10, `expected >= 10 data-reveal targets, found ${count}`);
});

test('grids use the staggered reveal variant', () => {
  const html = index();
  assert.ok(html.includes('data-reveal="stagger"'), 'stagger variant missing in markup');
  const c = css();
  assert.match(c, /data-reveal="stagger"/, 'stagger CSS rules missing');
  assert.match(c, /nth-child\(\d\)[^}]*(transition|animation)-delay/, 'per-child stagger delay missing');
});

// ── Scroll progress bar ───────────────────────────────────────
test('scroll progress bar exists and blends blue to cyan', () => {
  const html = index();
  assert.ok(html.includes('scroll-progress'), 'scroll-progress element missing');
  const c = css();
  assert.match(c, /\.scroll-progress[^}]*linear-gradient\([^)]*var\(--blue\)[^)]*var\(--cyan\)/s,
    'progress bar must use blue→cyan CI gradient');
});

// ── Color interplay (CI accents only) ─────────────────────────
test('hero accent line uses a blue→cyan text gradient', () => {
  const c = css();
  assert.match(c, /\.hero h1 \.accent[^}]*background-clip:\s*text/s, 'text gradient (background-clip) missing');
  assert.match(c, /\.hero h1 \.accent[^}]*var\(--cyan\)/s, 'accent gradient must include --cyan');
});

test('cta strip has an animated CI gradient border', () => {
  const c = css();
  assert.match(c, /\.cta-strip[^}]*(conic-gradient|linear-gradient)[^;]*var\(--purple\)/s,
    'cta border gradient must include purple accent');
  assert.match(c, /@keyframes\s+ctaBorder/, 'ctaBorder animation missing');
});

test('cards glow in their accent color on hover (color-mix behind @supports)', () => {
  const c = css();
  assert.match(c, /@supports[^{]*color-mix/, 'color-mix must be guarded by @supports');
  assert.match(c, /color-mix\(in srgb, var\(--accent\)/, 'accent glow via color-mix missing');
});

// ── Ticker & nav polish ───────────────────────────────────────
test('ticker has soft edge masks and pauses on hover', () => {
  const c = css();
  assert.match(c, /\.ticker-wrap[^}]*mask-image/s, 'ticker edge mask missing');
  assert.match(c, /\.ticker-wrap:hover \.ticker-inner[^}]*animation-play-state:\s*paused/s,
    'ticker hover pause missing');
});

test('nav links get an animated underline', () => {
  const c = css();
  assert.match(c, /\.nav-links a[^{]*::after[^}]*scaleX/s, 'nav underline (scaleX) missing');
});

// ── Detail polish ─────────────────────────────────────────────
test('selection + focus-visible are styled within CI', () => {
  const c = css();
  assert.match(c, /::selection/, '::selection styling missing');
  assert.match(c, /:focus-visible[^}]*var\(--blue\)/s, 'focus-visible ring missing');
});

// ── Reduced motion covers all new animation ───────────────────
test('prefers-reduced-motion disables the new animations', () => {
  const c = css();
  const rm = c.split('prefers-reduced-motion').slice(1).join(' ');
  assert.ok(rm.length > 0, 'reduced-motion block missing');
  for (const needle of ['.hero-copy', '.cta-strip', 'scroll-progress', 'ticker-inner']) {
    assert.ok(rm.includes(needle), `reduced-motion must cover ${needle}`);
  }
});

// ── CI guard: no foreign accent colors in the palette ─────────
test('no new hex colors outside the CI token palette in style.css', () => {
  const c = css();
  const allowed = new Set([
    // CI tokens (bg/surfaces/borders/accents/text) + pure white/black
    '#0b1016', '#11181f', '#18212b', '#222d39', '#243140', '#354759',
    '#3b96ff', '#10d972', '#a78bfa', '#f59e0b', '#f87171', '#22d3ee',
    '#e2e8f0', '#94a3b8', '#475569', '#fff', '#ffffff', '#000', '#000000',
    '#090d12', // header backdrop (CI --bg v1 heritage)
  ]);
  const hexes = c.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
  const foreign = hexes.filter((h) => !allowed.has(h.toLowerCase()));
  assert.deepEqual([...new Set(foreign)], [], `foreign hex colors found: ${[...new Set(foreign)]}`);
});
