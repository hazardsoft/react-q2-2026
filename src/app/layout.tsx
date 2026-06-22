import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'react-q2-2026',
  icons: { icon: '/favicon.svg' },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <nav className="pages">
            <Link href="/?page=1">Home</Link>
            <Link href="/about">About</Link>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
