import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ResultsPanel from './results-panel';

const { mockPush } = vi.hoisted(() => ({ mockPush: vi.fn() }));

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const closeHref = { pathname: '/' as const, query: { page: 1 } };

describe('ResultsPanel', () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it('navigates to closeHref when the background is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ResultsPanel closeHref={closeHref}>
        <div data-testid="bg">content</div>
      </ResultsPanel>
    );

    await user.click(screen.getByTestId('bg'));

    expect(mockPush).toHaveBeenCalledWith(closeHref);
  });

  it('ignores clicks that land on a link', async () => {
    const user = userEvent.setup();
    render(
      <ResultsPanel closeHref={closeHref}>
        <a href="#card">card</a>
      </ResultsPanel>
    );

    await user.click(screen.getByRole('link', { name: 'card' }));

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('does nothing when closeHref is not provided', async () => {
    const user = userEvent.setup();
    render(
      <ResultsPanel>
        <div data-testid="bg">content</div>
      </ResultsPanel>
    );

    await user.click(screen.getByTestId('bg'));

    expect(mockPush).not.toHaveBeenCalled();
  });
});
