import { screen, waitFor } from '@testing-library/react';
import { renderWithIntl } from '../__tests__/render';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HomePage from './home';
import { getPokemons, getPokemon } from '../api/pokemon';
import { pokemon, pokemonsResponse } from '../__tests__/data';

vi.mock('../api/pokemon', () => {
  return {
    getPokemons: vi.fn(),
    getPokemon: vi.fn(),
  };
});

const clear = () => {
  localStorage.removeItem('searchItem');
};

describe('Home: Rendering Tests', () => {
  it("Renders button with label 'Throw Exception'", async () => {
    renderWithIntl(<HomePage />);

    expect(
      screen.getByRole('button', { name: /Throw Exception/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });
});

describe('Home: Integration Tests', () => {
  beforeEach(() => {
    clear();
  });

  afterEach(() => {
    clear();
  });

  it('Handle saved search item', async () => {
    localStorage.setItem('searchItem', pokemon.name);
    vi.mocked(getPokemon).mockReturnValue(Promise.resolve(pokemon));

    renderWithIntl(<HomePage />);

    await waitFor(() => {
      expect(vi.mocked(getPokemon)).toHaveBeenCalledWith(pokemon.name);
      expect(vi.mocked(getPokemons)).not.toHaveBeenCalled();
    });
  });

  it('Handle empty search item', async () => {
    vi.mocked(getPokemons).mockReturnValue(Promise.resolve(pokemonsResponse));
    vi.mocked(getPokemon).mockReturnValue(Promise.resolve(pokemon));

    renderWithIntl(<HomePage />);

    await waitFor(() => {
      expect(vi.mocked(getPokemons)).toHaveBeenCalled();
      expect(vi.mocked(getPokemon)).not.toHaveBeenCalled();
    });
  });

  it('Handles API error responses', async () => {
    const errorMessage = 'Could not load pokemons';
    vi.mocked(getPokemons).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    renderWithIntl(<HomePage />);

    await waitFor(() => {
      expect(vi.mocked(getPokemons)).toThrow();
    });

    expect(vi.mocked(getPokemons)).toHaveBeenCalled();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
