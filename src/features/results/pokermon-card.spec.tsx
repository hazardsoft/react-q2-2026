import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { renderWithIntl } from '../../__tests__/render';
import PokermonCard from './pokermon-card';

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

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

describe('PokermonCard', () => {
  it('renders the name and sprite image', () => {
    renderWithIntl(
      <PokermonCard name="pikachu" sprite="http://x/25.png" page={1} />
    );

    expect(
      screen.getByRole('heading', { name: 'pikachu' })
    ).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'http://x/25.png');
    expect(img).toHaveAttribute('alt', 'pikachu');
  });

  it('links to the details for the pokemon, preserving page and query', () => {
    renderWithIntl(
      <PokermonCard name="pikachu" sprite={null} page={2} query="pik" />
    );

    const href = JSON.parse(screen.getByRole('link').getAttribute('href')!);
    expect(href).toEqual({
      pathname: '/',
      query: { page: 2, query: 'pik', details: 'pikachu' },
    });
  });

  it('omits the image when the sprite is missing', () => {
    renderWithIntl(<PokermonCard name="pikachu" sprite={null} page={1} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
