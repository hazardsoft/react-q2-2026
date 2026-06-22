import './pokemon-list.css';
import type { Pokemon } from '../../api/types';
import { useTranslations } from 'next-intl';
import PokermonCard from './pokermon-card';

type PokemonListProps = {
  pokemons: Pokemon[];
  onItemSelect?: (detailsId: string) => void;
};

const PokemonList = ({ pokemons, onItemSelect }: PokemonListProps) => {
  const t = useTranslations('Results');

  if (pokemons.length === 0) {
    return <p>{t('empty')}</p>;
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
