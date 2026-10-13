const BASE_URL = `${import.meta.env.BASE_URL}api`;
const TIMEOUT_MS = 15000;

export class ApiError extends Error {
  readonly status: number | null;

  constructor(message: string, status: number | null = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(url: string): Promise<T> {
  let response: Response;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    response = await fetch(`${BASE_URL}${url}`, { signal: controller.signal });
  } catch {
    throw new ApiError(
      controller.signal.aborted ?
        'The server is taking too long to respond.'
      : 'Network error. Check your connection and try again.',
    );
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    throw new ApiError(`Server error (${response.status}).`, response.status);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError('Received an invalid response from the server.');
  }
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
