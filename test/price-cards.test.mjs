// TDD/DoD checks for change `energize-price-cards`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, '_site');
const css = () => {
  const p = join(site, 'assets/css/style.css');
  assert.ok(existsSync(p), 'built CSS missing — run `npm run build`');
  return readFileSync(p, 'utf8');
};

test('price cards are rounded, lifted cards', () => {
  const c = css();
  assert.match(c, /\.price-card\s*\{[^}]*border-radius/, 'price-card needs border-radius');
});

test('price cards lift on hover like the USP tiles', () => {
  const c = css();
  assert.match(c, /\.price-card:hover\s*\{[^}]*translateY/, 'price-card hover should lift (translateY)');
});

test('price grid no longer uses the flat 1px shared-border grid', () => {
  const c = css();
  const m = c.match(/\.price-grid\s*\{[^}]*\}/);
  assert.ok(m, 'price-grid rule missing');
  assert.ok(!/gap:\s*1px/.test(m[0]), 'price-grid should use a real gap, not 1px hairlines');
});
