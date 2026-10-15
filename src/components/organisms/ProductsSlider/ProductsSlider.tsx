import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import chevronLeftIcon from '@/assets/icons/chevron-left.svg';
import chevronRightIcon from '@/assets/icons/chevron-right.svg';
import { Icon } from '@/components/atoms/Icon';
import { IconButton } from '@/components/atoms/IconButton';
import { ProductCard } from '@/components/molecules/ProductCard';
import { useProductActions } from '@/hooks';

import styles from './ProductsSlider.module.scss';

import 'swiper/css';

import type { Product } from '@/types';
import type { Swiper as SwiperInstance } from 'swiper/types';

interface ProductsSliderProps {
  title: string;
  products: Product[];
}

export const ProductsSlider = ({ title, products }: ProductsSliderProps) => {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const { isInCart, toggleCart } = useProductActions();

  const syncEdges = (instance: SwiperInstance) => {
    setIsBeginning(instance.isBeginning);
    setIsEnd(instance.isEnd);
  };

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <IconButton
            variant="slider"
            aria-label="Previous products"
            disabled={isBeginning}
            onClick={() => swiper?.slidePrev()}
          >
            <Icon
              src={chevronLeftIcon}
              alt=""
              className={styles.arrow}
            />
          </IconButton>
          <IconButton
            variant="slider"
            aria-label="Next products"
            disabled={isEnd}
            onClick={() => swiper?.slideNext()}
          >
            <Icon
              src={chevronRightIcon}
              alt=""
              className={styles.arrow}
            />
          </IconButton>
        </div>
      </div>

      <Swiper
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.5 },
          1200: { slidesPerView: 4 },
        }}
        onSwiper={(instance) => {
          setSwiper(instance);
          syncEdges(instance);
        }}
        onSlideChange={syncEdges}
        onResize={syncEdges}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              product={product}
              isInCart={isInCart(product.itemId)}
              onToggleCart={() => toggleCart(product)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
