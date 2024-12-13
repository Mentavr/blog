import { useState, type ReactNode } from 'react';
import { type AuthContextValueType } from '../type';
import { AuthContext } from '../AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setAuth] = useState<boolean>(false);

  const login = () => {
    setAuth(true);
  };

  const logOut = () => {
    setAuth(false);
  };

  const AuthProviderValue: AuthContextValueType = {
    isAuth,
    login,
    logOut,
  };

  return <AuthContext.Provider value={AuthProviderValue}>{children}</AuthContext.Provider>;
};
