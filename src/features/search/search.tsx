import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import './search.css';
import { readSearchItem, writeSearchItem } from '../../api/local';

type SearchProps = {
  handleSearch: (searchItem: string) => void;
};

const Search = ({ handleSearch }: SearchProps) => {
  const [searchItem, setSearchItem] = useState(readSearchItem);
  const [inputItem, setInputItem] = useState(readSearchItem);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputItem(event.target.value);
  };

  const onSearch = (): void => {
    const trimmedInputItem = inputItem.trim();
    if (trimmedInputItem === searchItem) return;
    writeSearchItem(trimmedInputItem);
    setSearchItem(trimmedInputItem);
    inputRef.current?.focus();
  };

  useEffect(() => {
    handleSearch(searchItem);
  }, [handleSearch, searchItem]);

  return (
    <section id="search" className="search">
      <input
        id="name"
        type="search"
        placeholder="Pokemon's name"
        ref={inputRef}
        value={inputItem}
        onChange={onChange}
      ></input>
      <button onClick={onSearch}>Search</button>
    </section>
  );
};

export default Search;
