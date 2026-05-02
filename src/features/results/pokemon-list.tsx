import { Component, type ReactNode } from 'react';
import './pokemon-list.css';
import type { Pokemon } from '../../api/types';
import Loading from './loading';
import PokermonCard from './pokermon-card';

type PokemonListProps = {
  pokemons: Pokemon[];
  loading: boolean;
  error: string;
};

export default class PokemonList extends Component<PokemonListProps> {
  render(): ReactNode {
    return (
      <section id="results" className="results">
        <Loading visible={this.props.loading} />
        {this.props.pokemons.map((p) => {
          return <PokermonCard name={p.name} key={p.name}></PokermonCard>;
        })}
        {this.props.error && <p className="error">{this.props.error}</p>}
      </section>
    );
  }
}
