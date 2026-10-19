import type { Category, SortBy } from '@/types';

export const en = {
  meta: {
    title: 'Phone catalog',
  },
  common: {
    back: 'Back',
    home: 'Home',
    close: 'Close',
  },
  status: {
    loading: 'Loading',
    retry: 'Try again',
  },
  errors: {
    network: 'Network error. Check your connection and try again.',
    timeout: 'The server is taking too long to respond.',
    server: (status: number) => `Server error (${status}).`,
    invalid: 'Received an invalid response from the server.',
    config: 'This feature is not configured yet.',
    unknown: 'Something went wrong.',
    page: 'Something went wrong while showing this page.',
    productNotFound: 'Product was not found.',
  },
  nav: {
    phones: 'Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  } satisfies Record<Category, string>,
  categories: {
    phones: 'Mobile phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  } satisfies Record<Category, string>,
  header: {
    mainNav: 'Main',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    breadcrumbs: 'Breadcrumbs',
    search: 'Search',
    searchProducts: 'Search products',
    openSearch: 'Open search',
    closeSearch: 'Close search',
    favourites: 'Favourites',
    cart: 'Cart',
    darkTheme: 'Dark theme',
    ukrainianLanguage: 'Ukrainian language',
  },
  footer: {
    nav: 'Footer',
    contacts: 'Contacts',
    rights: 'Rights',
    backToTop: 'Back to top',
  },
  home: {
    title: 'Welcome to Nice Gadgets store!',
    newModels: 'Brand new models',
    hotPrices: 'Hot prices',
    shopByCategory: 'Shop by category',
    promotions: 'Promotions',
    previousSlide: 'Previous slide',
    nextSlide: 'Next slide',
    goToSlide: (index: number) => `Go to slide ${index}`,
  },
  banners: {
    banner_phone: {
      alt: 'Three smartphones showing planets above a mountain landscape',
      eyebrow: 'Next level',
      title: 'See beyond the screen',
      subtitle: 'Immersive displays that bring every pixel to life.',
      cta: 'Shop phones',
    },
    banner_tablet: {
      alt: 'Three tablets on a rock ledge in front of a moonlit mountain range',
      eyebrow: 'Tablets',
      title: 'Big canvas, bigger ideas',
      subtitle: 'Create, watch and play on a display that has room for it all.',
      cta: 'Shop tablets',
    },
    banner_watch: {
      alt: 'Three smartwatches with green straps against a green mountain night sky',
      eyebrow: 'Accessories',
      title: 'Style that keeps time',
      subtitle: 'Smartwatches and straps to match your mood and your day.',
      cta: 'Shop accessories',
    },
  } as Record<
    string,
    {
      alt: string;
      eyebrow: string;
      title: string;
      subtitle: string;
      cta: string;
    }
  >,
  catalog: {
    models: (count: number) => `${count} ${count === 1 ? 'model' : 'models'}`,
    sortBy: 'Sort by',
    itemsOnPage: 'Items on page',
    sort: {
      age: 'Newest',
      title: 'Alphabetically',
      price: 'Cheapest',
    } satisfies Record<SortBy, string>,
    all: 'All',
    empty: 'There are no models in this category yet.',
    pagination: 'Pagination',
    previousPage: 'Previous page',
    nextPage: 'Next page',
  },
  product: {
    availableColors: 'Available colors',
    selectCapacity: 'Select capacity',
    about: 'About',
    techSpecs: 'Tech specs',
    suggested: 'You may also like',
    previousProducts: 'Previous products',
    nextProducts: 'Next products',
  },
  specs: {
    screen: 'Screen',
    resolution: 'Resolution',
    processor: 'Processor',
    ram: 'RAM',
    capacity: 'Capacity',
    builtInMemory: 'Built in memory',
    camera: 'Camera',
    zoom: 'Zoom',
    cell: 'Cell',
  },
  card: {
    addToCart: 'Add to cart',
    added: 'Added',
    addToFavourites: 'Add to favourites',
    removeFromFavourites: 'Remove from favourites',
    favourite: 'favourite',
  },
  cart: {
    title: 'Cart',
    empty: 'Your cart is empty',
    total: (count: number) =>
      `Total for ${count} ${count === 1 ? 'item' : 'items'}`,
    checkout: 'Checkout',
    checkoutConfirm:
      'Checkout is not implemented yet. Do you want to clear the cart?',
    remove: 'Remove from cart',
    decrease: 'Decrease quantity',
    increase: 'Increase quantity',
  },
  favourites: {
    title: 'Favourites',
    count: (count: number) => `${count} ${count === 1 ? 'item' : 'items'}`,
    empty: 'Your favourites list is empty',
  },
  auth: {
    signIn: 'Sign in',
    signUp: 'Sign up',
    signOut: 'Sign out',
    account: 'Account',
    email: 'Email',
    password: 'Password',
    pending: 'Please wait',
    noAccount: 'No account yet?',
    haveAccount: 'Already have an account?',
    signedInAs: 'Signed in as',
    syncNote: 'Your cart and favourites are saved to your account.',
    confirmTitle: 'Check your email',
    confirmText: (email: string) =>
      `We sent a confirmation link to ${email}. Confirm your email, then sign in.`,
    validation: {
      required: 'This field is required',
      email: 'Enter a valid email address',
      passwordShort: (min: number) =>
        `Password must be at least ${min} characters`,
    },
    errors: {
      invalidCredentials: 'Wrong email or password.',
      userExists: 'An account with this email already exists.',
      weakPassword: 'This password is too weak. Try a longer one.',
      emailNotConfirmed: 'Confirm your email first, then sign in.',
      rateLimit: 'Too many attempts. Try again in a few minutes.',
      network: 'Network error. Check your connection and try again.',
      unknown: 'Something went wrong. Try again.',
    },
  },
  notFound: {
    title: 'Page not found',
  },
  colors: {} as Record<string, string>,
  units: {} as Record<string, string>,
  search: {
    title: 'Search results',
    results: (count: number) =>
      `${count} ${count === 1 ? 'result' : 'results'}`,
    empty: (query: string) => `No results found for "${query}".`,
  },
};

export type Translations = typeof en;
