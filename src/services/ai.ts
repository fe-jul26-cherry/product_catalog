import { useLanguageStore } from '@/store';

import type { Language } from '@/types';

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'xingchen-agi/xing4.0-29b-a4b:free';

const TOOLS = [
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

export const askAi = async (text: string) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are an assistant of a gadget store website. Use tools to perform actions.',
        },
        { role: 'user', content: text },
      ],
      tools: TOOLS,
    }),
  });

  const data = await response.json();
  const call = data.choices?.[0]?.message?.tool_calls?.[0];

  if (call?.function.name === 'set_language') {
    const { language } = JSON.parse(call.function.arguments) as {
      language: Language;
    };

    if (language === 'en' || language === 'ua') {
      useLanguageStore.setState({ language });
    }
  }

  return data;
};
