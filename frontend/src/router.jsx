import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import useAuthStore from './store/authStore';

import AppShell from './components/layout/AppShell';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MenuMaker from './pages/MenuMaker';
import TodaysMenu from './pages/TodaysMenu';
import Customers from './pages/Customers';
import CustomerDetail from './pages/CustomerDetail';
import Messaging from './pages/Messaging';
import Analytics from './pages/Analytics';

function ProtectedRoute() {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function GuestRoute() {
  const token = useAuthStore((s) => s.token);
  if (token) return <Navigate to="/" replace />;
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [{ path: '/login', element: <Login /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: '/',              element: <Dashboard /> },
          { path: '/menu',          element: <MenuMaker /> },
          { path: '/todays-menu',   element: <TodaysMenu /> },
          { path: '/customers',     element: <Customers /> },
          { path: '/customers/:id', element: <CustomerDetail /> },
          { path: '/messaging',     element: <Messaging /> },
          { path: '/analytics',     element: <Analytics /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default router;