import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';

type ProtectedRouteProps = {
  children?: ReactNode;
  requiredRoles?: string[];
};

export function ProtectedRoute({
  children,
  requiredRoles,
}: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    requiredRoles &&
    !requiredRoles.some((role) => user.roles.includes(role))
  ) {
    return <Navigate to="/forbidden" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
