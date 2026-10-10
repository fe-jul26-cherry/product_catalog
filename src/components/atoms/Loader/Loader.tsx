import styles from './Loader.module.scss';

export const Loader = () => (
  <div
    className={styles.root}
    role="status"
    aria-label="Loading"
  />
);
