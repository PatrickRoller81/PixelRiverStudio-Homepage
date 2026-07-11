# Change: hero-timegain-cinema

**Change-ID:** `hero-timegain-cinema`
**Erstellt:** 2026-07-11
**Status:** implemented
**Autor:** Coder Agent (Claude)
**Repo:** PixelRiverStudio-Homepage (100_DEV_Homepage)
**Bezug:** ersetzt das statische Vorher/Nachher aus `add-hero-keyvisual-and-mockup-polish`; Feedback Patrick 2026-07-11: „noch sehr langweilig — Kernmessage Zeitverlust vs. Zeitgewinn stärker hervorheben, clever animieren oder Kurzclip"

---

## 1. Warum
Das Hero-Key-Visual zeigt die Kernbotschaft des Studios (wiederkehrende Handarbeit
kostet Zeit → KI gibt sie zurück) nur als statische Gegenüberstellung. Sie soll als
**erzählter Loop** („Kurzclip") erlebbar werden: Dieselbe Aufgabe trifft beide Spuren
gleichzeitig — die KI-Spur ist nach Sekunden fertig und ruht sichtbar, während die
Hand-Spur den Rest des Loops weiterackert und ihre Uhr hochzählt. Am Ende stempelt
der Payoff (+2,5 Std/Woche → ≈ 16 Arbeitstage/Jahr). Umsetzung als synchronisierte
CSS-Szenerie (House-Technik der Produkt-Mockups, ein 12-s-Master-Loop) statt
Video-Datei: 0 KB Payload, CI-exakt, wartbar.

## 2. Scope
- `index.njk`: Innenleben von `.hv-compare` neu (Klassen-Skelett `hv-lane--now/--auto`,
  `hv-payoff` etc. bleibt — bestehende Tests bleiben gültig). Neu: gemeinsamer
  Auslöse-Moment („Montag 08:00 — neue Notizen & PDFs"), große Zeit-Zähler pro Spur
  (0:00→3:00 Std hochzählend vs. „12 Min ✓"), Task-Chips mit sequenziellem
  Abarbeitungs-Fortschritt, Pipeline mit wanderndem Lichtpunkt + Erledigt-Zustand
  („den Rest der Woche: Ruhe"), Payoff-Stempel mit Jahresprojektion.
- `style.css`: `hvc-*`-Regeln; ALLE Animationen mit identischer 12-s-Dauer
  (Percentage-Fenster statt Delays → verlustfreie Loop-Synchronität, kein
  Fill-Mode-Gefrickel). Farben: Zeitverlust Orange (CI-Warnfarbe), KI-Spur Blau/Cyan,
  Payoff Grün. Basiszustand ohne Animation = fertiges statisches Vergleichsbild
  (→ reduced-motion & No-JS zeigen die volle Botschaft).
- Zahlen bleiben die belegten Beispielwerte (~3 Std vs. ~12 Min, +2,5 Std/Woche);
  neu abgeleitet: ≈ 16 Arbeitstage/Jahr (2,5 × 52 ÷ 8).

### Nicht im Scope
- Kein Video/GIF (Payload, CI-Farbtreue, Wartbarkeit); keine Änderungen an
  Hero-Copy, Ticker oder anderen Sektionen.

## 3. Definition of Done
- [x] Loop erzählt: Auslöser → KI fertig (früh) → Hand ackert weiter → Payoff-Stempel
- [x] Beide Zeit-Metriken deutlich größer/prominenter als bisher
- [x] Alle neuen Animationen exakt 12 s, synchron, `infinite`
- [x] Statischer Endzustand ohne Animation vollständig lesbar (reduced-motion/No-JS)
- [x] Bestehende Hero-Tests (hv-compare/lanes/payoff/upright) bleiben grün
- [x] Keine CI-fremden Farben; `npm test` komplett grün

## 4. Tests (TDD)
`test/hero-cinema.test.mjs` gegen `_site/`: Trigger-Element, hochzählender
Uhr-Stack (≥ 4 Werte), Erledigt-Zustand der KI-Spur, Payoff-Jahresprojektion im
HTML; CSS: `hvc-`-Keyframes vorhanden, einheitliche 12-s-Dauer, Orange nur als
CI-Token, reduced-motion deckt `hvc-` ab.
