import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken, getUserRole } from './authStorage';
import { UserRole } from './types';

type ProtectedRouteProps = {
  requiredRole: UserRole;
};

export function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
  const accessToken = getAccessToken();
  const userRole = getUserRole();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== requiredRole) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
