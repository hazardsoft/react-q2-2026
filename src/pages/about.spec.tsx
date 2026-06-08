import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AboutPage from './about';

describe('AboutPage', () => {
  it('renders the author and external links', () => {
    render(<AboutPage />);

    expect(screen.getByText(/Henadzi Shutko/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /GitHub profile/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /RS School React course/i })
    ).toBeInTheDocument();
  });
});
