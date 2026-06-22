import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import HomeRoute from '@/views/home-route';

type Props = {
  params: Promise<{ locale: string }>;
};

const Page = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={null}>
      <HomeRoute />
    </Suspense>
  );
};

export default Page;
