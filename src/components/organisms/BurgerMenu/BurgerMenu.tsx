import styles from './BurgerMenu.module.scss';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BurgerMenu = ({ isOpen, onClose }: BurgerMenuProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <aside className={styles.root}>
      <button
        type="button"
        className={styles.close}
        aria-label="Close menu"
        onClick={onClose}
      >
        CLOSE
      </button>
    </aside>
  );
};
