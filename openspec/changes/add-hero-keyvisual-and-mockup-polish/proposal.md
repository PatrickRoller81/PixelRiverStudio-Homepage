# Change: add-hero-keyvisual-and-mockup-polish

**Change-ID:** `add-hero-keyvisual-and-mockup-polish`
**Erstellt:** 2026-06-30
**Status:** implemented
**Autor:** Coder Agent (Claude)
**Repo:** PixelRiverStudio-Homepage (100_DEV_Homepage)
**Bezug:** baut auf `update-homepage-address-and-mockups` (implemented) auf

---

## 1. Warum (Motivation)

Die Hero-Sektion ist aktuell rein typografisch (stark, aber statisch). Die Design-
Referenzen (Brickly, Level) zeigen ein schwebendes, verbundenes Key-Visual neben
der Headline, das das Produktversprechen sofort visuell erzählt. Statt eine
generische SaaS-Grafik zu kopieren, übersetzen wir den **echten 3-Schritt-Flow**
des Studios (Auslöser → Verarbeitung → Aktion) in eine animierte Automations-Pipeline.
Zusätzlich werden die beiden Geräte-Mockups weiter aufgewertet.

## 2. Was ändert sich (Scope)

**A — Hero-Key-Visual**
- Hero wird auf Desktop zweispaltig: Copy links, Key-Visual rechts (mobil gestapelt).
- Key-Visual = 3 schwebende, leicht getiltete „Flow-Cards" an einer gepunkteten
  Schiene, verbunden durch einen wandernden Puls-Dot, mit Ambient-Glow + „Auto-Sync"-Node.
- Inhalt der Cards spiegelt die bestehende „So arbeiten wir"-Logik (Auslöser/Verarbeitung/Aktion).
- Rein dekorativ → `aria-hidden`, vollständig hinter `prefers-reduced-motion` ruhiggestellt.

**B — Mockup-Politur**
- `device-sheen`: dezenter, langsamer Licht-Sweep über beide Geräte.
- Weichere Szenenübergänge (Easing + leichte Skalierung) in den bestehenden Mockup-Keyframes.
- Blink-Cursor in den Eingabefeldern des Lokal-Content-Bot-Mockups.

**Out of Scope:** Neue Seiten, Backend, Inhaltsänderungen außerhalb Hero/Mockups.

## 3. Definition of Done

- [x] `.hero-visual` mit ≥3 `.hv-card` + gepunkteter Schiene rendert in `index.html`
- [x] Beide Mockups tragen `device-sheen`
- [x] Hero bleibt mobil sauber gestapelt (kein Overflow)
- [x] Alle neuen Animationen sind unter `prefers-reduced-motion` deaktiviert
- [x] `npm run build` fehlerfrei, `npm test` grün (inkl. neuer Hero-Tests)

## 4. Tests (TDD)

`test/hero-visual.test.mjs` prüft gegen `_site/index.html` + gebautes CSS:
Vorhandensein des Key-Visuals (Cards, Schiene), Sheen-Hooks auf beiden Mockups,
sowie CSS-Keyframes (`hvTravel`, `sheenSweep`) und reduced-motion-Guard.
