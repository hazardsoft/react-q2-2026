import { Component, type ReactNode } from 'react';
import './home.css';
import Search from '../features/search/search';
import Results from '../features/results/results';

export default class HomePage extends Component {
  render(): ReactNode {
    return (
      <div id="home">
        <Search />
        <Results />
      </div>
    );
  }
}
