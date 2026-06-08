import { useCallback, useEffect, useState, type ReactNode } from 'react';
import './home.css';
import Search from '../features/search/search';
import type { Pokemon } from '../api/types';
import { getPokemon, getPokemons } from '../api/pokemon';
import Results from '../features/results/results';

type HomePageProps = {
  page?: number;
  onPageChange?: (page: number) => void;
  onItemSelect?: (detailsId: string) => void;
  onMainPanelClick?: () => void;
  detailsSlot?: ReactNode;
};

const Details = ({ children }: { children?: ReactNode }) => {
  return <section className="details">{children}</section>;
};

const HomePage = ({
  page = 1,
  onPageChange,
  onItemSelect,
  onMainPanelClick,
  detailsSlot,
}: HomePageProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toThrow, setToThrow] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = useCallback(
    async (searchItem: string): Promise<void> => {
      setLoading(true);
      setError('');
      setPokemons([]);
      try {
        if (searchItem) {
          const { name, url } = await getPokemon(searchItem);
          setPokemons([{ name, url }]);
          if (onPageChange) onPageChange(1);
        } else {
          const data = await getPokemons(page - 1);
          setPokemons(data.results);
          setHasPrev(data.previous !== null);
          setHasNext(data.next !== null);
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : JSON.stringify(error)
        );
      } finally {
        setLoading(false);
      }
    },
    [onPageChange, page]
  );

  const handlePageChange = useCallback(
    (next: number) => {
      onPageChange?.(next);
    },
    [onPageChange]
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
      <div className="home-body">
        <Results
          loading={loading}
          error={error}
          pokemons={pokemons}
          page={page}
          hasPrevPage={hasPrev}
          hasNextPage={hasNext}
          onPageChange={handlePageChange}
          onItemSelect={onItemSelect}
          onMainPanelClick={onMainPanelClick}
        />
        <Details>{detailsSlot}</Details>
      </div>
      <button onClick={handlerError} className="error-button">
        Throw Exception
      </button>
    </div>
  );
};

export default HomePage;
