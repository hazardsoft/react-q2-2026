import { Component, type ReactNode } from 'react';
import './pokemon-list.css';
import type { Pokemon } from '../../api/types';
import PokermonCard from './pokermon-card';

type PokemonListProps = {
  pokemons: Pokemon[];
};

export default class PokemonList extends Component<PokemonListProps> {
  render(): ReactNode {
    return (
      <div className='pokemon-list'>
        {this.props.pokemons.map((p) => {
          return <PokermonCard name={p.name} key={p.name}></PokermonCard>;
        })}
      </div>
    );
  }
}
