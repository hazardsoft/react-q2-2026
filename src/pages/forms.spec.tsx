import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import FormsPage from './forms';
import { COUNTRIES } from '../features/forms/data/countries';
import { useFormsStore } from '../features/forms/store/forms-store';

const reset = () =>
  useFormsStore.setState({ submissions: [], countries: COUNTRIES });

describe('FormsPage', () => {
  beforeEach(reset);
  afterEach(reset);

  it('opens a form in the modal and shows the empty state initially', async () => {
    const user = userEvent.setup();
    render(<FormsPage />);

    expect(screen.getByText(/no submissions yet/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Uncontrolled Form' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('opens the React Hook Form in the modal', async () => {
    const user = userEvent.setup();
    render(<FormsPage />);

    await user.click(screen.getByRole('button', { name: 'React Hook Form' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'React Hook Form' })
    ).toBeInTheDocument();
  });

  it('keeps the modal open and stores nothing when the form is invalid', async () => {
    const user = userEvent.setup();
    render(<FormsPage />);

    await user.click(screen.getByRole('button', { name: 'Uncontrolled Form' }));
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(useFormsStore.getState().submissions).toHaveLength(0);
  });

  it('stores a valid submission, closes the modal, and shows it as a card', async () => {
    const user = userEvent.setup();
    render(<FormsPage />);
    const file = new File(['img'], 'avatar.png', { type: 'image/png' });

    await user.click(screen.getByRole('button', { name: 'Uncontrolled Form' }));
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

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );

    expect(screen.getByRole('heading', { name: 'Ada' })).toBeInTheDocument();
    expect(screen.getByText('Australia')).toBeInTheDocument();
    expect(useFormsStore.getState().submissions).toHaveLength(1);

    // Reopening the form shows a fresh, empty field (reset on success).
    await user.click(screen.getByRole('button', { name: 'Uncontrolled Form' }));
    expect(screen.getByLabelText('Name')).toHaveValue('');
  });

  it('stores a React Hook Form submission tagged with its source', async () => {
    const user = userEvent.setup();
    render(<FormsPage />);
    const file = new File(['img'], 'avatar.png', { type: 'image/png' });

    await user.click(screen.getByRole('button', { name: 'React Hook Form' }));
    await user.type(screen.getByLabelText('Name'), 'Grace');
    await user.type(screen.getByLabelText('Age'), '40');
    await user.type(screen.getByLabelText('Email'), 'grace@example.com');
    await user.click(screen.getByLabelText('Female'));
    await user.type(screen.getByLabelText('Country'), 'Australia');
    await user.type(screen.getByLabelText('Password'), 'Passw0rd!');
    await user.type(screen.getByLabelText('Confirm password'), 'Passw0rd!');
    await user.upload(screen.getByLabelText('Profile image'), file);
    await user.click(screen.getByLabelText(/terms and conditions/i));
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
    expect(screen.getByRole('heading', { name: 'Grace' })).toBeInTheDocument();
    expect(useFormsStore.getState().submissions[0].source).toBe('rhf');
  });
});
