# How to write a component

Do not create anything from scratch. Every component already has a starter that renders. Your job: open the files, add the markup and styles from the Figma design.

## What is in a component folder

```
ProductCard/
├── ProductCard.tsx
├── ProductCard.module.scss
└── index.ts
```

- `.tsx`: markup and props.
- `.module.scss`: styles of this component.
- `index.ts`: a single line `export * from './ProductCard';`. Do not touch it.

## Step 1. Look at the design

Open the block in Figma at 320, 640, 1200 and 1440. Find the pieces it consists of and which of them already exist in `atoms` and `molecules`. Reuse what is ready instead of writing it again.

## Step 2. Props

Props are the data a component receives from outside. Describe them with an `interface`:

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

Atoms and molecules take data only from props. Importing `mocks`, `store` or `services` is allowed only in organisms and pages.

## Step 3. Use the ready components

```tsx
import { Button } from '@/components/atoms/Button';
import { ProductPrice } from '@/components/molecules/ProductPrice';

<ProductPrice
  price={product.price}
  fullPrice={product.fullPrice}
/>
<Button>Add to cart</Button>
```

Import rule: only downwards. `pages → templates → organisms → molecules → atoms`. An atom never imports a molecule. The path always goes through `@/`.

## Step 4. Styles

At the top of `.module.scss`, include what you need:

```scss
@use '../../../styles/variables' as *;
@use '../../../styles/mixins' as *;
@use '../../../styles/typography' as *;
```

Example. Mobile-first: base styles for 320, then extend:

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

In the markup, apply a class like this: `className={styles.title}`.

What is allowed and what is not:

| Allowed                                       | Not allowed                    |
| --------------------------------------------- | ------------------------------ |
| `$color-primary`, `$color-accent`             | `#905bff`, `rgb(...)`          |
| `@include tablet / desktop / wide`            | `@media (min-width: 640px)`    |
| `@include h1…h4, body, button, small`         | your own `font-size` for text  |
| `@include container`, `@include product-grid` | your own product grids         |
| `transition` for hover                        | `!important`, comments in code |

## Step 5. Several classes

```tsx
const classes = [styles.button, styles[variant], className]
  .filter(Boolean)
  .join(' ');
```

This is how `Button` works: the base class, the variant class and the external `className`.

## Step 6. Icons

SVG files live in `src/assets/icons`. Usage:

```tsx
import closeIcon from '@/assets/icons/close.svg';

<Icon
  src={closeIcon}
  alt="Close"
/>;
```

If the icon you need is missing, put a text placeholder and note it in the pull request.

## Step 7. Check

1. Run `npm run dev` and check 320, 640, 1200 and 1440 (DevTools → Responsive).
2. Compare with Figma: spacing, fonts, colours.
3. `npm run check` must pass without errors.
4. If a commit is rejected, run `npm run fix-style`.

## What not to do

- Do not add new files to `atoms/`, `styles/`, `types/`, `constants/` without a reviewed pull request.
- Do not add new npm packages outside a dedicated pull request.
- Do not import `motion` directly. To animate a block, wrap it in `Reveal` from `@/animations`.
- Do not write comments in code. Explanations go in the pull request description.

## Stuck

More than 2 hours: ask for help. Do not stay silent and do not make it more complex than the design.
