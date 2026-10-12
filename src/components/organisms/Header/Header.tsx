import { useState } from 'react';

import favoriteOutline from '@/assets/icons/favorite-outline.svg';
import menu from '@/assets/icons/menu.svg';
import shoppingBag from '@/assets/icons/shopping-bag.svg';
import { Icon } from '@/components/atoms/Icon';
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
      <div className={styles.bar}>
        <div className={styles.left}>
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
        </div>

        <div className={styles.actions}>
          <IconLink
            to={ROUTES.FAVORITES}
            label="Favourites"
          >
            <Icon
              src={favoriteOutline}
              alt=""
              size="lg"
            />
          </IconLink>
          <IconLink
            to={ROUTES.CART}
            label="Cart"
          >
            <Icon
              src={shoppingBag}
              alt=""
              size="lg"
            />
          </IconLink>

          <button
            type="button"
            className={styles.burger}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            <Icon
              src={menu}
              alt=""
              size="lg"
            />
          </button>
        </div>
      </div>

      <BurgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
};
