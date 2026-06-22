'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const ThrowButton = () => {
  const t = useTranslations('Home');
  const [toThrow, setToThrow] = useState(false);

  if (toThrow) {
    throw new Error('Throw error manually');
  }

  return (
    <button className="error-button" onClick={() => setToThrow(true)}>
      {t('throwException')}
    </button>
  );
};

export default ThrowButton;
