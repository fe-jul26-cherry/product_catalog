# Структура проєкту

Основа: Atomic Design (документ «Структура проєкту»), вимоги README завдання і Figma (Original Dark).

## Дерево

```
product_catalog/
├── .github/
│   ├── workflows/deploy.yml        деплой на GitHub Pages з main
│   ├── workflows/lint.yml          перевірка PR: типи, ESLint, Prettier
│   └── pull_request_template.md
├── .husky/pre-commit               lint-staged перед кожним комітом
├── docs/
│   ├── STRUCTURE.md                цей файл
│   ├── TECH.md                     технології простими словами
│   ├── HOW_TO_COMPONENT.md         як писати компонент
│   ├── PLAN.md                     розподіл задач і графік
│   └── design-grid.md              брейкпоінти і сітка з Figma
├── public/
│   ├── api/                        JSON з даними товарів (етап 2)
│   └── img/                        фото товарів, банери, картинки категорій
└── src/
    ├── app/                        App.tsx: роутер і маршрути
    ├── animations/                 Reveal, PageTransition: motion і запасний CSS
    ├── components/
    │   ├── atoms/                  найменші елементи UI kit
    │   ├── molecules/              комбінації атомів
    │   ├── organisms/              великі блоки сторінок
    │   └── templates/              каркаси сторінок (MainLayout)
    ├── pages/                      сторінки за маршрутами
    ├── constants/                  маршрути, категорії, опції сортування, кольори
    ├── types/                      Product, ProductDetails, CartItem, SortBy, PerPage
    ├── mocks/                      захардкоджені дані для етапу 1
    ├── services/                   функції запитів до даних (етап 2)
    ├── store/                      Zustand: кошик, обране, тема (етап 2)
    ├── hooks/                      власні хуки (етап 2)
    ├── utils/                      чисті функції: сортування, пагінація
    ├── styles/                     змінні, теми, міксини, типографіка, global
    └── assets/
        ├── fonts/                  Mont (woff2)
        ├── icons/                  SVG-іконки з Figma
        ├── logo-dark-theme.svg     логотип для темної теми
        └── logo-light-theme.svg    логотип для світлої теми
```

### public чи src/assets

| Папка         | Що там                                    | Як підключати                                                    |
| ------------- | ----------------------------------------- | ---------------------------------------------------------------- |
| `public/`     | дані й фото, які вказані текстовим шляхом | рядок: `img/category-phones.png`, `fetch('api/products.json')`   |
| `src/assets/` | іконки, логотип, шрифти                   | імпорт у коді: `import logo from '@/assets/logo-dark-theme.svg'` |

Просте правило: якщо шлях береться з JSON або константи, файл лежить у `public/`. Якщо файл імпортується в `.tsx` або `.scss`, він лежить у `src/assets/`.

## Компоненти

| Рівень    | Компоненти                                                                                                                                                                          |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| atoms     | Button, IconButton, Icon, Logo, Counter, BackLink, ColorSwatch, CapacityButton, Loader                                                                                              |
| molecules | Dropdown, Pagination, Breadcrumbs, NavItem, IconLink, ProductPrice, ProductSpecs, ProductCard, CartItem, QuantityCounter, CategoryCard                                              |
| organisms | Header, BurgerMenu, Footer, PicturesSlider, ProductsSlider, ProductsList, Categories, CatalogControls, ProductGallery, ProductVariants, ProductAbout, ProductTechSpecs, CartSummary |
| templates | MainLayout                                                                                                                                                                          |
| pages     | HomePage, CatalogPage, ProductDetailsPage, CartPage, FavoritesPage, NotFoundPage                                                                                                    |

`CatalogPage` одна на три маршрути: `/phones`, `/tablets`, `/accessories`. Категорія приходить через prop.

### Відповідність Figma UI Kit

| Figma                                    | Код                                        |
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

## Правила

