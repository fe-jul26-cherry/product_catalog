# Project structure

Based on Atomic Design (the "Project structure" document), the README requirements of the task and Figma (Original Dark).

## Tree

```
product_catalog/
├── .github/
│   ├── workflows/deploy.yml        deploy to GitHub Pages from main
│   ├── workflows/lint.yml          PR check: types, ESLint, Prettier
│   └── pull_request_template.md
├── .husky/pre-commit               lint-staged before every commit
├── docs/
│   ├── STRUCTURE.md                this file
│   ├── TECH.md                     technologies in plain words
│   ├── HOW_TO_COMPONENT.md         how to write a component
│   ├── PLAN.md                     roadmap and schedule
│   └── design-grid.md              breakpoints and grid from Figma
├── public/
│   ├── api/                        JSON with product data (stage 2)
│   └── img/                        product photos, banners, category images
└── src/
    ├── app/                        App.tsx: router and routes
    ├── animations/                 Reveal, PageTransition: motion and a CSS fallback
    ├── components/
    │   ├── atoms/                  the smallest UI kit elements
    │   ├── molecules/              combinations of atoms
    │   ├── organisms/              large page blocks
    │   └── templates/              page skeletons (MainLayout)
    ├── pages/                      pages by route
    ├── constants/                  routes, categories, sort options, colours
    ├── types/                      Product, ProductDetails, CartItem, SortBy, PerPage
    ├── mocks/                      hardcoded data for stage 1
    ├── services/                   data request functions (stage 2)
    ├── store/                      Zustand: cart, favourites, theme (stage 2)
    ├── hooks/                      custom hooks (stage 2)
    ├── utils/                      pure functions: sorting, pagination
    ├── styles/                     variables, themes, mixins, typography, global
    └── assets/
        ├── fonts/                  Mont (woff2)
        ├── icons/                  SVG icons from Figma
        ├── logo-dark-theme.svg     logo for the dark theme
        └── logo-light-theme.svg    logo for the light theme
```

### public or src/assets

| Folder        | What is there                             | How to use it                                                        |
| ------------- | ----------------------------------------- | -------------------------------------------------------------------- |
| `public/`     | data and photos referenced by a text path | a string: `img/category-phones.png`, `fetch('api/products.json')`    |
| `src/assets/` | icons, logo, fonts                        | an import in code: `import logo from '@/assets/logo-dark-theme.svg'` |

A simple rule: if the path comes from JSON or a constant, the file lives in `public/`. If the file is imported in a `.tsx` or `.scss`, it lives in `src/assets/`.

## Components

| Level     | Components                                                                                                                                                                          |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| atoms     | Button, IconButton, Icon, Logo, Counter, BackLink, ColorSwatch, CapacityButton, Loader                                                                                              |
| molecules | Dropdown, Pagination, Breadcrumbs, NavItem, IconLink, ProductPrice, ProductSpecs, ProductCard, CartItem, QuantityCounter, CategoryCard                                              |
| organisms | Header, BurgerMenu, Footer, PicturesSlider, ProductsSlider, ProductsList, Categories, CatalogControls, ProductGallery, ProductVariants, ProductAbout, ProductTechSpecs, CartSummary |
| templates | MainLayout                                                                                                                                                                          |
| pages     | HomePage, CatalogPage, ProductDetailsPage, CartPage, FavoritesPage, NotFoundPage                                                                                                    |

`CatalogPage` is one page for three routes: `/phones`, `/tablets`, `/accessories`. The category arrives as a prop.

### Figma UI Kit mapping

