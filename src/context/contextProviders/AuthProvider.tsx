import { type ReactNode } from 'react';
import { type AuthContextValueType } from '../type';
import { AuthContext } from '../AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const AuthProviderValue: AuthContextValueType = {};

  return <AuthContext.Provider value={AuthProviderValue}>{children}</AuthContext.Provider>;
};
