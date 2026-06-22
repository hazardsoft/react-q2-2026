'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  const t = useTranslations('Error');

  useEffect(() => {
    console.error('Caught error with error boundary', error);
  }, [error]);

  return (
    <div className="error-page">
      <p>{t('title')}</p>
      <button type="button" onClick={reset}>
        {t('retry')}
      </button>
    </div>
  );
};

export default Error;
