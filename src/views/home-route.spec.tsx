import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';

const { mockPush, state } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  state: { search: new URLSearchParams() },
}));

const setSearch = (init: string) => {
  state.search = new URLSearchParams(init);
};

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/',
  useSearchParams: () => state.search,
}));

vi.mock('./home', () => ({
  default: ({
    page,
    onPageChange,
    onItemSelect,
    onMainPanelClick,
    detailsSlot,
  }: {
    page?: number;
    onPageChange?: (page: number) => void;
    onItemSelect?: (id: string) => void;
    onMainPanelClick?: () => void;
    detailsSlot?: ReactNode;
  }) => (
    <div data-testid="home-page">
      <span data-testid="page">{page}</span>
      <button onClick={() => onPageChange?.(5)}>change-page</button>
      <button onClick={() => onItemSelect?.('pikachu')}>select-item</button>
      <button
        disabled={!onMainPanelClick}
        onClick={() => onMainPanelClick?.()}
      >
        main-panel-click
      </button>
      <div data-testid="details-slot">{detailsSlot}</div>
    </div>
  ),
}));

vi.mock('../features/details/pokemon-details', () => ({
  default: ({
    detailsId,
    onClose,
  }: {
    detailsId: string;
    onClose: () => void;
  }) => (
    <div data-testid="pokemon-details">
      <span data-testid="details-id">{detailsId}</span>
      <button onClick={onClose}>close-details</button>
    </div>
  ),
}));

import HomeRoute from './home-route';

describe('HomeRoute: Rendering Tests', () => {
  beforeEach(() => {
    mockPush.mockReset();
    setSearch('');
  });

  it('Passes page from search params to HomePage', () => {
    setSearch('page=3');

    render(<HomeRoute />);

    expect(screen.getByTestId('page')).toHaveTextContent('3');
  });

  it('Defaults page to 1 when missing or invalid', () => {
    setSearch('page=not-a-number');

    render(<HomeRoute />);

    expect(screen.getByTestId('page')).toHaveTextContent('1');
  });

  it('Does not render PokemonDetails when details search param is absent', () => {
    setSearch('page=1');

    render(<HomeRoute />);

    expect(screen.queryByTestId('pokemon-details')).not.toBeInTheDocument();
  });

  it('Renders PokemonDetails when details search param is present', () => {
    setSearch('page=1&details=bulbasaur');

    render(<HomeRoute />);

    expect(screen.getByTestId('pokemon-details')).toBeInTheDocument();
    expect(screen.getByTestId('details-id')).toHaveTextContent('bulbasaur');
  });

  it('Disables onMainPanelClick when details are absent', () => {
    setSearch('page=1');

    render(<HomeRoute />);

    expect(screen.getByText('main-panel-click')).toBeDisabled();
  });

  it('Enables onMainPanelClick when details are present', () => {
    setSearch('page=1&details=bulbasaur');

    render(<HomeRoute />);

    expect(screen.getByText('main-panel-click')).not.toBeDisabled();
  });
});

describe('HomeRoute: Navigation Tests', () => {
  beforeEach(() => {
    mockPush.mockReset();
    setSearch('');
  });

  it('Navigates with updated page while preserving details on page change', async () => {
    setSearch('page=1&details=bulbasaur');
    const user = userEvent.setup();

    render(<HomeRoute />);
    await user.click(screen.getByText('change-page'));

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/?page=5&details=bulbasaur', {
      scroll: false,
    });
  });

  it('Navigates with details set while preserving page on item select', async () => {
    setSearch('page=2');
    const user = userEvent.setup();

    render(<HomeRoute />);
    await user.click(screen.getByText('select-item'));

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/?page=2&details=pikachu', {
      scroll: false,
    });
  });

  it('Navigates to clear details but keep page when closing details', async () => {
    setSearch('page=4&details=bulbasaur');
    const user = userEvent.setup();

    render(<HomeRoute />);
    await user.click(screen.getByText('close-details'));

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/?page=4', { scroll: false });
  });

  it('Navigates to clear details when clicking the main panel', async () => {
    setSearch('page=2&details=bulbasaur');
    const user = userEvent.setup();

    render(<HomeRoute />);
    await user.click(screen.getByText('main-panel-click'));

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/?page=2', { scroll: false });
  });
});
