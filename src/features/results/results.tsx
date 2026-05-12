import { Component, type ReactNode } from 'react';
import type { Pokemon } from '../../api/types';
import Loading from './loading';
import './results.css';
import PokemonList from './pokemon-list';

type ResultsProps = {
  pokemons: Pokemon[];
  loading: boolean;
  error: string;
};

export default class Results extends Component<ResultsProps> {
  render(): ReactNode {
    return (
      <section id="results">
        {this.props.loading && <Loading />}
        {this.props.error ? (
          <p className="error">{this.props.error}</p>
        ) : (
          <PokemonList pokemons={this.props.pokemons} />
        )}
      </section>
    );
  }
}
