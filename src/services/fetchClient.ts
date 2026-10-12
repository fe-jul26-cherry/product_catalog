const BASE_URL = `${import.meta.env.BASE_URL}api`;

async function request<T>(url: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    throw new Error(`Request to ${url} failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
