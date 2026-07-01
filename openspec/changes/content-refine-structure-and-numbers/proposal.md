# Change: content-refine-structure-and-numbers

**Change-ID:** `content-refine-structure-and-numbers`
**Erstellt:** 2026-06-30
**Status:** implemented
**Autor:** Coder Agent (Claude)
**Repo:** PixelRiverStudio-Homepage (100_DEV_Homepage)
**Bezug:** baut auf `content-time-gain-messaging` (implemented) auf

---

## 1. Warum (Feedback Patrick)
Struktur- & Zahlen-Feinschliff am Inhalt:
1. „Was KI nicht ersetzt" soll **direkt unter** „Wo wir helfen" stehen (thematischer Fluss).
2. „Wo wir helfen" braucht ein viertes Thema **Organisation** (starker LLM-Anwendungsfall).
3. Über „Was wir bauen" fehlt eine **aussagestarke Überschrift**.
4. Zahlen-Inkonsistenz: Hero „~3 Std/Woche" vs. Sektion „~30 %" → mit **belegten Zahlen**
   kohärent machen (alles in Zeit, % als belegter Anteil).
5. „Mobile Apps & Web-Apps" soll erwähnen, dass **KI integriert** werden kann.

## 2. Recherche-Basis (Quellen)
- McKinsey *Economic potential of generative AI*: 60–70 % der Arbeitszeit technisch automatisierbar.
- Asana *Anatomy of Work*: ~60 % „work about work" (Koordination/Suche), ~33 % Facharbeit.
- HR Magazine: ~636 Std/Jahr administrative Routine ≈ ein Drittel des Arbeitsjahres.
→ „rund ein Drittel / >600 Std/Jahr" ersetzt das unbelegte „~30 %"; Hero bleibt illustratives Beispiel.

## 3. Scope
- `index.njk`: Sektion „Was KI nicht ersetzt" verschieben; 4. Pain-Tile „Organisation";
  Lead-Headline über „Was wir bauen"; Sektion-Sub mit belegten Zahlen + Quellen-Fußnote;
  App-Dev-Tile um KI-Integration ergänzen.
- `style.css`: `.usp-grid--4` (auto-fit für 4 Tiles), `.section-lead` (große Opener-Headline).

## 4. Definition of Done
- [x] „Was KI nicht ersetzt" steht zwischen „Wo wir helfen" und „Eigene Produkte"
- [x] 4. Tile „Organisation" (data-wm 04) im Pain-Grid, sauber responsive
- [x] Lead-Headline über „Was wir bauen"
- [x] Belegte Zahl (≈ ein Drittel / >600 Std/Jahr) + Quellen-Fußnote; keine widersprüchlichen Werte
- [x] App-Dev-Tile nennt KI-Integration
- [x] `npm run build` + `npm test` grün

## 5. Tests (TDD)
`test/content-structure.test.mjs`: Reihenfolge, Organisation-Tile, Lead-Headline,
KI-in-Apps, belegte Zeit-Zahl.
