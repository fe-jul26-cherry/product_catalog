# Product catalog

Каталог телефонів, планшетів і аксесуарів з кошиком і обраним. Дизайн: Figma «Phone catalog (V2) Original Dark».

Стек: React 18, TypeScript, Vite, SCSS Modules, React Router (HashRouter), Swiper, Zustand, motion.

## Старт після клонування

```bash
git clone <адреса репо>
cd product_catalog
npm install
npm run dev
```

- `npm install` ставить усі пакети з `package.json`: React, React Router, Swiper, Zustand та інші. Окремо `npm install react-router-dom` чи інші пакети ставити не треба. Команду виконуй один раз після клонування і після кожного `git pull`, якщо змінився `package.json`.
- `npm run dev` запускає сайт локально і сам відкриває браузер. Зміни видно одразу після збереження файлу.
- Нові пакети самі не ставимо, це робить тімлід.

Що ти побачиш: усі сторінки вже відкриваються з тестовими даними з `src/mocks`. Готові атоми (кнопки, іконки, Dropdown, Pagination) і сітка товарів. Решта блоків без дизайну: це заглушки, які треба довести до вигляду з Figma. Твій блок визначено в `docs/PLAN.md`.

## Перед роботою

Прочитай `docs/TECH.md`, `docs/STRUCTURE.md`, `docs/HOW_TO_COMPONENT.md` і `CONTRIBUTING.md`.

## Ключові команди

| Коли                 | Команда                                                    |
| -------------------- | ---------------------------------------------------------- |
| Почати день          | `git checkout main`, `git pull origin main`, `npm install` |
| Нова задача          | `git checkout -b DEV-1234_short-name`                      |
| Подивитись результат | `npm run dev`                                              |
| Коміт не проходить   | `npm run fix-style`                                        |
| Перед пушем          | `npm run check`                                            |
| Запушити гілку       | `git push origin DEV-1234_short-name`                      |

Після пушу відкрий Pull Request на GitHub. Деталі: `CONTRIBUTING.md`.

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
