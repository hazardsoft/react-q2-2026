import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import NotFoundPage from './not-found';

const renderNotFound = () => {
  const rootRoute = createRootRoute();
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: NotFoundPage,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
  });
  return render(<RouterProvider router={router} />);
};

describe('Not Found: Rendering Tests', () => {
  it('Renders 404 heading', async () => {
    renderNotFound();

    expect(
      await screen.findByRole('heading', { name: '404' })
    ).toBeInTheDocument();
  });

  it('Renders the not-found description text', async () => {
    renderNotFound();

    expect(
      await screen.findByText(/This page is not what you're looking for/i)
    ).toBeInTheDocument();
  });

  it('Renders a link back to home', async () => {
    renderNotFound();

    const link = await screen.findByRole('link', { name: /Get me home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/?page=1');
  });
});
