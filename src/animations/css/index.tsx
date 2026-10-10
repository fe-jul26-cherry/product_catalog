import { useLocation } from 'react-router-dom';

import styles from './animations.module.scss';

import type {
  AnimationProviderProps,
  PageTransitionProps,
  RevealProps,
} from '../types';

export const AnimationProvider = ({ children }: AnimationProviderProps) => (
  <>{children}</>
);

export const PageTransition = ({ children }: PageTransitionProps) => {
  const { pathname } = useLocation();

  return (
    <div
      key={pathname}
      className={styles.page}
    >
      {children}
    </div>
  );
};

export const Reveal = ({ children, delay = 0 }: RevealProps) => (
  <div
    className={styles.reveal}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);
