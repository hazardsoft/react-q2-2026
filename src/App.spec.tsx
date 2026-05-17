import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { getPokemons, getPokemon } from './api/pokemon';
import { pokemon, pokemonsResponse } from './__tests__/data';

vi.mock('./api/pokemon', () => {
  return {
    getPokemons: vi.fn(),
    getPokemon: vi.fn(),
  };
});

const clear = () => {
  localStorage.removeItem('searchItem');
};

describe('App: Integration Tests', () => {
  beforeEach(() => {
    clear();
  });

  afterEach(() => {
    clear();
  });

  it('Handle saved search item', async () => {
    localStorage.setItem('searchItem', pokemon.name);
    vi.mocked(getPokemon).mockReturnValue(Promise.resolve(pokemon));

    render(<App />);

    await waitFor(() => {
      expect(vi.mocked(getPokemon)).toHaveBeenCalledWith(pokemon.name);
      expect(vi.mocked(getPokemons)).not.toHaveBeenCalled();
    });
  });

  it('Handle empty search item', async () => {
    vi.mocked(getPokemons).mockReturnValue(Promise.resolve(pokemonsResponse));
    vi.mocked(getPokemon).mockReturnValue(Promise.resolve(pokemon));

    render(<App />);

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

    render(<App />);

    await waitFor(() => {
      expect(vi.mocked(getPokemons)).toThrow();
    });

    expect(vi.mocked(getPokemons)).toHaveBeenCalled();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
