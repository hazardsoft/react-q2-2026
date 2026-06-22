import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithIntl } from '../../__tests__/render';
import ThrowButton from './throw-button';

describe('ThrowButton', () => {
  it('renders the throw button', () => {
    renderWithIntl(<ThrowButton />);

    expect(
      screen.getByRole('button', { name: /Throw Exception/i })
    ).toBeInTheDocument();
  });
});
