import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithIntl } from '../../__tests__/render';
import Search from './search';

const { mockPush } = vi.hoisted(() => ({ mockPush: vi.fn() }));

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('Search', () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it('renders the search input and button', () => {
    renderWithIntl(<Search initialValue="" />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('initializes the input with initialValue', () => {
    renderWithIntl(<Search initialValue="bulbasaur" />);

    expect(screen.getByRole('searchbox')).toHaveValue('bulbasaur');
  });

  it('navigates to page 1 with the trimmed query on submit', async () => {
    const user = userEvent.setup();
    renderWithIntl(<Search initialValue="" />);

    await user.type(screen.getByRole('searchbox'), '  pikachu  ');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: 1, query: 'pikachu' },
    });
  });

  it('navigates without a query when the input is empty', async () => {
    const user = userEvent.setup();
    renderWithIntl(<Search initialValue="" />);

    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: 1 },
    });
  });
});
