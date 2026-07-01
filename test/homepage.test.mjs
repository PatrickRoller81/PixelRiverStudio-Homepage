// TDD/DoD checks for change `update-homepage-address-and-mockups`.
// Runs against the built _site/ output (run `npm run build` first; `npm test` does both).
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
const impressum = () => read('impressum/index.html');
const css = () => read('assets/css/style.css');

// ── Standortwechsel ───────────────────────────────────────────
test('index page no longer mentions the old town', () => {
  const html = index();
  assert.ok(!html.includes('Horb am Neckar'), 'index.html still contains "Horb am Neckar"');
  assert.ok(html.includes('Nagold-Hochdorf'), 'index.html missing "Nagold-Hochdorf"');
});

test('footer shows the new postal address, street unchanged', () => {
  const html = index();
  assert.ok(html.includes('Im Reesengarten 29'), 'street should stay "Im Reesengarten 29"');
  assert.ok(html.includes('72202 Nagold-Hochdorf'), 'footer missing "72202 Nagold-Hochdorf"');
  assert.ok(!html.includes('72160'), 'old PLZ 72160 still present');
});

test('Impressum (§5 TMG) carries the new address', () => {
  const html = impressum();
  assert.ok(html.includes('72202 Nagold-Hochdorf'), 'impressum missing new PLZ/Ort');
  assert.ok(html.includes('Im Reesengarten 29'), 'impressum street changed unexpectedly');
  assert.ok(!html.includes('72160'), 'impressum still shows old PLZ');
  assert.ok(!html.includes('Horb am Neckar'), 'impressum still shows old town');
});

// ── Referenzen entfernt ───────────────────────────────────────
test('Case-Studies section is removed from the homepage', () => {
  const html = index();
  assert.ok(!html.includes('class="cases"'), 'cases grid still rendered');
  assert.ok(!html.includes('Echte Projekte'), '"Echte Projekte" heading still present');
  assert.ok(!html.includes('Narrenzunft Hochdorf — Vereins-App'), 'case card still present');
});

// ── Mockups vorhanden + aufgewertet ───────────────────────────
test('both product mockups remain on the page', () => {
  const html = index();
  assert.match(html, /class="lcbm(\s|")/, 'Lokal-Content-Bot mockup missing');
  assert.match(html, /class="pa-phone(\s|")/, 'Protokoll-Assistent mockup missing');
});

test('mockups are wrapped in the new motion stage', () => {
  const html = index();
  const stages = html.match(/device-stage/g) || [];
  assert.ok(stages.length >= 2, `expected >=2 device-stage wrappers, found ${stages.length}`);
});

test('CSS defines the new motion utilities and respects reduced-motion', () => {
  const c = css();
  assert.ok(c.includes('.device-stage'), 'device-stage styles missing');
  assert.ok(/@keyframes\s+stageFloat/.test(c), 'stageFloat keyframe missing');
  assert.ok(c.includes('prefers-reduced-motion'), 'reduced-motion guard missing in CSS');
  assert.ok(c.includes('[data-reveal]'), 'scroll-reveal utility missing');
});
