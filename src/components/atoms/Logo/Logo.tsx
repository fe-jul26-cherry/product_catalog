import { Link } from 'react-router-dom';

import logoSrc from '@/assets/logo-dark-theme.svg';
import { ROUTES } from '@/constants';

import styles from './Logo.module.scss';

export const Logo = () => (
  <Link
    to={ROUTES.HOME}
    className={styles.root}
    aria-label="Nice Gadgets home"
  >
    <img
      src={logoSrc}
      alt="Nice Gadgets"
      height={32}
    />
  </Link>
);
