import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Results from './results';
import { pokemons } from '../../__tests__/data';

describe('Results: Rendering Tests', () => {
  it('Shows loading state while fetching data', async () => {
    render(<Results pokemons={[]} loading={true} error="" />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeVisible();
  });

  it('Does not show loading state loading is not in progress', async () => {
    render(<Results pokemons={[]} loading={false} error="" />);

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('Renders the pokemon list when there is no error and data is provided', async () => {
    render(<Results pokemons={pokemons} loading={false} error="" />);

    expect(screen.getAllByRole('article').length).toBe(pokemons.length);
    expect(screen.queryByText('No Pokemons')).not.toBeInTheDocument();
  });

  it('Shows "No Pokemons" when there is no error and the list is empty', async () => {
    render(<Results pokemons={[]} loading={false} error="" />);

    expect(screen.getByText('No Pokemons')).toBeInTheDocument();
  });
});

describe('Results: Error Handling Tests', () => {
  it('Displays error message when API call fails', async () => {
    const errorMessage = 'Can not load pokemons';
    render(<Results pokemons={[]} loading={false} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByText('No Pokemons')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('article').length).toBe(0);
  });
});
