import { Link } from 'react-router-dom';

import styles from './CategoryCard.module.scss';

import type { CategoryInfo } from '@/constants';

interface CategoryCardProps {
  category: CategoryInfo;
  count: number;
}

export const CategoryCard = ({ category, count }: CategoryCardProps) => (
  <Link
    to={category.path}
    className={`${styles.root} ${styles[category.id]}`}
  >
    <div className={styles.preview}>
      <img
        className={styles.image}
        src={category.image}
        alt={category.title}
        loading="lazy"
      />
    </div>
    <div className={styles.info}>
      <h3 className={styles.title}>{category.title}</h3>
      <p className={styles.count}>{count} models</p>
    </div>
  </Link>
);
