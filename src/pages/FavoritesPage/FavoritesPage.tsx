import { Breadcrumbs } from '@/components/molecules/Breadcrumbs';
import { ProductsList } from '@/components/organisms/ProductsList';
import { useFavoritesStore } from '@/store';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const favorites = useFavoritesStore((state) => state.items);

  return (
    <div className={styles.root}>
      <Breadcrumbs items={[{ label: 'Favourites' }]} />
      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.count}>{favorites.length} items</p>
      {favorites.length === 0 ?
        <p className={styles.empty}>Your favourites list is empty</p>
      : <ProductsList products={favorites} />}
    </div>
  );
};
