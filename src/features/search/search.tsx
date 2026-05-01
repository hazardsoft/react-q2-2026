import { Component, type ReactNode } from 'react';
import './search.css';

export default class Search extends Component {
  render(): ReactNode {
    return (
      <section id="search" className="search">
        <input type=""></input>
        <button>Search</button>
      </section>
    );
  }
}
