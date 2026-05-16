import type { PokemonDetails } from '../../api/types';
import { getPokemon } from '../../api/pokemon';
import './pokermon-card.css';
import { useEffect, useState } from 'react';

type PokermonCardProps = {
  name: string;
};

const PokermonCard = ({ name }: PokermonCardProps) => {
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
    <article className="pokemon-card">
      <div className="image">
        {details?.sprites.front_default && (
          <img src={details.sprites.front_default} alt={name} loading="lazy" />
        )}
      </div>
      <div className="details">
        <h3 className="name">{name}</h3>
        {details && details.abilities.length > 0 && (
          <>
            <p className="abilities-label">Abilities:</p>
            <ul className="abilities-list">
              {details.abilities.map((a) => (
                <li key={a.ability.name} className="abilities-item">
                  {a.ability.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  );
};

export default PokermonCard;
