import { useCallback, useEffect, useState } from 'react';
import './home.css';
import Search from '../features/search/search';
import type { Pokemon } from '../api/types';
import { getPageIndex, getPokemon, getPokemons } from '../api/pokemon';
import Results, { type ResultsProps } from '../features/results/results';

const HomePage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pageIndex] = useState(0);
  const [pages, setPages] = useState<ResultsProps['pages']>({});
  const [loading, setLoading] = useState(false);
  const [toThrow, setToThrow] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = useCallback(
    async (searchItem: string): Promise<void> => {
      setLoading(true);
      setPokemons([]);
      setPages({});
      setError('');
      try {
        if (searchItem) {
          const { name, url } = await getPokemon(searchItem);
          setPokemons([{ name, url }]);
        } else {
          const pokemons = await getPokemons(pageIndex);
          setPokemons(pokemons.results);
          setPages({
            prev: getPageIndex(pokemons.previous),
            next: getPageIndex(pokemons.next),
          });
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : JSON.stringify(error)
        );
      } finally {
        setLoading(false);
      }
    },
    [pageIndex]
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
      <Results
        loading={loading}
        error={error}
        pokemons={pokemons}
        pages={pages}
      />
      <button onClick={handlerError} className="error-button">
        Throw Exception
      </button>
    </div>
  );
};

export default HomePage;
