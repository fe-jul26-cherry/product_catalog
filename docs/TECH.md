# Technologies: what to learn and why

You do not need to read everything. Each technology has a "minimum" that is enough for this project.

## At a glance

| What                    | In plain words                            | When it is needed | Learning needed |
| ----------------------- | ----------------------------------------- | ----------------- | --------------- |
| React                   | build a page from components              | from day 1        | yes             |
| TypeScript              | tells you what data lives where           | from day 1        | yes             |
| SCSS Modules            | styles that do not break other components | from day 1        | yes             |
| Vite                    | runs the project                          | from day 1        | no              |
| React Router            | navigation between pages                  | from day 1        | a little        |
| Swiper                  | sliders                                   | from day 1        | yes             |
| Zustand                 | cart and favourites                       | from day 6        | yes             |
| useSearchParams         | sorting and page in the address           | from day 6        | yes             |
| motion                  | animations                                | already set up    | no              |
| Supabase                | cloud database                            | maybe day 8       | not yet         |
| ESLint, Prettier, Husky | check and format the code                 | always            | no              |
| Git, Jira               | teamwork                                  | from day 1        | yes             |

## React

**What it is.** A library where a page is built from components, like Lego. A component is a function that returns markup.

**In this project.** Every button, card and page is a component in `src/components` or `src/pages`.

**Minimum:**

- a component and props: how to pass data into a component;
- `map` for lists and `key`;
- `useState` for simple state: an open dropdown, the selected picture;
- conditional rendering: `{isOpen && <Menu />}`.

**Not needed now:** `useReducer`, Context, class components.

Docs: https://react.dev/learn

## TypeScript

**What it is.** JavaScript that knows the shape of the data in advance. If you pass the wrong thing into a card, the editor underlines it in red before you even run the code.

**In this project.** All data types are already described in `src/types`: `Product`, `ProductDetails`, `CartItem`. You only write your own types for a component's props.

**Minimum:**

- `interface` for props;
- the types `string`, `number`, `boolean`, arrays like `Product[]`;
- an optional field: `delay?: number`;
- `import type { Product } from '@/types'`.

**Not needed now:** generics, utility types, overloads.

Docs: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

## SCSS Modules

**What it is.** Regular SCSS, but class names are unique per component. Your `.title` will not break someone else's `.title`.

**In this project.** Next to every component there is a `Name.module.scss`. Colours, fonts and breakpoints are already prepared in `src/styles`.

**Minimum:**

- `import styles from './Card.module.scss'` and `className={styles.title}`;
- variables: `$color-primary`, `$color-accent`;
- responsive mixins: `@include tablet { ... }`, `@include desktop { ... }`;
- text mixins: `@include h2;`, `@include body;`;
- several classes: ``className={`${styles.button} ${styles.active}`}``.

**Main rule.** No hex colours in modules, variables only. Otherwise the theme will not switch.

Docs: https://sass-lang.com/guide

## Vite

**What it is.** A tool that runs the project locally and builds it for deployment.

**In this project.** Already configured. You only need two commands:

- `npm run dev`: start the project;
- `npm run check`: verify everything before a pull request.

## React Router

**What it is.** Switches pages without reloading the browser.

**In this project.** Routes are already defined in `src/app/App.tsx`. Addresses look like `/#/phones`, so GitHub Pages never returns a 404.

**Minimum:**

- `<Link to="/phones">` instead of `<a href>`;
- `<NavLink>` for a menu with an active item;
- `useParams()`: get `productId` from the address;
- `useNavigate()`: the "Back" button.

Docs: https://reactrouter.com/6.30.0/start/tutorial

## Swiper

**What it is.** Ready-made sliders with swipe support on phones.

**In this project.** The banner on the home page and the product carousels ("Hot prices", "Brand new", "You may also like").

**Minimum:**

- `<Swiper>` and `<SwiperSlide>`;
- `slidesPerView` and `breakpoints` for responsiveness;
- `navigation` for custom arrows, `pagination` for dots, `autoplay`, `loop`.

Docs: https://swiperjs.com/react

## Zustand

**What it is.** A shared data store for the whole app. The cart is visible both in the Header (the counter) and on the cart page.

**In this project.** Only three stores: cart, favourites, theme. They live in `src/store`. With `persist` the data is saved to localStorage automatically.

**Minimum:**

- create a store with `create`;
- read data in a component: `const items = useCartStore((s) => s.items)`;
- `persist`, so that the cart does not disappear after a reload.

**Do not:** put everything into Zustand. An open dropdown is `useState`.

Docs: https://zustand.docs.pmnd.rs/getting-started/introduction

## useSearchParams

**What it is.** A React Router hook for parameters in the address: `?sort=age&page=2`.

**In this project.** Sorting, page and items per page live in the address. The task requires it, and the link can be shared.

Docs: https://reactrouter.com/6.30.0/hooks/use-search-params

## motion

**What it is.** An animation library.

**In this project.** Already set up. To animate a block appearing, wrap it:

```tsx
import { Reveal } from '@/animations';

<Reveal>
  <Categories />
</Reveal>;
```

`motion` must not be imported directly, ESLint will not allow it. Hover effects are plain CSS `transition`.

## Supabase

**What it is.** A ready-made backend: a database and an API without your own server.

**In this project.** Possibly on day 8, if everything else is ready. The decision is made at the checkpoint. For now the data comes from JSON in `public/api`. No need to learn it yet.

## ESLint, Prettier, Husky

**What it is.** ESLint finds errors, Prettier formats the code, Husky runs both before every commit.

**In this project.** Everything is automatic. If a commit is rejected, run `npm run fix-style` and look at what is left.

Install the ESLint and Prettier extensions in VS Code. The editor will suggest them itself.

## Git and Jira

**Minimum:**

- branch: `DEV-12_header`;
- commit: `feat(DEV-12): add header layout`;
- before a pull request: `git pull origin develop`;
- a Jira task moves: To Do → In Progress → Review → Done.

Details are in `CONTRIBUTING.md`.

## What to learn and when

| Phase        | Topics                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------ |
| Before day 1 | React (props, `map`), SCSS Modules, TS `interface`, `Link` and `NavLink` from React Router |
| Days 1–5     | `useState`, `useParams`, `useNavigate`, Swiper (as the task needs them)                    |
| Before day 6 | `fetch`, `useSearchParams`, Zustand, `persist`                                             |
