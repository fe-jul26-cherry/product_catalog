import { useState } from 'react';

import favoriteOutline from '@/assets/icons/favorite-outline.svg';
import menu from '@/assets/icons/menu.svg';
import shoppingBag from '@/assets/icons/shopping-bag.svg';
import { Icon } from '@/components/atoms/Icon';
import { LanguageToggle } from '@/components/atoms/LanguageToggle';
import { Logo } from '@/components/atoms/Logo';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { IconLink } from '@/components/molecules/IconLink';
import { NavItem } from '@/components/molecules/NavItem';
import { BurgerMenu } from '@/components/organisms/BurgerMenu';
import { CATEGORIES, ROUTES } from '@/constants';
import {
  selectCartCount,
  selectFavoritesCount,
  useCartStore,
  useFavoritesStore,
  useLanguageStore,
  useThemeStore,
} from '@/store';

import styles from './Header.module.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const language = useLanguageStore((state) => state.language);
  const toggleLanguage = useLanguageStore((state) => state.toggleLanguage);
  const cartCount = useCartStore(selectCartCount);
  const favoritesCount = useFavoritesStore(selectFavoritesCount);

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

        <div className={styles.controls}>
          <LanguageToggle
            isUa={language === 'ua'}
            onToggle={toggleLanguage}
          />
          <ThemeToggle
            isDark={theme === 'dark'}
            onToggle={toggleTheme}
          />
        </div>

        <div className={styles.actions}>
          <IconLink
            to={ROUTES.FAVORITES}
            label="Favourites"
            count={favoritesCount}
          >
            <Icon
              src={favoriteOutline}
              alt=""
              size="sm"
            />
          </IconLink>
          <IconLink
            to={ROUTES.CART}
            label="Cart"
            count={cartCount}
          >
            <Icon
              src={shoppingBag}
              alt=""
              size="sm"
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
              size="sm"
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
