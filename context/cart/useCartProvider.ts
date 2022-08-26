import { useContext } from 'react';
import { CartContext } from '../cart';

export const useCartProvider = () => {
  const providerState = useContext(CartContext);

  return { ...providerState };
};
