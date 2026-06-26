import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../shared/layout/AppLayout';
import { CouriersPage } from '../pages/CouriersPage';
import { DashboardPage } from '../pages/DashboardPage';
import { DeliveriesPage } from '../pages/DeliveriesPage';
import { LoginPage } from '../pages/LoginPage';
import { RestaurantsPage } from '../pages/RestaurantsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/restaurants',
        element: <RestaurantsPage />,
      },
      {
        path: '/couriers',
        element: <CouriersPage />,
      },
      {
        path: '/deliveries',
        element: <DeliveriesPage />,
      },
    ],
  },
]);
