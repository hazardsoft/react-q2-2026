import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Navigation from '@/features/navigation/navigation';
import '../globals.css';

export const metadata: Metadata = {
  title: 'react-q2-2026',
  icons: { icon: '/favicon.svg' },
};

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const LocaleLayout = async ({ children, params }: Props) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <div className="app-shell">
            <Navigation />
            <main className="app-main">{children}</main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
