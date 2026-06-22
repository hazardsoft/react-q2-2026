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

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const pokemonWithoutSprite: PokemonDetails = {
  id: 1,
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1',
  abilities: [],
  sprites: {
    front_default: null,
  },
};

describe('Pokemon Card: Rendering Tests', () => {
  it('Displays name and sprite image correctly', async () => {
    vi.mocked(getPokemon).mockReturnValueOnce(Promise.resolve(pokemon));

    render(<PokermonCard name={pokemon.name} />);

    const img = await screen.findByRole('img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', pokemon.sprites.front_default);
    expect(await screen.findByRole('heading')).toHaveTextContent(pokemon.name);
  });

  it('Displays name without sprite image when sprite is missing', async () => {
    vi.mocked(getPokemon).mockReturnValueOnce(
      Promise.resolve(pokemonWithoutSprite)
    );

    render(<PokermonCard name={pokemonWithoutSprite.name} />);

    await waitFor(() => {
      expect(vi.mocked(getPokemon)).toHaveBeenCalledWith(
        pokemonWithoutSprite.name
      );
      expect(vi.mocked(getPokemon)).toHaveReturned();
    });

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent(
      pokemonWithoutSprite.name
    );
  });
});
