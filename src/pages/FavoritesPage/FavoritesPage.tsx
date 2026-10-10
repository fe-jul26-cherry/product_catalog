import { Breadcrumbs } from '@/components/molecules/Breadcrumbs';
import { ProductsList } from '@/components/organisms/ProductsList';
import { mockProducts } from '@/mocks';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const favorites = mockProducts.slice(0, 5);

  return (
    <div className={styles.root}>
      <Breadcrumbs items={[{ label: 'Favourites' }]} />
      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.count}>{favorites.length} items</p>
      <ProductsList products={favorites} />
    </div>
  );
};
