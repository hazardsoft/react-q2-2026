import { render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { COUNTRIES } from '../data/countries';
import { useFormsStore } from '../store/forms-store';
import type { SubmissionInput } from '../types';
import SubmissionsList from './submissions-list';

const reset = () =>
  useFormsStore.setState({ submissions: [], countries: COUNTRIES });

const baseInput: SubmissionInput = {
  source: 'rhf',
  name: 'Grace',
  age: 40,
  email: 'grace@example.com',
  gender: 'female',
  country: 'Australia',
  acceptedTerms: true,
  image: '',
};

describe('SubmissionsList', () => {
  beforeEach(reset);
  afterEach(reset);

  it('shows an empty state when there are no submissions', () => {
    render(<SubmissionsList />);

    expect(screen.getByText(/no submissions yet/i)).toBeInTheDocument();
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  it('renders a card per submission, newest first', () => {
    useFormsStore.getState().addSubmission(baseInput);
    useFormsStore
      .getState()
      .addSubmission({ ...baseInput, name: 'Alan', source: 'uncontrolled' });

    render(<SubmissionsList />);

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(2);
    expect(
      within(cards[0]).getByRole('heading', { name: 'Alan' })
    ).toBeInTheDocument();
    expect(
      within(cards[1]).getByRole('heading', { name: 'Grace' })
    ).toBeInTheDocument();
  });

  it('displays submission details and the form source label', () => {
    useFormsStore.getState().addSubmission(baseInput);

    render(<SubmissionsList />);

    expect(screen.getByText('grace@example.com')).toBeInTheDocument();
    expect(screen.getByText('Australia')).toBeInTheDocument();
    expect(screen.getByText('React Hook Form')).toBeInTheDocument();
  });
});
