import type { Pokemon, PokemonDetails } from './types';

export type PokemonResponse = {
  previous: string | null;
  next: string | null;
  results: Pokemon[];
};

export const defaultLimit = 10;

export const getPageIndex = (url: string | null): number | undefined => {
  if (!url) return undefined;
  const searchParams = new URL(url).searchParams;
  const limit = Number(searchParams.get('limit') || defaultLimit);
  const offset = Number(searchParams.get('offset') || 0);
  return offset / limit;
};

export const getPokemon = async (name: string): Promise<PokemonDetails> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    throw new Error(`Could not load pokemon (${name})`);
  }
  const data = (await response.json()) as Omit<PokemonDetails, 'url'>;
  return { ...data, url: `https://pokeapi.co/api/v2/pokemon/${data.id}` };
};

export const getPokemons = async (
  pageIndex: number = 0
): Promise<PokemonResponse> => {
  const offset = defaultLimit * pageIndex;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${defaultLimit}`
  );
  if (!response.ok) {
    throw new Error(
      `Could not load pokemons, offset (${offset}), limit (${defaultLimit})`
    );
  }
  return (await response.json()) as PokemonResponse;
};
