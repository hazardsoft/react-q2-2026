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

  it('stores a submission, closes the modal, and shows it as a card', async () => {
    const user = userEvent.setup();
    render(<FormsPage />);

    await user.click(screen.getByRole('button', { name: 'Uncontrolled Form' }));
    await user.type(screen.getByLabelText('Name'), 'Ada');
    await user.type(screen.getByLabelText('Age'), '36');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.click(screen.getByLabelText('Female'));
    await user.type(screen.getByLabelText('Country'), 'Australia');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );

    expect(screen.getByRole('heading', { name: 'Ada' })).toBeInTheDocument();
    expect(screen.getByText('Australia')).toBeInTheDocument();
    expect(useFormsStore.getState().submissions).toHaveLength(1);
  });
});
