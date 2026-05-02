import { Component, createRef, type ChangeEvent, type ReactNode } from 'react';
import './search.css';

type SearchProps = {
  handleSearch: (searchItem: string) => void;
};

export default class Search extends Component<SearchProps> {
  inputRef = createRef<HTMLInputElement>();

  state = {
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
    if (!value) return;
    try {
      localStorage.setItem('searchItem', value);
    } catch {
      /* empty */
    }
  };

  onSearch = (): void => {
    const searchItem = (this.inputRef.current?.value ?? '').trim();
    this.writeToLocalStorage(searchItem);
    this.setState({ searchItem });
    this.inputRef.current?.focus();
    this.props.handleSearch(searchItem);
  };

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value.trim();
    this.setState({ searchItem });
  };

  componentDidMount(): void {
    const initialSearchItem = this.readFromLocalStorage();
    this.setState({
      searchItem: initialSearchItem,
    });
    this.props.handleSearch(initialSearchItem);
  }

  render(): ReactNode {
    return (
      <section id="search" className="search">
        <input
          ref={this.inputRef}
          value={this.state.searchItem}
          onChange={this.onChange}
        ></input>
        <button onClick={this.onSearch}>Search</button>
      </section>
    );
  }
}
