import { Reveal } from '@/animations';
import { Categories } from '@/components/organisms/Categories';
import { PicturesSlider } from '@/components/organisms/PicturesSlider';
import { ProductsSlider } from '@/components/organisms/ProductsSlider';
import { mockProducts } from '@/mocks';

import styles from './HomePage.module.scss';

export const HomePage = () => (
  <div className={styles.root}>
    <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
    <Reveal>
      <PicturesSlider />
    </Reveal>
    <ProductsSlider
      title="Brand new models"
      products={mockProducts}
    />
    <Categories counts={{ phones: 124, tablets: 36, accessories: 34 }} />
    <ProductsSlider
      title="Hot prices"
      products={mockProducts}
    />
  </div>
);
