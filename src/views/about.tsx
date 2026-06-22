import { useTranslations } from 'next-intl';
import './about.css';

const AboutPage = () => {
  const t = useTranslations('About');

  return (
    <div id="about">
      <p>
        <strong>{t('author')}</strong> Henadzi Shutko
      </p>
      <p>
        <a
          href="https://github.com/hazardsoft"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('github')}
        </a>
      </p>
      <p>
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('course')}
        </a>
      </p>
    </div>
  );
};

export default AboutPage;
