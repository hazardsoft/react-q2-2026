import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import NotFoundPage from '../pages/not-found';
import './root.css';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="pages">
        <Link to="/" search={{ page: 1 }}>
          Home
        </Link>
        <Link to="/forms">Forms</Link>
        <Link to="/about">About</Link>
      </div>
      <Outlet />
    </>
  ),
  notFoundComponent: NotFoundPage,
});
