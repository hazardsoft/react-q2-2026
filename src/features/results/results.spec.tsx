import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Results from './results';

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
});

describe('Results: Error Handling Tests', () => {
  it('Displays error message when API call fails', async () => {
    const errorMessage = 'Can not load pokemons';
    render(<Results pokemons={[]} loading={false} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
