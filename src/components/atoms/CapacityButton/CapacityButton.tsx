import styles from './CapacityButton.module.scss';

import type { ButtonHTMLAttributes } from 'react';

interface CapacityButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export const CapacityButton = ({
  selected = false,
  className,
  children,
  ...rest
}: CapacityButtonProps) => {
  const classes = [styles.root, selected ? styles.selected : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={selected}
      {...rest}
    >
      {children}
    </button>
  );
};
