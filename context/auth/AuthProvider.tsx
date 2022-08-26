import { FC, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { FloydApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';
import { idID } from '@mui/material/locale';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface Props {
  children?: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const { data, status } = useSession();

  const router = useRouter();

  // useEffect(() => {
  //   checkToken();
  // }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('data', data);
      dispatch({ type: 'Login', payload: data.user as IUser });
    }
  }, [data, status]);

  const checkToken = async () => {
    if (!Cookies.get('token')) return;

    try {
      const { data } = await FloydApi.get('/user/validate-token');

      const { token, user } = data;

      Cookies.set('token', token);
      dispatch({ type: 'Login', payload: user });
    } catch (error) {
      Cookies.remove('token');
    }
  };

  const onLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await FloydApi.post('/user/login', { email, password });

      const { token, user } = data;

      Cookies.set('token', token);
      dispatch({ type: 'Login', payload: user });

      return true;
    } catch (error) {
      dispatch({ type: 'Logout' });

      return false;
    }
  };

  const onRegister = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await FloydApi.post('/user/register', {
        name,
        email,
        password,
      });

      const { token, user } = data;

      Cookies.set('token', token);
      dispatch({ type: 'Login', payload: user });

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.message || '',
        };
      }

      return {
        hasError: true,
        message: 'Something went wrong! 😵‍💫',
      };
    }
  };

  const onLogout = () => {
    Cookies.remove('cart');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('addres2');
    Cookies.remove('zip');
    Cookies.remove('country');
    Cookies.remove('city');
    Cookies.remove('phone');
    signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
