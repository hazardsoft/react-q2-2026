import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { renderWithIntl } from '../../__tests__/render';
import Pagination from './pagination';

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    className,
    children,
  }: {
    href: unknown;
    className?: string;
    children: ReactNode;
  }) => (
    <a className={className} href={JSON.stringify(href)}>
      {children}
    </a>
  ),
}));

describe('Pagination', () => {
  it('shows the current page', () => {
    renderWithIntl(<Pagination page={3} hasPrevPage hasNextPage />);

    expect(screen.getByText('Page 3')).toBeInTheDocument();
  });

  it('renders Prev/Next as links when enabled', () => {
    renderWithIntl(<Pagination page={2} hasPrevPage hasNextPage />);

    expect(screen.getByRole('link', { name: /Prev/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Next/i })).toBeInTheDocument();
  });

  it('disables Prev on the first page', () => {
    renderWithIntl(
      <Pagination page={1} hasPrevPage={false} hasNextPage={true} />
    );

    expect(
      screen.queryByRole('link', { name: /Prev/i })
    ).not.toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Next/i })).toBeInTheDocument();
  });
});
