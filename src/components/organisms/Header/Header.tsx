import { useState } from 'react';

import astronautActive from '@/assets/icons/astronaut-active.svg';
import astronaut from '@/assets/icons/astronaut.svg';
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
import { AuthModal } from '@/components/organisms/AuthModal';
import { BurgerMenu } from '@/components/organisms/BurgerMenu';
import { CATEGORIES, ROUTES } from '@/constants';
import { useMediaQuery, useTranslation } from '@/hooks';
import { isSupabaseConfigured } from '@/services';
import {
  selectCartCount,
  selectFavoritesCount,
  useAuthStore,
  useCartStore,
  useFavoritesStore,
  useLanguageStore,
  useThemeStore,
} from '@/store';

import styles from './Header.module.scss';

import type { FormEvent } from 'react';

const CROWDED_QUERY = '(min-width: 640px) and (max-width: 719px)';
const CROWDED_ACCOUNT_QUERY = '(min-width: 640px) and (max-width: 799px)';

export const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [query, setQuery] = useState('');
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const language = useLanguageStore((state) => state.language);
  const toggleLanguage = useLanguageStore((state) => state.toggleLanguage);
  const cartCount = useCartStore(selectCartCount);
  const favoritesCount = useFavoritesStore(selectFavoritesCount);
  const isSignedIn = useAuthStore((state) => state.user !== null);

  const isCrowdedRange = useMediaQuery(
    isSupabaseConfigured ? CROWDED_ACCOUNT_QUERY : CROWDED_QUERY,
  );
  const isCrowded =
    isCrowdedRange && (isSupabaseConfigured || language === 'ua');

  const closeSearch = () => setIsSearchOpen(false);
  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    closeSearch();
  };

  return (
    <header className={styles.root}>
      <div
        className={`${styles.bar} ${language === 'ua' ? styles.barUa : ''} ${isSupabaseConfigured ? styles.barAccount : ''}`}
      >
        <div className={styles.left}>
          <Logo />

          <nav
            className={styles.nav}
            aria-label={t.header.mainNav}
          >
            {!isCrowded && <NavItem to={ROUTES.HOME}>{t.common.home}</NavItem>}
            {CATEGORIES.map((category) => (
              <NavItem
                key={category.id}
                to={category.path}
              >
                {t.nav[category.id]}
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
            placeholder={t.header.search}
            label={t.header.searchProducts}
          />
        </form>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.searchButton}
            aria-label={t.header.openSearch}
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
            label={t.header.ukrainianLanguage}
          />
          <ThemeToggle
            isDark={theme === 'dark'}
            onToggle={toggleTheme}
            label={t.header.darkTheme}
          />
        </div>

        <div className={styles.actions}>
          <IconLink
            to={ROUTES.FAVORITES}
            label={t.header.favourites}
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
            label={t.header.cart}
            count={cartCount}
          >
            <Icon
              src={shoppingBag}
              alt=""
              size="sm"
            />
          </IconLink>

          {isSupabaseConfigured && (
            <button
              type="button"
              className={`${styles.accountCell} ${isSignedIn ? styles.accountActive : ''}`}
              aria-label={isSignedIn ? t.auth.account : t.auth.signIn}
              aria-haspopup="dialog"
              onClick={openAuth}
            >
              <Icon
                src={isSignedIn ? astronautActive : astronaut}
                alt=""
                size="sm"
              />
            </button>
          )}

          <button
            type="button"
            className={styles.burger}
            aria-label={t.header.openMenu}
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
              placeholder={t.header.search}
              label={t.header.searchProducts}
              focusOnMount
            />
          </div>
          <button
            type="button"
            className={styles.searchClose}
            aria-label={t.header.closeSearch}
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
        onAccount={openAuth}
      />

      {isAuthOpen && <AuthModal onClose={closeAuth} />}
    </header>
  );
};
