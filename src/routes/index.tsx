import { createFileRoute } from '@tanstack/react-router';
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
    const closeDetails = () => navigate({ search: { page } });
    return (
      <HomePage
        page={page}
        onPageChange={(next) =>
          navigate({ search: details ? { page: next, details } : { page: next } })
        }
        onItemSelect={(detailsId) =>
          navigate({ search: { page, details: detailsId } })
        }
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
