import { createContext } from 'react';
import { IUser } from '../../interfaces';

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  onLogin: (email: string, password: string) => Promise<boolean>;
  onRegister: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>;
  onLogout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
