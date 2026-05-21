import { createFileRoute } from '@tanstack/react-router';
import HomeRoute from '../pages/home-route';

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
  component: HomeRoute,
});
