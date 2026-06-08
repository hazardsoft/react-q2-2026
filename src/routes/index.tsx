import { createFileRoute } from '@tanstack/react-router';
import { useCallback } from 'react';
import HomePage from '../pages/home';
import PokemonDetails from '../features/details/pokemon-details';

type HomeSearch = { page: number; details?: string };

const validateSearch = (search: Record<string, unknown>): HomeSearch => {
  const rawPage = Number(search.page);
  const page = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;
  const result: HomeSearch = { page };
  if (typeof search.details === 'string' && search.details.length > 0) {
    result.details = search.details;
  }
  return result;
};

export const Route = createFileRoute('/')({
  validateSearch,
  component: function Home() {
    const { page, details } = Route.useSearch();
    const navigate = Route.useNavigate();

    const handlePageChange = useCallback(
      (next: number) => {
        navigate({ search: (prev) => ({ ...prev, page: next }) });
      },
      [navigate]
    );

    const handleItemSelect = useCallback(
      (detailsId: string) => {
        navigate({ search: (prev) => ({ ...prev, details: detailsId }) });
      },
      [navigate]
    );

    const closeDetails = useCallback(() => {
      navigate({ search: (prev) => ({ page: prev.page }) });
    }, [navigate]);

    return (
      <HomePage
        page={page}
        onPageChange={handlePageChange}
        onItemSelect={handleItemSelect}
        onMainPanelClick={details ? closeDetails : undefined}
        detailsSlot={
          details ? (
            <PokemonDetails
              key={details}
              detailsId={details}
              onClose={closeDetails}
            />
          ) : null
        }
      />
    );
  },
});
