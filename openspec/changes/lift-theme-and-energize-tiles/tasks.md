# Tasks: lift-theme-and-energize-tiles

## TDD
- [x] T1 — `test/tiles-theme.test.mjs` (Wasserzeichen, Ambient, Tile-Lift, gerade Hero-Cards) → rot (5/5)

## Implementierung
- [x] T2 — `style.css`: Farb-Tokens angehoben (`--bg`/`--surface*`/`--border*`)
- [x] T3 — `style.css`: `body::before` Ambient-Glows (blau/cyan/lila)
- [x] T4 — `style.css`: `.usp-item` als abgehobene Card (Surface, Radius, Watermark, Bracket, Hover-Lift)
- [x] T5 — `style.css`: Hero-Cards gerade + kompakter, Spaltenverhältnis 1.2/0.8
- [x] T6 — `index.njk`: 9 Kacheln mit `data-wm` + `--accent` (blau/cyan/lila/orange/grün)
- [x] T7 — reduced-motion-Guard aktualisiert (Hero-Hover ohne Rotation)

## Done
- [x] T8 — `npm run build` + `npm test` grün (17/17)
- [x] T9 — Screenshot Desktop (Hero + Kacheln)
- [x] T10 — `graphify update .` (73 nodes, 69 edges)
