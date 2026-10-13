import { Loader } from '@/components/atoms/Loader';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';

import type { ReactNode } from 'react';

interface AsyncContentProps {
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  children: ReactNode;
}

export const AsyncContent = ({
  isLoading,
  error,
  onRetry,
  children,
}: AsyncContentProps) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={onRetry}
      />
    );
  }

  return <>{children}</>;
};
