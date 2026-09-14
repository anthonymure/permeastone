# PermeaStone

Site vitrine premium pour PermeaStone (revêtements de sols extérieurs perméables, hôtellerie & hospitalité).

Le cadrage complet du projet (positionnement de marque, identité graphique, structure du site, stack technique, roadmap) est documenté dans [`CLAUDE.md`](./CLAUDE.md) — à lire avant toute contribution.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS (design tokens de marque déclarés dans `src/app/globals.css`)
- Sanity.io (CMS headless — à configurer, voir `CLAUDE.md` §6)

## Développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run start` — sert le build de production
- `npm run lint` — ESLint
