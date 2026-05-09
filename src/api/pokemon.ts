import type { Pokemon, PokemonDetails } from './types';

type PokemonResponse = {
  next: string;
  results: Pokemon[];
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
  limit: number,
  offset: number
): Promise<Pokemon[]> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error(
      `Could not load pokemons, offset (${offset}), limit (${limit})`
    );
  }
  const data = (await response.json()) as PokemonResponse;
  return data.results;
};
