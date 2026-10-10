# Як писати компонент

Нічого не створюй з нуля. У кожного компонента вже є заготовка, яка рендериться. Твоя робота: відкрити файли, додати розмітку і стилі за макетом у Figma.

## Що лежить у папці компонента

```
ProductCard/
├── ProductCard.tsx
├── ProductCard.module.scss
└── index.ts
```

- `.tsx`: розмітка і props.
- `.module.scss`: стилі цього компонента.
- `index.ts`: один рядок `export * from './ProductCard';`. Не чіпай.

## Крок 1. Подивись макет

Відкрий у Figma свій блок на 320, 640, 1200, 1440. Знайди, з яких шматків він складається і які з них вже є в `atoms` і `molecules`. Готове використовуй, а не пиши заново.

## Крок 2. Props

Props — це дані, які компонент отримує ззовні. Опиши їх через `interface`:

```tsx
import styles from './ProductCard.module.scss';

import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className={styles.root}>
      <h3 className={styles.title}>{product.name}</h3>
    </article>
  );
};
```

Атоми і молекули беруть дані тільки з props. Імпортувати `mocks`, `store` чи `services` дозволено лише в organisms і pages.

## Крок 3. Використай готові компоненти

```tsx
import { Button } from '@/components/atoms/Button';
import { ProductPrice } from '@/components/molecules/ProductPrice';

<ProductPrice
  price={product.price}
  fullPrice={product.fullPrice}
/>
<Button>Add to cart</Button>
```

Правило імпортів: вниз по рівнях. `pages → templates → organisms → molecules → atoms`. Атом не імпортує молекулу. Шлях завжди через `@/`.

## Крок 4. Стилі

На початку `.module.scss` підключи те, що треба:

```scss
@use '../../../styles/variables' as *;
@use '../../../styles/mixins' as *;
@use '../../../styles/typography' as *;
```

Приклад. Mobile-first: базові стилі для 320, далі розширюєш:

```scss
.root {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: $color-surface-1;
  transition: transform $transition;

  @include tablet {
    padding: 24px;
  }

  @include desktop {
    padding: 32px;
  }
}

.title {
  @include h4;
  color: $color-primary;
}
```

У розмітці підключай клас так: `className={styles.title}`.

Що можна і що ні:

| Можна                                         | Не можна                       |
| --------------------------------------------- | ------------------------------ |
| `$color-primary`, `$color-accent`             | `#905bff`, `rgb(...)`          |
| `@include tablet / desktop / wide`            | `@media (min-width: 640px)`    |
| `@include h1…h4, body, button, small`         | свій `font-size` для тексту    |
| `@include container`, `@include product-grid` | свої сітки для товарів         |
| `transition` для hover                        | `!important`, коментарі в коді |

## Крок 5. Кілька класів

```tsx
const classes = [styles.button, styles[variant], className]
  .filter(Boolean)
  .join(' ');
```

Так працює `Button`: базовий клас, клас варіанту і зовнішній `className`.

## Крок 6. Іконки

SVG лежать у `src/assets/icons`. Підключення:

```tsx
import closeIcon from '@/assets/icons/close.svg';

<Icon
  src={closeIcon}
  alt="Close"
/>;
```

Немає потрібної іконки: став текст-заглушку і напиши в чат тімліду.

## Крок 7. Перевір

1. Відкрий `npm run dev` і перевір на 320, 640, 1200, 1440 (DevTools → Responsive).
2. Порівняй з Figma: відступи, шрифти, кольори.
3. `npm run check` має пройти без помилок.
4. Якщо коміт не проходить: `npm run fix-style`.

## Що не робити

- Не створювати нові файли в `atoms/`, `styles/`, `types/`, `constants/` без PR на ревʼю тімліда.
- Не ставити нові npm-пакети. Це робить тільки тімлід.
- Не імпортувати `motion` напряму. Для анімації обгорни блок у `Reveal` з `@/animations`.
- Не писати коментарі в коді. Пояснення йде в опис PR.

## Застряг

Більше 2 години: напиши в чат. Не мовчи й не роби складніше, ніж у макеті.
