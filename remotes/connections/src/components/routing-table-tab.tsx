import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';

const routingTableData = [
  {
    id: 1,
    destination: '192.168.1.0/24',
    gateway: '192.168.1.1',
    interface: 'eth0',
    metric: 100,
  },
  {
    id: 2,
    destination: '10.0.0.0/8',
    gateway: '10.0.0.1',
    interface: 'eth1',
    metric: 200,
  },
  {
    id: 3,
    destination: '172.16.0.0/12',
    gateway: '172.16.0.1',
    interface: 'eth2',
    metric: 300,
  },
  {
    id: 4,
    destination: '0.0.0.0/0',
    gateway: '192.168.1.1',
    interface: 'eth0',
    metric: 1000,
  },
];

export function RoutingTableTab() {
  return (
    <Card className="flex flex-col flex-1">
      <CardHeader>
        <CardTitle>Routing Table</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Destination</th>
                <th className="text-left p-2">Gateway</th>
                <th className="text-left p-2">Interface</th>
                <th className="text-left p-2">Metric</th>
              </tr>
            </thead>
            <tbody>
              {routingTableData.map((route) => (
                <tr key={route.id} className="border-b hover:bg-muted/50">
                  <td className="p-2 font-mono">{route.destination}</td>
                  <td className="p-2 font-mono">{route.gateway}</td>
                  <td className="p-2">{route.interface}</td>
                  <td className="p-2">{route.metric}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
