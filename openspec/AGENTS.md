<!-- OPENSPEC:START -->
# OpenSpec Instructions — PixelRiverStudio Homepage

Dieses Repo nutzt **OpenSpec** für Spec-Driven Development (SDD).
AI-Agents: Coder Agent (Claude)

## Wann OpenSpec nutzen?

Diese Datei öffnen wenn:
- Neue Sektionen oder Seiten geplant werden
- Design-Tokens oder Layout-Struktur sich ändern
- Neue API-Anbindungen (Webhooks, n8n) diskutiert werden

## Slash Commands (in Claude / Cursor)

```
/opsx:propose <name>   → Proposal + Specs + Design + Tasks erzeugen
/opsx:apply            → Tasks aus aktuellem Proposal ausführen
/opsx:archive          → Abgeschlossenes Change in Main-Specs mergen
/opsx:explore          → Codebase erkunden, bevor geplant wird
```

## Lokales Setup (einmalig)

```bash
npm install -g @fission-ai/openspec@latest
# Im Repo-Verzeichnis:
openspec init --tools claude,cursor --profile core
```

## Scope dieses Repos

| Bereich | Zuständigkeit |
|---|---|
| `/` (index) | B2B Studio-Landingpage |
| `/lokal-content-bot/` | SaaS Demo-Tool (n8n-Webhook) |
| `/gaming/` | Dev-Log + Spielinfos |
| `/impressum/` | Rechtliches (DSGVO) |

## Aktive Specs

| Change-ID | Datei | Status |
|---|---|---|
| `homepage-b2b-redesign` | `specs/homepage-b2b-redesign.md` | approved |

## Konventionen

- Change-IDs: kebab-case, verb-led → `add-contact-form`, `update-hero-copy`
- Specs leben im Repo (`openspec/specs/`) — nicht nur im Chat
- Keine Code-Implementation ohne abgenommenen Spec
<!-- OPENSPEC:END -->
