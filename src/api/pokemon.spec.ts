import { describe, expect, it, vi } from 'vitest';
import { defaultLimit, getPokemon, getPokemons } from './pokemon';
import { pokemon, pokemons } from '../__tests__/data';

const mockFetchOk = (data: unknown) => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data),
  } as Response);
};

const mockFetchError = () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok: false,
    json: () => Promise.resolve({}),
  } as Response);
};

describe('getPokemon', () => {
  it('Get pokemon details by name', async () => {
    mockFetchOk({
      id: pokemon.id,
      name: pokemon.name,
      abilities: pokemon.abilities,
      sprites: pokemon.sprites,
    });

    await getPokemon(pokemon.name);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
    );
  });

  it('Returns pokemon details', async () => {
    mockFetchOk({
      id: pokemon.id,
      name: pokemon.name,
      abilities: pokemon.abilities,
      sprites: pokemon.sprites,
    });

    const result = await getPokemon(pokemon.name);

    expect(result).toEqual({
      id: pokemon.id,
      name: pokemon.name,
      abilities: pokemon.abilities,
      sprites: pokemon.sprites,
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
    });
  });

  it('Throws when the response is not ok', async () => {
    mockFetchError();

    await expect(getPokemon('non-existing-pokemon')).rejects.toThrow(
      'Could not load pokemon (non-existing-pokemon)'
    );
  });
});

describe('getPokemons', () => {
  it('Gets pokemons with limit/offset', async () => {
    mockFetchOk({ next: '', results: pokemons });

    await getPokemons();

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${defaultLimit}`
    );
  });

  it('Returns list of pokemons', async () => {
    mockFetchOk({ results: pokemons });

    const result = await getPokemons();

    expect(result.results).toEqual(pokemons);
  });

  it('Throws when the response is not ok', async () => {
    mockFetchError();

    await expect(getPokemons()).rejects.toThrow(
      `Could not load pokemons, offset (0), limit (${defaultLimit})`
    );
  });
});
