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
    className={styles.root}
  >
    <img
      className={styles.image}
      src={category.image}
      alt={category.title}
    />
    <h3 className={styles.title}>{category.title}</h3>
    <p className={styles.count}>{count} models</p>
  </Link>
);
