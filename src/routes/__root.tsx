import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import './root.css';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="pages">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
