import { Button, Toolbar, ToolbarTitle } from '@repo/ui';
import { Link } from 'react-router';

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1">
      <Toolbar>
        <ToolbarTitle>Connections</ToolbarTitle>
      </Toolbar>

      <div className="flex flex-col flex-1 p-4">
        <h1>Home Page</h1>

        <Button asChild>
          <Link to="connection/1">Connection 1</Link>
        </Button>
      </div>
    </div>
  );
}
