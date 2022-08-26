import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuthProvider = () => {
  const providerState = useContext(AuthContext);

  return { ...providerState };
};
