import { Component, type ReactNode } from 'react';
import './results.css';
import type { Pokemon } from '../../api/types';
import Loading from './loading';

type ResultsProps = {
  pokemons: Pokemon[];
  loading: boolean;
  error: string;
};

export default class Results extends Component<ResultsProps> {
  render(): ReactNode {
    return (
      <section id="results" className="results">
        <Loading visible={this.props.loading} />
        <div>{this.props.pokemons.map((p) => p.name).join(', ')}</div>
        {this.props.error && <p className="error">{this.props.error}</p>}
      </section>
    );
  }
}
