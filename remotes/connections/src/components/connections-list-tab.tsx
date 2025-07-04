import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
} from '@repo/ui';
import { Link } from 'react-router';
import { Eye } from 'lucide-react';

function ViewButton({ connectionId }: { connectionId: string }) {
  const handleView = () => {
    const currentPath = window.location.pathname;
    const basePath = currentPath.includes('/connections') ? '/connections' : '';
    window.location.href = `${basePath}/connection/${connectionId}`;
  };

  try {
    return (
      <Button variant="ghost" size="sm" asChild>
        <Link to={`connection/${connectionId}`}>
          <Eye className="h-4 w-4" />
          View
        </Link>
      </Button>
    );
  } catch (error) {
    return (
      <Button variant="ghost" size="sm" onClick={handleView}>
        <Eye className="h-4 w-4" />
        View
      </Button>
    );
  }
}

const connectionsData = [
  {
    id: 'conn-001',
    source: '192.168.1.100',
    destination: '192.168.1.200',
    protocol: 'TCP',
    port: 443,
    status: 'Active',
    duration: '2h 15m',
  },
  {
    id: 'conn-002',
    source: '10.0.0.50',
    destination: '10.0.0.100',
    protocol: 'UDP',
    port: 53,
    status: 'Active',
    duration: '45m',
  },
  {
    id: 'conn-003',
    source: '172.16.0.10',
    destination: '172.16.0.20',
    protocol: 'TCP',
    port: 80,
    status: 'Inactive',
    duration: '0m',
  },
  {
    id: 'conn-004',
    source: '192.168.1.150',
    destination: '8.8.8.8',
    protocol: 'TCP',
    port: 443,
    status: 'Active',
    duration: '1h 30m',
  },
];

export function ConnectionsListTab() {
  return (
    <Card className="flex flex-col flex-1">
      <CardHeader>
        <CardTitle>Active Connections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Connection ID</th>
                <th className="text-left p-2">Source</th>
                <th className="text-left p-2">Destination</th>
                <th className="text-left p-2">Protocol</th>
                <th className="text-left p-2">Port</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Duration</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {connectionsData.map((connection) => (
                <tr key={connection.id} className="border-b hover:bg-muted/50">
                  <td className="p-2 font-mono">{connection.id}</td>
                  <td className="p-2 font-mono">{connection.source}</td>
                  <td className="p-2 font-mono">{connection.destination}</td>
                  <td className="p-2">{connection.protocol}</td>
                  <td className="p-2">{connection.port}</td>
                  <td className="p-2">
                    <Badge
                      variant={
                        connection.status === 'Active' ? 'default' : 'secondary'
                      }
                    >
                      {connection.status}
                    </Badge>
                  </td>
                  <td className="p-2">{connection.duration}</td>
                  <td className="p-2">
                    <ViewButton connectionId={connection.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
