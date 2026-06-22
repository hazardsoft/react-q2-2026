import { screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { renderWithIntl } from '../../__tests__/render';
import Search from './search';

describe('Search', () => {
  it('renders the search input and button', () => {
    renderWithIntl(<Search initialValue="" searchAction={vi.fn()} />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('initializes the input with initialValue', () => {
    renderWithIntl(<Search initialValue="bulbasaur" searchAction={vi.fn()} />);

    expect(screen.getByRole('searchbox')).toHaveValue('bulbasaur');
  });

  it('submits the typed query through the server action', async () => {
    const action = vi.fn();
    const user = userEvent.setup();
    renderWithIntl(<Search initialValue="" searchAction={action} />);

    await user.type(screen.getByRole('searchbox'), 'pikachu');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => expect(action).toHaveBeenCalled());
    const formData = action.mock.calls[0][1] as FormData;
    expect(formData.get('query')).toBe('pikachu');
  });
});
