import chevronLeftIcon from '@/assets/icons/chevron-left.svg';
import chevronRightIcon from '@/assets/icons/chevron-right.svg';
import { Icon } from '@/components/atoms/Icon';
import { IconButton } from '@/components/atoms/IconButton';

import styles from './Pagination.module.scss';

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export const Pagination = ({ current, total, onChange }: PaginationProps) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  const handlePrev = () => {
    if (current > 1) {
      onChange(current - 1);
    }
  };

  const handleNext = () => {
    if (current < total) {
      onChange(current + 1);
    }
  };

  return (
    <nav
      className={styles.pagination}
      aria-label="Пагінація"
    >
      <IconButton
        variant="slider"
        onClick={handlePrev}
        disabled={current === 1}
        aria-label="Попередня сторінка"
      >
        <Icon
          src={chevronLeftIcon}
          alt=""
          className={styles.arrow}
        />
      </IconButton>

      <div className={styles.pagesWrapper}>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={
              page === current ? `${styles.page} ${styles.active}` : styles.page
            }
            onClick={() => onChange(page)}
            aria-current={page === current ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <IconButton
        variant="slider"
        onClick={handleNext}
        disabled={current === total}
        aria-label="Наступна сторінка"
      >
        <Icon
          src={chevronRightIcon}
          alt=""
          className={styles.arrow}
        />
      </IconButton>
    </nav>
  );
};
