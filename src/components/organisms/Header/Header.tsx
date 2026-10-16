import { useState } from 'react';

import close from '@/assets/icons/close.svg';
import favoriteOutline from '@/assets/icons/favorite-outline.svg';
import menu from '@/assets/icons/menu.svg';
import search from '@/assets/icons/search.svg';
import shoppingBag from '@/assets/icons/shopping-bag.svg';
import { Icon } from '@/components/atoms/Icon';
import { LanguageToggle } from '@/components/atoms/LanguageToggle';
import { Logo } from '@/components/atoms/Logo';
import { SearchInput } from '@/components/atoms/SearchInput';
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

import type { FormEvent } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const language = useLanguageStore((state) => state.language);
  const toggleLanguage = useLanguageStore((state) => state.toggleLanguage);
  const cartCount = useCartStore(selectCartCount);
  const favoritesCount = useFavoritesStore(selectFavoritesCount);

  const closeSearch = () => setIsSearchOpen(false);

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    closeSearch();
  };

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

        <form
          className={styles.search}
          role="search"
          onSubmit={handleSearchSubmit}
        >
          <SearchInput
            value={query}
            onChange={setQuery}
          />
        </form>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.searchButton}
            aria-label="Open search"
            aria-expanded={isSearchOpen}
            onClick={() => setIsSearchOpen(true)}
          >
            <Icon
              src={search}
              alt=""
              size="sm"
            />
          </button>
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

      {isSearchOpen && (
        <form
          className={styles.searchBar}
          role="search"
          onSubmit={handleSearchSubmit}
        >
          <div className={styles.searchField}>
            <SearchInput
              value={query}
              onChange={setQuery}
              onEscape={closeSearch}
              focusOnMount
            />
          </div>
          <button
            type="button"
            className={styles.searchClose}
            aria-label="Close search"
            onClick={closeSearch}
          >
            <Icon
              src={close}
              alt=""
              size="sm"
            />
          </button>
        </form>
      )}

      <BurgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
};
