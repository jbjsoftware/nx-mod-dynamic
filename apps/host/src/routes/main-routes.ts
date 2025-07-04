import { createBrowserRouter, redirect } from 'react-router';
import RootLayout from './root-layout';
import { loadRemote } from '@module-federation/enhanced/runtime';
import React from 'react';

const Dashboard = React.lazy(() => loadRemote('dashboard/Module') as any);

const ConnectionsApp = React.lazy(
  () => loadRemote('connections/Module') as any
);

export const mainRoutes = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'dashboard', Component: Dashboard },
      {
        path: 'connections/*',
        Component: ConnectionsApp,
      },
      { path: '*', loader: () => redirect('/dashboard') },
    ],
  },
]);
