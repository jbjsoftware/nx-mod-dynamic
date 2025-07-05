import { useParams, Link } from 'react-router';
import {
  Toolbar,
  ToolbarTitle,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui';
import { ArrowLeft } from 'lucide-react';

interface ConnectionDetailPageProps {
  connectionId?: string;
}

function BackButton() {
  return (
    <Button variant="ghost" size="sm" asChild>
      <Link to="..">
        <ArrowLeft className="h-4 w-4" />
        Back to Connections
      </Link>
    </Button>
  );
}

export default function ConnectionDetailPage({
  connectionId,
}: ConnectionDetailPageProps = {}) {
  // Use the prop if provided, otherwise try to get from router params
  const { id: routerId } = useParams<{ id: string }>();
  const id = connectionId || routerId || 'unknown';

  return (
    <div className="flex flex-col flex-1">
      <Toolbar>
        <BackButton />
        <ToolbarTitle>Connection Details</ToolbarTitle>
      </Toolbar>

      <div className="flex flex-col flex-1 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Connection {id}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Connection ID</h3>
                <p className="text-muted-foreground">{id}</p>
              </div>

              <div>
                <h3 className="font-semibold">Status</h3>
                <p className="text-green-600">Active</p>
              </div>

              <div>
                <h3 className="font-semibold">Source</h3>
                <p className="text-muted-foreground">192.168.1.100</p>
              </div>

              <div>
                <h3 className="font-semibold">Destination</h3>
                <p className="text-muted-foreground">192.168.1.200</p>
              </div>

              <div>
                <h3 className="font-semibold">Protocol</h3>
                <p className="text-muted-foreground">TCP</p>
              </div>

              <div>
                <h3 className="font-semibold">Port</h3>
                <p className="text-muted-foreground">443</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
