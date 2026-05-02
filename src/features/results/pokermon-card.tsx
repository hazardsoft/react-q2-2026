import { Component, type ReactNode } from 'react';
import type { Ability } from '../../api/types';
import { getPokemon } from '../../api/pokemon';

type PokermonCardProps = {
  name: string;
};

type PokemonCardState = {
  abilities: Ability[];
};

export default class PokermonCard extends Component<PokermonCardProps> {
  state: PokemonCardState = {
    abilities: [],
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
    getPokemon(name).then((pokemon) => {
      this.setState({ abilities: pokemon.abilities });
    });
  };

  render(): ReactNode {
    return (
      <div>
        <p>{this.props.name}</p>
        {this.state.abilities.length > 0 && (
          <p>
            abilities:{' '}
            {this.state.abilities.map((a) => a.ability.name).join(', ')}
          </p>
        )}
      </div>
    );
  }
}
