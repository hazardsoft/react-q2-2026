import Link from 'next/link';
import './globals.css';
import '../views/not-found.css';

// Fallback 404 for requests that are not matched by the next-intl middleware
// (and therefore have no locale). Localized routes use app/[locale]/not-found.tsx.
const GlobalNotFound = () => {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <main className="app-main">
            <div id="not-found">
              <h1>404</h1>
              <p>This page is not what you&apos;re looking for:)</p>
              <Link href="/">Get me home</Link>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
};

export default GlobalNotFound;
