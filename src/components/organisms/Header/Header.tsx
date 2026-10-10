import { useState } from 'react';

import { Logo } from '@/components/atoms/Logo';
import { IconLink } from '@/components/molecules/IconLink';
import { NavItem } from '@/components/molecules/NavItem';
import { BurgerMenu } from '@/components/organisms/BurgerMenu';
import { CATEGORIES, ROUTES } from '@/constants';

import styles from './Header.module.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.root}>
      <Logo />

      <nav
        className={styles.nav}
        aria-label="Main"
      >
        <NavItem to={ROUTES.HOME}>Home</NavItem>
        {CATEGORIES.map((category) => (
          <NavItem
            key={category.id}
            to={category.path}
          >
            {category.id}
          </NavItem>
        ))}
      </nav>

      <div className={styles.actions}>
        <IconLink
          to={ROUTES.FAVORITES}
          label="Favourites"
        >
          FAV
        </IconLink>
        <IconLink
          to={ROUTES.CART}
          label="Cart"
        >
          CART
        </IconLink>
      </div>

      <button
        type="button"
        className={styles.burger}
        aria-label="Open menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(true)}
      >
        MENU
      </button>

      <BurgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
};
