import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { PageTransition } from '@/animations';
import { ErrorBoundary } from '@/app/ErrorBoundary';
import { Loader } from '@/components/atoms/Loader';
import { Footer } from '@/components/organisms/Footer';
import { Header } from '@/components/organisms/Header';

import styles from './MainLayout.module.scss';

export const MainLayout = () => (
  <>
    <Header />
    <main className={styles.main}>
      <PageTransition>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </PageTransition>
    </main>
    <Footer />
  </>
);
