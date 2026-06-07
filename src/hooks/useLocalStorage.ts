import { useCallback, useState } from 'react';

export const useLocalStorage = (key: string) => {
  const [value, setValue] = useState(() => readFromLocalStorage(key));

  const write = useCallback(
    (next: string) => {
      writeToLocalStorage(key, next);
      setValue(next);
    },
    [key]
  );

  return [value, write] as const;
};

const readFromLocalStorage = (key: string): string => {
  try {
    return localStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
};

const writeToLocalStorage = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* empty */
  }
};
