# Change: update-homepage-address-and-mockups

**Change-ID:** `update-homepage-address-and-mockups`
**Erstellt:** 2026-06-30
**Status:** implemented
**Autor:** Coder Agent (Claude)
**Repo:** PixelRiverStudio-Homepage (100_DEV_Homepage)
**Bezug:** baut auf `homepage-b2b-redesign` (implemented) auf

---

## 1. Warum (Motivation)

Drei zusammenhängende Pflege-/Politur-Aufgaben an der bestehenden B2B-Landingpage:

1. **Standortwechsel:** Das Studio zieht von `72160 Horb am Neckar` nach
   `72202 Nagold-Hochdorf`. Die Straße (`Im Reesengarten 29`) bleibt unverändert.
   Betrifft Impressum (§ 5 TMG), Footer und alle kundenseitigen Ortsangaben.
2. **Referenzen vorübergehend entfernen:** Die Sektion „Referenzen / Echte Projekte"
   (Case-Study-Karten) wird entfernt und später überarbeitet wieder aufgenommen.
3. **Mockups aufwerten:** Die beiden Produkt-Mockups (Lokal-Content-Bot,
   Protokoll-Assistent) erhalten hochwertigere, ruhige Motion (Ambient-Glow,
   sanftes Schweben, Device-Tilt) plus dezente Scroll-Reveal-Motion site-weit —
   im Stil der Design-Benchmarks (Refokus-Motion, Brickly/Level-Glow).

## 2. Was ändert sich (Scope)

- `src/_includes/base.njk` — Footer-Adresse + Meta-Description-Default
- `src/impressum.njk` — PLZ/Ort in der TMG-Anschrift
- `src/index.njk` — Ortsangaben (Hero-Sub, Ticker, Meta), Entfernen der
  Case-Studies-Sektion, aufgewertete Mockup-Markup-Hooks
- `src/assets/css/style.css` — Motion-Utilities (Glow, Float, Tilt, Reveal)

**Out of Scope:** Inhaltliche Neufassung der Referenzen (separater späterer Change),
neue Seiten, Backend, historische DevLog-Posts (Archiv bleibt unverändert).

## 3. Definition of Done

- [x] Keine kundenseitige Seite enthält mehr `Horb am Neckar` (Archiv-DevLogs ausgenommen)
- [x] Impressum + Footer zeigen `72202 Nagold-Hochdorf`, Straße unverändert
- [x] Case-Studies-Sektion (`.cases`, „Echte Projekte") ist aus `index.html` entfernt
- [x] Beide Mockups bleiben vorhanden und tragen die neuen Motion-Hooks
- [x] `prefers-reduced-motion` deaktiviert alle neuen Animationen
- [x] `npm run build` läuft fehlerfrei
- [x] `npm test` (Node test runner) ist grün

## 4. Tests (TDD)

`test/homepage.test.mjs` prüft gegen das gebaute `_site/`:
Adress-Umzug, Entfernung der Referenzen, Vorhandensein der Mockups inkl.
neuer Motion-Hooks, und dass `Horb am Neckar` auf Kernseiten verschwunden ist.
