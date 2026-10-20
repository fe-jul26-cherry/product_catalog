import { getSearchPath } from '@/constants';
import { useLanguageStore } from '@/store';

import { findProductsForCompare } from './aiCompare';

import type { AiComparison } from './aiCompare';
import type { Language } from '@/types';

export type Navigate = (to: string) => void;

export interface ToolCall {
  function: { name: string; arguments: string };
}

export interface ToolOutcome {
  name: string;
  comparison?: AiComparison;
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
  {
    type: 'function',
    function: {
      name: 'compare_products',
      description:
        'Compare two or three products of the same category side by side. The website shows the comparison table itself.',
      parameters: {
        type: 'object',
        properties: {
          queries: {
            type: 'array',
            items: { type: 'string' },
            minItems: 2,
            maxItems: 3,
            description:
              'Product model names in English as in the catalog, for example ["iPhone 14 Pro", "iPhone 11"]. Only model names, no extra words.',
          },
        },
        required: ['queries'],
      },
    },
  },
];

const toQueries = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }

  if (typeof value === 'string') {
    return value.split(',');
  }

  return [];
};

export const runToolCall = async (
  call: ToolCall,
  navigate: Navigate,
): Promise<ToolOutcome | null> => {
  const args = JSON.parse(call.function.arguments) as Record<string, unknown>;

  if (call.function.name === 'set_language') {
    const language = args.language;

    const next: Language | null =
      language === 'en' ? 'en'
      : language === 'ua' || language === 'uk' ? 'ua'
      : null;

    if (next) {
      useLanguageStore.setState({ language: next });

      return { name: call.function.name };
    }
  }

  if (call.function.name === 'search_products') {
    const query = typeof args.query === 'string' ? args.query.trim() : '';

    if (query) {
      navigate(getSearchPath(query));

      return { name: call.function.name };
    }
  }

  if (call.function.name === 'compare_products') {
    const queries = toQueries(args.queries);

    if (queries.length >= 2) {
      const comparison = await findProductsForCompare(
        queries,
        useLanguageStore.getState().language,
      );

      return { name: call.function.name, comparison };
    }
  }

  return null;
};
