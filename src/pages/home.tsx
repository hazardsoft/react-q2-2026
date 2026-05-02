import { Component, type ReactNode } from 'react';
import './home.css';
import Search from '../features/search/search';
import Results from '../features/results/results';
import type { Pokemon } from '../api/types';
import { getPokemon } from '../api/pokemon';

type State = {
  pokemons: Pokemon[];
};
export default class HomePage extends Component {
  state: State = {
    pokemons: [],
  };

  handleSearch = async (searchItem: string): Promise<void> => {
    console.log(`search for (${searchItem})`);
    const pokemon = await getPokemon(searchItem);
    this.setState({
      pokemons: [pokemon],
    });
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
