// Sicherheits-Checks am gebauten _site/: CSP-Meta, keine Inline-Skripte, kein direkter Anthropic-Aufruf.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const site = join(dirname(fileURLToPath(import.meta.url)), '..', '_site');

const walk = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

const files = () => {
  assert.ok(existsSync(site), '_site fehlt — erst `npm run build`');
  return walk(site);
};
const htmlFiles = () => files().filter((f) => f.endsWith('.html'));

test('mindestens 5 HTML-Dateien werden geprueft', () => {
  assert.ok(htmlFiles().length >= 5, `nur ${htmlFiles().length} HTML-Dateien`);
});

test('kein <script> ohne src-Attribut (Inline-Skripte)', () => {
  for (const f of htmlFiles()) {
    const html = readFileSync(f, 'utf8');
    for (const m of html.matchAll(/<script\b([^>]*)>/gi)) {
      assert.match(m[1], /\bsrc\s*=/i, `Inline-<script> in ${f}`);
    }
  }
});

test('jede HTML-Datei enthaelt das CSP-Meta', () => {
  for (const f of htmlFiles()) {
    const html = readFileSync(f, 'utf8');
    assert.match(html, /<meta http-equiv="Content-Security-Policy" content="default-src 'self'/, `CSP fehlt in ${f}`);
    assert.match(html, /script-src 'self' https:\/\/giscus\.app/, `script-src fehlt in ${f}`);
  }
});

test('api.anthropic.com kommt in _site nirgends vor', () => {
  for (const f of files().filter((x) => /\.(html|js|css|json|xml|txt)$/.test(x))) {
    assert.ok(!readFileSync(f, 'utf8').includes('api.anthropic.com'), `api.anthropic.com in ${f}`);
  }
});
