# Change: energize-price-cards

**Change-ID:** `energize-price-cards`
**Erstellt:** 2026-06-30
**Status:** implemented
**Autor:** Coder Agent (Claude)
**Repo:** PixelRiverStudio-Homepage (100_DEV_Homepage)
**Bezug:** baut auf `lift-theme-and-energize-tiles` (implemented) auf

---

## 1. Warum
Die Preis-Karten (`price-grid`) stehen noch im alten flachen 1px-Gitter-Stil und
fallen optisch gegenüber den neu aufgewerteten USP-Kacheln ab. Sie sollen aufs
gleiche Card-Niveau gehoben werden (Tiefe, Hover-Lift, Akzent), damit die Sektion
konsistent wirkt.

## 2. Scope
- `style.css`: `.price-grid` als separierte, abgerundete Cards (kein 1px-Gitter);
  Hover-Lift + Schatten; `.price-card.highlight` behält stärkere Akzentbetonung.
- Keine Inhalts- oder Preisänderung.

## 3. Definition of Done
- [x] Preis-Karten haben Radius + heben sich vom Canvas ab
- [x] Hover-Lift wie bei den USP-Kacheln
- [x] Highlight-Karte bleibt klar hervorgehoben
- [x] `npm test` grün

## 4. Tests (TDD)
`test/price-cards.test.mjs`: `.price-card` Radius + `.price-card:hover` Lift im CSS.
