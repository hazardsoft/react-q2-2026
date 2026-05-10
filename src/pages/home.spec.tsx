import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from './home';

describe('Home', () => {
  it("Renders button with label 'Throw Exception'", async () => {
    render(<HomePage />)

    expect(screen.getByRole('button', { name: /Throw Exception/i })).toBeInTheDocument();
  });
});
