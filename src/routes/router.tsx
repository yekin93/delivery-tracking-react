import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminRestaurantsPage } from '../pages/admin/AdminRestaurantsPage';
import { ApplyPage } from '../pages/apply/ApplyPage';
import { ForbiddenPage } from '../pages/auth/ForbiddenPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { CourierDashboardPage } from '../pages/courier/CourierDashboardPage';
import { CustomerOrdersPage } from '../pages/customer/CustomerOrdersPage';
import { HomePage } from '../pages/public/HomePage';
import { RestaurantDetailsPage } from '../pages/public/RestaurantDetailsPage';
import { RestaurantsPage } from '../pages/public/RestaurantsPage';
import { RestaurantDashboardPage } from '../pages/restaurant/RestaurantDashboardPage';
import { RestaurantOrdersPage } from '../pages/restaurant/RestaurantOrdersPage';
import { RestaurantProductsPage } from '../pages/restaurant/RestaurantProductsPage';
import { AdminLayout } from '../shared/layouts/AdminLayout';
import { CourierLayout } from '../shared/layouts/CourierLayout';
import { PublicLayout } from '../shared/layouts/PublicLayout';
import { RestaurantLayout } from '../shared/layouts/RestaurantLayout';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/restaurants',
        element: <RestaurantsPage />,
      },
      {
        path: '/restaurants/:id',
        element: <RestaurantDetailsPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/forbidden',
        element: <ForbiddenPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            path: '/apply',
            element: <ApplyPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute requiredRoles={['ADMIN']} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: '/admin/dashboard',
            element: <AdminDashboardPage />,
          },
          {
            path: '/admin/restaurants',
            element: <AdminRestaurantsPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute requiredRoles={['RESTAURANT']} />,
    children: [
      {
        element: <RestaurantLayout />,
        children: [
          {
            path: '/restaurant/dashboard',
            element: <RestaurantDashboardPage />,
          },
          {
            path: '/restaurant/products',
            element: <RestaurantProductsPage />,
          },
          {
            path: '/restaurant/orders',
            element: <RestaurantOrdersPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute requiredRoles={['COURIER']} />,
    children: [
      {
        element: <CourierLayout />,
        children: [
          {
            path: '/courier/dashboard',
            element: <CourierDashboardPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute requiredRoles={['CUSTOMER']} />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            path: '/customer/orders',
            element: <CustomerOrdersPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
