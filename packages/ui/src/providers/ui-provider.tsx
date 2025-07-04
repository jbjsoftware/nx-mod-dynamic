import React from 'react';
import { ThemeProvider } from '../components/theme-provider';
import '../styles/globals.css';

interface UIProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'dark' | 'light' | 'system';
  storageKey?: string;
}

export function UIProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
}: UIProviderProps) {
  return (
    <ThemeProvider defaultTheme={defaultTheme} storageKey={storageKey}>
      {children}
    </ThemeProvider>
  );
}

export default UIProvider;
