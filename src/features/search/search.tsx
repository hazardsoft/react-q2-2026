'use client';

import { useRef, useState, type ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { homeHref } from '../results/home-href';
import './search.css';

type SearchProps = {
  initialValue: string;
};

const Search = ({ initialValue }: SearchProps) => {
  const t = useTranslations('Search');
  const router = useRouter();
  const [inputItem, setInputItem] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputItem(event.target.value);
  };

  const onSearch = () => {
    const trimmed = inputItem.trim();
    // A new search resets to the first page and clears any open details.
    router.push(homeHref({ page: 1, query: trimmed || undefined }));
    inputRef.current?.focus();
  };

  return (
    <section id="search" className="search">
      <input
        id="name"
        type="search"
        placeholder={t('placeholder')}
        ref={inputRef}
        value={inputItem}
        onChange={onChange}
      ></input>
      <button onClick={onSearch}>{t('submit')}</button>
    </section>
  );
};

export default Search;
