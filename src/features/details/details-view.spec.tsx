import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { renderWithIntl } from '../../__tests__/render';
import DetailsView from './details-view';
import { pokemon } from '../../__tests__/data';
import { homeHref } from '../results/home-href';

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...rest }: { href: unknown; children: ReactNode }) => (
    <a href={typeof href === 'string' ? href : JSON.stringify(href)} {...rest}>
      {children}
    </a>
  ),
}));

describe('DetailsView', () => {
  const closeHref = homeHref({ page: 1 });

  it('renders the name, sprite and abilities', () => {
    renderWithIntl(<DetailsView details={pokemon} closeHref={closeHref} />);

    expect(
      screen.getByRole('heading', { name: pokemon.name })
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      pokemon.sprites.front_default
    );
    expect(screen.getByText(/Abilities:/i)).toBeInTheDocument();
    pokemon.abilities.forEach((a) => {
      expect(screen.getByText(a.ability.name)).toBeInTheDocument();
    });
  });

  it('renders a close link', () => {
    renderWithIntl(<DetailsView details={pokemon} closeHref={closeHref} />);

    expect(screen.getByRole('link', { name: /Close/i })).toBeInTheDocument();
  });
});
