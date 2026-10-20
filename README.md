# Product catalog

A catalog of phones, tablets and accessories with a cart and favourites. Design: Figma "Phone catalog (V2) Original Dark".

Stack: React 18, TypeScript, Vite, SCSS Modules, React Router (HashRouter), Swiper, Zustand, motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Before you start

Read `docs/TECH.md`, `docs/STRUCTURE.md`, `docs/HOW_TO_COMPONENT.md` and `CONTRIBUTING.md`.

## Scripts

| Command                | What it does                                   |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | dev server                                     |
| `npm run build`        | type check and production build                |
| `npm run preview`      | preview the production build                   |
| `npm run typecheck`    | type check only                                |
| `npm run lint`         | ESLint                                         |
| `npm run format:check` | Prettier check                                 |
| `npm run check`        | types, ESLint, Prettier and build all together |
| `npm run fix-style`    | auto-fix ESLint and Prettier issues            |

## Automation

- Pre-commit: ESLint and Prettier on changed files.
- Pull requests: GitHub Actions checks types, ESLint and Prettier (the "Lint" check).
- Push to `main`: deploy to GitHub Pages from the `gh-pages` branch.

## Documentation

- `docs/TECH.md`: the technologies in plain words.
- `docs/STRUCTURE.md`: structure, rules, stages, data.
- `docs/HOW_TO_COMPONENT.md`: how to write a component.
- `docs/PLAN.md`: roadmap, priorities and schedule.
- `docs/design-grid.md`: breakpoints and grid.
- `CONTRIBUTING.md`: branches, commits, pull requests, code review.
