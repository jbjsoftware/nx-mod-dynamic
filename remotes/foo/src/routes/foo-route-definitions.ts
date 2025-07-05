import { RouteObject } from 'react-router';
import { lazy } from 'react';

// Lazy load the page components
const HomePage = lazy(() => import('../pages/home-page'));
const ConnectionDetailPage = lazy(
  () => import('../pages/connection-detail-page')
);

export const connectionRoutes: RouteObject[] = [
  {
    index: true,
    Component: HomePage,
  },
  {
    path: 'connection/:id',
    Component: ConnectionDetailPage,
  },
];
