import { CategoryCard } from '@/components/molecules/CategoryCard';
import { CATEGORIES } from '@/constants';

import styles from './Categories.module.scss';

import type { Category } from '@/types';

interface CategoriesProps {
  counts: Record<Category, number>;
}

export const Categories = ({ counts }: CategoriesProps) => (
  <section className={styles.root}>
    <h2 className={styles.title}>Shop by category</h2>
    <div className={styles.list}>
      {CATEGORIES.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          count={counts[category.id]}
        />
      ))}
    </div>
  </section>
);
