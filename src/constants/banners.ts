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
}

export const BANNERS: BannerSlide[] = [
  {
    id: 'baner1',
    category: 'phones',
    image: 'img/baner1.JPG',
    alt: 'Blue and pink iPhones against a purple sunset',
    eyebrow: 'Colours',
    title: 'Pick the shade that is you',
    subtitle:
      'From Sierra Blue to soft Pink, there is a colour for every mood.',
    cta: 'Explore colours',
    position: 'center',
  },
  {
    id: 'baner3',
    category: 'phones',
    image: 'img/baner3.png',
    alt: 'Two purple smartphones with glowing hexagons',
    eyebrow: 'Fresh arrivals',
    title: 'Screens that pop',
    subtitle: 'Vivid displays and bold design in one light package.',
    cta: 'See the lineup',
    fit: 'contain',
  },
  {
    id: 'baner4',
    category: 'phones',
    image: 'img/baner4.jpg',
    alt: 'Three smartphones showing planets above a mountain landscape',
    eyebrow: 'Next level',
    title: 'See beyond the screen',
    subtitle: 'Immersive displays that bring every pixel to life.',
    cta: 'Discover more',
    position: 'center',
  },
];
