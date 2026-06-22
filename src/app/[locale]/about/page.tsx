import { setRequestLocale } from 'next-intl/server';
import AboutPage from '@/views/about';

type Props = {
  params: Promise<{ locale: string }>;
};

const Page = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPage />;
};

export default Page;
