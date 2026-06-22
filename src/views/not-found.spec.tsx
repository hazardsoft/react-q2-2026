import { screen } from '@testing-library/react';
import { renderWithIntl } from '../__tests__/render';
import { describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import NotFoundPage from './not-found';

describe('Not Found: Rendering Tests', () => {
  it('Renders 404 heading', () => {
    renderWithIntl(<NotFoundPage />);

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
  });

  it('Renders the not-found description text', () => {
    renderWithIntl(<NotFoundPage />);

    expect(
      screen.getByText(/This page is not what you're looking for/i)
    ).toBeInTheDocument();
  });

  it('Renders a link back to home', () => {
    renderWithIntl(<NotFoundPage />);

    const link = screen.getByRole('link', { name: /Get me home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/?page=1');
  });
});
