import { Navigate } from 'react-router-dom';
import { getAuthUser } from './authStorage';

export function RoleBasedRedirect() {
  const roles = getAuthUser()?.roles ?? [];

  if (roles.includes('ADMIN')) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (roles.includes('RESTAURANT')) {
    return <Navigate to="/restaurant/dashboard" replace />;
  }

  if (roles.includes('COURIER')) {
    return <Navigate to="/courier/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
}
