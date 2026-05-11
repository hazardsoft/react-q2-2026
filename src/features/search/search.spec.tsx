import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Search from './search';

describe('Search', () => {
  it('Search value is empty if local storage returns nothing', async () => {
    localStorage.setItem('searchItem', '');

    render(<Search handleSearch={() => {}} />);
    expect(screen.getByRole('searchbox')).toHaveValue('');
  });

  it('Search value is equal to local storage value is it retuens smth', async () => {
    const searchItem = 'bulbasaur';
    localStorage.setItem('searchItem', searchItem);

    render(<Search handleSearch={() => {}} />);
    expect(screen.getByRole('searchbox')).toHaveValue(searchItem);
  });
});
