import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Language } from '@/types';

interface LanguageState {
  language: Language;
  toggleLanguage: () => void;
}

const HTML_LANG: Record<Language, string> = {
  en: 'en',
  ua: 'uk',
};

const applyLanguage = (language: Language) => {
  if (typeof window !== 'undefined') {
    document.documentElement.lang = HTML_LANG[language];
  }
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      toggleLanguage: () =>
        set((state) => ({ language: state.language === 'en' ? 'ua' : 'en' })),
    }),
    { name: 'language' },
  ),
);

applyLanguage(useLanguageStore.getState().language);
useLanguageStore.subscribe((state) => applyLanguage(state.language));
