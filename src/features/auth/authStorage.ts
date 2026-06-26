import { UserRole } from './types';

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function getUserRole(): UserRole | null {
  const role = localStorage.getItem('userRole');

  if (
    role === 'ADMIN' ||
    role === 'RESTAURANT' ||
    role === 'COURIER' ||
    role === 'CUSTOMER'
  ) {
    return role;
  }

  return null;
}
