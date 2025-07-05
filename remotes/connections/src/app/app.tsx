import { RemoteApp } from '@repo/core';
import { connectionRoutes } from '../routes/route-definitions';

export function App() {
  return <RemoteApp routes={connectionRoutes} />;
}

export default App;
