import { Toolbar, ToolbarTitle } from '@repo/ui';

export function App() {
  return (
    <div className="flex flex-col flex-1">
      <Toolbar>
        <ToolbarTitle>Dashboard</ToolbarTitle>
      </Toolbar>

      <div className="flex flex-1 flex-col gap-4 p-4 ">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/90 aspect-video rounded-xl" />
          <div className="bg-muted/90 aspect-video rounded-xl" />
          <div className="bg-muted/90 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/90 flex-1 rounded-xl" />
      </div>
    </div>
  );
}

export default App;
