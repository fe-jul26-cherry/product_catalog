import { Link } from 'react-router-dom';

import logoSrc from '@/assets/logo-dark-theme.svg';
import { ROUTES } from '@/constants';

import styles from './Logo.module.scss';

interface LogoProps {
  onClick?: () => void;
}

export const Logo = ({ onClick }: LogoProps) => (
  <Link
    to={ROUTES.HOME}
    className={styles.root}
    aria-label="Nice Gadgets home"
    onClick={onClick}
  >
    <img
      className={styles.image}
      src={logoSrc}
      alt="Nice Gadgets"
    />
  </Link>
);