1. Кожен компонент у своїй папці: `Name.tsx`, `Name.module.scss`, `index.ts`.
2. Імпорт тільки вниз: `pages → templates → organisms → molecules → atoms`. Атом не імпортує молекулу.
3. Атоми і молекули не знають про store, services і mocks. Дані приходять через props.
4. Store, services і mocks підключаються тільки в organisms і pages.
5. Імпорти через alias `@/`: `import { Button } from '@/components/atoms/Button'`.
6. Кольори тільки через змінні з `_variables.scss`. Hex у модулях заборонений, інакше не запрацює зміна теми.
7. Медіа-запити тільки міксинами `tablet`, `desktop`, `wide` з `_mixins.scss`. Mobile-first.
8. Коментарів у коді немає. Пояснення пишемо в описі PR.
9. Новий спільний атом або зміни в `styles/` — тільки через PR з ревʼю тімліда.

## Стан

| Що                                   | Де                     | Інструмент          |
| ------------------------------------ | ---------------------- | ------------------- |
| Кошик, обране                        | `store/`               | Zustand + `persist` |
| Тема                                 | `store/`               | Zustand + `persist` |
| Сортування, сторінка, perPage, пошук | URL `?sort=age&page=2` | `useSearchParams`   |
| Відкритий dropdown, burger, слайд    | компонент              | `useState`          |

Параметри каталогу живуть в URL, а не в Zustand: так вимагає README, і посилання можна копіювати.

## Пріоритети

Межу проводимо за вимогами README, а не за кількістю компонентів. Усе, що вимагає README, обовʼязкове.

### Must: вимоги README

| Зона    | Що                                                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Каркас  | styles, MainLayout, Header з лічильниками, BurgerMenu, Footer з «Back to top», NotFoundPage                                                |
| Каталог | CatalogPage, ProductsList, ProductCard, CatalogControls (сортування, perPage), Pagination, Loader                                          |
| Товар   | ProductDetailsPage, ProductGallery, ProductVariants (статичні), ProductAbout, ProductTechSpecs, Breadcrumbs, BackLink, «You may also like» |
| Кошик   | CartPage, CartItem, QuantityCounter, CartSummary, checkout через `confirm()`                                                               |
| Обране  | FavoritesPage (перевикористовує ProductsList)                                                                                              |
| Головна | HomePage, PicturesSlider, ProductsSlider (Brand new, Hot prices), Categories                                                               |
| Ефекти  | плавні hover, зображення в картці збільшується на 10%                                                                                      |

### Nice: можна викинути без втрати оцінки

- Анімації `motion`: поява hero, перехід між сторінками. План Б нижче.
- Світла тема і перемикач у Footer.
- Supabase.
- Пошук (advanced task README).
- Власне модальне вікно checkout замість `confirm()`.
- Перемикання кольору і ємності на сторінці товару. README дозволяє зафіксувати одне значення.
- Свайпи і тонке налаштування Swiper. Запасний варіант: CSS `scroll-snap`.

### Контрольні точки

- День 3: must етапу 1 готовий на 50%. Якщо ні, nice не чіпаємо до кінця проєкту.
- День 5: всі сторінки зверстані на 320, 640, 1200, 1440.
- День 8: дані, кошик і обране працюють. Якщо анімацій немає, вмикаємо план Б.
- День 10: деплой.

## Етапи

### Етап 1, дні 1–5: верстка на моках

- Дані беремо з `src/mocks/`. Моки мають ті самі типи, що й реальні дані, тому на етапі 2 змінюється лише джерело.
- Обробники кліків поки порожні: `onClick={() => {}}`.
- Першою робимо `ProductCard`: вона потрібна каталогу, головній, обраному і сторінці товару.
- Результат: усі сторінки зверстані на 320, 640, 1200, 1440.

### Етап 2, дні 6–10: дані, стан, анімації, тема, деплой

