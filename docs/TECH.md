# Технології: що вчити і навіщо

Читати все не треба. У кожної технології є «мінімум»: цього вистачить для нашого проєкту.

## Коротко

| Що                      | Простими словами                      | Коли треба      | Хто вчить       |
| ----------------------- | ------------------------------------- | --------------- | --------------- |
| React                   | будуємо сторінку з компонентів        | з дня 1         | усі             |
| TypeScript              | підказує, які дані де лежать          | з дня 1         | усі             |
| SCSS Modules            | стилі, які не ламають чужі компоненти | з дня 1         | усі             |
| Vite                    | запускає проєкт                       | з дня 1         | вчити не треба  |
| React Router            | переходи між сторінками               | з дня 1         | усі, трохи      |
| Swiper                  | слайдери                              | з дня 1         | PM              |
| Zustand                 | кошик і обране                        | з дня 6         | Розробник 2, PM |
| useSearchParams         | сортування і сторінка в адресі        | з дня 6         | Розробник 1     |
| motion                  | анімації                              | вже готово      | вчити не треба  |
| Supabase                | база даних у хмарі                    | можливо, день 8 | поки ніхто      |
| ESLint, Prettier, Husky | перевіряють і форматують код          | завжди          | вчити не треба  |
| Git, Jira               | командна робота                       | з дня 1         | усі             |

## React

**Що це.** Бібліотека, де сторінка складається з компонентів, як з Lego. Компонент — це функція, яка повертає розмітку.

**У нас.** Кожна кнопка, картка й сторінка — це компонент у `src/components` або `src/pages`.

**Мінімум:**

- компонент і props: як передати дані в компонент;
- `map` для списків і `key`;
- `useState` для простого стану: відкритий dropdown, вибрана картинка;
- умовний рендер: `{isOpen && <Menu />}`.

**Не треба зараз:** `useReducer`, Context, класові компоненти.

Документація: https://react.dev/learn

## TypeScript

**Що це.** JavaScript, який заздалегідь знає форму даних. Якщо передаси в картку не те, редактор підкреслить червоним ще до запуску.

**У нас.** Усі типи даних уже описані в `src/types`: `Product`, `ProductDetails`, `CartItem`. Свої типи пишеш лише для props компонента.

**Мінімум:**

- `interface` для props;
- типи `string`, `number`, `boolean`, масиви `Product[]`;
- необовʼязкове поле: `delay?: number`;
- `import type { Product } from '@/types'`.

**Не треба зараз:** generics, utility types, перевантаження.

Документація: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

## SCSS Modules

**Що це.** Звичайний SCSS, але назви класів унікальні для кожного компонента. Твій `.title` не зламає чужий `.title`.

**У нас.** Біля кожного компонента лежить `Name.module.scss`. Кольори, шрифти й брейкпоінти вже готові в `src/styles`.

**Мінімум:**

- `import styles from './Card.module.scss'` і `className={styles.title}`;
- змінні: `$color-primary`, `$color-accent`;
- міксини адаптиву: `@include tablet { ... }`, `@include desktop { ... }`;
- міксини тексту: `@include h2;`, `@include body;`;
- кілька класів: ``className={`${styles.button} ${styles.active}`}``.

**Головне правило.** Жодного hex-кольору в модулях, тільки змінні. Інакше тема не перемкнеться.

Документація: https://sass-lang.com/guide

## Vite

**Що це.** Інструмент, який запускає проєкт локально і збирає його для деплою.

**У нас.** Вже налаштований. Тобі потрібні лише команди:

- `npm run dev`: запустити;
- `npm run check`: перевірити все перед PR.

## React Router

**Що це.** Перемикає сторінки без перезавантаження браузера.

**У нас.** Маршрути вже прописані в `src/app/App.tsx`. Адреса має вигляд `/#/phones`: так GitHub Pages не віддає 404.

**Мінімум:**

- `<Link to="/phones">` замість `<a href>`;
- `<NavLink>` для меню з активним пунктом;
- `useParams()`: дістати `productId` з адреси;
- `useNavigate()`: кнопка «Back».

Документація: https://reactrouter.com/6.30.0/start/tutorial

## Swiper

**Що це.** Готові слайдери зі свайпами на телефоні.

**У нас.** Банер на головній і каруселі товарів («Hot prices», «Brand new», «You may also like»).

**Мінімум:**

- `<Swiper>` і `<SwiperSlide>`;
- `slidesPerView` і `breakpoints` для адаптиву;
- `navigation` для своїх стрілок, `pagination` для точок, `autoplay`, `loop`.

Документація: https://swiperjs.com/react

## Zustand

**Що це.** Спільне сховище даних для всього застосунку. Кошик видно і в Header (лічильник), і на сторінці кошика.

**У нас.** Тільки три сховища: кошик, обране, тема. Лежать у `src/store`. З `persist` дані самі зберігаються в localStorage.

**Мінімум:**

- створити store через `create`;
- прочитати дані в компоненті: `const items = useCartStore((s) => s.items)`;
- `persist`, щоб кошик не зникав після перезавантаження.

**Не треба:** класти в Zustand усе підряд. Відкритий dropdown — це `useState`.

Документація: https://zustand.docs.pmnd.rs/getting-started/introduction

## useSearchParams

**Що це.** Хук React Router для параметрів в адресі: `?sort=age&page=2`.

**У нас.** Сортування, сторінка і кількість на сторінці живуть в адресі. Так вимагає завдання, і посиланням можна поділитися.

Документація: https://reactrouter.com/6.30.0/hooks/use-search-params

## motion

**Що це.** Бібліотека анімацій.

**У нас.** Вже налаштовано. Якщо хочеш анімувати появу блоку, обгорни його:

```tsx
import { Reveal } from '@/animations';

<Reveal>
  <Categories />
</Reveal>;
```

Напряму `motion` імпортувати не можна, ESLint не пропустить. Hover робимо звичайним CSS `transition`.

## Supabase

**Що це.** Готовий бекенд: база даних і API без власного сервера.

**У нас.** Можливо, на дні 8, якщо все інше готове. Рішення приймаємо на контрольній точці. Поки дані беремо з JSON у `public/api`. Вчити зараз не треба.

## ESLint, Prettier, Husky

**Що це.** ESLint шукає помилки, Prettier форматує код, Husky запускає їх перед кожним комітом.

**У нас.** Все автоматично. Якщо коміт не проходить, виконай `npm run fix-style` і подивись, що лишилось.

Постав у VS Code розширення ESLint і Prettier. Редактор запропонує їх сам.

## Git і Jira

**Мінімум:**

- гілка: `DEV-12_header`;
- коміт: `feat(DEV-12): add header layout`;
- перед PR: `git pull origin main`;
- задача в Jira рухається: To Do → In Progress → Review → Done.

Деталі в `CONTRIBUTING.md`.

## Що вчити до старту

| Хто         | До дня 1                                       | До дня 6                   |
| ----------- | ---------------------------------------------- | -------------------------- |
| Усі         | React (props, map), SCSS Modules, TS interface | —                          |
| Розробник 1 | + `Link` з React Router                        | `fetch`, `useSearchParams` |
| Розробник 2 | + `useState`, `useParams`, `useNavigate`       | Zustand, `persist`         |
| PM          | + Swiper                                       | Zustand, `persist`         |
| Тімлід      | + `NavLink`                                    | Zustand (для лічильників)  |
