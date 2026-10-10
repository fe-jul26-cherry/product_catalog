import type { ProductDetails } from '@/types';

export const mockProductDetails: ProductDetails = {
  id: 'apple-iphone-14-pro-128gb-gold',
  namespaceId: 'apple-iphone-14-pro',
  name: 'Apple iPhone 14 Pro 128GB Gold',
  capacityAvailable: ['128GB', '256GB', '512GB', '1TB'],
  capacity: '128GB',
  priceRegular: 1056,
  priceDiscount: 980,
  colorsAvailable: ['spaceblack', 'gold'],
  color: 'gold',
  images: [
    'img/phones/apple-iphone-14-pro/gold/00.webp',
    'img/phones/apple-iphone-14-pro/gold/01.webp',
    'img/phones/apple-iphone-14-pro/gold/02.webp',
    'img/phones/apple-iphone-14-pro/gold/03.webp',
    'img/phones/apple-iphone-14-pro/gold/04.webp',
  ],
  description: [
    {
      title: 'And then was a Pro',
      text: [
        'A transformative triple-camera system that adds tons of capability without complexity.',
        'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
      ],
    },
    {
      title: 'Camera',
      text: [
        'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
      ],
    },
    {
      title:
        'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
      text: [
        'iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
      ],
    },
  ],
  screen: "6.1' OLED (Super Retina XDR)",
  resolution: '2556x1179',
  processor: 'Apple A16 Bionic',
  ram: '6GB',
  camera: '12 Mp + 12 Mp + 12MP',
  zoom: 'Digital 5x, Optical 2x',
  cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE', '5G'],
};
