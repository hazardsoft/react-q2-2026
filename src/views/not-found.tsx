import Link from 'next/link';
import './not-found.css';

const NotFoundPage = () => {
  return (
    <div id="not-found">
      <h1>404</h1>
      <p>This page is not what you&apos;re looking for:)</p>
      <Link href="/?page=1">Get me home</Link>
    </div>
  );
};

export default NotFoundPage;
