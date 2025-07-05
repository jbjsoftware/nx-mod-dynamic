'use client';

import * as React from 'react';
import { HomeIcon, LineChartIcon, RabbitIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from '@repo/ui';
import { NavMain } from '../nav/nav-main';
import { ModeToggle } from '@repo/ui';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: HomeIcon,
    },
    {
      title: 'Connections',
      url: '/connections',
      icon: LineChartIcon,
    },
    {
      title: 'Foo',
      url: '/foo',
      icon: LineChartIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const isActive = (item: { url: string }) => location.pathname === item.url;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-0 h-14 flex justify-center border-b">
        <div className="flex overflow-hidden px-2">
          <Link
            to="/"
            className="flex flex-nowrap items-center overflow-hidden gap-4"
          >
            <RabbitIcon className="size-8 p-1 shrink-0 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full" />
            <div className="text-muted-foreground font-semibold text-[12px] tracking-widest truncate">
              <div className="truncate">NX MOD</div>
              <div className="truncate">DYNAMIC FED</div>
            </div>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="pt-1">
        <SidebarGroup className="pb-1">
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <NavMain items={data.navMain} isActive={isActive} />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <ModeToggle />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
