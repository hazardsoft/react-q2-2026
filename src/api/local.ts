const keys = {
  search: 'searchItem',
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

export const readSearchItem = () => {
  return readFromLocalStorage(keys.search);
};

export const writeSearchItem = (value: string): void => {
  writeToLocalStorage(keys.search, value);
};
