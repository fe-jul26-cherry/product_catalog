import scrollToTopIcon from '@/assets/icons/chevron-up.svg';
import { Icon } from '@/components/atoms/Icon';
import { Logo } from '@/components/atoms/Logo';

import styles from './Footer.module.scss';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer = () => (
  <footer className={styles.root}>
    <div className={styles.content}>
      <div className={styles.logo}>
        <Logo />
      </div>

      <nav
        className={styles.links}
        aria-label="Footer"
      >
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <a href="#contacts">Contacts</a>
        <a href="#rights">Rights</a>
      </nav>

      <div className={styles.action}>
        <button
          type="button"
          className={styles.backToTop}
          onClick={scrollToTop}
        >
          Back to top
          <span
            className={styles.arrow}
            aria-hidden="true"
          >
            <Icon
              src={scrollToTopIcon}
              alt=""
            />
          </span>
        </button>
      </div>
    </div>
  </footer>
);
