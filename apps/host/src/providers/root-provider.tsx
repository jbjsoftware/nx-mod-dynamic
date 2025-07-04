import React from 'react';
import { UIProvider, SidebarProvider } from '@repo/ui';

interface RootProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'dark' | 'light' | 'system';
  storageKey?: string;
  defaultSidebarOpen?: boolean;
  sidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
}

export function RootProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'app-theme',
  defaultSidebarOpen = true,
  sidebarOpen,
  onSidebarOpenChange,
}: RootProviderProps) {
  return (
    <UIProvider defaultTheme={defaultTheme} storageKey={storageKey}>
      <SidebarProvider
        defaultOpen={defaultSidebarOpen}
        open={sidebarOpen}
        onOpenChange={onSidebarOpenChange}
      >
        {children}
      </SidebarProvider>
    </UIProvider>
  );
}

export default RootProvider;
