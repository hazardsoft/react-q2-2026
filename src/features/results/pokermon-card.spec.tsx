import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PokermonCard from './pokermon-card';
import { getPokemon } from '../../api/pokemon';
import type { PokemonDetails } from '../../api/types';
import { pokemon } from '../../__tests__/data';

vi.mock('../../api/pokemon', () => {
  return {
    getPokemon: vi.fn(),
  };
});

const pokemonWithoutAbilities: PokemonDetails = {
  id: 1,
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1',
  abilities: [],
  sprites: {
    front_default: null,
  },
};

describe('Pokemon Card: Rendering Tests', () => {
  it('Displays name and abilities correctly', async () => {
    vi.mocked(getPokemon).mockReturnValueOnce(Promise.resolve(pokemon));

    render(<PokermonCard name={pokemon.name} />);

    const img = await screen.findByRole('img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', pokemon.sprites.front_default);
    expect(await screen.findByText('Abilities:')).toBeInTheDocument();
    expect((await screen.findAllByRole('listitem')).length).toBe(
      pokemon.abilities.length
    );
    expect(await screen.findByRole('heading')).toHaveTextContent(pokemon.name);
  });

  it('Displays name and no abilities correctly', async () => {
    vi.mocked(getPokemon).mockReturnValueOnce(
      Promise.resolve(pokemonWithoutAbilities)
    );

    render(<PokermonCard name={pokemonWithoutAbilities.name} />);

    await waitFor(() => {
      expect(vi.mocked(getPokemon)).toHaveBeenCalledWith(
        pokemonWithoutAbilities.name
      );
      expect(vi.mocked(getPokemon)).toHaveReturned();
    });

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByText('Abilities:')).not.toBeInTheDocument();
    expect(screen.queryAllByText('listitem').length).toBe(
      pokemonWithoutAbilities.abilities.length
    );
  });
});
