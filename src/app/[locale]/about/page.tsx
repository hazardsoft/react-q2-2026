import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import AboutPage from '@/views/about';

type Props = {
  params: Promise<{ locale: string }>;
};

// The About page is fully static: no runtime data, prerendered at build per locale.
export const dynamic = 'force-static';

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
};

const Page = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPage />;
};

export default Page;
