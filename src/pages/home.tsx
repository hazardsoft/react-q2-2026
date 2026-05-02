import { Component, type ReactNode } from 'react';
import './home.css';
import Search from '../features/search/search';
import Results from '../features/results/results';
import type { Pokemon } from '../api/types';
import { getPokemon, getPokemons } from '../api/pokemon';

type State = {
  pokemons: Pokemon[];
  loading: boolean;
  limit: number;
  offset: number;
};
export default class HomePage extends Component {
  state: State = {
    pokemons: [],
    loading: false,
    limit: 20,
    offset: 0,
  };

  handleSearch = async (searchItem: string): Promise<void> => {
    console.log(`search for (${searchItem})`);
    this.setState({ loading: true, pokemons: [] });
    let pokemons: Pokemon[];
    if (searchItem) {
      pokemons = [await getPokemon(searchItem)];
    } else {
      pokemons = await getPokemons(this.state.limit, this.state.offset);
    }
    this.setState({ loading: false, pokemons });
  };

  render(): ReactNode {
    return (
      <div id="home">
        <Search handleSearch={this.handleSearch} />
        <Results loading={this.state.loading} pokemons={this.state.pokemons} />
      </div>
    );
  }
}
