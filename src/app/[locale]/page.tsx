import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import Search from '@/features/search/search';
import Loading from '@/features/results/loading';
import ResultsPanel from '@/features/results/results-panel';
import ExportCsv from '@/features/export/export-csv';
import ThrowButton from '@/features/error/throw-button';
import { homeHref } from '@/features/results/home-href';
import ResultsSection from './results-section';
import DetailsPanel from './details-panel';
import { searchAction } from './actions';
import './home.css';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const parsePage = (raw?: string): number => {
  const page = Number(raw);
  return Number.isInteger(page) && page >= 1 ? page : 1;
};

const firstValue = (
  value: string | string[] | undefined
): string | undefined => (Array.isArray(value) ? value[0] : value);

const Page = async ({ params, searchParams }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const sp = await searchParams;
  const page = parsePage(firstValue(sp.page));
  const query = firstValue(sp.query)?.trim() || undefined;
  const details = firstValue(sp.details) || undefined;

  const closeHref = homeHref({ page, query });

  return (
    <div id="home">
      <Search
        initialValue={query ?? ''}
        searchAction={searchAction.bind(null, locale)}
      />
      <div className="home-body">
        <ResultsPanel closeHref={details ? closeHref : undefined}>
          <Suspense key={`${page}:${query ?? ''}`} fallback={<Loading />}>
            <ResultsSection page={page} query={query} />
          </Suspense>
        </ResultsPanel>
        <section className="details">
          {details && (
            <Suspense key={details} fallback={<Loading />}>
              <DetailsPanel detailsId={details} closeHref={closeHref} />
            </Suspense>
          )}
        </section>
      </div>
      <div className="home-controls">
        <ExportCsv page={page} query={query} />
        <ThrowButton />
      </div>
    </div>
  );
};

export default Page;
