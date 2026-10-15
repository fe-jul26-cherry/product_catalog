import { Link } from 'react-router-dom';

import logoSrc from '@/assets/logo-dark-theme.svg';
import lightLogoSrc from '@/assets/logo-light-theme.svg';
import { ROUTES } from '@/constants';
import { useThemeStore } from '@/store';

import styles from './Logo.module.scss';

interface LogoProps {
  onClick?: () => void;
}

export const Logo = ({ onClick }: LogoProps) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Link
      to={ROUTES.HOME}
      className={styles.root}
      aria-label="Nice Gadgets home"
      onClick={onClick}
    >
      <img
        className={styles.image}
        src={theme === 'light' ? lightLogoSrc : logoSrc}
        alt="Nice Gadgets"
      />
    </Link>
  );
};
