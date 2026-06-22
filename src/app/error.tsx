'use client';

import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error('Caught error with error boundary', error);
  }, [error]);

  return (
    <div className="error-page">
      <p>Something went wrong</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
};

export default Error;
