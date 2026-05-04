import { Component, type ErrorInfo, type HTMLAttributes, type ReactNode } from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
};

interface ErrorBoundaryProps extends HTMLAttributes<HTMLDivElement> {
  fallback: ReactNode;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(
      `Caught error with error boundary`,
      error,
      errorInfo.componentStack
    );
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
