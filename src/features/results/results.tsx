import type { Pokemon } from '../../api/types';
import Loading from './loading';
import './results.css';
import PokemonList from './pokemon-list';

export type ResultsProps = {
  pages: { prev?: number; next?: number };
  pokemons: Pokemon[];
  loading: boolean;
  error: string;
};

const Results = ({ pokemons, loading, error, pages }: ResultsProps) => {
  return (
    <section id="results">
      <div>
        {loading && <Loading />}
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <PokemonList pokemons={pokemons} />
        )}
      </div>

      {(pages.next !== undefined || pages.prev !== undefined) && (
        <nav>
          <ul>
            <a href={pages.prev ? `#${pages.prev}` : undefined}>Prev</a>
          </ul>
          <ul>
            <a href={pages.next ? `#${pages.next}` : undefined}>Next</a>
          </ul>
        </nav>
      )}
    </section>
  );
};

export default Results;
