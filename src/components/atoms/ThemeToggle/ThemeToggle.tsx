import { useId } from 'react';

import styles from './ThemeToggle.module.scss';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  const id = useId();

  return (
    <div className={styles.root}>
      <input
        id={id}
        className={styles.input}
        type="checkbox"
        role="switch"
        checked={isDark}
        onChange={onToggle}
      />
      <label
        className={styles.label}
        htmlFor={id}
      >
        <span className="visually-hidden">Dark theme</span>
      </label>
    </div>
  );
};
