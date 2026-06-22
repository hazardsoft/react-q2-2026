import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import LocaleSwitcher from '@/features/locale-switcher/locale-switcher';
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

  const t = await getTranslations('Nav');

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <div className="app-shell">
            <nav className="pages">
              <Link href="/?page=1">{t('home')}</Link>
              <Link href="/about">{t('about')}</Link>
              <LocaleSwitcher />
            </nav>
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
