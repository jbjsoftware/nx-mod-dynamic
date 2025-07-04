import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { RootProvider } from './providers/root-provider';
import { mainRoutes } from './routes/main-routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RootProvider>
      <RouterProvider router={mainRoutes} />
    </RootProvider>
  </StrictMode>
);
