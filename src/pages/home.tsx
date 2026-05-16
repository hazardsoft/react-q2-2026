import { useCallback, useEffect, useState } from 'react';
import './home.css';
import Search from '../features/search/search';
import type { Pokemon } from '../api/types';
import { getPokemon, getPokemons } from '../api/pokemon';
import Results from '../features/results/results';

const HomePage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page] = useState<{ limit: number; offset: number }>({
    limit: 20,
    offset: 0,
  });
  const [loading, setLoading] = useState(false);
  const [toThrow, setToThrow] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = useCallback(
    async (searchItem: string): Promise<void> => {
      setLoading(true);
      setPokemons([]);
      setError('');
      try {
        const loadedPokemons = searchItem
          ? [await getPokemon(searchItem)]
          : await getPokemons(page.limit, page.offset);
        setPokemons(loadedPokemons);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : JSON.stringify(error)
        );
      } finally {
        setLoading(false);
      }
    },
    [page.limit, page.offset]
  );

  const handlerError = () => {
    setToThrow(true);
  };

  useEffect(() => {
    if (toThrow) {
      throw new Error('Throw error manually');
    }
  }, [toThrow]);

  return (
    <div id="home">
      <Search handleSearch={handleSearch} />
      <Results loading={loading} error={error} pokemons={pokemons} />
      <button onClick={handlerError} className="error-button">
        Throw Exception
      </button>
    </div>
  );
};

export default HomePage;
