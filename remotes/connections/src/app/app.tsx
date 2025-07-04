import { Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import HomePage from '../pages/home-page';
import ConnectionDetailPage from '../pages/connection-detail-page';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class RouterErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('Router context error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fall back to simple routing without Router context
      return <SimpleRouting />;
    }

    return this.props.children;
  }
}

function SimpleRouting() {
  const path = window.location.pathname;
  const relativePath = path.startsWith('/connections')
    ? path.replace('/connections', '') || '/'
    : path;

  if (relativePath.startsWith('/connection/')) {
    const id = relativePath.split('/')[2];
    return <ConnectionDetailPage connectionId={id} key={id} />;
  }

  return <HomePage />;
}

function RouterContent() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/connection/:id" element={<ConnectionDetailPage />} />
      <Route path="/connections" element={<HomePage />} />
      <Route
        path="/connections/connection/:id"
        element={<ConnectionDetailPage />}
      />
    </Routes>
  );
}

export function App() {
  return (
    <div className="flex flex-col flex-1">
      <Suspense fallback={<div>Loading...</div>}>
        <RouterErrorBoundary>
          <RouterContent />
        </RouterErrorBoundary>
      </Suspense>
    </div>
  );
}

export default App;
