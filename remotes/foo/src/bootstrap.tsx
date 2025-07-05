import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { connectionRoutes } from './routes/foo-route-definitions';
import { CoreProvider } from '@repo/core';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './routes/layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <CoreProvider>
      <RouterProvider
        router={createBrowserRouter([
          {
            Component: Layout,
            children: connectionRoutes,
          },
        ])}
      />
    </CoreProvider>
  </StrictMode>
);
