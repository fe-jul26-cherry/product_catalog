import { Logo } from '@/components/atoms/Logo';

import styles from './Footer.module.scss';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer = () => (
  <footer className={styles.root}>
    <div className={styles.content}>
      <Logo />

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

      <button
        type="button"
        className={styles.backToTop}
        onClick={scrollToTop}
      >
        Back to top
      </button>
    </div>
  </footer>
);
