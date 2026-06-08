import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PasswordStrength from './password-strength';

describe('PasswordStrength', () => {
  it('renders the four password requirements', () => {
    render(<PasswordStrength password="" />);

    expect(screen.getByText('1 uppercase letter')).toBeInTheDocument();
    expect(screen.getByText('1 lowercase letter')).toBeInTheDocument();
    expect(screen.getByText('1 number')).toBeInTheDocument();
    expect(screen.getByText('1 special character')).toBeInTheDocument();
  });

  it('marks only the satisfied requirements as met', () => {
    render(<PasswordStrength password="Ab1" />);

    expect(screen.getByText('1 uppercase letter').closest('li')).toHaveClass(
      'met'
    );
    expect(screen.getByText('1 lowercase letter').closest('li')).toHaveClass(
      'met'
    );
    expect(screen.getByText('1 number').closest('li')).toHaveClass('met');
    expect(
      screen.getByText('1 special character').closest('li')
    ).not.toHaveClass('met');
  });
});
