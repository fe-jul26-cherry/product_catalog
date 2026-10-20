import type { Category } from '@/types';

export interface BannerSlide {
  id: string;
  category: Category;
  image: string;
  imageLight?: string;
  fit?: 'cover' | 'contain';
  position?: string;
  fullBleed?: boolean;
}

export const BANNERS: BannerSlide[] = [
  {
    id: 'banner_phone',
    category: 'phones',
    image: 'img/slider/banner_phone.webp',
    imageLight: 'img/slider/banner_phone-light.webp',
    position: 'center',
  },
  {
    id: 'banner_tablet',
    category: 'tablets',
    image: 'img/slider/banner_tablet.webp',
    imageLight: 'img/slider/banner_tablet-light.webp',
    position: '100% center',
    fullBleed: true,
  },
  {
    id: 'banner_watch',
    category: 'accessories',
    image: 'img/slider/banner_watch.webp',
    imageLight: 'img/slider/banner_watch-light.webp',
    position: '100% center',
    fullBleed: true,
  },
];
