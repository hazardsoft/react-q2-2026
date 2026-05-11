import { render, screen } from '@testing-library/react';
import { userEvent, type UserEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Search from './search';

const searchFn = vi.fn();
const searchItem = 'bulbasaur';
const clear = () => {
  localStorage.removeItem('searchItem');
};

const prepareComponent = (): { user: UserEvent } => {
  render(<Search handleSearch={searchFn} />);
  return {
    user: userEvent.setup(),
  };
};

describe('Search: Rendering Tests', () => {
  beforeEach(() => {
    clear();
  });

  afterEach(() => {
    clear();
  });

  it('Renders search input and search button', async () => {
    prepareComponent();

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('Search value is empty if local storage returns nothing', async () => {
    prepareComponent();

    expect(screen.getByRole('searchbox')).toHaveValue('');
  });

  it('Search value is equal to local storage value is it returns smth', async () => {
    localStorage.setItem('searchItem', searchItem);
    prepareComponent();

    expect(screen.getByRole('searchbox')).toHaveValue(searchItem);
  });
});

describe('Search: User Interaction Tests', () => {
  beforeEach(() => {
    clear();
  });

  afterEach(() => {
    clear();
  });

  it('Updates input value when user types', async () => {
    const searchItem = 'bulbasaur';
    const { user } = prepareComponent();

    await user.type(screen.getByRole('searchbox'), searchItem);

    expect(screen.getByRole('searchbox')).toHaveValue(searchItem);
  });

  it('Saves search term to localStorage when search button is clicked', async () => {
    const { user } = prepareComponent();

    const input = `${searchItem}-random`;
    await user.type(screen.getByRole('searchbox'), input);
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(localStorage.getItem('searchItem')).toBe(input);
  });

  it('Trims whitespace from search input before saving/Triggers search callback with correct parameters', async () => {
    const { user } = prepareComponent();

    const input = ` ${searchItem} `;
    await user.type(screen.getByRole('searchbox'), input);
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(localStorage.getItem('searchItem')).toBe(searchItem);

    expect(searchFn).toHaveBeenCalledTimes(2);
    expect(searchFn).toHaveBeenLastCalledWith(searchItem);
  });
});
