import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { PokemonDetails } from '../../api/types';
import type { HomeHref } from '../results/home-href';
import './pokemon-details.css';

type DetailsViewProps = {
  details: PokemonDetails;
  closeHref: HomeHref;
};

const DetailsView = ({ details, closeHref }: DetailsViewProps) => {
  const t = useTranslations('Details');

  return (
    <div className="pokemon-details">
      <Link className="close" href={closeHref} aria-label={t('close')}>
        ×
      </Link>
      <h2 className="name">{details.name}</h2>
      {details.sprites.front_default && (
        <Image
          src={details.sprites.front_default}
          alt={details.name}
          width={160}
          height={160}
        />
      )}
      {details.abilities.length > 0 && (
        <>
          <h3 className="abilities-label">{t('abilities')}</h3>
          <ul className="abilities-list">
            {details.abilities.map((a) => (
              <li key={a.ability.name} className="abilities-item">
                {a.ability.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DetailsView;
