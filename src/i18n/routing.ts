import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // All locales supported by the application
  locales: ['en', 'ru'],

  // Used when no locale matches
  defaultLocale: 'en',
});

export type Locale = (typeof routing.locales)[number];
