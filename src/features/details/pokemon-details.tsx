import { useEffect, useState } from 'react';
import './pokemon-details.css';
import type { PokemonDetails as Details } from '../../api/types';
import { getPokemon } from '../../api/pokemon';
import Loading from '../results/loading';

type PokemonDetailsProps = {
  detailsId: string;
  onClose: () => void;
};

const PokemonDetails = ({ detailsId, onClose }: PokemonDetailsProps) => {
  const [details, setDetails] = useState<Details | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    getPokemon(detailsId)
      .then((data) => {
        if (!cancelled) setDetails(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : JSON.stringify(err));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [detailsId]);

  return (
    <div className="pokemon-details">
      <button type="button" className="close" onClick={onClose}>
        ×
      </button>
      {loading && <Loading />}
      {!loading && error && <p className="error">{error}</p>}
      {!loading && !error && details && (
        <>
          <h2 className="name">{details.name}</h2>
          {details.sprites.front_default && (
            <img
              src={details.sprites.front_default}
              alt={details.name}
              loading="lazy"
            />
          )}
          {details.abilities.length > 0 && (
            <>
              <h3 className="abilities-label">Abilities:</h3>
              <ul className="abilities-list">
                {details.abilities.map((a) => (
                  <li key={a.ability.name} className="abilities-item">
                    {a.ability.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PokemonDetails;