| Figma                                    | Code                                       |
| ---------------------------------------- | ------------------------------------------ |
| Dark Theme Palette                       | `styles/_themes.scss`                      |
| Typography (Desktop/Tablet, Mobile)      | `styles/_typography.scss`                  |
| Buttons/Primary                          | `atoms/Button`                             |
| Buttons/Slider button, Add to favourites | `atoms/IconButton`                         |
| Buttons/Back                             | `atoms/BackLink`                           |
| Buttons/Pagination                       | `molecules/Pagination`                     |
| Dropdowns (Default, Hover, Opened, Item) | `molecules/Dropdown`                       |
| Selectors/Color                          | `atoms/ColorSwatch`                        |
| Select capacity                          | `atoms/CapacityButton`                     |
| Icons, Icons + Counter                   | `atoms/Icon`, `atoms/Counter`              |
| Header, Footer, Burger Menu              | `organisms/Header`, `Footer`, `BurgerMenu` |
| Product card, Cart item                  | `molecules/ProductCard`, `CartItem`        |
| Item card                                | `pages/ProductDetailsPage`                 |

## Rules

1. Every component lives in its own folder: `Name.tsx`, `Name.module.scss`, `index.ts`.
2. Imports only go downwards: `pages → templates → organisms → molecules → atoms`. An atom never imports a molecule.
3. Atoms and molecules know nothing about store, services or mocks. Data arrives through props.
4. Store, services and mocks are used only in organisms and pages.
5. Imports go through the `@/` alias: `import { Button } from '@/components/atoms/Button'`.
6. Colours only through variables from `_variables.scss`. Hex values are forbidden in modules, otherwise theme switching breaks.
7. Media queries only through the `tablet`, `desktop`, `wide` mixins from `_mixins.scss`. Mobile-first.
8. There are no comments in the code. Explanations go in the pull request description.
9. A new shared atom or changes in `styles/` go only through a reviewed pull request.

## State

| What                              | Where                  | Tool                |
| --------------------------------- | ---------------------- | ------------------- |
| Cart, favourites                  | `store/`               | Zustand + `persist` |
| Theme                             | `store/`               | Zustand + `persist` |
| Sorting, page, perPage, search    | URL `?sort=age&page=2` | `useSearchParams`   |
| Open dropdown, burger menu, slide | component              | `useState`          |

Catalog parameters live in the URL, not in Zustand: the task README requires it, and links can be copied.

## Priorities

The line is drawn by the README requirements, not by the number of components. Everything the README requires is mandatory.

### Must: README requirements

| Area       | What                                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Shell      | styles, MainLayout, Header with counters, BurgerMenu, Footer with "Back to top", NotFoundPage                                            |
| Catalog    | CatalogPage, ProductsList, ProductCard, CatalogControls (sorting, perPage), Pagination, Loader                                           |
| Product    | ProductDetailsPage, ProductGallery, ProductVariants (static), ProductAbout, ProductTechSpecs, Breadcrumbs, BackLink, "You may also like" |
| Cart       | CartPage, CartItem, QuantityCounter, CartSummary, checkout via `confirm()`                                                               |
| Favourites | FavoritesPage (reuses ProductsList)                                                                                                      |
| Home       | HomePage, PicturesSlider, ProductsSlider (Brand new, Hot prices), Categories                                                             |
| Effects    | smooth hover, the card image grows by 10%                                                                                                |

### Nice: can be dropped without losing the grade

- `motion` animations: hero reveal, page transition. See plan B below.
- Light theme and the switcher in the Footer.
- Supabase.
- Search (an advanced task in the README).
- A custom checkout modal instead of `confirm()`.
- Switching colour and capacity on the product page. The README allows fixing a single value.
- Swipes and fine-tuning of Swiper. Fallback: CSS `scroll-snap`.

### Checkpoints

- Day 3: stage 1 must-haves are 50% done. If not, nice-to-haves are not touched until the end of the project.
- Day 5: all pages are laid out at 320, 640, 1200, 1440.
- Day 8: data, cart and favourites work. If there are no animations yet, switch to plan B.
- Day 10: deploy.

## Stages

### Stage 1, days 1–5: markup on mocks

- Data comes from `src/mocks/`. Mocks have the same types as the real data, so in stage 2 only the source changes.
- Click handlers are empty for now: `onClick={() => {}}`.
- `ProductCard` goes first: the catalog, home page, favourites and product page all need it.
- Result: all pages are laid out at 320, 640, 1200, 1440.

