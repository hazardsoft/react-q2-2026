import type { PokemonDetails } from './types';

const CSV_HEADER = ['id', 'name', 'url', 'abilities', 'sprite'] as const;

const escapeCell = (value: string | number): string => {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

export const pokemonsToCsv = (pokemons: PokemonDetails[]): string => {
  const rows = pokemons.map((pokemon) =>
    [
      pokemon.id,
      pokemon.name,
      pokemon.url,
      pokemon.abilities.map((a) => a.ability.name).join('|'),
      pokemon.sprites.front_default ?? '',
    ]
      .map(escapeCell)
      .join(',')
  );

  return [CSV_HEADER.join(','), ...rows].join('\n');
};
