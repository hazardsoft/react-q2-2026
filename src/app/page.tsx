import { Suspense } from 'react';
import HomeRoute from '@/views/home-route';

const Page = () => {
  return (
    <Suspense fallback={null}>
      <HomeRoute />
    </Suspense>
  );
};

export default Page;
