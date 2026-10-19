import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { PageTransition } from '@/animations';
import { ErrorBoundary } from '@/app/ErrorBoundary';
import { Loader } from '@/components/atoms/Loader';
import { AiAssistant } from '@/components/organisms/AiAssistant';
import { Footer } from '@/components/organisms/Footer';
import { Header } from '@/components/organisms/Header';
import { useTranslation } from '@/hooks';

import styles from './MainLayout.module.scss';

export const MainLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className={styles.page}>
        <main className={styles.main}>
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
