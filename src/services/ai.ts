import { runToolCall, TOOLS } from './aiTools';

import type { AiComparison } from './aiCompare';
import type { ToolCall, Navigate } from './aiTools';

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;
const MODELS = [
  'xingchen-agi/xing4.0-29b-a4b:free',
  'nvidia/nemotron-3.5-super-vl:free',
];
const RETRY_DELAY_MS = 3000;

const SYSTEM_PROMPT =
  'You are the assistant of the Nice Gadgets online store. You can do exactly three things: switch the site language between English and Ukrainian (set_language), search for a product by model name (search_products) and compare two or three products of the same category (compare_products). You cannot place orders or answer other questions about the store. When asked to compare, only call compare_products with the model names: the website shows the comparison table itself, so never describe the comparison yourself. Always reply in the same language as the user, in one or two short sentences, in plain text without markdown. When the user asks for one of the three actions, call the tool. If asked what you can do, list only these three actions. If asked for anything else, say you cannot do it yet.';

export type AiErrorReason =
  'config' | 'network' | 'rate_limit' | 'server' | 'invalid';

export type AiResult =
  | {
      ok: true;
      text: string;
      actions: string[];
      comparisons: AiComparison[];
    }
  | { ok: false; reason: AiErrorReason };

interface AiResponse {
  error?: unknown;
  choices?: {
    message?: { content?: string | null; tool_calls?: ToolCall[] };
  }[];
}

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const askAi = async (
  text: string,
  navigate: Navigate,
): Promise<AiResult> => {
  if (!API_KEY) {
    return { ok: false, reason: 'config' };
  }

  const body = JSON.stringify({
    models: MODELS,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: text },
    ],
    tools: TOOLS,
  });

  const send = () =>
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body,
    });

  let response: Response;

  try {
    response = await send();

    if (response.status === 429) {
      await wait(RETRY_DELAY_MS);
      response = await send();
    }
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
  const comparisons: AiComparison[] = [];

  for (const call of message.tool_calls ?? []) {
    try {
      const outcome = await runToolCall(call, navigate);

      if (outcome?.comparison) {
        comparisons.push(outcome.comparison);
      } else if (outcome) {
        actions.push(outcome.name);
      }
    } catch {
      continue;
    }
  }

  return { ok: true, text: message.content ?? '', actions, comparisons };
};
