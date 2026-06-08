import { render, screen, waitFor } from '@testing-library/react';
import { userEvent, type UserEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { FormValues } from './types';
import RhfForm from './rhf-form';

const renderForm = (onSubmit: (values: FormValues) => void): UserEvent => {
  render(<RhfForm onSubmit={onSubmit} />);
  return userEvent.setup();
};

const formData = {
  name: 'Henadzi Shutko',
  age: 39,
  email: 'hazardsoft@gmail.com',
  gender: 'male',
  country: 'Belarus',
  password: 'Passw0rd!',
  confirmPassword: 'Passw0rd!',
  acceptTerms: true,
}

describe('RhfForm', () => {
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

  it('updates the password strength indicator as the user types', async () => {
    const user = renderForm(vi.fn());

    await user.type(screen.getByLabelText('Password'), 'Aa1!');

    expect(screen.getByText('1 number').closest('li')).toHaveClass('met');
    expect(screen.getByText('1 lowercase letter').closest('li')).toHaveClass(
      'met'
    );
  });

  it('collects all entered values, converting the image to base64', async () => {
    const onSubmit = vi.fn();
    const user = renderForm(onSubmit);
    const file = new File(['img'], 'avatar.png', { type: 'image/png' });

    await user.type(screen.getByLabelText('Name'), formData.name);
    await user.type(screen.getByLabelText('Age'), formData.age.toString());
    await user.type(screen.getByLabelText('Email'), formData.email);
    await user.click(screen.getByLabelText('Male'));
    await user.type(screen.getByLabelText('Country'), formData.country);
    await user.type(screen.getByLabelText('Password'), formData.password);
    await user.type(screen.getByLabelText('Confirm password'), formData.password);
    await user.upload(screen.getByLabelText('Profile image'), file);
    await user.click(screen.getByLabelText(/terms and conditions/i));
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    const [values] = onSubmit.mock.calls[0];
    expect(values).toMatchObject(formData);
    expect(values.image).toMatch(/^data:image\/png;base64,/);
  });

  it('disables the submit button while the form is invalid', () => {
    renderForm(vi.fn());

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('shows a live validation error for an invalid field', async () => {
    const user = renderForm(vi.fn());

    await user.type(screen.getByLabelText('Name'), 'ada');

    expect(
      await screen.findByText('Name must start with an uppercase letter')
    ).toBeInTheDocument();
  });
});
