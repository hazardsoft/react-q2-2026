import { notFound } from 'next/navigation';

// Any unmatched path under a locale falls through to here and renders the
// localized not-found page (app/[locale]/not-found.tsx).
const CatchAllPage = () => {
  notFound();
};

export default CatchAllPage;
