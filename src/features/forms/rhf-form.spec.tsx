import { render, screen, waitFor } from '@testing-library/react';
import { userEvent, type UserEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { FormValues } from './types';
import RhfForm from './rhf-form';

const renderForm = (onSubmit: (values: FormValues) => void): UserEvent => {
  render(<RhfForm onSubmit={onSubmit} />);
  return userEvent.setup();
};

describe('RhfForm', () => {
  it('renders the basic fields with labels connected via htmlFor', () => {
    renderForm(vi.fn());

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(screen.getByLabelText(/terms and conditions/i)).toBeInTheDocument();
  });

  it('collects the entered values on submit', async () => {
    const onSubmit = vi.fn();
    const user = renderForm(onSubmit);

    await user.type(screen.getByLabelText('Name'), 'Ada');
    await user.type(screen.getByLabelText('Age'), '36');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.click(screen.getByLabelText('Female'));
    await user.click(screen.getByLabelText(/terms and conditions/i));
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    const [values] = onSubmit.mock.calls[0];
    expect(values).toEqual({
      name: 'Ada',
      age: 36,
      email: 'ada@example.com',
      gender: 'female',
      acceptTerms: true,
    });
  });
});
