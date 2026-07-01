# Change: content-time-gain-messaging

**Change-ID:** `content-time-gain-messaging`
**Erstellt:** 2026-06-30
**Status:** implemented
**Autor:** Coder Agent (Claude)
**Repo:** PixelRiverStudio-Homepage (100_DEV_Homepage)
**Bezug:** baut auf `energize-price-cards` (implemented) auf

---

## 1. Warum (Motivation + Research)

Die Hero-Keys sind gestalterisch stark, aber inhaltlich flach. Zielgruppe (Vereine,
kleine Unternehmen) hat reale **KI-Angst**: APA *Work in America 2024* → 41 % sorgen
sich um Job-Obsoleszenz; größte Sorge in Worker-Surveys ist fehlendes **Vertrauen**
(45 %), nicht Jobverlust (23 %). Wirksames Reframing (SHRM, Augmentation-Forschung):
KI als **Ergänzung statt Ersatz**, Betonung von **Zeitgewinn**, **Kontrolle** und den
unersetzlichen menschlichen Anteilen (70/30-Regel). Belege: Adobe/Salesforce SMB-Daten
(~175 Std/Jahr bei Social-Content gespart, >10 Std/Woche durch Automatisierung).

**Kernbotschaft (Thesis):**
> Nicht besser gemacht. Schneller und immer gleich — damit Ihre Zeit wieder Ihnen gehört.

## 2. Was ändert sich (Scope) — ganze Seite, Angst offen ansprechen

- **Hero-Visual:** ersetzt die Single-Pipeline durch einen **Zwei-Zustände-Vergleich**
  („Heute · manuell" vs. „Mit Automatisierung") inkl. Zeit-Metriken + Payoff (Zeit zurück).
- **Hero-Copy:** Thesis-Zeile ergänzt (`hero-thesis`).
- **„Wo wir helfen":** je Schmerzpunkt eine **Zeitgewinn-Zeile** (`usp-gain`).
- **„So arbeiten wir":** Autonomie/Kontrolle betont (Mensch in der Schleife).
- **NEU „Was KI nicht ersetzt":** eigene Sektion, benennt die Angst offen und entkräftet
  sie (Beziehung · Urteil · Kreativität = die menschlichen 70 %).
- **Eigene Produkte / Preise / Trust:** Nutzen als gesparte Zeit + EU/DSGVO/Kontrolle.

**Out of Scope:** Neue Seiten, Backend, Layout-Tokens (bereits erledigt).

## 3. Definition of Done

- [x] Hero zeigt Vorher/Nachher-Vergleich (zwei Lanes + Payoff), `aria-hidden`
- [x] Hero-Thesis-Zeile sichtbar
- [x] Sektion „Was KI nicht ersetzt" mit 3 Kacheln vorhanden
- [x] Schmerzpunkte tragen Zeitgewinn-Zeilen
- [x] Angst wird offen benannt (Wort „ersetzt"/„Kontrolle") und positiv gewendet
- [x] Alle neuen Animationen unter `prefers-reduced-motion` deaktiviert
- [x] `npm run build` fehlerfrei, `npm test` grün (Tests an neue Hero-Struktur angepasst)

## 4. Tests (TDD)

- `test/hero-visual.test.mjs` (umgeschrieben): Zwei-Lane-Vergleich, Sheen, CSS-Vertrag.
- `test/content-messaging.test.mjs` (neu): Thesis, „Was KI nicht ersetzt", Zeitgewinn,
  offenes Ansprechen der Angst.
