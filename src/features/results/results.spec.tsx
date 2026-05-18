import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Results from './results';
import { pokemons } from '../../__tests__/data';

const paginationProps = {
  page: 1,
  hasPrev: false,
  hasNext: false,
  onPageChange: () => {},
};

describe('Results: Rendering Tests', () => {
  it('Shows loading state while fetching data', async () => {
    render(
      <Results pokemons={[]} loading={true} error="" {...paginationProps} />
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeVisible();
  });

  it('Does not show loading state loading is not in progress', async () => {
    render(
      <Results pokemons={[]} loading={false} error="" {...paginationProps} />
    );

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('Renders the pokemon list when there is no error and data is provided', async () => {
    render(
      <Results
        pokemons={pokemons}
        loading={false}
        error=""
        {...paginationProps}
      />
    );

    expect(screen.getAllByRole('article').length).toBe(pokemons.length);
    expect(screen.queryByText('No Pokemons')).not.toBeInTheDocument();
  });

  it('Shows "No Pokemons" when there is no error and the list is empty', async () => {
    render(
      <Results pokemons={[]} loading={false} error="" {...paginationProps} />
    );

    expect(screen.getByText('No Pokemons')).toBeInTheDocument();
  });
});

describe('Results: Error Handling Tests', () => {
  it('Displays error message when API call fails', async () => {
    const errorMessage = 'Can not load pokemons';
    render(
      <Results
        pokemons={[]}
        loading={false}
        error={errorMessage}
        {...paginationProps}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByText('No Pokemons')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('article').length).toBe(0);
  });
});

describe('Results: Pagination Tests', () => {
  it('Does not render pagination while loading', () => {
    render(
      <Results
        pokemons={[]}
        loading={true}
        error=""
        page={1}
        hasPrevPage={true}
        hasNextPage={true}
        onPageChange={() => {}}
      />
    );

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('Does not render pagination when list is empty', () => {
    render(
      <Results
        pokemons={[]}
        loading={false}
        error=""
        page={1}
        hasPrevPage={true}
        hasNextPage={true}
        onPageChange={() => {}}
      />
    );

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('Renders pagination with current page and Prev/Next when items are loaded', () => {
    const pageIndex = 2;

    render(
      <Results
        pokemons={pokemons}
        loading={false}
        error=""
        page={pageIndex}
        hasPrevPage={true}
        hasNextPage={true}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(`Page ${pageIndex}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Prev/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /Next/i })).toBeEnabled();
  });

  it('Disables Prev on the first page', () => {
    render(
      <Results
        pokemons={pokemons}
        loading={false}
        error=""
        page={1}
        hasPrevPage={false}
        hasNextPage={true}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByRole('button', { name: /Prev/i })).toBeDisabled();
  });

  it('Calls onPageChange with the next page when Next is clicked', async () => {
    const onPageChange = vi.fn();
    const pageIndex = 3;
    const user = userEvent.setup();
    render(
      <Results
        pokemons={pokemons}
        loading={false}
        error=""
        page={pageIndex}
        hasPrevPage={true}
        hasNextPage={true}
        onPageChange={onPageChange}
      />
    );

    await user.click(screen.getByRole('button', { name: /Next/i }));
    expect(onPageChange).toHaveBeenCalledWith(pageIndex + 1);

    await user.click(screen.getByRole('button', { name: /Prev/i }));
    expect(onPageChange).toHaveBeenCalledWith(pageIndex - 1);
  });
});
