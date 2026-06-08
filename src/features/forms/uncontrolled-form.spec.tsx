import { render, screen } from '@testing-library/react';
import { userEvent, type UserEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { FormValues } from './types';
import UncontrolledForm from './uncontrolled-form';

const renderForm = (onSubmit: (values: FormValues) => void): UserEvent => {
  render(<UncontrolledForm onSubmit={onSubmit} />);
  return userEvent.setup();
};

describe('UncontrolledForm', () => {
  it('renders the basic fields with labels connected via htmlFor', () => {
    renderForm(vi.fn());

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(screen.getByLabelText(/terms and conditions/i)).toBeInTheDocument();
  });

  it('does not drive inputs from React state (uncontrolled)', async () => {
    const user = renderForm(vi.fn());

    const name = screen.getByLabelText('Name');
    await user.type(name, 'Ada');

    expect(name).toHaveValue('Ada');
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

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Ada',
      age: 36,
      email: 'ada@example.com',
      gender: 'female',
      acceptTerms: true,
    });
  });

  it('reports an unchecked Terms checkbox as false', async () => {
    const onSubmit = vi.fn();
    const user = renderForm(onSubmit);

    await user.type(screen.getByLabelText('Name'), 'Grace');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Grace', acceptTerms: false })
    );
  });
});
