import { createFileRoute, useSearch } from '@tanstack/react-router';
import PokemonDetails from '../features/details/pokemon-details';

export const Route = createFileRoute('/_layout/details/$detailsId')({
  component: function Details() {
    const { detailsId } = Route.useParams();
    const { page } = useSearch({ from: '/_layout' });
    const navigate = Route.useNavigate();
    return (
      <PokemonDetails
        key={detailsId}
        detailsId={detailsId}
        onClose={() => navigate({ to: '/', search: { page } })}
      />
    );
  },
});
