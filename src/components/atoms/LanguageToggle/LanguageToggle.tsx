import { useId } from 'react';

import styles from './LanguageToggle.module.scss';

interface LanguageToggleProps {
  isUa: boolean;
  onToggle: () => void;
}

export const LanguageToggle = ({ isUa, onToggle }: LanguageToggleProps) => {
  const id = useId();

  return (
    <div className={styles.root}>
      <input
        id={id}
        className={styles.input}
        type="checkbox"
        role="switch"
        checked={isUa}
        onChange={onToggle}
      />
      <label
        className={styles.label}
        htmlFor={id}
        data-on="UA"
        data-off="EN"
      >
        <span className="visually-hidden">Ukrainian language</span>
      </label>
    </div>
  );
};
