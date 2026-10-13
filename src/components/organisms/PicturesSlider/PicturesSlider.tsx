import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { A11y, Autoplay, EffectFade, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';

import { BANNERS, CATEGORIES, ROUTES } from '@/constants';

import styles from './PicturesSlider.module.scss';

import type { Category } from '@/types';
import type { Swiper as SwiperInstance } from 'swiper';

const AUTOPLAY_DELAY = 6000;
const FADE_SPEED = 900;

const getCategoryPath = (id: Category) =>
  CATEGORIES.find((category) => category.id === id)?.path ?? ROUTES.HOME;

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const PicturesSlider = () => {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayEnabled] = useState(() => !prefersReducedMotion());
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleSlideChange = (instance: SwiperInstance) => {
    dotRefs.current.forEach((dot) => dot?.style.setProperty('--progress', '0'));
    setActiveIndex(instance.realIndex);
  };

  const handleTimeLeft = (
    instance: SwiperInstance,
    _timeLeft: number,
    percentage: number,
  ) => {
    dotRefs.current[instance.realIndex]?.style.setProperty(
      '--progress',
      String(1 - percentage),
    );
  };

  return (
    <section
      className={
        autoplayEnabled ? styles.root : `${styles.root} ${styles.paused}`
      }
      aria-label="Promotions"
    >
      <Swiper
        className={styles.swiper}
        modules={[A11y, Autoplay, EffectFade, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={FADE_SPEED}
        slidesPerView={1}
        rewind
        grabCursor
        keyboard={{ enabled: true }}
        autoplay={{
          enabled: autoplayEnabled,
          delay: AUTOPLAY_DELAY,
          disableOnInteraction: false,
        }}
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        onAutoplayTimeLeft={handleTimeLeft}
      >
        {BANNERS.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <SwiperSlide
              key={slide.id}
              className={
                isActive ?
                  `${styles.slide} ${styles.slideActive}`
                : styles.slide
              }
            >
              <div
                className={
                  slide.fit === 'contain' ?
                    `${styles.visual} ${styles.visualContain}`
                  : styles.visual
                }
              >
                <img
                  className={styles.image}
                  src={slide.image}
                  alt={slide.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                  style={{
                    objectFit: slide.fit,
                    objectPosition: slide.position,
                  }}
                />
              </div>

              <div className={styles.panel}>
                <p className={styles.eyebrow}>{slide.eyebrow}</p>
                <h3 className={styles.title}>{slide.title}</h3>
                <p className={styles.subtitle}>{slide.subtitle}</p>
                <Link
                  to={getCategoryPath(slide.category)}
                  className={styles.cta}
                  tabIndex={isActive ? 0 : -1}
                >
                  {slide.cta}
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className={styles.controls}>
        <div className={styles.dots}>
          {BANNERS.map((slide, index) => (
            <button
              key={slide.id}
              ref={(element) => {
                dotRefs.current[index] = element;
              }}
              type="button"
              className={
                index === activeIndex ?
                  `${styles.dot} ${styles.dotActive}`
                : styles.dot
              }
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => swiper?.slideTo(index)}
            >
              <span className={styles.fill} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
