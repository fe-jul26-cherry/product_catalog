import { Link } from 'react-router-dom';

import styles from './CategoryCard.module.scss';

import type { CategoryInfo } from '@/constants';

interface CategoryCardProps {
  category: CategoryInfo;
  title: string;
  countLabel: string;
}

export const CategoryCard = ({
  category,
  title,
  countLabel,
}: CategoryCardProps) => (
  <Link
    to={category.path}
    className={`${styles.root} ${styles[category.id]}`}
  >
    <div className={styles.preview}>
      <img
        className={styles.image}
        src={category.image}
        alt={title}
        loading="lazy"
      />
    </div>
    <div className={styles.info}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.count}>{countLabel}</p>
    </div>
  </Link>
);
