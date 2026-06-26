import { AuthUser } from './authTypes';

const AUTH_USER_KEY = 'authUser';

export function saveAuthUser(user: AuthUser) {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function getAuthUser(): AuthUser | null {
  const storedUser = localStorage.getItem(AUTH_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    clearAuthUser();
    return null;
  }
}

export function getAccessToken(): string | null {
  return getAuthUser()?.token ?? null;
}

export function clearAuthUser() {
  localStorage.removeItem(AUTH_USER_KEY);
}
