import styles from './BackLink.module.scss';

import type { ButtonHTMLAttributes } from 'react';

export const BackLink = ({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const classes = [styles.link, className].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
};
