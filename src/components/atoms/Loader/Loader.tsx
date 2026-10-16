import styles from './Loader.module.scss';

interface LoaderProps {
  label: string;
}

export const Loader = ({ label }: LoaderProps) => (
  <div
    className={styles.root}
    role="status"
    aria-label={label}
  >
    <div className={styles.spinner} />
  </div>
);
