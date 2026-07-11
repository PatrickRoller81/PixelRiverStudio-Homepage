# Change: elevate-visual-polish

**Change-ID:** `elevate-visual-polish`
**Erstellt:** 2026-07-11
**Status:** implemented
**Autor:** Coder Agent (Claude)
**Repo:** PixelRiverStudio-Homepage (100_DEV_Homepage)
**Bezug:** baut auf `lift-theme-and-energize-tiles`, `energize-price-cards`, `add-hero-keyvisual-and-mockup-polish` (alle implemented) auf

---

## 1. Warum
Die Seite wirkt nach dem letzten Redesign solide, aber statisch: Scroll-Reveal
existiert nur auf 5 Elementen, der Einstieg (Hero) erscheint ohne Entrance,
Akzentfarben stehen isoliert nebeneinander statt ineinanderzugreifen. Ziel:
ein hochwertigerer, „lebendiger" Gesamteindruck durch Motion + Farbzusammenspiel —
**strikt innerhalb der CI v1.0.0** (Farb-Tokens, Syne/JetBrains Mono, Dark only,
keine neuen Farben, keine Layout-/Inhaltsänderung).

## 2. Scope

### Motion (alle hinter `prefers-reduced-motion` + `.js`-Gate)
- **Hero-Entrance:** gestaffeltes Fade-up für Tag → H1 → Sub → These → Buttons → Key-Visual beim Laden.
- **Scroll-Reveal flächendeckend:** `data-reveal` auf alle Sektions-Header; neue Variante `data-reveal="stagger"` auf Grids (USP, „Wo wir helfen", „Was KI nicht ersetzt", „So arbeiten wir", Preise) — Kinder erscheinen mit 60–80 ms Versatz.
- **Scroll-Progress-Bar** unter dem sticky Header (1px-Linie, Blau→Cyan-Verlauf, JS `scaleX`).
- **Ticker:** weiche Kanten via `mask-image`, Pause bei Hover.
- **Nav-Links:** animierte Unterstreichung (scaleX) statt nur Farbwechsel.
- **Ambient-Layer:** sehr langsamer Drift (~40 s) des vorhandenen `body::before`-Glows.
- **Highlight-Preiskarte:** dezentes „Atmen" des blauen Glow-Rings (~6 s).

### Farbzusammenspiel (nur vorhandene CI-Akzente Blau/Cyan/Purple/Grün)
- **Hero-Accent-Zeile** als Blau→Cyan-Textverlauf (`background-clip: text`).
- **CTA-Strip** mit animiertem Verlaufs-Rahmen (Blau→Cyan→Purple, langsame Rotation; statischer Verlauf als Fallback).
- **Karten-Hover-Glow** in der jeweiligen Akzentfarbe (`color-mix`, hinter `@supports`).
- **Section-Label-Linie** als Blau→Cyan-Mikroverlauf.
- **Detail-Polish:** `::selection` in Blau-Dim, dezente dunkle Scrollbar, globales `:focus-visible` in Blau, Hover-Lift für DevLog-Karten.

### Nicht im Scope
- Keine 3D-Modelle (CSS-Mockups vorhanden; 3D-Assets brächten Payload/Perf-Kosten ohne Mehrwert für die Botschaft).
- Keine Inhalts-, Preis- oder Strukturänderungen; keine neuen Farben/Fonts.

## 3. Definition of Done
- [x] Hero-Entrance gestaffelt, nur mit JS aktiv, reduced-motion-sicher
- [x] Alle Hauptsektionen haben Scroll-Reveal, Grids gestaffelt
- [x] Scroll-Progress-Bar sichtbar und scroll-synchron
- [x] CTA-Strip mit CI-Farbverlaufs-Rahmen, Hero-Accent mit Textverlauf
- [x] Ticker maskiert + pausierbar, Nav-Underline animiert
- [x] `prefers-reduced-motion` deaktiviert ALLE neuen Animationen
- [x] Keine neuen Hex-Farben außerhalb der CI-Token-Palette
- [x] `npm test` grün (bestehende 32 + neue Tests)

## 4. Tests (TDD)
`test/visual-polish.test.mjs` gegen gebautes `_site/`:
Hero-Entrance-Keyframes + `.js`-Gate; Stagger-Regeln mit nth-child-Delays;
`data-reveal`-Abdeckung im HTML (≥ 10 Vorkommen, inkl. `stagger`-Variante);
Scroll-Progress-Element + Verlauf; CTA-Border-Verlauf; Ticker-Mask + Hover-Pause;
`::selection`/`:focus-visible`; reduced-motion-Block deckt neue Animationen ab;
keine CI-fremden Hex-Farben in neuen Regeln.
