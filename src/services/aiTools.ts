import { useLanguageStore } from '@/store';

import type { Language } from '@/types';

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
];

export const runToolCall = (call: ToolCall) => {
  if (call.function.name === 'set_language') {
    const { language } = JSON.parse(call.function.arguments) as {
      language: string;
    };

    const next: Language | null =
      language === 'en' ? 'en'
      : language === 'ua' || language === 'uk' ? 'ua'
      : null;

    if (next) {
      useLanguageStore.setState({ language: next });

      return true;
    }
  }

  return false;
};
