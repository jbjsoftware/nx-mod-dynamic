import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="flex flex-col flex-1">
      <Outlet />
    </div>
  );
};

export default Layout;
