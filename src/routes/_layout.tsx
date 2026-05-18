import { createFileRoute, Outlet } from '@tanstack/react-router';
import HomePage from '../pages/home';

type LayoutSearch = { page: number };

const validatePageSearch = (search: Record<string, unknown>): LayoutSearch => {
  const page = Number(search.page);
  if (Number.isInteger(page) && page >= 1) {
    return { page };
  }
  return { page: 1 };
};

export const Route = createFileRoute('/_layout')({
  validateSearch: validatePageSearch,
  component: function Layout() {
    const { page } = Route.useSearch();
    const navigate = Route.useNavigate();
    return (
      <HomePage
        page={page}
        onPageChange={(next) => navigate({ search: { page: next } })}
        onItemSelect={(detailsId) =>
          navigate({
            to: '/details/$detailsId',
            params: { detailsId },
            search: { page },
          })
        }
        detailsSlot={<Outlet />}
      />
    );
  },
});
