import { useCallback, useEffect, useState } from 'react';

import { ApiError } from '@/services';

interface Result<T> {
  load: () => Promise<T>;
  attempt: number;
  data: T | null;
  error: string | null;
}

const getErrorMessage = (error: unknown) =>
  error instanceof ApiError ? error.message : 'Something went wrong.';

export const useAsync = <T>(
  load: () => Promise<T>,
  { keepPrevious = false } = {},
) => {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result<T> | null>(null);

  useEffect(() => {
    let isActive = true;

    load()
      .then((data) => {
        if (isActive) {
          setResult({ load, attempt, data, error: null });
        }
      })
      .catch((error: unknown) => {
        if (isActive) {
          setResult({
            load,
            attempt,
            data: null,
            error: getErrorMessage(error),
          });
        }
      });

    return () => {
      isActive = false;
    };
  }, [load, attempt]);

  const retry = useCallback(() => setAttempt((prev) => prev + 1), []);

  const isCurrent =
    result !== null && result.load === load && result.attempt === attempt;

  return {
    data: isCurrent || keepPrevious ? (result?.data ?? null) : null,
    error: isCurrent ? result.error : null,
    isLoading: !isCurrent,
    retry,
  };
};
