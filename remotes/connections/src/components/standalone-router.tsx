import { StrictMode, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { connectionRoutesForStandalone } from '../routes/route-definitions';
import { UIProvider } from '@repo/ui';

const router = createBrowserRouter(connectionRoutesForStandalone);

export function StandaloneRouter() {
  return (
    <StrictMode>
      <UIProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </UIProvider>
    </StrictMode>
  );
}
