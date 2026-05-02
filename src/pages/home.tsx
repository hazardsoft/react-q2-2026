import { Component, type ReactNode } from 'react';
import './home.css';
import Search from '../features/search/search';
import Results from '../features/results/results';
import type { Pokemon } from '../api/types';
import { getPokemon, getPokemons } from '../api/pokemon';

type State = {
  pokemons: Pokemon[];
  limit: number;
  offset: number;
};
export default class HomePage extends Component {
  state: State = {
    pokemons: [],
    limit: 20,
    offset: 0,
  };

  handleSearch = async (searchItem: string): Promise<void> => {
    console.log(`search for (${searchItem})`);
    if (searchItem) {
      const pokemon = await getPokemon(searchItem);
      this.setState({
        pokemons: [pokemon],
      });
    } else {
      const pokemons = await getPokemons(this.state.limit, this.state.offset);
      this.setState({
        pokemons,
      });
    }
  };

  render(): ReactNode {
    return (
      <div id="home">
        <Search handleSearch={this.handleSearch} />
        <Results pokemons={this.state.pokemons} />
      </div>
    );
  }
}
