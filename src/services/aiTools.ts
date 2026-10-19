import { getSearchPath } from '@/constants';
import { useLanguageStore } from '@/store';

import type { Language } from '@/types';

export type Navigate = (to: string) => void;

export interface ToolCall {
  function: { name: string; arguments: string };
}

export const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'set_language',
      description: 'Change the website interface language',
      parameters: {
        type: 'object',
        properties: {
          language: {
            type: 'string',
            enum: ['en', 'ua'],
            description: 'en for English, ua for Ukrainian',
          },
        },
        required: ['language'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_products',
      description:
        'Search the store for a product and open the search results page',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description:
              'Product model name in English as in the catalog, for example "iPhone 14 Pro". Only the model name, no extra words.',
          },
        },
        required: ['query'],
      },
    },
  },
];

export const runToolCall = (call: ToolCall, navigate: Navigate) => {
  const args = JSON.parse(call.function.arguments) as Record<string, unknown>;

  if (call.function.name === 'set_language') {
    const language = args.language;

    const next: Language | null =
      language === 'en' ? 'en'
      : language === 'ua' || language === 'uk' ? 'ua'
      : null;

    if (next) {
      useLanguageStore.setState({ language: next });

      return true;
    }
  }

  if (call.function.name === 'search_products') {
    const query = typeof args.query === 'string' ? args.query.trim() : '';

    if (query) {
      navigate(getSearchPath(query));

      return true;
    }
  }

  return false;
};
