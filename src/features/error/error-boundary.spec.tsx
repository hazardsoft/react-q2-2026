import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ErrorBoundary from './error-boundary';
import HomePage from '../../pages/home';
import userEvent from '@testing-library/user-event';

const fallbackMessage = 'Something went wrong';

describe('Error Boundary: Error Catching Tests', () => {
  let spy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    spy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('Error Catching Tests', async () => {
    const runtimeError = new Error('Error to catch with Error Boundary');
    const ThrowError = () => {
      throw runtimeError;
    };
    render(
      <ErrorBoundary fallback={<p>{fallbackMessage}</p>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(fallbackMessage)).toBeInTheDocument();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(
      'Caught error with error boundary',
      runtimeError,
      expect.any(String)
    );
  });

  it('Error Button Tests', async () => {
    const runtimeError = new Error('Throw error manually');
    render(
      <ErrorBoundary fallback={<p>{fallbackMessage}</p>}>
        <HomePage />
      </ErrorBoundary>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Throw Exception' }));

    expect(screen.getByText(fallbackMessage)).toBeInTheDocument();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(
      'Caught error with error boundary',
      runtimeError,
      expect.any(String)
    );
  });
});
