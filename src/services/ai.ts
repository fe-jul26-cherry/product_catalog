import { runToolCall, TOOLS } from './aiTools';

import type { ToolCall, Navigate } from './aiTools';

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;
const MODEL = 'xingchen-agi/xing4.0-29b-a4b:free';

export type AiErrorReason =
  'config' | 'network' | 'rate_limit' | 'server' | 'invalid';

export type AiResult =
  | { ok: true; text: string; actions: string[] }
  | { ok: false; reason: AiErrorReason };

interface AiResponse {
  error?: unknown;
  choices?: {
    message?: { content?: string | null; tool_calls?: ToolCall[] };
  }[];
}

export const askAi = async (
  text: string,
  navigate: Navigate,
): Promise<AiResult> => {
  if (!API_KEY) {
    return { ok: false, reason: 'config' };
  }

  let response: Response;

  try {
    response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are an assistant of a gadget store website. Use tools to perform actions. To find a product, call search_products with the model name only.',
          },
          { role: 'user', content: text },
        ],
        tools: TOOLS,
      }),
    });
  } catch {
    return { ok: false, reason: 'network' };
  }

  if (response.status === 429) {
    return { ok: false, reason: 'rate_limit' };
  }

  let data: AiResponse;

  try {
    data = (await response.json()) as AiResponse;
  } catch {
    return { ok: false, reason: 'invalid' };
  }

  if (!response.ok || data.error) {
    return { ok: false, reason: 'server' };
  }

  const message = data.choices?.[0]?.message;

  if (!message) {
    return { ok: false, reason: 'invalid' };
  }

  const actions: string[] = [];

  for (const call of message.tool_calls ?? []) {
    try {
      if (runToolCall(call, navigate)) {
        actions.push(call.function.name);
      }
    } catch {
      continue;
    }
  }

  return { ok: true, text: message.content ?? '', actions };
};
