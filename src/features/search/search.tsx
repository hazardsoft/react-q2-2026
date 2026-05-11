import { Component, createRef, type ReactNode } from 'react';
import './search.css';
import { readSearchItem, writeSearchItem } from '../../api/local';

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

  onSearch = (): void => {
    const searchItem = (this.inputRef.current?.value ?? '').trim();
    if (this.state.searchItem === searchItem) return;
    writeSearchItem(searchItem);
    this.setState({ searchItem });
    this.inputRef.current?.focus();
    this.props.handleSearch(searchItem);
  };

  componentDidMount(): void {
    const initialSearchItem = readSearchItem();
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
        <input
          id="name"
          type="search"
          ref={this.inputRef}
          placeholder="Pokemon's name"
        ></input>
        <button onClick={this.onSearch}>Search</button>
      </section>
    );
  }
}
