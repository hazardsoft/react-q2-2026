import { Link } from '@tanstack/react-router';
import './not-found.css';

const NotFoundPage = () => {
  return (
    <div id="not-found">
      <h1>404</h1>
      <p>This page is not what you&apos;re looking for:)</p>
      <Link to="/">Get me home</Link>
    </div>
  );
};

export default NotFoundPage;
