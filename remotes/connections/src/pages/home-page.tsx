import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toolbar,
  ToolbarTitle,
} from '@repo/ui';
import { RoutingTableTab } from '../components/routing-table-tab';
import { ConnectionsListTab } from '../components/connections-list-tab';

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1">
      <Toolbar>
        <ToolbarTitle>Connections</ToolbarTitle>
      </Toolbar>

      <div className="flex flex-col flex-1 p-4">
        <Tabs defaultValue="routing-table" className="flex flex-col flex-1">
          <TabsList className="mb-4">
            <TabsTrigger value="routing-table">Routing Table</TabsTrigger>
            <TabsTrigger value="connections-list">Connections</TabsTrigger>
          </TabsList>

          <TabsContent value="routing-table" className="flex-1">
            <RoutingTableTab />
          </TabsContent>

          <TabsContent value="connections-list" className="flex-1">
            <ConnectionsListTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
