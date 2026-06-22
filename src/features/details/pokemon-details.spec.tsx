import { screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { renderWithIntl } from '../../__tests__/render';
import PokemonDetails from './pokemon-details';
import { getPokemon } from '../../api/pokemon';
import { pokemon } from '../../__tests__/data';
import type { PokemonDetails as Details } from '../../api/types';

vi.mock('../../api/pokemon', () => {
  return {
    getPokemon: vi.fn(),
  };
});

const pokemonWithoutSprite: Details = {
  id: 1,
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1',
  abilities: [],
  sprites: {
    front_default: null,
  },
};

describe('Pokemon Details: Rendering Tests', () => {
  it('Shows loading spinner while fetching details', () => {
    vi.mocked(getPokemon).mockReturnValueOnce(new Promise(() => {}));

    renderWithIntl(
      <PokemonDetails detailsId={pokemon.name} onClose={() => {}} />
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('Renders pokemon name, sprite and abilities after fetch resolves', async () => {
    vi.mocked(getPokemon).mockResolvedValueOnce(pokemon);

    renderWithIntl(
      <PokemonDetails detailsId={pokemon.name} onClose={() => {}} />
    );

    expect(
      await screen.findByRole('heading', { name: pokemon.name })
    ).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', pokemon.sprites.front_default);
    expect(img).toHaveAttribute('alt', pokemon.name);

    expect(screen.getByText(/Abilities:/i)).toBeInTheDocument();
    pokemon.abilities.forEach((a) => {
      expect(screen.getByText(a.ability.name)).toBeInTheDocument();
    });
  });

  it('Does not render image or abilities list when sprite and abilities are absent', async () => {
    vi.mocked(getPokemon).mockResolvedValueOnce(pokemonWithoutSprite);

    renderWithIntl(
      <PokemonDetails detailsId={pokemonWithoutSprite.name} onClose={() => {}} />
    );

    expect(
      await screen.findByRole('heading', { name: pokemonWithoutSprite.name })
    ).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByText(/Abilities:/i)).not.toBeInTheDocument();
  });
});

describe('Pokemon Details: Error Handling Tests', () => {
  it('Displays error message when fetch fails', async () => {
    const errorMessage = 'Could not load pokemon (bulbasaur)';
    vi.mocked(getPokemon).mockRejectedValueOnce(new Error(errorMessage));

    renderWithIntl(
      <PokemonDetails detailsId={pokemon.name} onClose={() => {}} />
    );

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: pokemon.name })
    ).not.toBeInTheDocument();
  });
});

describe('Pokemon Details: User Interaction Tests', () => {
  it('Calls onClose when the close button is clicked', async () => {
    vi.mocked(getPokemon).mockResolvedValueOnce(pokemon);
    const onClose = vi.fn();
    const user = userEvent.setup();

    renderWithIntl(<PokemonDetails detailsId={pokemon.name} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: '×' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Refetches details when detailsId changes', async () => {
    vi.mocked(getPokemon).mockResolvedValue(pokemon);

    const { rerender } = renderWithIntl(
      <PokemonDetails detailsId="bulbasaur" onClose={() => {}} />
    );

    await waitFor(() => {
      expect(vi.mocked(getPokemon)).toHaveBeenCalledWith('bulbasaur');
    });

    rerender(<PokemonDetails detailsId="ivysaur" onClose={() => {}} />);

    await waitFor(() => {
      expect(vi.mocked(getPokemon)).toHaveBeenCalledWith('ivysaur');
    });
  });
});
