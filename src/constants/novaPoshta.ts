import type { NovaPoshtaPointKind } from '@/types';

export const NOVA_POSHTA_API_URL = 'https://api.novaposhta.ua/v2.0/json/';

export const NOVA_POSHTA_WAREHOUSE_TYPES: Record<NovaPoshtaPointKind, string> =
  {
    branch: '841339c7-591a-42e2-8233-7a0a00f0ed6f',
    postomat: 'f9316480-5f2d-425d-bc2c-ac7cd29decf0',
  };

export const NOVA_POSHTA_CITY_MIN_LENGTH = 2;
export const NOVA_POSHTA_CITY_LIMIT = 20;
export const NOVA_POSHTA_DEBOUNCE_MS = 300;

export const NOVA_POSHTA_MESSAGES = {
  missingKey: 'Nova Poshta API key is missing.',
  requestFailed: 'Nova Poshta request failed.',
  searching: 'Searching...',
  loading: 'Loading...',
  noCities: 'No cities found',
  noPoints: 'Nothing found in this city',
  selectCity: 'Select a city first',
  selectBranch: 'Select branch',
  selectPostomat: 'Select postomat',
  retry: 'Try again',
};
