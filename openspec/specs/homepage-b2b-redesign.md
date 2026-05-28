# Spec: Homepage B2B Redesign
<!-- OPENSPEC:START -->
**Change-ID:** `homepage-b2b-redesign`
**Version:** 1.0.0
**Erstellt:** 2026-05-27
**Status:** implemented
**Autor:** Coder Agent (Claude)
**Repo:** PixelRiverStudio-Homepage (100_DEV_Homepage)

---

## 1. Ziel & Scope

Transformation der bestehenden Gaming-DevLog-Seite hin zu einer hochprofessionellen
**B2B-Landingpage** für KI-gestützte Softwareentwicklung auf Basis von Eleventy (11ty) + Netlify.
Das Spiel dient als technologisches Aushängeschild, steht aber nicht im Vordergrund.

**Out of Scope:** Backend-Logik, CMS-Integration, Authentifizierung.

---

## 2. Informations-Architektur

```
/ (index)              → B2B Studio-Landingpage (Hauptziel: Leads)
/lokal-content-bot/    → SaaS-Demo-Tool (KI-Content-Generator)
/gaming/               → Dev-Log + Spielinfos (bestehend, überarbeitet)
/impressum/            → Rechtlich (bereits vorhanden)
```

---

## 3. Seitenspezifikationen

### 3.1 `/` — B2B Studio-Startseite

| Sektion | Inhalt | Priorität |
|---|---|---|
| **Navigation** | Logo + Links: Lokal-Content-Bot · /gaming · Kontakt | P0 |
| **Hero** | H1: "Intelligente Web-Apps & KI-Agenten für Ihr Business" · Subline: Zeitersparnis durch KI-Orchestrierung · CTA Primär → Calendly · CTA Sekundär → /lokal-content-bot | P0 |
| **USPs** | 3-Spalten-Grid: KI-Entwicklung · Mobile Apps · Automatisierung | P1 |
| **Product Teaser** | Card „Lokal-Content-Bot" — Input-Feld Mockup + 2 Output-Boxen (Blog / Social Media) | P1 |
| **Case Studies** | 2 Karten: „Vereins-App NZ Hochdorf" [In Produktion] · „KMU Marketing-Automatisierung" [Erfolgreich skaliert] | P1 |
| **Gaming Teaser** | Kontrastsektion: Mobile Gaming & AI Deep Tech · Link → /gaming | P2 |
| **Footer** | Impressum · Datenschutz · Copyright | P0 |

**Design-Tokens:**
- Hintergrund: `bg-slate-950` (Dark Mode)
- Text: `text-slate-100`
- Akzent 1: `indigo-500` (Buttons, Highlights)
- Akzent 2: `cyan-400` (Hover-Effekte, Tags)
- CSS-Framework: **Tailwind CSS via CDN** (kein Build-Step nötig)

### 3.2 `/lokal-content-bot/`

| Element | Beschreibung |
|---|---|
| Headline | "KI-Content auf Knopfdruck für lokale Unternehmen" |
| Input | Freitext-Feld: Thema / Dienstleistung eingeben |
| Submit | Button → POST an n8n-Webhook (URL via `.env` / Netlify Env) |
| Output-Box 1 | SEO-Blogpost (Ergebnis vom Webhook) |
| Output-Box 2 | Instagram Caption (Ergebnis vom Webhook) |
| Loading-State | Button-Text ändert sich: "KI-Agenten arbeiten..." |
| Error-State | Rote Fehlermeldung bei Verbindungsproblem |

**Technische Anforderung:** n8n-Webhook-URL via `window.N8N_WEBHOOK_URL` (wird per
Netlify-Env-Variable injiziert, nicht hardcoded).

### 3.3 `/gaming/`

Bestehenden DevLog (`src/devlog/`) übernehmen und als `/gaming/` Unterseite ausliefern.
URL-Umleitung: `/devlog/*` → `/gaming/*` (301, via `netlify.toml`).

---

## 4. Tech-Stack & Constraints

| Layer | Technologie | Version |
|---|---|---|
| Static Site Generator | Eleventy (11ty) | ^3.0.0 |
| CSS Framework | Tailwind CSS via CDN | latest |
| Template Language | Nunjucks (.njk) | via 11ty |
| Deployment | Netlify | Auto-Deploy main branch |
| Node.js | 20.x | (Netlify Env) |
| Webhook-Proxy | n8n (extern) | — |

**Constraints:**
- Kein TypeScript, kein Build-Step für CSS (CDN genügt für MVP)
- Kein CMS — Inhalte direkt in Templates (Stand MVP)
- DSGVO: Kein Google Analytics, kein Tracking ohne Consent
- Alle externen Links (Calendly etc.) als Env-Variablen haltbar

---

## 5. Dateistruktur (Soll-Zustand)

```
100_DEV_Homepage/
├── .gitignore                     ← erweitert (openspec, graphify, repomix)
├── .graphifyignore                ← neu
├── .eleventyignore                ← vorhanden
├── .eleventy.js                   ← ggf. anpassen (gaming-Route)
├── netlify.toml                   ← 301-Redirect devlog→gaming
├── package.json
├── repomix.config.json            ← neu
├── openspec/
│   └── specs/
│       └── homepage-b2b-redesign.md   ← diese Datei
└── src/
    ├── _includes/
    │   └── base.njk               ← Layout-Vorlage (Dark Mode, Tailwind CDN)
    ├── assets/
    │   ├── css/style.css          ← Custom Overrides (minimal)
    │   └── img/logo.svg
    ├── index.njk                  ← B2B Startseite (neu)
    ├── lokal-content-bot/
    │   └── index.njk              ← SaaS Demo-Tool (neu)
    ├── gaming/
    │   └── index.njk              ← DevLog-Hub (umbenannt von devlog/)
    ├── devlog/
    │   └── posts/                 ← bleibt, wird von gaming/ referenziert
    ├── impressum.njk
    └── leistungen.njk
```

---

## 6. Akzeptanzkriterien (Definition of Done)

- [ ] `/` zeigt B2B Hero + alle Sektionen korrekt im Dark Mode
- [ ] `/lokal-content-bot/` rendert Input-Feld, sendet an Webhook, zeigt Ergebnis
- [ ] `/gaming/` zeigt DevLog-Posts (Eleventy-Collections)
- [ ] Netlify: `npm run build` schlägt nicht fehl
- [ ] Keine Hard-coded URLs — alles über Env-Variablen oder Config
- [ ] Impressum + Datenschutz-Links im Footer gesetzt
- [ ] Responsive: Mobile + Desktop
- [ ] Lighthouse Performance ≥ 90 (statisch, kein Tracking)

---

## 7. Offene Fragen / Entscheidungen für Patrick

| # | Frage | Default (wenn keine Antwort) |
|---|---|---|
| 1 | Calendly-Link für Hero-CTA? | Platzhalter `#kontakt` |
| 2 | n8n-Webhook-URL für Content-Bot? | Platzhalter in Kommentar |
| 3 | Logo: `.svg` schon final oder noch anpassen? | Bestehendes nutzen |
| 4 | `leistungen.njk` behalten oder in Homepage integrieren? | Als eigene Seite behalten |
| 5 | Datenschutz-Seite: eigene `.njk` oder extern (z.B. Datenschutz-Generator)? | Eigene `.njk` anlegen |

<!-- OPENSPEC:END -->
