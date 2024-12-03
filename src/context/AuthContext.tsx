import { createContext } from 'react';
import { AuthContextValueType } from './type';

export const AuthContext = createContext<AuthContextValueType>({} as AuthContextValueType);
