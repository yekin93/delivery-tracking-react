import { Navigate } from 'react-router-dom';
import { getUserRole } from './authStorage';

export function RoleBasedRedirect() {
  const role = getUserRole();

  if (role === 'ADMIN') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (role === 'RESTAURANT') {
    return <Navigate to="/restaurant/dashboard" replace />;
  }

  if (role === 'COURIER') {
    return <Navigate to="/courier/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
}
