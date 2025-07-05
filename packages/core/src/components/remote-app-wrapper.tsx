import { Suspense, Component, ErrorInfo, ReactNode, createElement } from 'react';
import { Routes, Route, createBrowserRouter, RouterProvider, RouteObject } from 'react-router';

interface RemoteAppProps {
  routes: RouteObject[];
  fallbackComponent?: React.ComponentType;
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class RouterErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, _errorInfo: ErrorInfo) {
    console.log('Router context error caught, falling back to standalone mode:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function SimpleRouting({ routes }: { routes: RouteObject[] }) {
  const path = window.location.pathname;
  const relativePath = path.startsWith('/connections') ? path.replace('/connections', '') || '/' : path;

  // Match routes based on path
  for (const route of routes) {
    if (!route.Component || !route.path) continue;

    if (route.path === '' && (relativePath === '/' || relativePath === '')) {
      return createElement(route.Component);
    }

    if (route.path.includes(':id') && relativePath.includes('/')) {
      const routePattern = route.path.replace(':id', '([^/]+)');
      const regex = new RegExp(`^/${routePattern}$`);
      const match = relativePath.match(regex);

      if (match) {
        const id = match[1];
        return createElement(route.Component, {
          connectionId: id,
          key: id,
        } as { connectionId: string; key: string });
      }
    }
  }

  // Fallback to first route
  const firstRoute = routes[0];
  if (firstRoute?.Component) {
    return createElement(firstRoute.Component);
  }

  return <div>Route not found</div>;
}

function FederatedRouting({ routes }: { routes: RouteObject[] }) {
  return (
    <Routes>
      {routes.map((route, index) => {
        if (!route.Component) return null;

        // Handle root route
        if (route.path === '') {
          return <Route key={`root-${index}`} path="/" element={createElement(route.Component)} />;
        }

        // Handle parameterized routes
        const routePath = `/${route.path}`;
        return <Route key={index} path={routePath} element={createElement(route.Component)} />;
      })}

      {/* Additional routes for federated mode */}
      {routes.map((route, index) => {
        if (!route.Component) return null;

        if (route.path === '') {
          return <Route key={`fed-root-${index}`} path="/connections" element={createElement(route.Component)} />;
        }

        const federatedPath = `/connections/${route.path}`;
        return <Route key={`fed-${index}`} path={federatedPath} element={createElement(route.Component)} />;
      })}
    </Routes>
  );
}

function StandaloneRouting({ routes }: { routes: RouteObject[] }) {
  const router = createBrowserRouter([
    {
      path: '/',
      children: routes.map((route) => ({
        path: route.path === '' ? undefined : route.path,
        index: route.path === '',
        Component: route.Component,
      })),
    },
  ]);

  return <RouterProvider router={router} />;
}

/**
 * Reusable wrapper for any remote application that needs to handle
 * both standalone and federated routing contexts
 */
export function RemoteApp({ routes, fallbackComponent: FallbackComponent, children }: RemoteAppProps) {
  const federatedRouting = children || <FederatedRouting routes={routes} />;
  const simpleRouting = FallbackComponent ? <FallbackComponent /> : <SimpleRouting routes={routes} />;

  return (
    <div className="flex flex-col flex-1">
      <Suspense fallback={<div>Loading...</div>}>
        <RouterErrorBoundary fallback={simpleRouting}>{federatedRouting}</RouterErrorBoundary>
      </Suspense>
    </div>
  );
}

/**
 * Standalone wrapper that provides its own router context
 */
export function StandaloneRemoteApp({ routes }: { routes: RouteObject[] }) {
  return (
    <div className="flex flex-col flex-1">
      <Suspense fallback={<div>Loading...</div>}>
        <StandaloneRouting routes={routes} />
      </Suspense>
    </div>
  );
}
