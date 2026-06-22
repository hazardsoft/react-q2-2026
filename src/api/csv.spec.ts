import { describe, expect, it } from 'vitest';
import { pokemonsToCsv } from './csv';
import { pokemon } from '../__tests__/data';
import type { PokemonDetails } from './types';

describe('pokemonsToCsv', () => {
  it('starts with the header row', () => {
    const csv = pokemonsToCsv([pokemon]);

    expect(csv.split('\n')[0]).toBe('id,name,url,abilities,sprite');
  });

  it('serializes pokemon fields, joining abilities with a pipe', () => {
    const csv = pokemonsToCsv([pokemon]);
    const row = csv.split('\n')[1];

    expect(row).toContain('bulbasaur');
    expect(row).toContain(String(pokemon.id));
    expect(row).toContain('overgrow|chlorophyll');
    expect(row).toContain(pokemon.sprites.front_default!);
  });

  it('returns only the header for an empty list', () => {
    expect(pokemonsToCsv([])).toBe('id,name,url,abilities,sprite');
  });

  it('escapes cells that contain commas or quotes', () => {
    const tricky: PokemonDetails = {
      id: 99,
      name: 'na,me',
      url: 'http://x/"quote"',
      abilities: [],
      sprites: { front_default: null },
    };

    const row = pokemonsToCsv([tricky]).split('\n')[1];

    expect(row).toContain('"na,me"');
    expect(row).toContain('"http://x/""quote"""');
  });
});
