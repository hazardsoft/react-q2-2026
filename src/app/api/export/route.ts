import { getPokemon, getPokemons } from '@/api/pokemon';
import { pokemonsToCsv } from '@/api/csv';
import type { PokemonDetails } from '@/api/types';

const parsePage = (raw: string | null): number => {
  const page = Number(raw);
  return Number.isInteger(page) && page >= 1 ? page : 1;
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')?.trim();
  const page = parsePage(searchParams.get('page'));

  try {
    let pokemons: PokemonDetails[];
    if (query) {
      pokemons = [await getPokemon(query)];
    } else {
      const response = await getPokemons(page - 1);
      pokemons = await Promise.all(
        response.results.map((p) => getPokemon(p.name))
      );
    }

    const csv = pokemonsToCsv(pokemons);
    const filename = query
      ? `pokemon-${query}.csv`
      : `pokemons-page-${page}.csv`;

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch {
    return new Response('Failed to generate CSV export', { status: 502 });
  }
};
