import type { Pokemon } from '../../api/types';
import Loading from './loading';
import './results.css';
import PokemonList from './pokemon-list';

type ResultsProps = {
  pokemons: Pokemon[];
  loading: boolean;
  error: string;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  onItemSelect?: (detailsId: string) => void;
  onMainPanelClick?: () => void;
};

const Results = ({
  pokemons,
  loading,
  error,
  page,
  hasPrevPage,
  hasNextPage,
  onPageChange,
  onItemSelect,
  onMainPanelClick,
}: ResultsProps) => {
  const showPagination =
    !loading && !error && pokemons.length > 0 && (hasPrevPage || hasNextPage);

  const handlePageButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    next: number
  ) => {
    event.stopPropagation();
    onPageChange(next);
  };

  return (
    <section id="results" onClick={onMainPanelClick}>
      <div className="results-list">
        {loading && <Loading />}
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <PokemonList pokemons={pokemons} onItemSelect={onItemSelect} />
        )}
      </div>

      {showPagination && (
        <nav>
          <button
            type="button"
            onClick={(e) => handlePageButton(e, page - 1)}
            disabled={!hasPrevPage}
          >
            Prev
          </button>
          <span>Page {page}</span>
          <button
            type="button"
            onClick={(e) => handlePageButton(e, page + 1)}
            disabled={!hasNextPage}
          >
            Next
          </button>
        </nav>
      )}
    </section>
  );
};

export default Results;
