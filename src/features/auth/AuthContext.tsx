import {
  ReactNode,
  useMemo,
  useState,
} from 'react';
import { AuthUser } from './authTypes';
import { clearAuthUser, getAuthUser, saveAuthUser } from './authStorage';
import { AuthContext } from './authContextValue';

export type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginUser: (user: AuthUser) => void;
  logoutUser: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => getAuthUser());

  function loginUser(authUser: AuthUser) {
    saveAuthUser(authUser);
    setUser(authUser);
  }

  function logoutUser() {
    clearAuthUser();
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loginUser,
      logoutUser,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
