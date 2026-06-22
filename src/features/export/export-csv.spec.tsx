import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithIntl } from '../../__tests__/render';
import ExportCsv from './export-csv';

describe('ExportCsv', () => {
  it('links to the export route with the current page', () => {
    renderWithIntl(<ExportCsv page={3} />);

    const link = screen.getByRole('link', { name: /Export/i });
    expect(link).toHaveAttribute('href', '/api/export?page=3');
    expect(link).toHaveAttribute('download');
  });

  it('includes the search query when provided', () => {
    renderWithIntl(<ExportCsv page={1} query="pikachu" />);

    expect(screen.getByRole('link', { name: /Export/i })).toHaveAttribute(
      'href',
      '/api/export?page=1&query=pikachu'
    );
  });
});
