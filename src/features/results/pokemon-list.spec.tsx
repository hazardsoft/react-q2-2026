import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PokemonList from './pokemon-list';
import type { Pokemon } from '../../api/types';

const pokemons: Pokemon[] = [
  {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  },
  {
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/2/',
  },
  {
    name: 'venusaur',
    url: 'https://pokeapi.co/api/v2/pokemon/3/',
  },
];

describe('List: Rendering Tests', () => {
  it('Renders correct number of items when data is provided', async () => {
    render(<PokemonList pokemons={pokemons} />);

    expect(screen.getAllByRole('article').length).toBe(pokemons.length);
  });

  it('Displays "no results" message when data array is empty', async () => {
    render(<PokemonList pokemons={[]} />);

    expect(screen.queryAllByRole('article').length).toBe(0);
    expect(screen.getByText('No Pokemons')).toBeInTheDocument();
  });
});
