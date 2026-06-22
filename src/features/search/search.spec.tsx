import { screen } from '@testing-library/react';
import { renderWithIntl } from '../../__tests__/render';
import { userEvent, type UserEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Search from './search';

const searchItem = 'bulbasaur';

const prepareComponent = (
  initialValue = ''
): { user: UserEvent; onSubmit: ReturnType<typeof vi.fn> } => {
  const onSubmit = vi.fn();
  renderWithIntl(<Search initialValue={initialValue} onSubmit={onSubmit} />);
  return {
    user: userEvent.setup(),
    onSubmit,
  };
};

describe('Search: Rendering Tests', () => {
  it('Renders search input and search button', () => {
    prepareComponent();

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('Search value is empty when initialValue is empty', () => {
    prepareComponent();

    expect(screen.getByRole('searchbox')).toHaveValue('');
  });

  it('Initializes input with initialValue when provided', () => {
    prepareComponent(searchItem);

    expect(screen.getByRole('searchbox')).toHaveValue(searchItem);
  });
});

describe('Search: User Interaction Tests', () => {
  it('Updates input value when user types', async () => {
    const { user } = prepareComponent();

    await user.type(screen.getByRole('searchbox'), searchItem);

    expect(screen.getByRole('searchbox')).toHaveValue(searchItem);
  });

  it('Does not call onSubmit on mount', () => {
    const { onSubmit } = prepareComponent();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('Trims whitespace before calling onSubmit', async () => {
    const { user, onSubmit } = prepareComponent();

    await user.type(screen.getByRole('searchbox'), ` ${searchItem} `);
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(searchItem);
  });

  it('Does not re-trigger onSubmit with the same value', async () => {
    const { user, onSubmit } = prepareComponent();

    await user.type(screen.getByRole('searchbox'), searchItem);
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenLastCalledWith(searchItem);
  });

  it('Does not re-trigger onSubmit when value matches initialValue', async () => {
    const { user, onSubmit } = prepareComponent(searchItem);

    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
