import styles from './Pagination.module.scss';

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export const Pagination = ({ current, total, onChange }: PaginationProps) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav
      className={styles.pagination}
      aria-label="Пагінація"
    >
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
    </nav>
  );
};
