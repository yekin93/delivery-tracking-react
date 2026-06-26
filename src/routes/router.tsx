import { Navigate, createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../features/auth/ProtectedRoute';
import { RoleBasedRedirect } from '../features/auth/RoleBasedRedirect';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminRestaurantsPage } from '../pages/admin/AdminRestaurantsPage';
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
      {
        path: '/redirect',
        element: <RoleBasedRedirect />,
      },
    ],
  },
  {
    element: <ProtectedRoute requiredRole="ADMIN" />,
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
    element: <ProtectedRoute requiredRole="RESTAURANT" />,
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
    element: <ProtectedRoute requiredRole="COURIER" />,
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
    element: <ProtectedRoute requiredRole="CUSTOMER" />,
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
