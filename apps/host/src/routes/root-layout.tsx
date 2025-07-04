import { Outlet } from 'react-router';
import { AppSidebar } from '../components/layout/app-sidebar';
import { SidebarInset } from '@repo/ui';
import { Suspense } from 'react';

const RootLayout = () => {
  return (
    <div className="flex flex-row h-screen w-full">
      <AppSidebar />
      <SidebarInset>
        <main className="flex flex-col flex-1">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
      </SidebarInset>
    </div>
  );
};

export default RootLayout;
