import { Component, type ReactNode } from 'react';
import HomePage from './pages/home';
import ErrorBoundary from './features/error/error-boundary';

export default class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <HomePage />
      </ErrorBoundary>
    );
  }
}
