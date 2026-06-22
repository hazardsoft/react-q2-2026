import { getPokemon } from '@/api/pokemon';
import { Link } from '@/i18n/navigation';
import DetailsView from '@/features/details/details-view';
import type { PokemonDetails } from '@/api/types';
import type { HomeHref } from '@/features/results/home-href';

type DetailsPanelProps = {
  detailsId: string;
  closeHref: HomeHref;
};

type LoadResult =
  | { ok: true; details: PokemonDetails }
  | { ok: false; error: string };

// try/catch lives in this plain helper (not the component) so the fetch error
// is turned into data rather than a rendering error.
const loadDetails = async (detailsId: string): Promise<LoadResult> => {
  try {
    return { ok: true, details: await getPokemon(detailsId) };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : JSON.stringify(error),
    };
  }
};

// Server component: fetches the selected Pokémon on the server and renders it.
const DetailsPanel = async ({ detailsId, closeHref }: DetailsPanelProps) => {
  const result = await loadDetails(detailsId);

  if (!result.ok) {
    return (
      <div className="pokemon-details">
        <Link className="close" href={closeHref} aria-label="Close">
          ×
        </Link>
        <p className="error">{result.error}</p>
      </div>
    );
  }

  return <DetailsView details={result.details} closeHref={closeHref} />;
};

export default DetailsPanel;
