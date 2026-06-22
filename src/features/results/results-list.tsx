import { useTranslations } from 'next-intl';
import PokermonCard from './pokermon-card';
import './pokemon-list.css';

export type ResultItem = {
  name: string;
  sprite: string | null;
};

type ResultsListProps = {
  items: ResultItem[];
  page: number;
  query?: string;
};

const ResultsList = ({ items, page, query }: ResultsListProps) => {
  const t = useTranslations('Results');

  return (
    <div className="results-list">
      {items.length === 0 ? (
        <p>{t('empty')}</p>
      ) : (
        <div className="pokemon-list">
          {items.map((item) => (
            <PokermonCard
              key={item.name}
              name={item.name}
              sprite={item.sprite}
              page={page}
              query={query}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsList;
