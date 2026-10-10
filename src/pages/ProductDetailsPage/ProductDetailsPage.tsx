import { useNavigate } from 'react-router-dom';

import { BackLink } from '@/components/atoms/BackLink';
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs';
import { ProductAbout } from '@/components/organisms/ProductAbout';
import { ProductGallery } from '@/components/organisms/ProductGallery';
import { ProductsSlider } from '@/components/organisms/ProductsSlider';
import { ProductTechSpecs } from '@/components/organisms/ProductTechSpecs';
import { ProductVariants } from '@/components/organisms/ProductVariants';
import { ROUTES } from '@/constants';
import { mockProductDetails, mockProducts } from '@/mocks';

import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const product = mockProductDetails;

  return (
    <div className={styles.root}>
      <Breadcrumbs
        items={[
          { label: 'Phones', path: ROUTES.PHONES },
          { label: product.name },
        ]}
      />
      <BackLink onClick={() => navigate(-1)}>Back</BackLink>
      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.top}>
        <ProductGallery
          images={product.images}
          name={product.name}
        />
        <ProductVariants product={product} />
      </div>

      <div className={styles.bottom}>
        <ProductAbout description={product.description} />
        <ProductTechSpecs product={product} />
      </div>

      <ProductsSlider
        title="You may also like"
        products={mockProducts}
      />
    </div>
  );
};
