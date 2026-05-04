import { Component, type ReactNode } from 'react';
import './home.css';
import Search from '../features/search/search';
import type { Pokemon } from '../api/types';
import { getPokemon, getPokemons } from '../api/pokemon';
import Results from '../features/results/results';

type State = {
  pokemons: Pokemon[];
  loading: boolean;
  error: string;
  limit: number;
  offset: number;
  throw: boolean;
};
export default class HomePage extends Component {
  state: State = {
    pokemons: [],
    loading: false,
    error: '',
    limit: 20,
    offset: 0,
    throw: false,
  };

  handleSearch = async (searchItem: string): Promise<void> => {
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

  handlerError = () => {
    this.setState({ throw: true });
  };

  componentDidUpdate(): void {
    if (this.state.throw) {
      throw new Error('Throw error manually');
    }
  }

  render(): ReactNode {
    return (
      <div id="home">
        <Search handleSearch={this.handleSearch} />
        <Results
          loading={this.state.loading}
          error={this.state.error}
          pokemons={this.state.pokemons}
        />
        <button onClick={this.handlerError} className="error-button">
          Throw Exception
        </button>
      </div>
    );
  }
}
