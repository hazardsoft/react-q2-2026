import { describe, expect, it, vi } from 'vitest';

const { mockRedirect } = vi.hoisted(() => ({ mockRedirect: vi.fn() }));

vi.mock('next/navigation', () => ({ redirect: mockRedirect }));

import { searchAction } from './actions';

describe('searchAction', () => {
  it('redirects to the locale home with the trimmed query, resetting page', async () => {
    const formData = new FormData();
    formData.set('query', '  pikachu  ');

    await searchAction('en', undefined, formData);

    expect(mockRedirect).toHaveBeenCalledWith('/en?page=1&query=pikachu');
  });

  it('redirects without a query when the input is empty', async () => {
    const formData = new FormData();
    formData.set('query', '   ');

    await searchAction('ru', undefined, formData);

    expect(mockRedirect).toHaveBeenCalledWith('/ru?page=1');
  });
});
