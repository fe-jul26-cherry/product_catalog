import { HashRouter, Route, Routes } from 'react-router-dom';

import { AnimationProvider } from '@/animations';
import { MainLayout } from '@/components/templates/MainLayout';
import { ROUTES } from '@/constants';
import { CartPage } from '@/pages/CartPage';
import { CatalogPage } from '@/pages/CatalogPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProductDetailsPage } from '@/pages/ProductDetailsPage';

export const App = () => (
  <AnimationProvider>
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            index
            element={<HomePage />}
          />
          <Route
            path={ROUTES.PHONES}
            element={<CatalogPage category="phones" />}
          />
          <Route
            path={ROUTES.TABLETS}
            element={<CatalogPage category="tablets" />}
          />
          <Route
            path={ROUTES.ACCESSORIES}
            element={<CatalogPage category="accessories" />}
          />
          <Route
            path={ROUTES.PRODUCT}
            element={<ProductDetailsPage />}
          />
          <Route
            path={ROUTES.CART}
            element={<CartPage />}
          />
          <Route
            path={ROUTES.FAVORITES}
            element={<FavoritesPage />}
          />
          <Route
            path={ROUTES.NOT_FOUND}
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </HashRouter>
  </AnimationProvider>
);
