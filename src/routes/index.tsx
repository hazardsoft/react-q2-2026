import { createFileRoute } from '@tanstack/react-router';
import HomePage from '../pages/home';

type HomeSearch = { page?: number };

const validatePageSearch = (search: Record<string, unknown>): HomeSearch => {
  const page = Number(search.page);
  if (Number.isInteger(page) && page >= 1) {
    return { page };
  }
  // in case ?page={N} is not present or {N} value is not valid, always show ?page=1
  return { page: 1 };
};

export const Route = createFileRoute('/')({
  component: function Home() {
    const { page } = Route.useSearch();
    const navigate = Route.useNavigate();
    return (
      <HomePage
        page={page}
        onPageChange={(next) => navigate({ search: { page: next } })}
      />
    );
  },
  validateSearch: validatePageSearch,
});
