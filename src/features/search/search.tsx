import { Component, createRef, type ReactNode } from 'react';
import './search.css';

type SearchProps = {
  handleSearch: (searchItem: string) => void;
};

type SearchState = {
  searchItem: string;
};

export default class Search extends Component<SearchProps> {
  inputRef = createRef<HTMLInputElement>();

  state: SearchState = {
    searchItem: '',
  };

  readFromLocalStorage = (): string => {
    try {
      return localStorage.getItem('searchItem') ?? '';
    } catch {
      return '';
    }
  };

  writeToLocalStorage = (value: string): void => {
    try {
      localStorage.setItem('searchItem', value);
    } catch {
      /* empty */ 
    }
  };

  onSearch = (): void => {
    const searchItem = (this.inputRef.current?.value ?? '').trim();
    if (this.state.searchItem === searchItem) return;
    this.writeToLocalStorage(searchItem);
    this.setState({ searchItem });
    this.inputRef.current?.focus();
    this.props.handleSearch(searchItem);
  };

  componentDidMount(): void {
    const initialSearchItem = this.readFromLocalStorage();
    this.setState({
      searchItem: initialSearchItem,
    });
    if (this.inputRef?.current) {
      this.inputRef.current.value = initialSearchItem;
    }
    this.props.handleSearch(initialSearchItem);
  }

  render(): ReactNode {
    return (
      <section id="search" className="search">
        <input id="name" type="search" ref={this.inputRef} placeholder="Pokemon's name"></input>
        <button onClick={this.onSearch}>Search</button>
      </section>
    );
  }
}
