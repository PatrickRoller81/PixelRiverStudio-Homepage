<!-- OPENSPEC:START -->
# OpenSpec Instructions — PixelRiverStudio

Dieses Repo nutzt **OpenSpec** für Spec-Driven Development (SDD).
AI-Agents: Claude COO · Antigravity · Cursor

## Wann OpenSpec nutzen?

Diese Datei öffnen wenn:
- Planning, Proposals oder neue Capabilities diskutiert werden
- Neue Workflows, Änderungen an der Pipeline oder BIZ-Prozesse geplant sind
- Ambiguität besteht und ein Spec-Dokument vor dem Coden Klarheit schafft

## Slash Commands (in Claude / Antigravity / Cursor)

```
/opsx:propose <name>   → Proposal + Specs + Design + Tasks erzeugen
/opsx:apply            → Tasks aus aktuellem Proposal ausführen
/opsx:archive          → Abgeschlossenes Change in Main-Specs mergen
/opsx:explore          → Codebase erkunden, bevor geplant wird
```

## Lokales Setup (einmalig)

```bash
npm install -g @fission-ai/openspec@latest
# Im jeweiligen Repo-Verzeichnis:
openspec init --tools claude,cursor,antigravity --profile core
```

## Scope je Repo

| Repo                        | OpenSpec-Scope                                  |
|-----------------------------|-------------------------------------------------|
| PixelRiverStudio-Management | BIZ, Issues, Client-Onboarding, SKILLs          |
| RiverTycoon                 | Game-Features, EPIC-Planning, Unity-Architektur |
| PixelRiverStudio-Homepage   | Web-Content, Blog-Snippets, CD-Updates          |

## Konventionen

- Change-IDs: kebab-case, verb-led → `add-graphiti`, `update-nzh-scope`
- Specs leben im Repo (`openspec/specs/`) — nicht nur im Chat
- Keine Code-Implementation ohne abgenommenen Spec
<!-- OPENSPEC:END -->
