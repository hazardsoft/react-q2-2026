import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithIntl } from '../../__tests__/render';
import ResultsList from './results-list';

vi.mock('./pokermon-card', () => ({
  default: ({ name }: { name: string }) => <article>{name}</article>,
}));

describe('ResultsList', () => {
  it('renders one card per item', () => {
    renderWithIntl(
      <ResultsList
        items={[
          { name: 'a', sprite: null },
          { name: 'b', sprite: null },
        ]}
        page={1}
      />
    );

    expect(screen.getAllByRole('article')).toHaveLength(2);
  });

  it('shows the empty message when there are no items', () => {
    renderWithIntl(<ResultsList items={[]} page={1} />);

    expect(screen.getByText('No Pokemons')).toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});
