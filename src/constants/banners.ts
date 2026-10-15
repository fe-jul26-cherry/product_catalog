import type { Category } from '@/types';

export interface BannerSlide {
  id: string;
  category: Category;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  fit?: 'cover' | 'contain';
  position?: string;
  fullBleed?: boolean;
}

export const BANNERS: BannerSlide[] = [
  {
    id: 'banner_phone',
    category: 'phones',
    image: 'img/slider/banner_phone.jpg',
    alt: 'Three smartphones showing planets above a mountain landscape',
    eyebrow: 'Next level',
    title: 'See beyond the screen',
    subtitle: 'Immersive displays that bring every pixel to life.',
    cta: 'Shop phones',
    position: 'center',
  },
  {
    id: 'banner_tablet',
    category: 'tablets',
    image: 'img/slider/banner_tablet.jpg',
    alt: 'Three tablets on a rock ledge in front of a moonlit mountain range',
    eyebrow: 'Tablets',
    title: 'Big canvas, bigger ideas',
    subtitle: 'Create, watch and play on a display that has room for it all.',
    cta: 'Shop tablets',
    position: '100% center',
    fullBleed: true,
  },
  {
    id: 'banner_watch',
    category: 'accessories',
    image: 'img/slider/banner_watch.jpg',
    alt: 'Three smartwatches with green straps against a green mountain night sky',
    eyebrow: 'Accessories',
    title: 'Style that keeps time',
    subtitle: 'Smartwatches and straps to match your mood and your day.',
    cta: 'Shop accessories',
    position: '100% center',
    fullBleed: true,
  },
];
