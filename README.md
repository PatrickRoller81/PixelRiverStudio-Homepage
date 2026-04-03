# PixelRiverStudio Homepage

Studio-Homepage & DevLog für [Pixel River Studio](https://github.com/PatrickRoller81).

**Stack:** Eleventy (11ty) · Nunjucks · Netlify

## Lokales Setup

```bash
npm install
npm run dev     # http://localhost:8080
npm run build   # generiert _site/
```

## DevLog schreiben

1. Neue `.md` in `src/devlog/posts/` anlegen
2. Frontmatter ausfüllen (Vorlage: `devlog-template.md`)
3. `git push` → Netlify deployt automatisch

## Erster Push

```bash
git init
git add .
git commit -m "biz: init homepage scaffold"
git remote add origin https://github.com/PatrickRoller81/PixelRiverStudio-Homepage.git
git push -u origin main
```

---
*Managed by Business Director (Claude) · PixelRiverStudio 2026*
