import { useRef, useState, type ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import './search.css';

type SearchProps = {
  initialValue: string;
  onSubmit: (searchItem: string) => void;
};

const Search = ({ initialValue, onSubmit }: SearchProps) => {
  const t = useTranslations('Search');
  const [inputItem, setInputItem] = useState(initialValue);
  const lastSubmittedRef = useRef(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputItem(event.target.value);
  };

  const onSearch = () => {
    const trimmed = inputItem.trim();
    if (trimmed === lastSubmittedRef.current) return;
    lastSubmittedRef.current = trimmed;
    onSubmit(trimmed);
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
