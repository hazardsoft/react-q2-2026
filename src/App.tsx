import HomePage from './pages/home';
import ErrorBoundary from './features/error/error-boundary';

const App = () => {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <HomePage />
    </ErrorBoundary>
  );
};

export default App;
