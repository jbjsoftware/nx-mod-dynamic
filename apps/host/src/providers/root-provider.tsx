import React from 'react';
import Cookies from 'js-cookie';

import { SidebarProvider } from '@repo/ui';
import { CoreProvider } from '@repo/core';

interface RootProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'dark' | 'light' | 'system';
  storageKey?: string;
  sidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
}

export function RootProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'app-theme',
  sidebarOpen,
  onSidebarOpenChange,
}: RootProviderProps) {
  const defaultOpen = Cookies.get('sidebar_state') === 'true';

  return (
    <CoreProvider defaultTheme={defaultTheme} storageKey={storageKey}>
      <SidebarProvider
        defaultOpen={defaultOpen}
        open={sidebarOpen}
        onOpenChange={onSidebarOpenChange}
      >
        {children}
      </SidebarProvider>
    </CoreProvider>
  );
}

export default RootProvider;
