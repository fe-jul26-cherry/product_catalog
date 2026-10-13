import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BackLink } from '@/components/atoms/BackLink';
import { AsyncContent } from '@/components/molecules/AsyncContent';
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { ProductAbout } from '@/components/organisms/ProductAbout';
import { ProductGallery } from '@/components/organisms/ProductGallery';
import { ProductsSlider } from '@/components/organisms/ProductsSlider';
import { ProductTechSpecs } from '@/components/organisms/ProductTechSpecs';
import { ProductVariants } from '@/components/organisms/ProductVariants';
import { CATEGORIES } from '@/constants';
import { useAsync } from '@/hooks';
import { getProductDetails, getSuggestedProducts } from '@/services';

import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { productId = '' } = useParams();

  const loadProduct = useCallback(
    () => getProductDetails(productId),
    [productId],
  );
  const loadSuggested = useCallback(
    () => getSuggestedProducts(productId),
    [productId],
  );

  const product = useAsync(loadProduct);
  const suggested = useAsync(loadSuggested);

  const category = CATEGORIES.find(({ id }) => id === product.data?.category);

  return (
    <div className={styles.root}>
      <AsyncContent
        isLoading={product.isLoading}
        error={product.error}
        onRetry={product.retry}
      >
        {product.data ?
          <>
            <Breadcrumbs
              items={[
                { label: category?.title ?? '', path: category?.path },
                { label: product.data.details.name },
              ]}
            />
            <BackLink onClick={() => navigate(-1)}>Back</BackLink>
            <h1 className={styles.title}>{product.data.details.name}</h1>

            <div className={styles.top}>
              <ProductGallery
                images={product.data.details.images}
                name={product.data.details.name}
              />
              <ProductVariants product={product.data.details} />
            </div>

            <div className={styles.bottom}>
              <ProductAbout description={product.data.details.description} />
              <ProductTechSpecs product={product.data.details} />
            </div>
          </>
        : <ErrorMessage message="Product was not found." />}
      </AsyncContent>

      <AsyncContent
        isLoading={suggested.isLoading}
        error={suggested.error}
        onRetry={suggested.retry}
      >
        <ProductsSlider
          title="You may also like"
          products={suggested.data ?? []}
        />
      </AsyncContent>
    </div>
  );
};
