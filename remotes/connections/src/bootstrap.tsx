import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { CoreProvider, StandaloneRemoteApp } from '@repo/core';
import { connectionRoutes } from './routes/route-definitions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <CoreProvider>
      <StandaloneRemoteApp routes={connectionRoutes} />
    </CoreProvider>
  </StrictMode>
);
