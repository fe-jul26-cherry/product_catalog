import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants';

import styles from './Logo.module.scss';

export const Logo = () => (
  <Link
    to={ROUTES.HOME}
    className={styles.root}
    aria-label="Nice Gadgets home"
  >
    NICE GADGETS
  </Link>
);
