import type { Pokemon } from '../../api/types';
import Loading from './loading';
import './results.css';
import PokemonList from './pokemon-list';

type ResultsProps = {
  pokemons: Pokemon[];
  loading: boolean;
  error: string;
};

const Results = ({ pokemons, loading, error }: ResultsProps) => {
  return (
    <section id="results">
      {loading && <Loading />}
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
    </section>
  );
};

export default Results;
