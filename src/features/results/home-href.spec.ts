import { describe, expect, it } from 'vitest';
import { homeHref } from './home-href';

describe('homeHref', () => {
  it('always includes the page', () => {
    expect(homeHref({ page: 2 })).toEqual({
      pathname: '/',
      query: { page: 2 },
    });
  });

  it('includes query and details when provided', () => {
    expect(homeHref({ page: 1, query: 'pika', details: 'raichu' })).toEqual({
      pathname: '/',
      query: { page: 1, query: 'pika', details: 'raichu' },
    });
  });

  it('omits empty query and details', () => {
    expect(homeHref({ page: 3 }).query).toEqual({ page: 3 });
  });
});
