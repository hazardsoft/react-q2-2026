import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Loading from './loading';

describe('Loading', () => {
  it('renders a spinner', () => {
    render(<Loading />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
