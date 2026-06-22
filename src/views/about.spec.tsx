import { screen } from '@testing-library/react';
import { renderWithIntl } from '../__tests__/render';
import { describe, expect, it } from 'vitest';
import AboutPage from './about';

describe('About: Rendering Tests', () => {
  it('Renders the author name', () => {
    renderWithIntl(<AboutPage />);

    expect(screen.getByText(/Henadzi Shutko/i)).toBeInTheDocument();
  });

  it('Renders a link to the GitHub profile', () => {
    renderWithIntl(<AboutPage />);

    const link = screen.getByRole('link', { name: /GitHub profile/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/hazardsoft');
  });

  it('Renders a link to the RS School React course', () => {
    renderWithIntl(<AboutPage />);

    const link = screen.getByRole('link', { name: /RS School React course/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
