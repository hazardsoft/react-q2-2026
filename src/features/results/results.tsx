import { Component, type ReactNode } from 'react';
import './results.css';
import type { Pokemon } from '../../api/types';

type ResultsProps = {
  pokemons: Pokemon[];
};

export default class Results extends Component<ResultsProps> {
  render(): ReactNode {
    return (
      <section id="results" className="results">
        <div>{this.props.pokemons.map((p) => p.name).join(', ')}</div>
      </section>
    );
  }
}
