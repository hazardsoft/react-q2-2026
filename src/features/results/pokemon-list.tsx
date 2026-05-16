import './pokemon-list.css';
import type { Pokemon } from '../../api/types';
import PokermonCard from './pokermon-card';

type PokemonListProps = {
  pokemons: Pokemon[];
};

const PokemonList = ({ pokemons }: PokemonListProps) => {
  if (pokemons.length === 0) {
    return <p>No Pokemons</p>;
  }
  return (
    <div className="pokemon-list">
      {pokemons.map((p) => (
        <PokermonCard name={p.name} key={p.name} />
      ))}
    </div>
  );
};

export default PokemonList;
