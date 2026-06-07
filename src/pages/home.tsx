import { useEffect, useState, type ReactNode } from 'react';
import './home.css';
import Search from '../features/search/search';
import { getPokemon, getPokemons, type PokemonResponse } from '../api/pokemon';
import Results from '../features/results/results';
import { useLocalStorage } from '../hooks/useLocalStorage';

type HomePageProps = {
  page?: number;
  onPageChange?: (page: number) => void;
  onItemSelect?: (detailsId: string) => void;
  onMainPanelClick?: () => void;
  detailsSlot?: ReactNode;
};

const emptyPokemonData: PokemonResponse = {
  results: [],
  previous: null,
  next: null,
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
  const [searchItem, setSearchItem] = useLocalStorage('searchItem');
  const [pokemonData, setPokemonData] =
    useState<PokemonResponse>(emptyPokemonData);
  const [loading, setLoading] = useState(false);
  const [toThrow, setToThrow] = useState(false);
  const [error, setError] = useState('');

  if (toThrow) {
    throw new Error('Throw error manually');
  }

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError('');
      setPokemonData(emptyPokemonData);
      try {
        if (searchItem) {
          const { name, url } = await getPokemon(searchItem);
          if (!cancelled) {
            setPokemonData({
              results: [{ name, url }],
              previous: null,
              next: null,
            });
          }
        } else {
          const response = await getPokemons(page - 1);
          if (!cancelled) setPokemonData(response);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            error instanceof Error ? error.message : JSON.stringify(error)
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [searchItem, page]);

  const handleSearchSubmit = (next: string) => {
    setSearchItem(next);
    if (next) onPageChange?.(1);
  };

  const handlerError = () => {
    setToThrow(true);
  };

  return (
    <div id="home">
      <Search initialValue={searchItem} onSubmit={handleSearchSubmit} />
      <div className="home-body">
        <Results
          loading={loading}
          error={error}
          pokemons={pokemonData.results}
          page={page}
          hasPrevPage={pokemonData.previous !== null}
          hasNextPage={pokemonData.next !== null}
          onPageChange={(next) => onPageChange?.(next)}
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
