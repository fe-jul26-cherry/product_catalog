import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { PageTransition } from '@/animations';
import { ErrorBoundary } from '@/app/ErrorBoundary';
import { Loader } from '@/components/atoms/Loader';
import { AiAssistant } from '@/components/organisms/AiAssistant';
import { Footer } from '@/components/organisms/Footer';
import { Header } from '@/components/organisms/Header';
import { CATALOG_ROUTES } from '@/constants';
import { useTranslation } from '@/hooks';

import styles from './MainLayout.module.scss';

export const MainLayout = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isCatalog = CATALOG_ROUTES.some((route) => route === pathname);

  return (
    <>
      <Header />
      <div className={styles.page}>
        <main
          className={isCatalog ? `${styles.main} ${styles.wide}` : styles.main}
        >
          <PageTransition>
            <ErrorBoundary>
              <Suspense fallback={<Loader label={t.status.loading} />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </PageTransition>
        </main>
        <AiAssistant />
      </div>
      <Footer />
    </>
  );
};
