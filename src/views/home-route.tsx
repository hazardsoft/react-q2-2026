'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import HomePage from './home';
import PokemonDetails from '../features/details/pokemon-details';

type HomeSearch = { page: number; details?: string };

const parsePage = (raw: string | null): number => {
  const page = Number(raw);
  return Number.isInteger(page) && page >= 1 ? page : 1;
};

const HomeRoute = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parsePage(searchParams.get('page'));
  const rawDetails = searchParams.get('details');
  const details = rawDetails && rawDetails.length > 0 ? rawDetails : undefined;

  const navigate = (search: HomeSearch) => {
    const params = new URLSearchParams();
    params.set('page', String(search.page));
    if (search.details) {
      params.set('details', search.details);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (next: number) => {
    navigate({ page: next, details });
  };

  const handleItemSelect = (detailsId: string) => {
    navigate({ page, details: detailsId });
  };

  const closeDetails = () => {
    navigate({ page });
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
