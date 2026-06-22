import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { homeHref } from './home-href';
import './pokermon-card.css';

type PokermonCardProps = {
  name: string;
  sprite: string | null;
  page: number;
  query?: string;
};

const PokermonCard = ({ name, sprite, page, query }: PokermonCardProps) => {
  return (
    <Link
      className="pokemon-card clickable"
      href={homeHref({ page, query, details: name })}
    >
      <div className="image">
        {sprite && <Image src={sprite} alt={name} fill sizes="72px" />}
      </div>
      <div className="details">
        <h3 className="name">{name}</h3>
      </div>
    </Link>
  );
};

export default PokermonCard;
