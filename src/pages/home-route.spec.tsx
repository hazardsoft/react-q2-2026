import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';

const { mockUseSearch, mockNavigate } = vi.hoisted(() => ({
  mockUseSearch: vi.fn(),
  mockNavigate: vi.fn(),
}));

vi.mock('@tanstack/react-router', () => ({
  getRouteApi: () => ({
    useSearch: mockUseSearch,
    useNavigate: () => mockNavigate,
  }),
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
    mockNavigate.mockReset();
    mockUseSearch.mockReset();
  });

  it('Passes page from search params to HomePage', () => {
    mockUseSearch.mockReturnValue({ page: 3 });

    render(<HomeRoute />);

    expect(screen.getByTestId('page')).toHaveTextContent('3');
  });

  it('Does not render PokemonDetails when details search param is absent', () => {
    mockUseSearch.mockReturnValue({ page: 1 });

    render(<HomeRoute />);

    expect(screen.queryByTestId('pokemon-details')).not.toBeInTheDocument();
  });

  it('Renders PokemonDetails when details search param is present', () => {
    mockUseSearch.mockReturnValue({ page: 1, details: 'bulbasaur' });

    render(<HomeRoute />);

    expect(screen.getByTestId('pokemon-details')).toBeInTheDocument();
    expect(screen.getByTestId('details-id')).toHaveTextContent('bulbasaur');
  });

  it('Disables onMainPanelClick when details are absent', () => {
    mockUseSearch.mockReturnValue({ page: 1 });

    render(<HomeRoute />);

    expect(screen.getByText('main-panel-click')).toBeDisabled();
  });

  it('Enables onMainPanelClick when details are present', () => {
    mockUseSearch.mockReturnValue({ page: 1, details: 'bulbasaur' });

    render(<HomeRoute />);

    expect(screen.getByText('main-panel-click')).not.toBeDisabled();
  });
});

describe('HomeRoute: Navigation Tests', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockUseSearch.mockReset();
  });

  it('Navigates with updated page while preserving other params on page change', async () => {
    mockUseSearch.mockReturnValue({ page: 1, details: 'bulbasaur' });
    const user = userEvent.setup();

    render(<HomeRoute />);
    await user.click(screen.getByText('change-page'));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    const search = mockNavigate.mock.calls[0][0].search;
    expect(search({ page: 1, details: 'bulbasaur' })).toEqual({
      page: 5,
      details: 'bulbasaur',
    });
  });

  it('Navigates with details set while preserving page on item select', async () => {
    mockUseSearch.mockReturnValue({ page: 2 });
    const user = userEvent.setup();

    render(<HomeRoute />);
    await user.click(screen.getByText('select-item'));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    const search = mockNavigate.mock.calls[0][0].search;
    expect(search({ page: 2 })).toEqual({ page: 2, details: 'pikachu' });
  });

  it('Navigates to clear details but keep page when closing details', async () => {
    mockUseSearch.mockReturnValue({ page: 4, details: 'bulbasaur' });
    const user = userEvent.setup();

    render(<HomeRoute />);
    await user.click(screen.getByText('close-details'));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    const search = mockNavigate.mock.calls[0][0].search;
    expect(search({ page: 4, details: 'bulbasaur' })).toEqual({ page: 4 });
  });

  it('Navigates to clear details when clicking the main panel', async () => {
    mockUseSearch.mockReturnValue({ page: 2, details: 'bulbasaur' });
    const user = userEvent.setup();

    render(<HomeRoute />);
    await user.click(screen.getByText('main-panel-click'));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    const search = mockNavigate.mock.calls[0][0].search;
    expect(search({ page: 2, details: 'bulbasaur' })).toEqual({ page: 2 });
  });
});