1. `services/products.ts`: `getProducts`, `getProductsByCategory`, `getProductDetails`, `getSuggestedProducts`. Спочатку `fetch` з `public/api`.
2. `store/cartStore.ts`, `store/favoritesStore.ts`: Zustand + `persist` у localStorage.
3. `hooks/`: стан каталогу з URL, завантаження з Loader і помилкою.
4. Тема: `store/themeStore.ts` ставить `data-theme` на `<html>`. Світлу палітру додаємо блоком `[data-theme='light']` у `_themes.scss`. Перемикач у `Footer`.
5. Supabase: тільки якщо пункти 1–4 готові. Змінюється лише вміст функцій у `services/`, компоненти не чіпаємо.
6. Фінальна перевірка всіх брейкпоінтів і деплой.

## Анімації

Анімацій три, і всі вже підключені:

| Що                           | Де                        | Чим                       |
| ---------------------------- | ------------------------- | ------------------------- |
| Поява hero на головній       | `HomePage`                | `Reveal` з `@/animations` |
| Плавна поява сторінки        | `MainLayout`              | `PageTransition`          |
| Hover картки і її зображення | `ProductCard.module.scss` | CSS `transition`          |

Правила:

- `motion` імпортується тільки в `src/animations/motion/`. ESLint блокує імпорт в інших місцях.
- У компонентах тільки `import { Reveal, PageTransition } from '@/animations'`.
- `Reveal` можна обгорнути будь-яку секцію, це не нова анімація.
- Hover робимо CSS, без `motion`.
- Користувачам з увімкненим «зменшеним рухом» анімації вимикаються автоматично.

### План Б: прибрати motion за 5 хвилин

`src/animations/css/` має ті самі компоненти на CSS-анімаціях.

1. У `src/animations/index.ts` заміни рядок на `export * from './css';`.
2. Видали папку `src/animations/motion/`.
3. `npm uninstall motion`.
4. `npm run check`. Має пройти без помилок.

Компоненти й сторінки не змінюються.

## Рішення

| Рішення                                | Чому                                                                                                                                                  |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vite замість CRA                       | CRA застарів і не підтримується. Vite рекомендує документація курсу.                                                                                  |
| HashRouter                             | GitHub Pages не підтримує SPA-fallback для вкладених маршрутів, тому використовуємо HashRouter. Для продакшену з власним сервером буде BrowserRouter. |
| «Brand new» сортуємо за `year`         | У всіх товарів є знижка, тому фільтр «без знижки» за README дає порожній блок.                                                                        |
| Параметри каталогу в URL, не в Zustand | Так вимагає README, і посиланням можна поділитися.                                                                                                    |
| Кольори через CSS-змінні               | Тема перемикається без зміни компонентів.                                                                                                             |
| Залежності ставить тільки тімлід       | `package-lock.json` не конфліктує в PR.                                                                                                               |

### Світла палітра (Figma Original)

| Роль       | Колір     |
| ---------- | --------- |
| Primary    | `#313237` |
| Secondary  | `#89939a` |
| Icons      | `#b4bdc3` |
| Elements   | `#e2e6e9` |
| Hover & BG | `#fafbfc` |
| White      | `#ffffff` |
| Green      | `#27ae60` |
| Red        | `#eb5757` |

## Дані

- `public/api/products.json` (194 товари): короткий формат для списків. Поле `itemId` веде на `id` у детальних файлах.
- `public/api/phones.json`, `tablets.json`, `accessories.json`: детальний формат для сторінки товару.
- Окремих файлів `phones/:id.json` немає. Деталі шукаємо за `id` у файлі категорії.
- У всіх 194 товарів є знижка. Блок «Brand new» сортуємо за `year`, від найновіших.
- У `phones.json` 4 записи iPhone 14 Pro Gold мають назву «Space Black». Назву беремо з `products.json`.
- Назви кольорів непослідовні (`space gray`, `space-gray`, `spacegray`). Використовуємо `getColorHex` з `constants/colors.ts`.

## Що ще потрібно з Figma

- Усе вже в репо: іконки в `src/assets/icons/`, логотип у `src/assets/`, банери й картинки категорій у `public/img/`.
- Фреймів Catalog і Favourites для 320 немає. Мобільну сітку беремо з Home (320) і «Mobile grid».
