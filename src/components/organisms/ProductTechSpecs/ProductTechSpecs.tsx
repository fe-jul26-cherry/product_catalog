import { ProductSpecs } from '@/components/molecules/ProductSpecs';

import styles from './ProductTechSpecs.module.scss';

import type { ProductDetails } from '@/types';

interface ProductTechSpecsProps {
  product: ProductDetails;
}

export const ProductTechSpecs = ({ product }: ProductTechSpecsProps) => (
  <section className={styles.root}>
    <h3 className={styles.title}>Tech specs</h3>
    <ProductSpecs
      specs={[
        { label: 'Screen', value: product.screen },
        { label: 'Resolution', value: product.resolution },
        { label: 'Processor', value: product.processor },
        { label: 'RAM', value: product.ram },
        { label: 'Built in memory', value: product.capacity },
        { label: 'Camera', value: product.camera ?? '-' },
        { label: 'Zoom', value: product.zoom ?? '-' },
        { label: 'Cell', value: product.cell.join(', ') },
      ]}
    />
  </section>
);
