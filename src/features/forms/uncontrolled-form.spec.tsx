import { render, screen, waitFor } from '@testing-library/react';
import { userEvent, type UserEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { FormValues } from './types';
import UncontrolledForm from './uncontrolled-form';

const renderForm = (onSubmit: (values: FormValues) => void): UserEvent => {
  render(<UncontrolledForm onSubmit={onSubmit} />);
  return userEvent.setup();
};

describe('UncontrolledForm', () => {
  it('renders all fields with labels connected via htmlFor', () => {
    renderForm(vi.fn());

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByLabelText('Profile image')).toBeInTheDocument();
    expect(screen.getByLabelText(/terms and conditions/i)).toBeInTheDocument();
  });

  it('does not drive inputs from React state (uncontrolled)', async () => {
    const user = renderForm(vi.fn());

    const name = screen.getByLabelText('Name');
    await user.type(name, 'Ada');

    expect(name).toHaveValue('Ada');
  });

  it('updates the password strength indicator as the user types', async () => {
    const user = renderForm(vi.fn());

    await user.type(screen.getByLabelText('Password'), 'Aa1!');

    expect(screen.getByText('1 uppercase letter').closest('li')).toHaveClass(
      'met'
    );
    expect(screen.getByText('1 special character').closest('li')).toHaveClass(
      'met'
    );
  });

  it('collects all entered values, converting the image to base64', async () => {
    const onSubmit = vi.fn();
    const user = renderForm(onSubmit);
    const file = new File(['img'], 'avatar.png', { type: 'image/png' });

    await user.type(screen.getByLabelText('Name'), 'Ada');
    await user.type(screen.getByLabelText('Age'), '36');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.click(screen.getByLabelText('Female'));
    await user.type(screen.getByLabelText('Country'), 'Australia');
    await user.type(screen.getByLabelText('Password'), 'Passw0rd!');
    await user.type(screen.getByLabelText('Confirm password'), 'Passw0rd!');
    await user.upload(screen.getByLabelText('Profile image'), file);
    await user.click(screen.getByLabelText(/terms and conditions/i));
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    const [values] = onSubmit.mock.calls[0];
    expect(values).toMatchObject({
      name: 'Ada',
      age: 36,
      email: 'ada@example.com',
      gender: 'female',
      country: 'Australia',
      password: 'Passw0rd!',
      confirmPassword: 'Passw0rd!',
      acceptTerms: true,
    });
    expect(values.image).toMatch(/^data:image\/png;base64,/);
  });

  it('validates on submit and does not call onSubmit when invalid', async () => {
    const onSubmit = vi.fn();
    const user = renderForm(onSubmit);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('does not disable the submit button (validates only on submit)', () => {
    renderForm(vi.fn());

    expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });
});
