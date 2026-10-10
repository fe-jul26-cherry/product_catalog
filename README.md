# Product catalog

Каталог телефонів, планшетів і аксесуарів з кошиком і обраним. Дизайн: Figma «Phone catalog (V2) Original Dark».

Стек: React 18, TypeScript, Vite, SCSS Modules, React Router (HashRouter), Swiper, Zustand, motion.

## Старт

```bash
npm install
npm run dev
```

Відкрий http://localhost:5173.

## Перед роботою

Прочитай `docs/TECH.md`, `docs/STRUCTURE.md`, `docs/HOW_TO_COMPONENT.md` і `CONTRIBUTING.md`.

## Скрипти

| Команда                | Що робить                             |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | dev-сервер                            |
| `npm run build`        | перевірка типів і збірка              |
| `npm run preview`      | перегляд зібраної версії              |
| `npm run typecheck`    | лише перевірка типів                  |
| `npm run lint`         | ESLint                                |
| `npm run format:check` | перевірка Prettier                    |
| `npm run check`        | типи, ESLint, Prettier і збірка разом |
| `npm run fix-style`    | автовиправлення ESLint і Prettier     |

## Автоматизація

- Pre-commit: ESLint і Prettier на змінених файлах.
- PR: GitHub Actions перевіряє типи, ESLint і Prettier (check «Lint»).
- Пуш у `main`: деплой на GitHub Pages з гілки `gh-pages`.

## Документація

- `docs/TECH.md`: технології простими словами.
- `docs/STRUCTURE.md`: структура, правила, етапи, дані.
- `docs/HOW_TO_COMPONENT.md`: як писати компонент.
- `docs/PLAN.md`: розподіл задач і графік по днях.
- `docs/design-grid.md`: брейкпоінти і сітка.
- `CONTRIBUTING.md`: гілки, коміти, PR, ревʼю, розподіл.
