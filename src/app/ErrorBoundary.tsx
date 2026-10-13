import { Component } from 'react';

import { ErrorMessage } from '@/components/molecules/ErrorMessage';

import type { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage
          message="Something went wrong while showing this page."
          onRetry={() => window.location.reload()}
        />
      );
    }

    return this.props.children;
  }
}
