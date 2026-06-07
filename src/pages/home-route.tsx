import { getRouteApi } from '@tanstack/react-router';
import HomePage from './home';
import PokemonDetails from '../features/details/pokemon-details';

const route = getRouteApi('/');

const HomeRoute = () => {
  const { page, details } = route.useSearch();
  const navigate = route.useNavigate();

  const handlePageChange = (next: number) => {
    navigate({ search: (prev) => ({ ...prev, page: next }) });
  };

  const handleItemSelect = (detailsId: string) => {
    navigate({ search: (prev) => ({ ...prev, details: detailsId }) });
  };

  const closeDetails = () => {
    navigate({ search: (prev) => ({ page: prev.page }) });
  };

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
};

export default HomeRoute;
