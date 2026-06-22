import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import './not-found.css';

const NotFoundPage = () => {
  const t = useTranslations('NotFound');

  return (
    <div id="not-found">
      <h1>404</h1>
      <p>{t('description')}</p>
      <Link href="/?page=1">{t('cta')}</Link>
    </div>
  );
};

export default NotFoundPage;
