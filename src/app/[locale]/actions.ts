'use server';

import { redirect } from 'next/navigation';

// Server action for the search form. Resets to the first page and redirects to
// the locale-prefixed results URL, where the server re-renders the results.
export const searchAction = async (
  locale: string,
  _prevState: void,
  formData: FormData
): Promise<void> => {
  const query = String(formData.get('query') ?? '').trim();

  const params = new URLSearchParams({ page: '1' });
  if (query) {
    params.set('query', query);
  }

  redirect(`/${locale}?${params.toString()}`);
};
