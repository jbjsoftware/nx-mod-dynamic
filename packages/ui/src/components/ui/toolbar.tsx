import * as React from 'react';

import { cn } from '@repo/utils';

function Toolbar({ className, ...props }: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="toolbar"
      className={cn(
        'flex h-14 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4',
        className
      )}
      {...props}
    />
  );
}

function ToolbarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="toolbar-content"
      className={cn('flex items-center gap-4 px-4', className)}
      {...props}
    />
  );
}

function ToolbarTitle({
  className,
  children,
  ...props
}: React.ComponentProps<'h1'> & { children: React.ReactNode }) {
  return (
    <h1
      data-slot="toolbar-title"
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

function ToolbarDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="toolbar-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

function ToolbarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="toolbar-group"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  );
}

function ToolbarSeparator({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="toolbar-separator"
      className={cn('mx-2 h-4 w-px bg-border', className)}
      {...props}
    />
  );
}

function ToolbarActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="toolbar-actions"
      className={cn('flex items-center gap-2 px-4', className)}
      {...props}
    />
  );
}

function ToolbarSection({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="toolbar-section"
      className={cn('flex flex-col gap-1', className)}
      {...props}
    />
  );
}

export {
  Toolbar,
  ToolbarActions,
  ToolbarContent,
  ToolbarDescription,
  ToolbarGroup,
  ToolbarSection,
  ToolbarSeparator,
  ToolbarTitle,
};
