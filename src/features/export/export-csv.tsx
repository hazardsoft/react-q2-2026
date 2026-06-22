import { useTranslations } from 'next-intl';
import './export-csv.css';

type ExportCsvProps = {
  page: number;
  query?: string;
};

const ExportCsv = ({ page, query }: ExportCsvProps) => {
  const t = useTranslations('Home');

  const params = new URLSearchParams({ page: String(page) });
  if (query) {
    params.set('query', query);
  }

  return (
    <a className="export-csv" href={`/api/export?${params.toString()}`} download>
      {t('exportCsv')}
    </a>
  );
};

export default ExportCsv;
