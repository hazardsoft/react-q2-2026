import type { PokemonDetails } from '../../api/types';
import { getPokemon } from '../../api/pokemon';
import './pokermon-card.css';
import { useEffect, useState } from 'react';

type PokermonCardProps = {
  name: string;
  onSelect?: (detailsId: string) => void;
};

const PokermonCard = ({ name, onSelect }: PokermonCardProps) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);

  const handlePokemonDetails = (name: string): void => {
    getPokemon(name).then((details) => {
      setDetails(details);
    });
  };

  useEffect(() => {
    handlePokemonDetails(name);
  }, [name]);

  return (
    <article
      className={onSelect ? 'pokemon-card clickable' : 'pokemon-card'}
      onClick={onSelect ? () => onSelect(name) : undefined}
    >
      <div className="image">
        {details?.sprites.front_default && (
          <img src={details.sprites.front_default} alt={name} loading="lazy" />
        )}
      </div>
      <div className="details">
        <h3 className="name">{name}</h3>
      </div>
    </article>
  );
};

export default PokermonCard;
