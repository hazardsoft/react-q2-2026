import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Submission } from '../types';
import SubmissionCard from './submission-card';

const base: Submission = {
  id: '1',
  source: 'uncontrolled',
  createdAt: 0,
  name: 'ada',
  age: 36,
  email: 'ada@example.com',
  gender: 'female',
  country: 'Australia',
  acceptedTerms: true,
  image: '',
};

describe('SubmissionCard', () => {
  it('renders the uploaded image when one is provided', () => {
    render(
      <SubmissionCard
        submission={{ ...base, image: 'data:image/png;base64,abc' }}
      />
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'data:image/png;base64,abc');
    expect(img).toHaveAttribute('alt', 'ada');
  });

  it('falls back to the name initial when there is no image', () => {
    render(<SubmissionCard submission={base} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('a')).toBeInTheDocument();
  });

  it('shows a readable label for each form source', () => {
    const { rerender } = render(<SubmissionCard submission={base} />);
    expect(screen.getByText('Uncontrolled')).toBeInTheDocument();

    rerender(<SubmissionCard submission={{ ...base, source: 'rhf' }} />);
    expect(screen.getByText('React Hook Form')).toBeInTheDocument();
  });

  it('applies the highlight class only when highlighted', () => {
    const { container, rerender } = render(
      <SubmissionCard submission={base} />
    );
    expect(container.querySelector('.submission-card')).not.toHaveClass(
      'is-new'
    );

    rerender(<SubmissionCard submission={base} highlighted />);
    expect(container.querySelector('.submission-card')).toHaveClass('is-new');
  });
});
