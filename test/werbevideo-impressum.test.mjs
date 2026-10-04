// TDD/DoD checks for change `werbevideo-steuernummer-devlog08` (2026-10-04).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, '_site');
const read = (rel) => {
  const p = join(site, rel);
  assert.ok(existsSync(p), `${rel} missing — run \`npm run build\``);
  return readFileSync(p, 'utf8');
};

test('homepage embeds the studio promo video with poster and anchor', () => {
  const html = read('index.html');
  assert.ok(html.includes('id="werbevideo"'), 'anchor #werbevideo missing');
  assert.match(html, /<video[^>]*poster="\/assets\/video\/pixelriverstudio-werbevideo-poster\.jpg"/);
  assert.ok(html.includes('src="/assets/video/pixelriverstudio-werbevideo.mp4"'), 'video source missing');
  assert.match(html, /<video[^>]*preload="none"/, 'video must not preload (13 MB)');
});

test('video files are published to _site', () => {
  for (const f of ['pixelriverstudio-werbevideo.mp4', 'pixelriverstudio-werbevideo-poster.jpg']) {
    const p = join(site, 'assets/video', f);
    assert.ok(existsSync(p) && statSync(p).size > 0, `${f} not copied to _site`);
  }
});

test('Werbevideo is offered as a service and as a price card', () => {
  const html = read('index.html');
  assert.ok(html.includes('data-wm="04"') && html.includes('04 — Motion'), 'Was-wir-bauen tile missing');
  const i = html.indexOf('id="leistungen"');
  assert.ok(i !== -1);
  const prices = html.slice(i);
  assert.match(prices, /price-name">Werbevideo[\s\S]*?price-val">auf Anfrage/, 'price card missing');
});

test('nav links to the video', () => {
  assert.ok(read('index.html').includes('href="/#werbevideo"'), 'nav link missing');
});

test('Impressum: no tax numbers published, current law references', () => {
  const html = read('impressum/index.html');
  assert.ok(!html.includes('45255/35754') && !/Steuernummer/.test(html), 'Steuernummer must not be published (decision 2026-10-04)');
  assert.ok(html.includes('§ 5 DDG'), 'should reference § 5 DDG (TMG replaced 2024)');
  assert.ok(!html.includes('ec.europa.eu/consumers/odr'), 'EU-OS platform link is obsolete (closed 2025)');
});

test('DevLog has one entry per month: #8 August, #9 September, #10 Oktober', () => {
  for (const [slug, nr] of [['2026-08-devlog-08', 8], ['2026-09-devlog-09', 9], ['2026-10-devlog-10', 10]]) {
    const html = read(`gaming/posts/${slug}/index.html`);
    assert.ok(html.includes(`DevLog #${nr}`), `${slug} should be DevLog #${nr}`);
  }
});

test('DevLog images exist and are lazy-loaded with dimensions', () => {
  for (const slug of ['2026-08-devlog-08', '2026-09-devlog-09', '2026-10-devlog-10']) {
    const html = read(`gaming/posts/${slug}/index.html`);
    const imgs = [...html.matchAll(/<img [^>]*src="(\/assets\/img\/devlog\/[^"]+)"[^>]*>/g)];
    assert.ok(imgs.length >= 2, `${slug}: at least two images expected`);
    for (const [tag, src] of imgs) {
      assert.ok(existsSync(join(site, src)), `${src} missing in _site`);
      assert.match(tag, /loading="lazy"/, `${src} should be lazy`);
      assert.match(tag, /width="\d+" height="\d+"/, `${src} needs width/height`);
      assert.match(tag, /alt="[^"]+"/, `${src} needs alt text`);
    }
  }
});

test('ticker cannot widen the page on phones', () => {
  const css = readFileSync(join(site, 'assets/css/style.css'), 'utf8');
  assert.match(css, /\.ticker-wrap\s*\{[^}]*contain:\s*paint/, 'ticker-wrap should contain its paint');
  assert.match(css, /body\s*\{[^}]*overflow-x:\s*clip/, 'body should clip horizontal overflow');
});
