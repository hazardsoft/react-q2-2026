import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Search from './search';
import { readSearchItem } from '../../api/local';

vi.mock('../../api/local', () => {
  return {
    readSearchItem: vi.fn(),
    writeSearchItem: vi.fn(),
  };
});

describe('Search', () => {
  it('Search value is empty if local storage returns nothing', async () => {
    vi.mocked(readSearchItem).mockReturnValue('');

    render(<Search handleSearch={() => {}} />);
    expect(screen.getByRole('searchbox')).toHaveValue('');
  });

  it('Search value is equal to local storage value is it retuens smth', async () => {
    const searchItem = 'bulbasaur';
    vi.mocked(readSearchItem).mockReturnValue(searchItem);

    render(<Search handleSearch={() => {}} />);
    expect(screen.getByRole('searchbox')).toHaveValue(searchItem);
  });
});
