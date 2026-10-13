import { Reveal } from '@/animations';
import { AsyncContent } from '@/components/molecules/AsyncContent';
import { Categories } from '@/components/organisms/Categories';
import { PicturesSlider } from '@/components/organisms/PicturesSlider';
import { ProductsSlider } from '@/components/organisms/ProductsSlider';
import { useAsync } from '@/hooks';
import {
  getCategoryCounts,
  getHotPriceProducts,
  getNewProducts,
} from '@/services';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  const newProducts = useAsync(getNewProducts);
  const counts = useAsync(getCategoryCounts);
  const hotProducts = useAsync(getHotPriceProducts);

  return (
    <div className={styles.root}>
      <h1 className="visually-hidden">Product Catalog</h1>
      <Reveal>
        <PicturesSlider />
      </Reveal>

      <AsyncContent
        isLoading={newProducts.isLoading}
        error={newProducts.error}
        onRetry={newProducts.retry}
      >
        <ProductsSlider
          title="Brand new models"
          products={newProducts.data ?? []}
        />
      </AsyncContent>

      <AsyncContent
        isLoading={counts.isLoading}
        error={counts.error}
        onRetry={counts.retry}
      >
        {counts.data && <Categories counts={counts.data} />}
      </AsyncContent>

      <AsyncContent
        isLoading={hotProducts.isLoading}
        error={hotProducts.error}
        onRetry={hotProducts.retry}
      >
        <ProductsSlider
          title="Hot prices"
          products={hotProducts.data ?? []}
        />
      </AsyncContent>
    </div>
  );
};