### Stage 2, days 6–10: data, state, animations, theme, deploy

1. `services/products.ts`: `getProducts`, `getProductsByCategory`, `getProductDetails`, `getSuggestedProducts`. `fetch` from `public/api` first.
2. `store/cartStore.ts`, `store/favoritesStore.ts`: Zustand + `persist` in localStorage.
3. `hooks/`: catalog state from the URL, loading with a Loader and an error.
4. Theme: `store/themeStore.ts` sets `data-theme` on `<html>`. The light palette is added as a `[data-theme='light']` block in `_themes.scss`. The switcher is in `Footer`.
5. Supabase: only if items 1–4 are ready. Only the content of the functions in `services/` changes, components stay untouched.
6. Final check of all breakpoints and deploy.

## Animations

There are three animations, all already wired up:

| What                         | Where                     | How                          |
| ---------------------------- | ------------------------- | ---------------------------- |
| Hero reveal on the home page | `HomePage`                | `Reveal` from `@/animations` |
| Smooth page appearance       | `MainLayout`              | `PageTransition`             |
| Card hover and its image     | `ProductCard.module.scss` | CSS `transition`             |

Rules:

- `motion` is imported only in `src/animations/motion/`. ESLint blocks imports anywhere else.
- Components only use `import { Reveal, PageTransition } from '@/animations'`.
- `Reveal` can wrap any section, it is not a new animation.
- Hover is done with CSS, without `motion`.
- Animations switch off automatically for users with "reduced motion" enabled.

### Plan B: remove motion in 5 minutes

`src/animations/css/` has the same components built on CSS animations.

1. In `src/animations/index.ts`, replace the line with `export * from './css';`.
2. Delete the `src/animations/motion/` folder.
3. `npm uninstall motion`.
4. `npm run check`. It must pass without errors.

Components and pages do not change.

## Decisions

| Decision                                   | Why                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Vite instead of CRA                        | CRA is deprecated and unmaintained. The course documentation recommends Vite.                                                              |
| HashRouter                                 | GitHub Pages has no SPA fallback for nested routes, so HashRouter is used. A production setup with its own server would use BrowserRouter. |
| "Brand new" is sorted by `year`            | Every product has a discount, so the README's "no discount" filter gives an empty block.                                                   |
| Catalog parameters in the URL, not Zustand | The README requires it, and the link can be shared.                                                                                        |
| Colours through CSS variables              | The theme switches without changing components.                                                                                            |
| Dependencies are added in dedicated PRs    | `package-lock.json` does not conflict between branches.                                                                                    |

### Light palette (Figma Original)

| Role       | Colour    |
| ---------- | --------- |
| Primary    | `#313237` |
| Secondary  | `#89939a` |
| Icons      | `#b4bdc3` |
| Elements   | `#e2e6e9` |
| Hover & BG | `#fafbfc` |
| White      | `#ffffff` |
| Green      | `#27ae60` |
| Red        | `#eb5757` |

## Data

- `public/api/products.json` (194 products): the short format for lists. The `itemId` field points to `id` in the detailed files.
- `public/api/phones.json`, `tablets.json`, `accessories.json`: the detailed format for the product page.
- There are no separate `phones/:id.json` files. Details are looked up by `id` in the category file.
- All 194 products have a discount. The "Brand new" block is sorted by `year`, newest first.
- The names of 4 iPhone 14 Pro Gold records in `phones.json` were fixed from "Space Black" to "Gold". Donor data is not edited unless necessary.
- Colour names are inconsistent (`space gray`, `space-gray`, `spacegray`). Use `getColorHex` from `constants/colors.ts`.

## What else is needed from Figma

- Everything is already in the repo: icons in `src/assets/icons/`, the logo in `src/assets/`, banners and category images in `public/img/`.
- There are no Catalog and Favourites frames for 320. The mobile grid is taken from Home (320) and "Mobile grid".
