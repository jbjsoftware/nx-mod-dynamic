# Reusable Remote Pattern

This document shows how to create a new remote that works both standalone and federated using the standardized pattern.

## Quick Start

### 1. Create Route Definitions

Create `src/routes/route-definitions.ts`:

```typescript
import { RouteObject } from 'react-router';
import { lazy } from 'react';

// Lazy load your page components
const HomePage = lazy(() => import('../pages/home-page'));
const DetailPage = lazy(() => import('../pages/detail-page'));

export const myRemoteRoutes: RouteObject[] = [
  {
    path: '',
    Component: HomePage,
  },
  {
    path: 'detail/:id',
    Component: DetailPage,
  },
];
```

### 2. Create App Component

Create `src/app/app.tsx`:

```typescript
import { RemoteApp } from '@repo/ui';
import { myRemoteRoutes } from '../routes/route-definitions';

export function App() {
  return <RemoteApp routes={myRemoteRoutes} />;
}

export default App;
```

### 3. Create Standalone Bootstrap

Create `src/bootstrap.tsx`:

```typescript
import * as ReactDOM from 'react-dom/client';
import { StandaloneRemoteApp } from '@repo/ui';
import { myRemoteRoutes } from './routes/route-definitions';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<StandaloneRemoteApp routes={myRemoteRoutes} />);
```

### 4. Export Routes and Module

Update `src/remote-entry.ts`:

```typescript
export { default } from './app/app';
export { myRemoteRoutes } from './routes/route-definitions';
```

### 5. Configure Module Federation

Update `module-federation.config.ts`:

```typescript
import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'myremote',
  library: { type: 'var', name: 'myremote' },
  exposes: {
    './Module': './src/remote-entry.ts',
    './Routes': './src/routes/route-definitions.ts',
  },
};

export default config;
```

## That's It!

Your remote will now:

- ✅ Run standalone at `http://localhost:PORT/`
- ✅ Work when federated in the host at `/myremote/*`
- ✅ Handle Router context gracefully
- ✅ Support dynamic routing with parameters
- ✅ Provide consistent navigation experience

## Benefits

- **Single Source of Truth**: Routes defined once in `route-definitions.ts`
- **Zero Boilerplate**: Just import `RemoteApp` and pass your routes
- **Automatic Fallbacks**: Works with or without Router context
- **Consistent Pattern**: Every remote follows the same structure
- **Easy Integration**: Host just loads the module normally

## Page Components

Your page components can optionally accept props for parameterized routes:

```typescript
interface DetailPageProps {
  detailId?: string; // For non-router fallback
}

export default function DetailPage({ detailId }: DetailPageProps = {}) {
  const { id: routerId } = useParams<{ id: string }>();
  const id = detailId || routerId || 'unknown';

  return <div>Detail for {id}</div>;
}
```

The `RemoteApp` wrapper automatically passes the parameter as a prop in fallback mode.
