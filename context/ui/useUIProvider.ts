import { useContext } from 'react';
import { UIContext } from '../ui';

export const useUIProvider = () => {
  const providerState = useContext(UIContext);

  return { ...providerState };
};
