import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import NotFoundPage from './not-found';

describe('Not Found: Rendering Tests', () => {
  it('Renders 404 heading', () => {
    render(<NotFoundPage />);

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
  });

  it('Renders the not-found description text', () => {
    render(<NotFoundPage />);

    expect(
      screen.getByText(/This page is not what you're looking for/i)
    ).toBeInTheDocument();
  });

  it('Renders a link back to home', () => {
    render(<NotFoundPage />);

    const link = screen.getByRole('link', { name: /Get me home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/?page=1');
  });
});
