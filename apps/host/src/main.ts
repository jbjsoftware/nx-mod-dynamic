import { init } from '@module-federation/enhanced/runtime';

fetch('/assets/module-federation.manifest.json')
  .then((res) => res.json())
  .then((remotes: Record<string, string>) =>
    Object.entries(remotes).map(([name, entry]) => ({ name, entry }))
  )
  .then((remotes) => init({ name: 'host', remotes }))
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
