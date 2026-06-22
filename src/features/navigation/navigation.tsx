import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '../locale-switcher/locale-switcher';

const Navigation = () => {
  const t = useTranslations('Nav');

  return (
    <nav className="pages">
      <Link href="/?page=1">{t('home')}</Link>
      <Link href="/about">{t('about')}</Link>
      <LocaleSwitcher />
    </nav>
  );
};

export default Navigation;
