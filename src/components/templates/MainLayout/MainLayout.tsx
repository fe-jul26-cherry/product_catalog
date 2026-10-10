import { Outlet } from 'react-router-dom';

import { PageTransition } from '@/animations';
import { Footer } from '@/components/organisms/Footer';
import { Header } from '@/components/organisms/Header';

import styles from './MainLayout.module.scss';

export const MainLayout = () => (
  <>
    <Header />
    <main className={styles.main}>
      <PageTransition>
        <Outlet />
      </PageTransition>
    </main>
    <Footer />
  </>
);
