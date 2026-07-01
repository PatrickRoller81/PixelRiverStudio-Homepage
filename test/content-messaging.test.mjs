// TDD/DoD checks for change `content-time-gain-messaging`.
// Verifies the time-gain thesis, the "Was KI nicht ersetzt" section,
// the per-pain time-gain lines, and that AI fear is openly addressed.
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

test('hero carries the time-gain thesis line', () => {
  const html = index();
  assert.ok(html.includes('hero-thesis'), 'hero-thesis element missing');
  assert.match(html, /Ihre Zeit|Zeit (zurück|gehört)/i, 'thesis must frame time gained');
});

test('dedicated "Was KI nicht ersetzt" section openly disarms the fear', () => {
  const html = index();
  assert.ok(html.includes('Was KI nicht ersetzt'), 'fear-reframe section heading missing');
  // openly name the fear: replacement / control vocabulary
  assert.match(html, /ersetzt|Kontrolle|entscheid/i, 'fear is not openly addressed');
});

test('pain points show what the gained time enables', () => {
  const html = index();
  const gains = html.match(/usp-gain/g) || [];
  assert.ok(gains.length >= 3, `expected >=3 usp-gain lines, found ${gains.length}`);
});

test('augmentation framing present (human keeps the high-value share)', () => {
  const html = index();
  assert.match(html, /Beziehung|Urteil|Kreativität|unersetz/i,
    'human-irreplaceable framing missing');
});

test('time savings are quantified somewhere on the page', () => {
  const html = index();
  assert.match(html, /Std\s*\/?\s*Woche|Stunden pro Woche|Min\s*\/?\s*Woche/,
    'no quantified time saving on the page');
});
