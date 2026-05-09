import { Component, type ReactNode } from 'react';
import type { PokemonDetails } from '../../api/types';
import { getPokemon } from '../../api/pokemon';
import './pokermon-card.css';

type PokermonCardProps = {
  name: string;
};

type PokemonCardState = {
  details: PokemonDetails | null;
};

export default class PokermonCard extends Component<PokermonCardProps> {
  state: PokemonCardState = {
    details: null,
  };

  componentDidMount(): void {
    this.handlePokemonDetails(this.props.name);
  }

  componentDidUpdate(prevProps: Readonly<PokermonCardProps>): void {
    if (prevProps.name !== this.props.name) {
      this.handlePokemonDetails(this.props.name);
    }
  }

  handlePokemonDetails = (name: string): void => {
    getPokemon(name).then((details) => {
      this.setState({ details });
    });
  };

  render(): ReactNode {
    const { name } = this.props;
    const { details } = this.state;
    const image = details?.sprites.front_default;

    return (
      <article className="pokemon-card">
        <div className="image">
          {image && <img src={image} alt={name} loading="lazy" />}
        </div>
        <div className="details">
          <h3 className="name">{name}</h3>
          {details && details.abilities.length > 0 && (
            <>
              <p className="abilities-label">Abilities:</p>
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
      </article>
    );
  }
}
