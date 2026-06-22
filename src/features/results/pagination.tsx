import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { homeHref } from './home-href';

type PaginationProps = {
  page: number;
  query?: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

const Pagination = ({
  page,
  query,
  hasPrevPage,
  hasNextPage,
}: PaginationProps) => {
  const t = useTranslations('Results');

  return (
    <nav>
      {hasPrevPage ? (
        <Link className="page-link" href={homeHref({ page: page - 1, query })}>
          {t('prev')}
        </Link>
      ) : (
        <span className="page-link disabled">{t('prev')}</span>
      )}
      <span>{t('page', { page })}</span>
      {hasNextPage ? (
        <Link className="page-link" href={homeHref({ page: page + 1, query })}>
          {t('next')}
        </Link>
      ) : (
        <span className="page-link disabled">{t('next')}</span>
      )}
    </nav>
  );
};

export default Pagination;
