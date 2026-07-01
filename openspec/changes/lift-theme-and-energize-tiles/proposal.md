# Change: lift-theme-and-energize-tiles

**Change-ID:** `lift-theme-and-energize-tiles`
**Erstellt:** 2026-06-30
**Status:** implemented
**Autor:** Coder Agent (Claude)
**Repo:** PixelRiverStudio-Homepage (100_DEV_Homepage)
**Bezug:** baut auf `add-hero-keyvisual-and-mockup-polish` (implemented) auf

---

## 1. Warum (Motivation)

Feedback Patrick: Hero-Cards gerade & kleiner; Gesamtbild „etwas sehr dunkel";
die Kachel-Raster (USP „Was wir bauen", Pain-Points „Wo wir helfen", „So arbeiten
wir") wirken langweilig. Ursache: `.usp-item` hat exakt die Canvas-Farbe `--bg` —
die Tiles verschwinden im flachen Schwarz. Ziel: Tiefe & Lebendigkeit, ohne die
„Dark only"-CI aufzugeben.

## 2. Was ändert sich (Scope)

**A — Hero-Feinschliff**
- Flow-Cards gerade (kein Tilt), kompakter; Hero-Spaltenverhältnis zugunsten der Typo.

**B — Theme-Lift (Tiefe)**
- Farb-Tokens minimal angehoben (`--bg`, `--surface*`, `--border*`).
- `body::before`: fixierte, sehr dezente Ambient-Glows (blau oben, cyan seitlich)
  → flaches Schwarz wird zu räumlicher Tiefe.

**C — Kacheln energetisieren**
- `.usp-item`: eigene Surface-Farbe (hebt sich vom Canvas ab).
- Pro Kachel `--accent` (Farbe) + `data-wm` (große, blasse Wasserzeichen-Nummer).
- Akzent-Eck-Bracket; Hover = Lift + Akzent-Glow + Akzent-Border + Wasserzeichen-Brighten.
- Nummern-Label nutzt `--accent` statt Einheits-Blau.

**Out of Scope:** Inhaltsänderungen, neue Sektionen, Light-Theme.

## 3. Definition of Done

- [x] Hero-Cards ohne Rotation, sichtbar kompakter
- [x] Mind. 9 Kacheln tragen `data-wm` + `--accent`
- [x] Kacheln heben sich farblich vom Canvas ab (Surface ≠ bg)
- [x] Ambient-Tiefe via `body::before`
- [x] Hover-Lift + reduced-motion bleibt respektiert
- [x] `npm run build` fehlerfrei, `npm test` grün

## 4. Tests (TDD)

`test/tiles-theme.test.mjs` prüft `_site/index.html` + CSS: Wasserzeichen-Hooks
(`data-wm` ≥9, `attr(data-wm)` im CSS), Ambient-Layer (`body::before`),
Tile-Surface-Abhebung und Hover-Lift.
