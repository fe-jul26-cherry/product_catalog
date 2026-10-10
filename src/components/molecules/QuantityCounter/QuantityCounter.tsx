import styles from './QuantityCounter.module.scss';

interface QuantityCounterProps {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export const QuantityCounter = ({
  value,
  onDecrease,
  onIncrease,
}: QuantityCounterProps) => (
  <div className={styles.root}>
    <button
      type="button"
      className={styles.button}
      onClick={onDecrease}
      disabled={value <= 1}
      aria-label="Decrease quantity"
    >
      -
    </button>
    <span className={styles.value}>{value}</span>
    <button
      type="button"
      className={styles.button}
      onClick={onIncrease}
      aria-label="Increase quantity"
    >
      +
    </button>
  </div>
);
