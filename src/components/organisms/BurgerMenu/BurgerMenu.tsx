import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import close from '@/assets/icons/close.svg';
import favoriteOutline from '@/assets/icons/favorite-outline.svg';
import shoppingBag from '@/assets/icons/shopping-bag.svg';
import { Counter } from '@/components/atoms/Counter';
import { Icon } from '@/components/atoms/Icon';
import { Logo } from '@/components/atoms/Logo';
import { CATEGORIES, ROUTES } from '@/constants';
import { selectCartCount, useCartStore } from '@/store';

import styles from './BurgerMenu.module.scss';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { to: ROUTES.HOME, label: 'Home' },
  ...CATEGORIES.map((category) => ({ to: category.path, label: category.id })),
];

const getItemClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.item} ${styles.itemActive}` : styles.item;

export const BurgerMenu = ({ isOpen, onClose }: BurgerMenuProps) => {
  const cartCount = useCartStore(selectCartCount);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const desktopQuery = window.matchMedia('(min-width: 640px)');

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    desktopQuery.addEventListener('change', handleDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      desktopQuery.removeEventListener('change', handleDesktop);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <aside
      className={styles.root}
      aria-label="Menu"
    >
      <div className={styles.top}>
        <div className={styles.logo}>
          <Logo onClick={onClose} />
        </div>

        <button
          type="button"
          className={styles.close}
          aria-label="Close menu"
          onClick={onClose}
        >
          <Icon
            src={close}
            alt=""
          />
        </button>
      </div>

      <nav
        className={styles.nav}
        aria-label="Main"
      >
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={getItemClassName}
            onClick={onClose}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.actions}>
        <NavLink
          to={ROUTES.FAVORITES}
          className={styles.cell}
          aria-label="Favourites"
          onClick={onClose}
        >
          <Icon
            src={favoriteOutline}
            alt=""
          />
        </NavLink>
        <NavLink
          to={ROUTES.CART}
          className={styles.cell}
          aria-label="Cart"
          onClick={onClose}
        >
          <Icon
            src={shoppingBag}
            alt=""
          />
          {cartCount > 0 && (
            <span className={styles.counter}>
              <Counter value={cartCount} />
            </span>
          )}
        </NavLink>
      </div>
    </aside>
  );
};
