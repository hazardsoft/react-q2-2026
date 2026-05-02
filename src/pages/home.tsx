import { Component, type ReactNode } from 'react';
import './home.css';
import Search from '../features/search/search';
import Results from '../features/results/results';
import type { Pokemon } from '../api/types';
import { getPokemon, getPokemons } from '../api/pokemon';

type State = {
  pokemons: Pokemon[];
  loading: boolean;
  error: string;
  limit: number;
  offset: number;
};
export default class HomePage extends Component {
  state: State = {
    pokemons: [],
    loading: false,
    error: '',
    limit: 20,
    offset: 0,
  };

  handleSearch = async (searchItem: string): Promise<void> => {
    console.log(`search for (${searchItem})`);
    this.setState({ loading: true, error: '', pokemons: [] });
    let pokemons: Pokemon[];
    try {
      if (searchItem) {
        pokemons = [await getPokemon(searchItem)];
      } else {
        pokemons = await getPokemons(this.state.limit, this.state.offset);
      }
      this.setState({ loading: false, pokemons });
    } catch (error) {
      this.setState({
        loading: false,
        error: error instanceof Error ? error.message : JSON.stringify(error),
      });
    }
  };

  render(): ReactNode {
    return (
      <div id="home">
        <Search handleSearch={this.handleSearch} />
        <Results
          loading={this.state.loading}
          error={this.state.error}
          pokemons={this.state.pokemons}
        />
      </div>
    );
  }
}
