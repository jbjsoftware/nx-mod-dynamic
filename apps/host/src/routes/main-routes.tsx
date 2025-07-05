import { Suspense } from 'react';
import { createBrowserRouter, redirect, useRoutes } from 'react-router';
import { loadRemote } from '@module-federation/enhanced/runtime';

import RootLayout from './root-layout';

export const mainRoutes = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, loader: () => redirect('/dashboard') },
      {
        path: 'dashboard',
        lazy: async () => {
          const DashboardModule = (await loadRemote('dashboard/Module')) as any;
          return {
            Component: DashboardModule.default || DashboardModule,
          };
        },
      },
      {
        path: 'connections/*',
        lazy: async () => {
          const ConnectionsModule = (await loadRemote('connections/Module')) as any;
          return {
            Component: ConnectionsModule.default || ConnectionsModule,
          };
        },
      },
      {
        path: 'foo/*',
        lazy: async () => {
          const fooModule = (await loadRemote('foo/Module')) as any;
          const routes = fooModule.connectionRoutes;

          return {
            Component: function FooRoutes() {
              const routeElements = useRoutes(routes);
              return <Suspense fallback={<div>Loading...</div>}>{routeElements}</Suspense>;
            },
          };
        },
      },
      { path: '*', loader: () => redirect('/dashboard') },
    ],
  },
]);
