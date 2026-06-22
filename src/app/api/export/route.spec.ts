import { describe, expect, it, vi } from 'vitest';
import { getPokemon, getPokemons } from '@/api/pokemon';
import { pokemon, pokemonsResponse } from '@/__tests__/data';
import { GET } from './route';

vi.mock('@/api/pokemon', () => ({
  getPokemons: vi.fn(),
  getPokemon: vi.fn(),
}));

describe('GET /api/export', () => {
  it('serves the current page list as a CSV attachment', async () => {
    vi.mocked(getPokemons).mockResolvedValue(pokemonsResponse);
    vi.mocked(getPokemon).mockResolvedValue(pokemon);

    const res = await GET(new Request('http://localhost/api/export?page=2'));

    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('text/csv');
    expect(res.headers.get('content-disposition')).toContain('attachment');
    expect(res.headers.get('content-disposition')).toContain(
      'pokemons-page-2.csv'
    );
    expect(vi.mocked(getPokemons)).toHaveBeenCalledWith(1);

    const body = await res.text();
    expect(body.split('\n')[0]).toBe('id,name,url,abilities,sprite');
    expect(body.split('\n')).toHaveLength(1 + pokemonsResponse.results.length);
  });

  it('exports a single pokemon when a query is provided', async () => {
    vi.mocked(getPokemon).mockResolvedValue(pokemon);

    const res = await GET(
      new Request('http://localhost/api/export?query=bulbasaur')
    );

    expect(res.headers.get('content-disposition')).toContain(
      'pokemon-bulbasaur.csv'
    );
    expect(vi.mocked(getPokemons)).not.toHaveBeenCalled();
    expect(vi.mocked(getPokemon)).toHaveBeenCalledWith('bulbasaur');

    const body = await res.text();
    expect(body.split('\n')).toHaveLength(2);
  });

  it('returns 502 when the API request fails', async () => {
    vi.mocked(getPokemons).mockRejectedValue(new Error('network down'));

    const res = await GET(new Request('http://localhost/api/export?page=1'));

    expect(res.status).toBe(502);
  });
});
