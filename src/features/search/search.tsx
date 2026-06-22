'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import './search.css';

type SearchProps = {
  initialValue: string;
  searchAction: (state: void, formData: FormData) => Promise<void>;
};

const Search = ({ initialValue, searchAction }: SearchProps) => {
  const t = useTranslations('Search');
  const [, formAction, pending] = useActionState(searchAction, undefined);

  return (
    <section id="search" className="search">
      <form action={formAction} className="search-form">
        <input
          id="name"
          name="query"
          type="search"
          placeholder={t('placeholder')}
          defaultValue={initialValue}
        ></input>
        <button type="submit" disabled={pending}>
          {t('submit')}
        </button>
      </form>
    </section>
  );
};

export default Search;
