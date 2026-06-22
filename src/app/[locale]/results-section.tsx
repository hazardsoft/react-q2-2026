import { getPokemon, getPokemons, getSpriteUrl } from '@/api/pokemon';
import ResultsList, { type ResultItem } from '@/features/results/results-list';
import Pagination from '@/features/results/pagination';

type ResultsSectionProps = {
  page: number;
  query?: string;
};

type ResultsData =
  | {
      ok: true;
      items: ResultItem[];
      hasPrevPage: boolean;
      hasNextPage: boolean;
    }
  | { ok: false; error: string };

// try/catch lives in this plain helper (not the component) so the fetch error
// is turned into data rather than a rendering error.
const loadResults = async (
  page: number,
  query?: string
): Promise<ResultsData> => {
  try {
    if (query) {
      const found = await getPokemon(query);
      return {
        ok: true,
        items: [{ name: found.name, sprite: found.sprites.front_default }],
        hasPrevPage: false,
        hasNextPage: false,
      };
    }

    const response = await getPokemons(page - 1);
    return {
      ok: true,
      items: response.results.map((pokemon) => ({
        name: pokemon.name,
        sprite: getSpriteUrl(pokemon.url),
      })),
      hasPrevPage: response.previous !== null,
      hasNextPage: response.next !== null,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : JSON.stringify(error),
    };
  }
};

// Server component: fetches the current page (or the single `query` match) and
// renders the list + pagination. Wrapped in <Suspense> by the page.
const ResultsSection = async ({ page, query }: ResultsSectionProps) => {
  const result = await loadResults(page, query);

  if (!result.ok) {
    return (
      <div className="results-list">
        <p className="error">{result.error}</p>
      </div>
    );
  }

  return (
    <>
      <ResultsList items={result.items} page={page} query={query} />
      {!query && (
        <Pagination
          page={page}
          query={query}
          hasPrevPage={result.hasPrevPage}
          hasNextPage={result.hasNextPage}
        />
      )}
    </>
  );
};

export default ResultsSection;
