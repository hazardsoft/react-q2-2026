import './pokemon-list.css';
import type { Pokemon } from '../../api/types';
import PokermonCard from './pokermon-card';

type PokemonListProps = {
  pokemons: Pokemon[];
  onItemSelect?: (detailsId: string) => void;
};

const PokemonList = ({ pokemons, onItemSelect }: PokemonListProps) => {
  if (pokemons.length === 0) {
    return <p>No Pokemons</p>;
  }
  return (
    <div className="pokemon-list">
      {pokemons.map((p) => (
        <PokermonCard name={p.name} key={p.name} onSelect={onItemSelect} />
      ))}
    </div>
  );
};

export default PokemonList;
