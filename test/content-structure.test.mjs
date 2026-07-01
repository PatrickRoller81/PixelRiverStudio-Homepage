// TDD/DoD checks for change `content-refine-structure-and-numbers`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, '_site');
const index = () => {
  const p = join(site, 'index.html');
  assert.ok(existsSync(p), 'built index missing — run `npm run build`');
  return readFileSync(p, 'utf8');
};

test('"Was KI nicht ersetzt" sits between pain-points and own products', () => {
  const html = index();
  const iPain = html.indexOf('Kleine Probleme');
  const iKI = html.indexOf('Was KI nicht ersetzt');
  const iProd = html.indexOf('Lokal-Content-Bot'); // first section of "Eigene Produkte"
  assert.ok(iPain !== -1 && iKI !== -1 && iProd !== -1, 'anchor sections missing');
  assert.ok(iPain < iKI, '"Was KI nicht ersetzt" must come after the pain-points');
  assert.ok(iKI < iProd, '"Was KI nicht ersetzt" must come before the products');
});

test('pain-points include a 4th topic: Organisation', () => {
  const html = index();
  assert.ok(html.includes('data-wm="04"'), '4th pain tile (04) missing');
  assert.ok(html.includes('Organisation'), 'Organisation topic missing');
  const grid4 = html.match(/usp-grid--4/g) || [];
  assert.ok(grid4.length >= 1, 'pain grid not switched to a 4-up layout');
});

test('a strong lead headline sits above "Was wir bauen"', () => {
  const html = index();
  assert.ok(html.includes('class="section-lead"'), 'lead headline element missing');
  const iLead = html.indexOf('Arbeit abnimmt');
  const iBauen = html.indexOf('Was wir bauen');
  assert.ok(iLead !== -1, 'lead headline text missing');
  assert.ok(iLead < iBauen, 'lead headline must appear above "Was wir bauen"');
});

test('Mobile/Web-App offering mentions optional AI integration', () => {
  const html = index();
  // Anchor on the App-Dev USP tile (Flutter…) and require an AI-integration note there,
  // not just the unrelated price-card "KI-Funktion".
  const i = html.indexOf('Flutter für iOS');
  assert.ok(i !== -1, 'App-Dev tile not found');
  const tile = html.slice(i, i + 400);
  assert.match(tile, /KI (direkt )?in der App|KI-Funktionen direkt/i,
    'App-Dev tile should mention optional AI integration');
});

test('numbers are evidence-based and consistent (sourced time figure)', () => {
  const html = index();
  assert.match(html, /ein Drittel|600 Stunden|Stunden im Jahr/i,
    'sourced time figure (≈ one third / 600 h/yr) missing');
  // raw unsourced "~30 %" claim should be gone from the reframe section
  assert.ok(!/wiederkehrenden ~30\s*%/.test(html), 'old unsourced ~30% claim still present');
});
